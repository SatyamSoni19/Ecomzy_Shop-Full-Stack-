import React from 'react'
import { FcDeleteDatabase } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { removeFromFavAPI } from '../routes/slices/LikeSlice';
import ItemCard from './ItemCard';
import { toast } from 'react-toastify';

const FavouriteItem = ({ item }) => {

  const dispatch = useDispatch();

  return (
    <ItemCard
      item={item}
      onRemove={() => {
        dispatch(removeFromFavAPI(item.id))
        toast.warn("Item disliked!");
      }} 
      buttonText="UnLike" />
  )
}

export default FavouriteItem