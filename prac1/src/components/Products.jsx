import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../routes/slices/CartSlice";
import { addLike, removeDislike } from "../routes/slices/LikeSlice";
import { toast } from "react-toastify";

function Products({ product }) {

  const [isLiked, setisLiked] = useState(false);
  const dispatch = useDispatch();

  // Redux cart state
  const { cart } = useSelector((state) => state);
  // Abb cart me check krna hai ki product usme hai ki nhi ?
  const isAddedToCart = cart.some((item) => item.id === product.id);
  // Agr cart me product already hoga to iske value true varna false

  // Same for like Slice
  // Redux like state
  const { like } = useSelector((state) => state);
  // Abb like me check krna hai ki already liked product usme hai ki nhi ?
  const isAlreadyLiked = like.some((item) => item.id === product.id);
  // Agr Like me product already hoga to iske value true varna false

  const handleDoubleClick = () => {
    if (isAlreadyLiked) {
      dispatch(removeDislike({ id: product.id }));
      toast.warn("Item disliked!")
    } else {
      dispatch(addLike(product));
      toast.info("Item liked!")
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-between 
      hover:scale-110 transition duration-300 ease-in gap-3 p-4 mt-10 ml-5 
      rounded-xl border-[2px] border-gray-300 shadow-lg cursor-pointer"
      onDoubleClick={handleDoubleClick}>
      <div>
        <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">{product.title}</p>
      </div>
      <div>
        <p className="w-40 text-gray-400 font-normal text-[10px] text-left">{product.description.split(" ").slice(0, 10).join(" ") + "..."}</p>
      </div>
      <div className="h-[180px]">
        <img src={product.image} className="h-full w-full " />
      </div>
      <div className="flex justify-between gap-12 items-center w-full mt-5">
        <div>
          <p className="text-green-600 font-semibold">${product.price}</p>
        </div>
        <div
          onClick={() => {
            if (isAlreadyLiked) {
              dispatch(removeDislike({ id: product.id }));
              toast.warn("Item disliked!")
            } else {
              dispatch(addLike(product));
              toast.info("Item liked!")
            }
          }}>
          {isAlreadyLiked ? (<FcLike className="text-2xl" />) : (<AiOutlineHeart className="text-2xl" />)}
        </div>
        <div>
          <button
            onClick={() => {
              if (isAddedToCart) {
                dispatch(remove({ id: product.id }));
                toast.error("Item Removed!")
              } else {
                dispatch(add(product));
                toast.success("Item Added to cart!")
              }
            }}
            className="cursor-pointer">
            {isAddedToCart ? (<IoCartSharp className="text-2xl" />) : (<IoCartOutline className="text-2xl" />)}
          </button>
        </div>

      </div>
    </div >
  )
}

export default Products