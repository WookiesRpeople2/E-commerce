"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Product } from "@prisma/client";
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
import { useState } from "react";

const formSchema = z.object({
  productName: z.string().min(1),
  productImages: z.string().array().min(2),
  colors: z.string().array().min(1),
  sizes: z.string().array().min(1),
  price: z.string().min(1),
  diliveryPrice: z.string().min(1),
});

type TypeOfFormSchema = z.infer<typeof formSchema>;

type ProductsAddFormProps = {
  product: Product;
};

export const ProductsAddForm = () => {
  const form = useForm<TypeOfFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productImages: [""],
      colors: [""],
      sizes: [""],
      price: "",
      diliveryPrice: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: TypeOfFormSchema) => {};

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input placeholder="White tee-shirt" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productImages"
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

          <div>
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add a color</FormLabel>
                  <FormControl>
                    <Input placeholder="Blue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*color preview component*/}
          </div>

          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sizes</FormLabel>
                <FormControl>
                  <Input placeholder="xl, lg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price of the product</FormLabel>
                <FormControl>
                  <Input placeholder="102.99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="diliveryPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Price</FormLabel>
                <FormControl>
                  <Input placeholder="10.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
