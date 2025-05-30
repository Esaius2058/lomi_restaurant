import { NavBar } from "./Navbar";
import { useState } from "react";

const Orders = () => {
  const [orderId, setOrderId] = useState("gshhjKJ");
  const [orderDate, setOrderDate] = useState("2023-10-01");
  const [orderedItems, setorderedItems] = useState("Chapo");
  const [total, setTotal] = useState(100);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");

  const paymentMethods = {
    mpesa: "/icons/mpesa.svg",
    visa: "/icons/visa.svg",
    mastercard: "/icons/mastercard.svg",
    paypal: "/icons/paypal.png",
  };

  return (
    <div className="orders-page">
      <NavBar />
      <div className="orders-content">
        <div className="order-section1">
          <div className="order-section1-text">
            <h1>Order ID: {orderId}</h1>
            <h2>Order date: {orderDate}</h2>
            <div className="order-section1-separator"></div>
            <p>{orderedItems}</p>
          </div>
        </div>
        <div className="order-section2">
          <div className="order-section2-text">
            <h1>Order Summary</h1>
            <div className="order-section2-separator"></div>
            <h2>Total: {total}</h2>
            <div className="order-section2-separator"></div>
            <h1>Pay Via</h1>

            <div className="payment-methods">
              {Object.entries(paymentMethods).map(([method, image]) => (
                <img
                  key={method}
                  src={image}
                  alt={method}
                  onClick={() => setPaymentMethod(method)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
