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
import { UploadImage } from "@/components/customUi/uploadImage";
import {
  Collection,
  ProductColor,
  ProductGroup,
  ProductSize,
} from "@prisma/client";
import { ColorsButton } from "@/components/customUi/colorsButton";
import { Combobox } from "@/components/customUi/combobox";
import { SizesButton } from "@/components/customUi/sizesButton";
import { Groupes } from "../../../groupes/components/columns";

const formSchema = z.object({
  productName: z.string().min(1),
  productImages: z.array(z.string()).min(1),
  colors: z.string().min(1),
  sizes: z.string().min(1),
  price: z.string().min(1),
  diliveryPrice: z.string().min(1),
  quantity: z.string().min(1),
  groupe: z.string().min(1),
  collectionName: z.string().optional().nullable(),
});

type TypeOfFormSchema = z.infer<typeof formSchema>;

type CreateProductFormProps = {
  collections: Collection[] | null;
  colors: ProductColor[] | null;
  sizes: ProductSize[] | null;
  groupes: ProductGroup[] | null;
};

export const CreateProductForm: React.FC<CreateProductFormProps> = ({
  collections,
  colors,
  sizes,
  groupes,
}) => {
  const form = useForm<TypeOfFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productImages: [],
      colors: "",
      sizes: "",
      price: "",
      diliveryPrice: "",
      quantity: "",
      groupe: "",
      collectionName: "",
    },
  });
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (formValue: TypeOfFormSchema) => {
      const collection = collections?.find(
        (collection) =>
          collection.collectionName.toLowerCase() === formValue.collectionName
      );
      try {
        setIsLoading(true);
        await axios.post(`/api/stores/${params.storeId}/products`, {
          ...formValue,
          price: Number(formValue.price),
          diliveryPrice: Number(formValue.diliveryPrice),
          quantity: Number(formValue.quantity),
          collectionName: collection?.collectionName,
        });

        router.refresh();
        router.push(`/${params.storeId}/products`);
        toast.success("Product created");
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [params.productId, params.storeId]
  );

  return (
    <>
      <div className="px-4">
        <Heading title="Create" discreption="Create a new product" />
      </div>
      <div className="flex justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jordons" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <ColorsButton
                      colorNames={colors}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Size:</FormLabel>
                  <FormControl>
                    <SizesButton
                      sizes={sizes}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="122.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="diliveryPrice"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="collectionName"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Collection(optional)</FormLabel>
                  <FormControl>
                    <div>
                      <Combobox
                        btnTitle="View collections"
                        values={(collections as Collection[]).map(
                          (collection) => ({
                            name: collection.collectionName.toLowerCase(),
                            label: collection.collectionName,
                          })
                        )}
                        onChange={(value) => field.onChange(value)}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    If you do not select a collection this product will be
                    placed on the home page of the store
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productImages"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormControl>
                    <UploadImage
                      fieldArray={field.value}
                      disabled={isLoading}
                      onValueChange={(url) =>
                        field.onChange([...field.value, url])
                      }
                      onRemoveValue={() => field.onChange([])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="groupe"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Add a groupe</FormLabel>
                  <FormControl>
                    <div>
                      <Combobox
                        btnTitle="View Groupes"
                        values={(groupes as ProductGroup[]).map(
                          (collection) => ({
                            name: collection.groupe.toLowerCase(),
                            label: collection.groupe,
                          })
                        )}
                        onChange={(value) => field.onChange(value)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-3">
              <div className="flex justify-start">
                <Button disabled={isLoading} type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
