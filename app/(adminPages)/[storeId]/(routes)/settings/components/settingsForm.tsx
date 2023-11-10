"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlerteModel } from "@/components/customUi/alerteModel";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const formSchema = z.object({
  storeName: z.string().min(1),
});

type TypeOfFormSchema = z.infer<typeof formSchema>;

export const SettingsForm = () => {
  const form = useForm<TypeOfFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "",
    },
  });
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async (data: TypeOfFormSchema) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/stores/${params.storeId}/settings`, data);
      router.refresh();
      toast.success("Store name succsessfully update");
    } catch (error) {
      toast.error("an Error has occured");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/stores/${params.storeId}/settings`);
      router.refresh();
    } catch (error) {
      toast.error("an Error has occured");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem className="w-80">
                <FormLabel>Store Name:</FormLabel>
                <FormControl>
                  <Input
                    className="max-w-lg"
                    placeholder="shoe-store"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-4">
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
            <AlerteModel
              description="This will delete your store, This action can not be undone"
              disabled={isLoading}
              onContinue={onDelete}
            >
              <Button variant="destructive">
                <Trash className="w-4 h-4" />
              </Button>
            </AlerteModel>
          </div>
        </form>
      </Form>
    </>
  );
};
