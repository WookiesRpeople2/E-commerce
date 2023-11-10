import { setTimeout } from "timers/promises";
import { CreateProductColorForm } from "./components/CreateProductColorForm";

export default async function ColorsCreatePage() {
  return (
    <>
      <CreateProductColorForm />
    </>
  );
}
