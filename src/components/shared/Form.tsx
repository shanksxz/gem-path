"use client"

import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { createUser } from "~/actions/db";

type FormPropsSignup = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormPropsSignin = Omit<FormPropsSignup, "name" | "confirmPassword">;

export default function Form({ type }: { type: "Signin" | "Signup" }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormPropsSignup | FormPropsSignin>();

  const onSubmit = async (data: FormPropsSignup | FormPropsSignin) => {
    if (type === "Signin") {
     await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
    }

    if ((data as FormPropsSignup).password !== (data as FormPropsSignup).confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      // handle signup by creating a new user
      const user = await createUser(data as FormPropsSignup);
      
      if(user) return user;

      return null;
    } catch (error) {
      throw new Error("Failed to create user");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        {type === "Signin" ? (
          <>
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground">Enter your email and password to sign in.</p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">Signup</h1>
            <p className="text-muted-foreground">Enter your details to get started.</p>
          </>
        )}
      </div>
      {type === "Signup" && (
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="John Doe" {...register("name", { required: true })} />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" {...register("email", { required: true })} />
        {errors.email && <p className="text-red-500">Email is required</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password", { required: true })} />
        {errors.password && <p className="text-red-500">Password is required</p>}
      </div>
      {type === "Signup" && (
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" type="password" {...register("confirmPassword", { required: true })} />
        </div>
      )}
      <Button type="submit" className="w-full">
        {type === "Signin" ? "Sign In" : "Create Account"}
      </Button>
      <Button variant="outline" className="w-full">
        <GoogleIcon className="mr-2 h-4 w-4" />
        Sign in with Google
      </Button>
    </form>
  );
}

function GoogleIcon(props: any) {
  return (
    <svg width="18" {...props} height="18" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
      <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
      <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" />
      <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
      <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
    </svg>
  );
}
