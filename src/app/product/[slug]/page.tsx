import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/utils";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import ProductDetails from "./product-details";
export const revalidate = 300;
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(
      `/signin?callbackURL=${encodeURIComponent(`/product/${(await params).slug}`)}&reason=auth-required`,
    );
  }
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  return <ProductDetails product={product} />;
}
