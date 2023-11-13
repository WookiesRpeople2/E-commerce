"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signOut, useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AccountImageUpload } from "@/components/customUi/accountImageUpload";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { DefaultSession } from "next-auth";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const formSchema = z
  .object({
    email: z.string().min(1),
    image: z.string().min(1),
    password: z.string().optional(),
    confirm: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

type TypeOfFormSchema = z.infer<typeof formSchema>;

type AccountFormProps = {
  session: DefaultSession | null;
};

export const AccountForm: React.FC<AccountFormProps> = ({ session }) => {
  const form = useForm<TypeOfFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: session?.user?.email || undefined,
      image: session?.user?.image || undefined,
      password: "",
      confirm: "",
    },
  });
  const { update } = useSession();
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formValues: TypeOfFormSchema) => {
    try {
      setIsLoading(true);
      const res = await axios.patch(`/api/auth/account`, formValues);

      if (res.status === 200) {
        await update({
          ...session,
          user: {
            ...session?.user,
            image: formValues.image,
            email: formValues.email,
          },
        });
      }
      router.refresh();
      router.push(`/${params.storeId}`);
      toast.success("Account succsessfully updated");
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-center items-center flex-col space-y-4 py-2"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-80">
                <FormControl>
                  <AccountImageUpload
                    field={field.value}
                    onValueChange={(url) => field.onChange(url)}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-80">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormDescription>
                  This will change your email adresse
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-80">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem className="w-80">
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center space-x-4">
            <Button disabled={isLoading}>Submit</Button>
            <Button
              type="button"
              disabled={isLoading}
              onClick={() => signOut()}
              variant="outline"
            >
              Sign out
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};