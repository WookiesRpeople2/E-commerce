import { Skeleton } from "@/components/ui/skeleton";

export default function InputSkelaton() {
  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="space-y-2">
        <Skeleton className="h-12 w-80 mb-11 lg:mb-0" />
      </div>
    </div>
  );
}
