import { getProduct, getProducts } from "@/lib/api";
import { ProductDetails } from "./product-details";
import { notFound } from "next/navigation";
import { ProductPageProps } from "@/types";

export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const { id } = await params;
    const product = await getProduct(id);
    return <ProductDetails product={product} />;
  } catch {
    notFound();
  }
}
