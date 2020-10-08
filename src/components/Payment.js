import React, { useEffect, useState } from "react";
import "./Payment.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../StateProvider";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getTotal } from "../reducer";
import axios from "../axios";
import { db } from "../firebase";

export default function Payment() {
  // eslint-disable-next-line
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();
  const [processing, setProcessing] = useState(false);
  const [succeded, setSucceded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    //generate the client secret wich allows to charge customer

    const getClientSecret = async () => {
      if (getTotal(basket) !== 0) {
        const response = await axios({
          method: "post",
          //stripe expects the currency in subtotal
          url: `/payments/create?total=${getTotal(basket) * 100}`,
        });

        setClientSecret(response.data.clientSecret);
        console.log("SECRET IS >> " + response.data.clientSecret);
      }
    };

    getClientSecret();
  }, [basket]);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    // eslint-disable-next-line
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent is payment confirmation
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceded(true);
        setError(false);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

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
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email || ""}</p>
            <p>Telangana</p>
            <p>Hyderabad, Lingampally</p>
            <p>BHEL OLD MIG 1876</p>
            <p>PIN 502032</p>
          </div>
        </div>

        <div className="payment__section">
          <h3>Review Items and Delivery</h3>
          <div className="payment__items">{renderBasket()}</div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        total ({basket.length} items): <strong>{value}</strong>
                      </p>
                    </>
                  )}
                  decimalScale={2}
                  value={getTotal(basket)}
                  displayType={"text"}
                  thousandSeperator={true}
                  prefix={"₹"}
                />
                <button
                  className="payment__button"
                  disabled={processing || disabled || succeded}
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div className="payment__error">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
