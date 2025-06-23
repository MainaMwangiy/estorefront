import type { Product } from "@/types"
import axios from "axios"

const API_BASE = "https://fakestoreapi.com"

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

export async function getProduct(id: number): Promise<Product> {
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