import React from "react";
import "./Product.css";
import { useStateValue } from "../StateProvider";
import { toast } from "react-toastify";

export default function Product({ id, title, image, price, rating }) {
  // eslint-disable-next-line
  const [{ basket }, dispatch] = useStateValue();

  // console.log(basket);

  const addTOBasket = () => {
    //dispatch the item into data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });

    toast(
      <div>
        <p>{title} added!!</p>
      </div>
    );
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <span role="img" key={i} aria-label="rating-star">
                🌟
              </span>
            ))}
        </div>
      </div>
      <img src={image} alt="product_image" />
      <div className="product__button">
        <button className="product__buttonOne" onClick={addTOBasket}>
          add to basket
        </button>
        {/* <button className="product__buttonTwo">view product</button> */}
      </div>
    </div>
  );
}
