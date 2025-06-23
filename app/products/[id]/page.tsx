import { getProduct, getProducts } from "@/lib/api"
import { ProductDetails } from "./product-details"
// import { generateProductMetadata } from "@/lib/seo"
// import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  try {
    const products = await getProducts()
    return products.slice(0, 20).map((product) => ({
      id: product.id.toString(),
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

// export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
//   try {
//     const { id } = await params
//     const product = await getProduct(Number.parseInt(id))
//     return generateProductMetadata(product)
//   } catch {
//     return {
//       title: "Product Not Found - EliteStore",
//       description: "The requested product could not be found.",
//     }
//   }
// }

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const { id } = await params
    const product = await getProduct(Number.parseInt(id))
    return <ProductDetails product={product} />
  } catch {
    notFound()
  }
}
