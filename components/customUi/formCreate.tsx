"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@/components/customUi/heading";
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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { createFormchema, TypeOfCreateFormchema } from "@/types/zodSchemas";

export const FormCreate = () => {
  const form = useForm<TypeOfCreateFormchema>({
    resolver: zodResolver(createFormchema),
    defaultValues: {
      storeName: "",
    },
  });

  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);

  const onSubmit = async (data: TypeOfCreateFormchema) => {
    try {
      setIsloading(true);
      const response = await axios.post("/api/stores/", data);
      router.refresh();
      router.push(`/${response.data.id}`);
      toast.success("Thank you for creating a store");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <Heading title="Create" discreption="Create a new store" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-xl"
        >
          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of your store</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="shoe-store" {...field} />
                </FormControl>
                <FormDescription>
                  This will be your store name, it can be changed
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="secondary" disabled={isLoading}>
            Create your new store
          </Button>
        </form>
      </Form>
      <Separator className="mt-5" />
    </>
  );
};
