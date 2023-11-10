import DataTableSkelaton from "@/components/skelatons/dataTableSkelaton";
import HeadingSkelaton from "@/components/skelatons/headingSkelaton";

export default function Loading() {
  return (
    <div className="px-4 mt-4">
      <div>
        <HeadingSkelaton />
      </div>
      <DataTableSkelaton />
    </div>
  );
}
