import React from 'react'
import { FcDeleteDatabase } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { remove } from '../routes/slices/CartSlice';
import ItemCard from './ItemCard';
import { toast } from "react-toastify";

const CartItem = ({ item }) => {

  const dispatch = useDispatch();

  return (
    <ItemCard
      item={item}
      onRemove={() => {
        dispatch(remove({ id: item.id }));
        toast.error("Item removed from cart!");
      }}
      buttonText="Remove"
    />

  )
}

export default CartItem