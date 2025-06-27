import { ProductCardSkeleton } from "./product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Grid, List } from "lucide-react";

export const ProductsPageSkeleton = () => {
  return (
    <div className="min-h-screen animate-pulse">
      <section className="w-full px-4 py-1">
        <div className="mb-2">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-1">
            <div>
              <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                disabled
                className="pl-10 pr-10 w-full text-sm sm:text-base bg-gray-200"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="h-4 bg-gray-200 rounded w-40"></div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button
                  disabled
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 sm:h-8 sm:w-8 p-0 bg-gray-200"
                >
                  <Grid className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  disabled
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 sm:h-8 sm:w-8 p-0 bg-gray-200"
                >
                  <List className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              <Button
                disabled
                variant="outline"
                size="sm"
                className="lg:hidden text-xs sm:text-sm bg-gray-200"
              >
                <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                ))}
              </div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} viewMode="grid" />
              ))}
            </div>
            <div className="flex justify-center items-center gap-2 mt-12">
              <div className="h-8 bg-gray-200 rounded w-20"></div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-8 w-10 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
