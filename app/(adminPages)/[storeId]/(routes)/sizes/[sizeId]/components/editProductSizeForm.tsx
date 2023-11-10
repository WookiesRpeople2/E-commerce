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

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/customUi/Heading";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AlerteModel } from "@/components/customUi/alerteModel";
import { ProductSize } from "@prisma/client";

const formSchema = z.object({
  size: z.string().min(1),
});

type EditProductSizeFormProps = {
  data: ProductSize;
};

type TypeOfFormSchema = z.infer<typeof formSchema>;

export const EditProductSizeForm: React.FC<EditProductSizeFormProps> = ({
  data,
}) => {
  const form = useForm<TypeOfFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      size: data.size,
    },
  });
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async (formValue: TypeOfFormSchema) => {
    try {
      setIsLoading(true);
      await axios.patch(
        `/api/stores/${params.storeId}/sizes/${params.sizeId}`,
        formValue
      );
      toast.success("Size Updated");

      router.refresh();
      router.push(`/${params.storeId}/sizes`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/stores/${params.storeId}/sizes/${params.sizeId}`
      );

      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success("Size Deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <div className="px-4">
        <Heading title="Edit" discreption="edit a size" />
      </div>
      <div className="flex justify-center items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="size"
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
            <div className="flex items-center space-x-4">
              <Button disabled={isLoading} type="submit">
                Submit
              </Button>
              <AlerteModel
                description="This will deltete this size"
                disabled={isLoading}
                onContinue={onDelete}
              >
                <Button variant="destructive" disabled={isLoading}>
                  Delete this size
                </Button>
              </AlerteModel>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
