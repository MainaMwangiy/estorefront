"use client";

import type React from "react";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import type { Product, ProductFilters } from "@/types";
import { getProducts } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Grid, List } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSearchParams } from "next/navigation";
import { FadeIn } from "@/components/animations/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";
import { ProductFiltersComponent } from "@/components/products/filters";
import { ProductCard } from "@/components/products/card";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const searchParams = useSearchParams();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const searchFromUrl = searchParams?.get("search");
    const categoryFromUrl = searchParams?.get("category");

    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
      setFilters((prev) => ({ ...prev, search: searchFromUrl }));
    }

    if (categoryFromUrl) {
      setFilters((prev) => ({ ...prev, category: categoryFromUrl }));
    }
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => {
        setProducts(data);
        setDisplayedProducts(data.slice(0, itemsPerPage));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const maxPrice = useMemo(() => {
    return Math.max(...products.map((p) => p.price), 0);
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          (product.description?.toLowerCase().includes(query) ?? false) ||
          (product.category?.toLowerCase().includes(query) ?? false)
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(
        (product) => product.price >= filters.minPrice!
      );
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(
        (product) => product.price <= filters.maxPrice!
      );
    }

    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "rating":
            return (b.rating?.rate || 0) - (a.rating?.rate || 0);
          case "title":
            return a.title.localeCompare(b.title);
          case "newest":
            return b.id - a.id;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [products, filters]);

  useEffect(() => {
    if (viewMode === "list") {
      setDisplayedProducts(
        filteredProducts.slice(0, currentPage * itemsPerPage)
      );
    } else {
      setDisplayedProducts(
        filteredProducts.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
    }
  }, [filteredProducts, currentPage, viewMode, itemsPerPage]);

  const loadMoreProducts = useCallback(() => {
    if (isLoadingMore || viewMode !== "list") return;
    if (displayedProducts.length >= filteredProducts.length) {
      if (loadMoreRef.current && observerRef.current) {
        observerRef.current.unobserve(loadMoreRef.current);
      }
      return;
    }

    setIsLoadingMore(true);
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      setIsLoadingMore(false);
    }, 500);
  }, [
    isLoadingMore,
    viewMode,
    displayedProducts.length,
    filteredProducts.length,
  ]);

  useEffect(() => {
    if (viewMode !== "list") {
      if (observerRef.current && loadMoreRef.current) {
        observerRef.current.unobserve(loadMoreRef.current);
      }
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current && observerRef.current) {
        observerRef.current.unobserve(loadMoreRef.current);
      }
    };
  }, [viewMode, isLoadingMore, loadMoreProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, search: searchQuery }));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="w-full px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-2/3 mb-2"></div>
                <div className="bg-gray-200 h-8 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Products Section */}
      <section className="w-full px-4 py-8">
        <FadeIn>
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">
                  Our Products
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {filteredProducts.length} products found
                </p>
              </div>
              <form
                onSubmit={handleSearch}
                className="flex-1 max-w-md w-full sm:w-auto"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-10 w-full text-sm sm:text-base transition-all duration-200 focus:ring-2 focus:ring-blue-600/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Showing {displayedProducts.length} of {filteredProducts.length}{" "}
                products
              </span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                  >
                    <Grid className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                  >
                    <List className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="lg:hidden text-xs sm:text-sm"
                    >
                      <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-64 sm:w-80">
                    <ProductFiltersComponent
                      filters={filters}
                      onFiltersChange={setFilters}
                      maxPrice={maxPrice}
                    />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FadeIn delay={0.2}>
              <ProductFiltersComponent
                filters={filters}
                onFiltersChange={setFilters}
                maxPrice={maxPrice}
              />
            </FadeIn>
          </aside>

          <div className="flex-1">
            {displayedProducts.length === 0 ? (
              <FadeIn>
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg mb-4">
                    No products found matching your criteria.
                  </p>
                  <Button onClick={() => setFilters({})} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              </FadeIn>
            ) : (
              <>
                <StaggerContainer
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "grid-cols-1"
                  }`}
                >
                  {displayedProducts.map((product) => (
                    <StaggerItem key={product.id}>
                      <ProductCard product={product} index={0} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                {viewMode === "grid" && totalPages > 1 && (
                  <FadeIn delay={0.5}>
                    <div className="flex justify-center items-center gap-2 mt-12">
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <div className="flex gap-1">
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            const page = i + 1;
                            return (
                              <Button
                                key={page}
                                variant={
                                  currentPage === page ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => handlePageChange(page)}
                                className="w-10"
                              >
                                {page}
                              </Button>
                            );
                          }
                        )}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </FadeIn>
                )}
                {viewMode === "list" &&
                  displayedProducts.length < filteredProducts.length && (
                    <div
                      ref={loadMoreRef}
                      className="h-10 flex justify-center items-center"
                    >
                      {isLoadingMore && (
                        <div className="text-muted-foreground">Loading...</div>
                      )}
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
