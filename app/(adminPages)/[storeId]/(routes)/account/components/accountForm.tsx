"use client";

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
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { DefaultSession } from "next-auth";
import { Heading } from "@/components/customUi/heading";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
  sighnUpAndAccountFormSchema,
  TypeOfSighnUpAndAccountFormSchema,
} from "@/types/zodSchemas";

type AccountFormProps = {
  session: DefaultSession | null;
};

export const AccountForm: React.FC<AccountFormProps> = ({ session }) => {
  const form = useForm<TypeOfSighnUpAndAccountFormSchema>({
    resolver: zodResolver(sighnUpAndAccountFormSchema),
    defaultValues: {
      name: session?.user?.name || undefined,
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

  const onSubmit = useCallback(
    async (formValues: TypeOfSighnUpAndAccountFormSchema) => {
      try {
        setIsLoading(true);
        const res = await axios.patch(`/api/auth/account`, formValues);

        if (res.status === 200) {
          await update({
            ...session,
            user: {
              ...session?.user,
              ...formValues,
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
      console.log("rerendered");
    },
    [session]
  );

  return (
    <div>
      <div className="px-4">
        <Heading title="Account" discreption="Edit your account" />
      </div>
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
            name="name"
            render={({ field }) => (
              <FormItem className="w-80">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
