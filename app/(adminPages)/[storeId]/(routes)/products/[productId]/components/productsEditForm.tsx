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
  Product,
  ProductColor,
  ProductGroup,
  ProductSize,
} from "@prisma/client";
import { ColorsButton } from "@/components/customUi/colorsButton";
import { Combobox } from "@/components/customUi/combobox";
import { SizesButton } from "@/components/customUi/sizesButton";
import { AlerteModel } from "@/components/customUi/alerteModel";

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
  product: Product | null;
  collections: Collection[] | null;
  colors: ProductColor[] | null;
  sizes: ProductSize[] | null;
  groupes: ProductGroup[] | null;
};

export const ProductsEditForm: React.FC<CreateProductFormProps> = ({
  product,
  collections,
  colors,
  sizes,
  groupes,
}) => {
  const form = useForm<TypeOfFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...product,
      price: String(product?.price),
      diliveryPrice: String(product?.diliveryPrice),
      quantity: String(product?.quantity),
      colorId: product?.colorId,

      groupe: groupes?.find((groupe) => groupe.id === product?.groupeId)
        ?.groupe,

      collectionName: collections?.find(
        (collection) => collection.id === product?.collectionId
      )?.collectionName,
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
      )?.id;

      const groupeId = groupes?.find(
        (groupe) => groupe.groupe.toLowerCase() === formValue.groupe
      )?.id;

      try {
        setIsLoading(true);
        await axios.patch(
          `/api/stores/${params.storeId}/products/${params.productId}`,
          {
            ...formValue,
            price: Number(formValue.price),
            diliveryPrice: Number(formValue.diliveryPrice),
            quantity: Number(formValue.quantity),
            groupeId: groupeId ? groupeId : product?.groupeId,
            collectionId: collection ? collection : null,
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
            className="flex flex-col lg:flex-row justify-center items-start lg:grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-5"
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
                  <FormDescription>
                    If you do not select a collection this product will be
                    placed on the home page of the store, you can edit the
                    product to be on the homestore by de-selecting the selection
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
                  <FormLabel>Add a Groupe</FormLabel>
                  <FormControl>
                    <div>
                      <Combobox
                        btnTitle="View Groupes"
                        values={(groupes as ProductGroup[]).map((groupe) => ({
                          name: groupe.groupe.toLowerCase(),
                          label: groupe.groupe,
                        }))}
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
              <div className="flex justify-start space-x-4">
                <Button disabled={isLoading} type="submit">
                  Submit
                </Button>

                <AlerteModel
                  description="This will delete this product, this action can not be undone"
                  disabled={isLoading}
                  onContinue={onDelete}
                >
                  <Button variant="destructive" disabled={isLoading}>
                    Delete this product
                  </Button>
                </AlerteModel>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
