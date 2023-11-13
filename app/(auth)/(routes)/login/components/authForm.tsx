"use client";

import * as z from "zod";
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
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

type TypeOfFormSchema = z.infer<typeof formSchema>;

export const AuthForm = () => {
  const form = useForm<TypeOfFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: TypeOfFormSchema) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.ok !== true) {
        toast.error("Invalid creditails");
      } else {
        router.refresh();
        router.push("/");
        toast.success("You have succsessfully logged in");
      }
    } catch (error) {
      error instanceof Error
        ? toast.error(error.message)
        : toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="w-[650px] h-[500px] flex justify-center items-center bg-black text-white dark:bg-white dark:text-black">
        <Form {...form}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-1/2 space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="text-black"
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
                      className="text-black"
                      placeholder="Please enter your Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button className="mr-8" type="submit" disabled={isLoading}>
                Submit
              </Button>

              <Link
                href={"/signup"}
                className="text-blue-800 underline text-sm"
              >
                Dont have an account sign up
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </>
  );
};
