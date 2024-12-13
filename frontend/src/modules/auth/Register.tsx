import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import SelectElement from "@/components/ui/select";

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

  // "VEHICLE_MANAGER",
  // "SCRAP_DEALER",
  // "REGULAR_USER",
  // "FUNDRAISER",
];
const RegisterForm = () => {
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
      checkpoint: z.string().nonempty({ message: "Checkpoint is required" }),
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
      checkpoint: "",
    },
    resolver: zodResolver(User),
  });

  const onSubmit = () => {
    console.log("Registering user...");
  };

  return (
    <Form {...form}>
      <div className="flex min-h-screen items-center justify-center bg-background -mt-16 text-primary">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-4 p-6 border rounded-lg shadow-sm bg-card"
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

          <div className="space-y-2">
            <SelectElement
              placeholder="Select your checkpoint"
              data={[
                {
                  label: "Checkpoint 1",
                  value: "checkpoint1",
                },
              ]}
              form={form}
              name="checkpoint"
              label="Checkpoint"
            />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default RegisterForm;
