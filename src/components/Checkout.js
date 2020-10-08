import React from "react";
import "./Checkout.css";

import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";

import { useStateValue } from "../StateProvider";

export default function Checkout() {
  // eslint-disable-next-line
  const [{ basket, user }, dispatch] = useStateValue();

  const renderBasket = () => {
    return basket.map((item, index) => {
      return (
        <CheckoutProduct
          key={index}
          id={item.id}
          title={item.title}
          price={item.price}
          rating={item.rating}
          image={item.image}
        />
      );
    });
  };

  return (
    <div className="checkout">
      <div className="checkout__left">
        <h4 className="checkout__user">Hi {user?.email || "Guest"}</h4>
        <h2 className="checkout__title">Your shopping Basket</h2>
        {renderBasket()}
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

/* <img
      className="checkout__ad"
      src="https://gos3.ibcdn.com/top-1568020025.jpg"
      alt="banner"
    />
*/
