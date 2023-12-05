"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Collection } from "@prisma/client";
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
import { AlerteModel } from "@/components/customUi/alerteModel";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  collectionsFormSchema,
  TypeOfCollectionsFormSchema,
} from "@/types/zodSchemas";

type CollectionAddEditFormProps = {
  data: Collection;
};

export const CollectionEditForm: React.FC<CollectionAddEditFormProps> = ({
  data,
}) => {
  const form = useForm<TypeOfCollectionsFormSchema>({
    resolver: zodResolver(collectionsFormSchema),
    defaultValues: {
      collectionName: data.collectionName,
      collectionImage: data.collectionImage,
    },
  });
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (formValue: TypeOfCollectionsFormSchema) => {
      try {
        setIsLoading(true);
        await axios.patch(
          `/api/stores/${params.storeId}/collections/${params.collectionId}`,
          formValue
        );
        router.refresh();
        router.push(`/${params.storeId}/collections`);
        toast.success("Collection Update");
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [params.collectionId, params.storeId]
  );

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      if (data) {
        await axios.delete(
          `/api/stores/${params.storeId}/collections/${params.collectionId}`
        );
      }
      router.refresh();
      router.push(`/${params.storeId}/collections`);
      toast.success("Collection Deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [params.collectionId, params.storeId]);

  return (
    <>
      <div className="px-4">
        <Heading title="Edit" discreption="Edit this collection" />
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
                    <Input {...field} />
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

            <div className="flex items-center space-x-4">
              <Button disabled={isLoading} type="submit">
                Submit
              </Button>
              <AlerteModel
                description="This will delete this collection, this action can not be undone, IMPORTANT: THIS ACTION WILL REMOVE THIS COLLECTION FROM THE ASOCIATED PRODUCTS"
                disabled={isLoading}
                onContinue={onDelete}
              >
                <Button variant="destructive" disabled={isLoading}>
                  Delete this collection
                </Button>
              </AlerteModel>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
