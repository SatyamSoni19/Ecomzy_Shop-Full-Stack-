import { useContext } from "react";
import ProductGrid from "../components/ProductGrid";
import { AppContext } from "../context/AppContext";

const MostWanted = () => {

  const {products, loading} = useContext(AppContext);
  const evenProducts = products.filter((_, i) => i % 2 === 0);

  return (
  <ProductGrid loading={loading} products={evenProducts} />
  )  
 
}

export default MostWanted