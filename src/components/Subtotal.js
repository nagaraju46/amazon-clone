import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";

import { useStateValue } from "../StateProvider";
import { getTotal } from "../reducer";
import { useHistory } from "react-router-dom";

export default function Subtotal() {
  const history = useHistory();
  // eslint-disable-next-line
  const [{ basket }, dispatch] = useStateValue();

  const gotToPaymentPage = () => {
    history.push("/payment");
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order has gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getTotal(basket)}
        displayType={"text"}
        thousandSeperator={true}
        prefix={"₹"}
      />
      <button onClick={basket.length > 0 ? gotToPaymentPage : null}>
        proceed to checkout
      </button>
    </div>
  );
}
