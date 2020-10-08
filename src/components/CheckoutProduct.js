import React from "react";
import "./CheckoutProduct.css";

import { useStateValue } from "../StateProvider";
import { toast } from "react-toastify";

export default function CheckoutProduct({
  id,
  image,
  price,
  title,
  rating,
  isorder,
}) {
  // eslint-disable-next-line
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });

    toast(
      <div>
        <p>{title} removed!!</p>
      </div>
    );
  };

  const renderButton = () => {
    if (!isorder) {
      return <button onClick={removeFromBasket}>remove from cart</button>;
    }
  };

  return (
    <div className="checkoutProduct">
      <img
        className="checkoutProduct__image"
        src={image}
        alt="cartProduct_image"
      />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <div className="checkoutProduct__price">
          <small>₹</small>
          <strong>{price}</strong>
          <div className="checkoutProduct__rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <span role="img" key={i} aria-label="rating-star">
                  🌟
                </span>
              ))}
          </div>
        </div>
        {renderButton()}
      </div>
    </div>
  );
}
