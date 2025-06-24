"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductFilters, ProductFiltersProps } from "@/types/index";
import { getCategories } from "@/lib/api";

export function ProductFiltersComponent({
  filters,
  onFiltersChange,
  maxPrice,
}: ProductFiltersProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([
    filters.minPrice || 0,
    filters.maxPrice || maxPrice,
  ]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    setPriceRange([filters.minPrice || 0, filters.maxPrice || maxPrice]);
  }, [filters.minPrice, filters.maxPrice, maxPrice]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    onFiltersChange({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      onFiltersChange({ ...filters, category });
    } else {
      onFiltersChange({ ...filters, category: undefined });
    }
  };

  const clearFilters = () => {
    onFiltersChange({});
    setPriceRange([0, maxPrice]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium mb-3 block">Sort By</Label>
          <Select
            value={filters.sortBy || ""}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                sortBy: value as ProductFilters["sortBy"],
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Name A-Z</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-3 block">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </Label>
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            max={maxPrice}
            min={0}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <Label className="text-sm font-medium mb-3 block">Categories</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.category === category}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category, checked as boolean)
                  }
                />
                <Label
                  htmlFor={category}
                  className="text-sm font-normal capitalize cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={clearFilters} variant="outline" className="w-full">
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  );
}
