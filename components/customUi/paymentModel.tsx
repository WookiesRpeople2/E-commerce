"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ImagePreview } from "./imagePreview";

type PaymentModelProps = {
  productName?: string;
  productImages?: string[];
  price?: string;
  quantity?: string;
  address: string;
  phone: string;
  open: boolean;
  onOpenChange: () => void;
  onClose: () => void;
};

export const PaymentModel: React.FC<PaymentModelProps> = ({
  productName,
  productImages,
  price,
  quantity,
  address,
  phone,
  open,
  onOpenChange,
  onClose,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order information</DialogTitle>
          <DialogDescription>
            some more information on the order
          </DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <h1 className="text-sm text-muted-foreground">Product Name:</h1>
            <h2>{productName}</h2>
          </div>
          <div>
            <h1 className="text-sm text-muted-foreground">Price:</h1>
            <h2>{price}</h2>
          </div>

          {productImages && (
            <div>
              <h1 className="text-sm text-muted-foreground">Product Images:</h1>
              <div className="flex">
                {productImages.map((image, index) => (
                  <ImagePreview key={index} image={image} className="h-40" />
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-sm text-muted-foreground">Quantity ordered:</h1>
          <h2>{quantity}</h2>
        </div>
        <div>
          <h1 className="text-sm text-muted-foreground">
            Adress of where to be delivered:
          </h1>
          <h2>{address}</h2>
        </div>
        <div>
          <h1 className="text-sm text-muted-foreground">Phone Number:</h1>
          <h2>{phone}</h2>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
