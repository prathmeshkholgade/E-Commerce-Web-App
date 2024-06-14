import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../features/product/productDataSlice";
import ProductCard from "./ProductCard";

export default function ProductCardCantainer() {
  const Products = useSelector((state) => state.Products.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);
  return (
    <div className="flex flex-wrap gap-10 mt-4 justify-center  w-full">
      {Products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
