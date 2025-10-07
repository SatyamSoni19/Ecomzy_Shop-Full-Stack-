// ProductGrid.jsx
import React from "react";
import Spinner from "./Spinner";
import Products from "./Products";

const ProductGrid = ({ loading, products }) => {
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : products.length > 0 ? (
        <div className="grid xs:gridcols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
          {products.map((product) => (
            <Products key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div>No Post Found</div>
      )}
    </div>
  );
};

export default ProductGrid;