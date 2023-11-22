"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Collection, ProductGroup } from "@prisma/client";
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
import { AlerteModel } from "@/components/customUi/alerteModel";
import axios from "axios";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  groupe: z.string().min(1, { message: "Must be longer than one character" }),
});

type TypeOfFormSchema = z.infer<typeof formSchema>;

type GroupeEditFormProps = {
  data: ProductGroup | null;
};

export const GroupeEditForm: React.FC<GroupeEditFormProps> = ({ data }) => {
  const form = useForm<TypeOfFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupe: data?.groupe,
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
          `/api/stores/${params.storeId}/groupes/${params.groupeId}`,
          formValue
        );
        router.refresh();
        router.push(`/${params.storeId}/groupes`);
        toast.success("Groupe Update");
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
          `/api/stores/${params.storeId}/groupes/${params.groupeId}`
        );
      }
      router.refresh();
      router.push(`/${params.storeId}/groupes`);
      toast.success("Groupe Deleted");
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }, [params.collectionId, params.storeId]);

  return (
    <>
      <div className="px-4">
        <Heading title="Edit" discreption="Edit a groupe" />
      </div>
      <div className="flex justify-center items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="groupe"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Groupe-Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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

            <div className="flex items-center space-x-4">
              <Button disabled={isLoading} type="submit">
                Submit
              </Button>
              <AlerteModel
                description="This will deltete this Groupe, this action can not be undone"
                disabled={isLoading}
                onContinue={onDelete}
              >
                <Button
                  variant="destructive"
                  disabled={isLoading}
                  type="button"
                >
                  Delete this Groupe
                </Button>
              </AlerteModel>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
