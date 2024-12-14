import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { login, LoginProps } from "@/lib/utils";
import Overlay from "@/components/Overlay";
const LoginForm = () => {
  const User = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, {
        message: "Password must be at least 8 characters long",
      }),
  });

  const nav = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(User),
  });

  const onSubmit = async (value: LoginProps) => {
    await login(value);
    nav("/");
  };

  return (
    <Form {...form}>
      {form.formState.isSubmitting && <Overlay />}
      <div className="flex min-h-screen items-center justify-center bg-background -mt-16  text-primary">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-4 p-6 border rounded-lg shadow-sm bg-card"
        >
          <h1 className="text-2xl font-semibold text-center">Login</h1>
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
          <Button type="submit" className="w-full">
            Login
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default LoginForm;
