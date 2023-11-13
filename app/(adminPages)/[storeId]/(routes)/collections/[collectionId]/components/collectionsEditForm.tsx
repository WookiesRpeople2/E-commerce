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

const formSchema = z.object({
  collectionName: z.string().min(1),
  collectionImage: z.string().min(1),
});

type TypeOfFormSchema = z.infer<typeof formSchema>;

type CollectionAddEditFormProps = {
  data: Collection;
};

export const CollectionEditForm: React.FC<CollectionAddEditFormProps> = ({
  data,
}) => {
  const form = useForm<TypeOfFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collectionName: data.collectionName,
      collectionImage: data.collectionImage,
    },
  });
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (formValue: TypeOfFormSchema) => {
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
        <Heading title="Edit" discreption="Edit a collection" />
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
                description="This will deltete this billboard, this action can not be undone, IMPORTANT: THIS ACTION WILL ALSO DELETE ANY PRODUCTS FROM THIS COLLECTION"
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
