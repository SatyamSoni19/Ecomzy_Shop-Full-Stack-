import React from 'react'
import { FcDeleteDatabase } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { removeDislike } from '../routes/slices/LikeSlice';
import ItemCard from './ItemCard';
import { toast } from 'react-toastify';

const FavouriteItem = ({ item }) => {

  const dispatch = useDispatch();

  return (
    <ItemCard
      item={item}
      onRemove={() => {
        dispatch(removeDislike({id: item.id}))
        toast.warn("Item disliked!");
      }} 
      buttonText="UnLike" />
  )
}

export default FavouriteItem