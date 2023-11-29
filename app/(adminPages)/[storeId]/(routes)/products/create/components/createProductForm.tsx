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

const formSchema = z.object({
  productName: z
    .string()
    .min(1, { message: "Must be longer than one character" }),
  productImages: z
    .array(z.string())
    .min(2, { message: "Must have at least 2 photos" }),
  colorId: z.string().min(1, { message: "Must have one color selected" }),
  sizeId: z.string().min(1, { message: "Must have one size selected" }),
  price: z.string().min(1, { message: "Must be longer than one character" }),
  diliveryPrice: z
    .string()
    .min(1, { message: "Must be longer than one character" }),
  quantity: z.string().min(1, { message: "Must be longer than one character" }),
  groupe: z.string().min(1, { message: "Must have a groupe selected" }),
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
      colorId: "",
      sizeId: "",
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
      const collectionId = collections?.find(
        (collection) =>
          collection.collectionName.toLowerCase() === formValue.collectionName
      )?.id;

      const groupeId = groupes?.find(
        (groupe) => groupe.groupe.toLowerCase() === formValue.groupe
      )?.id;

      try {
        setIsLoading(true);
        await axios.post(`/api/stores/${params.storeId}/products`, {
          ...formValue,
          price: Number(formValue.price),
          diliveryPrice: Number(formValue.diliveryPrice),
          quantity: Number(formValue.quantity),
          groupeId,
          collectionId,
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
    [params.productId]
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
            className="flex flex-col lg:flex-row justify-center items-start lg:grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-5"
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
              name="colorId"
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
              name="sizeId"
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
                  <FormLabel>Delivery price</FormLabel>
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
              name="productImages"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Upload an image:</FormLabel>
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
