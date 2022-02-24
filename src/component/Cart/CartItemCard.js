import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  JSON.parse(JSON.stringify(item));
  return (
    <div className="CartItemCard">
    <img src={item.productId.images[0].url} alt="ssa" />
    
      <div>
        <Link to={`/product/${item.productId._id}`}>{item.productId.name}</Link>
        <span>{`Price: ₹${item.productId.price}`}</span>
        <p onClick={() => deleteCartItems(item.productId._id)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
