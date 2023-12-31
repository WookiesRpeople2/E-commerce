"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/customUi/heading";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { groupeFormSchema, TypeOfGroupeFormSchema } from "@/types/zodSchemas";

export const GroupeCreateForm = () => {
  const form = useForm<TypeOfGroupeFormSchema>({
    resolver: zodResolver(groupeFormSchema),
    defaultValues: {
      groupe: "",
    },
  });
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (formValue: TypeOfGroupeFormSchema) => {
      try {
        setIsLoading(true);
        await axios.post(`/api/stores/${params.storeId}/groupes/`, formValue);
        router.refresh();
        router.push(`/${params.storeId}/groupes`);
        toast.success("Groupe Created");
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [params.collectionId, params.storeId]
  );

  return (
    <>
      <div className="px-4">
        <Heading title="Create" discreption="Create a Groupe" />
      </div>
      <div className="flex justify-center items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="groupe"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jordons" {...field} />
                  </FormControl>
                  <FormDescription>
                    By making a new groupe you will have ways to link products
                    together. like a red and white pair of shoes that are the
                    same make and model but that are just in a differnt color
                  </FormDescription>
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
