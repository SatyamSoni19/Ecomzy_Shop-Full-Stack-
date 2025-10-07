import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Spinner from '../components/Spinner.jsx';
import Products from '../components/Products.jsx';

const Home = () => {
  const { loading, products } = useContext(AppContext);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : products.length > 0 ? (
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto gap-6 min-h-[80vh]">
          {products.map((product) => (
            <Products key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-lg font-semibold mt-10">
          No Products Found
        </div>
      )}
    </div>
  );
};

export default Home;