import * as z from "zod";
import Color from "color";

const sighnUpAndAccountFormSchema = z
  .object({
    name: z.string().min(1, { message: "Must be longer than one character" }),
    email: z.string().min(1, { message: "Must be longer than one character" }),
    image: z.string().min(1, { message: "Must Have an image selected" }),
    password: z.string().optional(),
    confirm: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

export type TypeOfSighnUpAndAccountFormSchema = z.infer<
  typeof sighnUpAndAccountFormSchema
>;

const loginFormSchema = z.object({
  email: z.string().min(1, { message: "Must be longer than one character" }),
  password: z.string().min(1, { message: "Must be longer than one character" }),
});

type TypeOfLoginFormSchema = z.infer<typeof loginFormSchema>;

const collectionsFormSchema = z.object({
  collectionName: z
    .string()
    .min(1, { message: "Must be longer than one character" }),
  collectionImage: z
    .string()
    .min(1, { message: "Must have one photo selected" }),
});

export type TypeCollectionsFormSchema = z.infer<typeof collectionsFormSchema>;

const colorFormSchema = z.object({
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

export type TypeOfColorFormSchema = z.infer<typeof colorFormSchema>;

const groupeFormSchema = z.object({
  groupe: z.string().min(1, { message: "Must be longer than one character" }),
});

export type TypeOfGroupeFormSchema = z.infer<typeof groupeFormSchema>;

const createFormchema = z.object({
  storeName: z
    .string()
    .min(1, { message: "Must be longer than one character" }),
});

export type TypeOfCreateFormchema = z.infer<typeof createFormchema>;

const productsFormSchema = z.object({
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

export type TypeOfProductsFormSchema = z.infer<typeof productsFormSchema>;

const settingsFormSchema = z.object({
  storeName: z
    .string()
    .min(1, { message: "Must be longer than one character" }),
});

export type TypeOfSettingsFormSchema = z.infer<typeof settingsFormSchema>;

const sizeFormSchema = z.object({
  size: z.string().min(1, { message: "Must be longer than one character" }),
});

export type TypeOfSizeFormSchema = z.infer<typeof sizeFormSchema>;
