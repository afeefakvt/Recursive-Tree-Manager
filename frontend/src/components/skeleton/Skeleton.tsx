import { Skeleton } from "../ui/skeleton";
export default function SkeletonNode() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-48" />
    </div>
  );
}
