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
import { Heading } from "@/components/customUi/heading";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UploadImage } from "@/components/customUi/uploadImage";
import { Collection, Product, ProductColor, ProductSize } from "@prisma/client";
import { ColorsButton } from "@/components/customUi/colorsButton";
import { Combobox } from "@/components/customUi/combobox";
import { SizesButton } from "@/components/customUi/sizesButton";
import { FeaturedCheckBox } from "@/components/customUi/featuredCheckBox";

const formSchema = z.object({
  productName: z.string().min(1),
  productImages: z.array(z.string()).min(1),
  colors: z.array(z.string()).min(1),
  sizes: z.array(z.string()).min(1),
  featured: z.boolean().optional(),
  price: z.string().min(1),
  diliveryPrice: z.string().min(1),
  collectionName: z.string().optional().nullable(),
});

type TypeOfFormSchema = z.infer<typeof formSchema>;

type CreateProductFormProps = {
  product: Product | null;
  collections: Collection[] | null;
  colors: ProductColor[] | null;
  sizes: ProductSize[] | null;
};

export const ProductsEditForm: React.FC<CreateProductFormProps> = ({
  product,
  collections,
  colors,
  sizes,
}) => {
  const form = useForm<TypeOfFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: product?.productName,
      productImages: product?.productImages,
      colors: product?.colors,
      sizes: product?.sizes,
      featured: product?.featured,
      price: String(product?.price),
      diliveryPrice: String(product?.diliveryPrice),
      collectionName: product?.collectionName,
    },
  });
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const onSubmit = useCallback(
    async (formValue: TypeOfFormSchema) => {
      const collection = collections?.find(
        (collection) =>
          collection.collectionName.toLowerCase() === formValue.collectionName
      );
      try {
        setIsLoading(true);
        await axios.patch(
          `/api/stores/${params.storeId}/products/${params.productId}`,
          {
            ...formValue,
            price: Number(formValue.price),
            diliveryPrice: Number(formValue.diliveryPrice),
            collectionName: collection?.collectionName
              ? collection.collectionName
              : null,
          }
        );

        router.refresh();
        router.push(`/${params.storeId}/products`);
        toast.success("Product updated");
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [params.productId, params.storeId]
  );

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/stores/${params.storeId}/products/${params.productId}`
      );

      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success("Product Deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [params.productId, params.storeId]);

  return (
    <>
      <div className="px-4">
        <Heading title="Edit" discreption="Edit a new product" />
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                        btnTitle={"View collections"}
                        values={(collections as Collection[]).map(
                          (collection) => ({
                            name: collection.collectionName.toLowerCase(),
                            label: collection.collectionName,
                          })
                        )}
                        exsistingValue={field.value?.toLowerCase() as string}
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
              name="featured"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormControl>
                    <FeaturedCheckBox
                      check={field.value}
                      onCheckChange={field.onChange}
                    />
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
              <div className="flex justify-start space-x-4">
                <Button disabled={isLoading} type="submit">
                  Submit
                </Button>

                <Button
                  variant="destructive"
                  disabled={isLoading}
                  onClick={onDelete}
                >
                  Delete this product
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};