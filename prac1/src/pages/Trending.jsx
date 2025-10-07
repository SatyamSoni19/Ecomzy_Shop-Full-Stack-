import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import ProductGrid from '../components/ProductGrid';

const Trending = () => {

  const { products, loading } = useContext(AppContext);
  const evenProducts = products.filter((_, i) => i % 2 !== 0);

  return (
    <ProductGrid loading={loading} products={evenProducts} />
  )

}

export default Trending