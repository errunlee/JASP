import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"; // Button component (ensure import path)
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver import
// import { User } from "./validation"; // Validation schema (change as required)
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import SelectElement from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/instance";
import { register, RegisterProps } from "@/lib/utils";
import Overlay from "@/components/Overlay";

type Checkpoint = {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  createdAt: string; // You can use `Date` if you prefer handling dates as Date objects
  updatedAt: string; // Same as above
  isDeleted: boolean;
};

const roles = [
  {
    label: "Regular User",
    value: "REGULAR_USER",
  },
  {
    label: "Vehicle Manager",
    value: "VEHICLE_MANAGER",
  },
  {
    label: "Scrap Dealer",
    value: "SCRAP_DEALER",
  },
];

const RegisterForm = () => {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<number | null>(
    null
  );

  const { data: checkpoints, isLoading: isCheckPointsLoading } = useQuery<
    Checkpoint[]
  >({
    queryKey: ["checkpoints"],
    queryFn: async () => {
      const res = await api.get("/api/checkpoints");
      return res.data.data;
    },
  });

  const User = z
    .object({
      username: z.string().nonempty({ message: "Username is required" }),
      email: z
        .string()
        .email({ message: "Invalid email address" })
        .nonempty({ message: "Email is required" }), // Ensuring email is required
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(8, {
          message: "Password must be at least 8 characters long",
        }),
      confirmPassword: z
        .string()
        .nonempty({ message: "Confirm Password is required" }),
      role: z.string().nonempty({ message: "Role is required" }), // Ensuring role is required
      checkpoint: z.number().nonnegative({ message: "Checkpoint is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"], // path of error
    });

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      checkpoint: undefined, // Checkpoint id for form submission
    },
    resolver: zodResolver(User), // Your validation
  });

  const handleMapClick = (checkpoint: number) => {
    setSelectedCheckpoint(checkpoint); // Set selected checkpoint
    form.setValue("checkpoint", Number(checkpoint) as any); // Set form field value with checkpoint id
  };

  const navigate = useNavigate();
  const onSubmit = async (value: RegisterProps) => {
    //@ts-ignore
    value.checkpointId = value.checkpoint;
    await register(value, navigate);
  };
  return (
    <Form {...form}>
      {form.formState.isSubmitting && <Overlay />}
      <div className="flex min-h-screen items-center justify-center bg-background  text-primary w-[90%] lg:w-[600px] mx-auto mt-[100px]">
        <form
          onSubmit={form.handleSubmit(onSubmit)} // Ensure onSubmit function exists
          className="w-full  space-y-4 p-6 border rounded-lg shadow-sm bg-card"
        >
          <h1 className="text-2xl font-semibold text-center">Register</h1>
          <div className="space-y-2">
            <Input
              form={form}
              label="Username"
              name="username"
              type="text"
              placeholder="Enter your username"
            />
          </div>
          <div className="space-y-2">
            <Input
              form={form}
              label="Email"
              name="email"
              type="text"
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Input
              form={form}
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="space-y-2">
            <Input
              form={form}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
            />
          </div>
          <div className="space-y-2">
            <SelectElement
              placeholder="Select your role"
              data={roles}
              form={form}
              name="role"
              label="Role"
            />
          </div>
          {/* Your other form fields here */}
          <div className="space-y-2">
            <label>Select your checkpoint</label>
            {isCheckPointsLoading && (
              <span className="ms-4 text-sm text-black opacity-75">
                ( Getting checkpoints )
              </span>
            )}
            <p className="text-red-500 text-sm">
              {form.formState.errors["checkpoint"]?.message}
            </p>
            <MapContainer
              center={[27.68895, 85.343984]} // Default center, change as needed
              zoom={13}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {checkpoints?.map((checkpoint) => {
                const position = [checkpoint.latitude, checkpoint.longitude];
                debugger;

                return (
                  <Marker
                    key={checkpoint.id}
                    position={[checkpoint.latitude, checkpoint.longitude]}
                    icon={
                      new Icon({
                        iconUrl:
                          selectedCheckpoint === checkpoint.id
                            ? "https://cdn-icons-png.flaticon.com/512/2554/2554978.png" // Selected marker style
                            : "https://cdn-icons-png.flaticon.com/256/691/691038.png", // Regular marker style
                        iconSize: [38, 38],
                        iconAnchor: [19, 38],
                      })
                    }
                    eventHandlers={{
                      click: () => handleMapClick(checkpoint.id), // Trigger on marker click
                    }}
                  >
                    <Popup>
                      {checkpoint.name} {/* Popup with checkpoint name */}
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline">
              Login
            </Link>
          </p>{" "}
        </form>
      </div>
    </Form>
  );
};

export default RegisterForm;
