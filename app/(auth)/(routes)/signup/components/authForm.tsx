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
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import {
  sighnUpAndAccountFormSchema,
  TypeOfSighnUpAndAccountFormSchema,
} from "@/types/zodSchemas";

export const AuthForm = () => {
  const form = useForm<TypeOfSighnUpAndAccountFormSchema>({
    resolver: zodResolver(sighnUpAndAccountFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: TypeOfSighnUpAndAccountFormSchema) => {
    try {
      setIsLoading(true);
      const res = await axios.post("api/auth/signup", data);
      router.refresh();
      router.push(`/login`);
      toast.success("You have succsessfully signed up");
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignUp = async () => {
    const res = await signIn("google");
    if (res?.ok) {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col min-h-screen bg-gray-100 w-full dark:bg-slate-900 space-y-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white dark:bg-slate-700 p-4 md:p-16 rounded-md shadow-md w-5/6 md:w-1/2 lg:w-1/3 space-y-4"
        >
          <h1 className="text-center text-2xl dark:text-white">Sign up</h1>
          <Separator />
          <div className="flex justify-center items-center flex-col">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={googleSignUp}
              className="space-x-3 flex justify-center items-center"
            >
              <i className="devicon-google-plain" />
              <Separator orientation="vertical" />
              <span>Sign up with google</span>
            </Button>
          </div>
          <Separator />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Joe doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="joeDoe12@34" {...field} />
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
                <FormLabel>password</FormLabel>
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
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="mr-8 w-full dark:rounded-md"
            type="submit"
            disabled={isLoading}
          >
            Submit
          </Button>
          <div>
            <Link href={"/login"} className="text-blue-700 underline text-sm">
              Already have an account?
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};
