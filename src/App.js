import React, { useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Payment from "./components/Payment";
import Tost from "./components/Tost";
import Orders from "./components/Orders";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // useHistory,
  Link,
} from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51HQ7uiIC8RKZ0HR2m8IH01wJX9NooZNFGPVJ68Vzr8E7zkU2uyMawuQr1uvkLBMNN7TcDCG1XZgvLz1PiIRnAUsG00Zi1zHRx6"
);

function App() {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();
  // const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("The USER IS >> ", authUser);

      if (authUser) {
        //user is logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/payment">
            <Header />
            <Tost />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/checkout">
            <Header />
            <Tost />
            <Checkout />
          </Route>
          <Route path="/">
            <Header />
            <Link to="/checkout">
              <Tost />
            </Link>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
