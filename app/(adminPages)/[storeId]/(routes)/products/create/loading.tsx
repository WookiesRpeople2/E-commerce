import ButtonSkelaton from "@/components/skelatons/buttonSkelaton";
import HeadingSkelaton from "@/components/skelatons/headingSkelaton";
import InputSkelaton from "@/components/skelatons/inputSkelaton";

export default function Loading() {
  return (
    <div className="px-4 py-4 mb-10">
      <HeadingSkelaton />
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputSkelaton />
          <InputSkelaton />
          <InputSkelaton />
          <InputSkelaton />
          <InputSkelaton />
          <InputSkelaton />
          <InputSkelaton />
          <InputSkelaton />
          <ButtonSkelaton />
          <ButtonSkelaton />
        </div>
      </div>
    </div>
  );
}
