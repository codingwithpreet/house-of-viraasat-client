import { useParams } from "react-router-dom";
import ProductListingPage from "./ProductListingPage";

export default function CategoryPage() {
  const { slug } = useParams();
  console.log("category slug loaded:", slug);

  // Reuses the full ProductListingPage which automatically reads category filter or category slug
  return <ProductListingPage />;
}
