import React from 'react'
import { FcDeleteDatabase } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { removeFromCartAPI } from '../routes/slices/CartSlice';
import ItemCard from './ItemCard';
import { toast } from "react-toastify";

const CartItem = ({ item }) => {

  const dispatch = useDispatch();

  return (
    <ItemCard
      item={item}
      onRemove={() => {
        dispatch(removeFromCartAPI(item.id));
        toast.error("Item removed from cart!");
      }}
      buttonText="Remove"
    />

  )
}

export default CartItem