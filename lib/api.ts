import type { Product } from "@/types"
import axios from "axios"

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await axios.get(`${API_BASE}/products`)

    if (!response) {
      throw new Error(`HTTP error! status: ${response}`)
    }

    return await response.data
  } catch (error) {
    console.error("Failed to fetch products:", error)
    throw new Error("Failed to fetch products")
  }
}

export async function getProduct(id: string): Promise<Product> {
  try {
    const response = await axios.get(`${API_BASE}/products/${id}`)

    if (!response) {
      throw new Error(`HTTP error! status: ${response}`)
    }

    return await response.data;
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error)
    throw new Error("Failed to fetch product")
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await axios.get(`${API_BASE}/products/categories`)

    if (!response) {
      throw new Error(`HTTP error! status: ${response}`)
    }

    return await response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    throw new Error("Failed to fetch categories")
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await axios.get(`${API_BASE}/products/category/${encodeURIComponent(category)}`)

    if (!response) {
      throw new Error(`HTTP error! status: ${response}`)
    }

    return await response.data;
  } catch (error) {
    console.error(`Failed to fetch products for category ${category}:`, error)
    throw new Error("Failed to fetch products by category")
  }
}