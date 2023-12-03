"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Color from "color";

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
import { AlerteModel } from "@/components/customUi/alerteModel";
import { ProductColor } from "@prisma/client";

const formSchema = z.object({
  color: z
    .string()
    .min(1)
    .refine(
      (value) => {
        try {
          Color(value.toLowerCase());
          return true;
        } catch (error) {
          return false;
        }
      },
      {
        message: "This is not a valid color",
      }
    ),
});

type EditProductColorFormProps = {
  data: ProductColor;
};

type TypeOfFormSchema = z.infer<typeof formSchema>;

export const EditProductColorForm: React.FC<EditProductColorFormProps> = ({
  data,
}) => {
  const form = useForm<TypeOfFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: data.color,
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
          `/api/stores/${params.storeId}/colors/${params.colorId}`,
          {
            color: formValue.color,
          }
        );
        toast.success("Color Updated");

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

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/stores/${params.storeId}/colors/${params.colorId}`
      );

      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success("Color Deleted");
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }, [params.colorId, params.storeId]);

  return (
    <>
      <div className="px-4">
        <Heading title="Edit" discreption="edit a  color" />
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
            <div className="flex items-center space-x-4">
              <Button disabled={isLoading} type="submit">
                Submit
              </Button>
              <AlerteModel
                description="This will deltete this color"
                disabled={isLoading}
                onContinue={onDelete}
              >
                <Button variant="destructive" disabled={isLoading}>
                  Delete this color
                </Button>
              </AlerteModel>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
