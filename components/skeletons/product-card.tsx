import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardSkeletonProps {
  viewMode?: "grid" | "list";
}

export const ProductCardSkeleton = ({
  viewMode = "grid",
}: ProductCardSkeletonProps) => {
  return (
    <Card
      className={`animate-pulse border-0 shadow-md ${
        viewMode === "grid" ? "h-[468px]" : "h-[698px]"
      } flex flex-col`}
    >
      <div className="relative aspect-square bg-gray-200 rounded-t-lg"></div>
      <CardContent className="p-2 pt-0 flex-1 flex flex-col">
        <div className="h-4 bg-gray-200 rounded mb-1 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mb-3 w-1/2"></div>
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-3 w-3 bg-gray-200 rounded-full"></div>
          ))}
          <div className="h-3 w-8 bg-gray-200 rounded"></div>
        </div>
        <div className="mt-0">
          <div className="h-5 w-16 bg-gray-200 rounded"></div>
        </div>
      </CardContent>
      <CardFooter className="pr-2 pl-2 pt-0 pb-0 mt-0 mb-0">
        <div className="w-full h-8 bg-gray-200 rounded"></div>
      </CardFooter>
    </Card>
  );
};
