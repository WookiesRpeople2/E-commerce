"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/customUi/heading";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { colorFormSchema, TypeOfColorFormSchema } from "@/types/zodSchemas";

export const CreateProductColorForm = () => {
  const form = useForm<TypeOfColorFormSchema>({
    resolver: zodResolver(colorFormSchema),
    defaultValues: {
      color: "",
    },
  });
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (formValue: TypeOfColorFormSchema) => {
      try {
        setIsLoading(true);
        await axios.post(`/api/stores/${params.storeId}/colors/`, {
          color: formValue.color,
        });
        toast.success("Color Created");

        router.refresh();
        router.push(`/${params.storeId}/colors`);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [params.colorId, params.storeId]
  );

  return (
    <>
      <div className="px-4">
        <Heading title="Create" discreption="Create a new color" />
      </div>
      <div className="flex justify-center items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Red" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
