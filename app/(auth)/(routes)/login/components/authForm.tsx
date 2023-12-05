"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { loginFormSchema, TypeOfLoginFormSchema } from "@/types/zodSchemas";

export const AuthForm = () => {
  const form = useForm<TypeOfLoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: TypeOfLoginFormSchema) => {
    setIsLoading(true);
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (res?.ok) {
      router.refresh();
      router.push("/");
      toast.success("You have succsessfully logged in");
      setIsLoading(false);
    } else {
      toast.error(res?.error as string);
      setIsLoading(false);
    }
  };

  const googleLogIn = async () => {
    const res = await signIn("google");
    if (res?.ok) {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col min-h-screen bg-gray-100 w-full dark:bg-slate-900 space-y-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white dark:bg-slate-700 p-4 md:p-16 rounded-md shadow-md w-5/6 md:w-1/2 lg:w-1/3 space-y-4"
          >
            <h1 className="text-center text-2xl dark:text-white">Login</h1>
            <Separator />
            <div className="flex justify-center items-center flex-col">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={googleLogIn}
                className="space-x-3 flex justify-center items-center"
              >
                <i className="devicon-google-plain" />
                <Separator orientation="vertical" />
                <span>Login with google</span>
              </Button>
            </div>
            <Separator />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Please enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Please enter your Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              Submit
            </Button>
            <div>
              <Link
                href={"/signup"}
                className="text-blue-700 underline text-sm"
              >
                Dont have an account yet?
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
