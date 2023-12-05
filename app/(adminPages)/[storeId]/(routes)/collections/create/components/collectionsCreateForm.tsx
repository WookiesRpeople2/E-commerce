"use client";
import * as z from "zod";
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
import { UploadImage } from "@/components/customUi/uploadImage";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/customUi/heading";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  collectionsFormSchema,
  TypeOfCollectionsFormSchema,
} from "@/types/zodSchemas";

export const CollectionCreateForm = () => {
  const form = useForm<TypeOfCollectionsFormSchema>({
    resolver: zodResolver(collectionsFormSchema),
    defaultValues: {
      collectionName: "",
      collectionImage: "",
    },
  });
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (formValue: TypeOfCollectionsFormSchema) => {
      try {
        setIsLoading(true);
        await axios.post(
          `/api/stores/${params.storeId}/collections/`,
          formValue
        );
        router.refresh();
        router.push(`/${params.storeId}/collections`);
        toast.success("Collection Created");
      } catch (error: any) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [params.collectionId, params.storeId]
  );

  return (
    <>
      <div className="px-4">
        <Heading title="Create" discreption="Create a collection" />
      </div>
      <div className="flex justify-center items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="collectionName"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Special Edition" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="collectionImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload an image:</FormLabel>
                  <FormControl>
                    <UploadImage
                      field={field.value}
                      disabled={isLoading}
                      onValueChange={(url) => field.onChange(url)}
                      onRemoveValue={() => field.onChange("")}
                    />
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
