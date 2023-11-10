import ButtonSkelaton from "@/components/skelatons/buttonSkelaton";
import HeadingSkelaton from "@/components/skelatons/headingSkelaton";
import InputSkelaton from "@/components/skelatons/inputSkelaton";

export default function Loading() {
  return (
    <div className="px-4 py-4">
      <HeadingSkelaton />
      <div className="flex justify-center items-center">
        <div className="flex flex-col space-y-4">
          <InputSkelaton />
          <div className="flex items-center space-x-4">
            <ButtonSkelaton />
            <ButtonSkelaton />
          </div>
        </div>
      </div>

      <HeadingSkelaton />
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center space-x-4">
          <ButtonSkelaton />
          <ButtonSkelaton />
          <ButtonSkelaton />
        </div>
      </div>
    </div>
  );
}
