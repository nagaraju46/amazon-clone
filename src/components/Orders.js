import React, { useState, useEffect } from "react";
import "./Orders.css";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import Order from "./Order";

export default function Orders() {
  // eslint-disable-next-line
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapShot) => {
          console.log(snapShot.docs);
          setOrders(
            snapShot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  const renderOrders = () => {
    return orders.map((order, i) => {
      return <Order key={i} order={order} />;
    });
  };

  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders__order">{renderOrders()}</div>
    </div>
  );
}
