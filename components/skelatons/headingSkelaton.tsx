import { Skeleton } from "@/components/ui/skeleton";

export default function HeadingSkelaton() {
  return (
    <div className="flex items-center justify-start space-x-4">
      <div className="space-y-2">
        <Skeleton className="h-12 w-[250px]" />
        <Skeleton className="h-9 w-[200px]" />
      </div>
    </div>
  );
}
