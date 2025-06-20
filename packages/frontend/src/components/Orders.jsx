/* eslint-disable no-unused-vars */

import { NavBar } from "./Navbar";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { createOrder, updateOrder, deleteOrder } from "../services/orders";

const Orders = () => {
  const [orderId] = useState("1234");
  const [orderDate] = useState("2025-06-06");

  const [orderedItems, setOrderedItems] = useState([
    { name: "Chapo", price: 20, qty: 2 },
    { name: "Fruit Juice", price: 50, qty: 1 },
    { name: "Beans", price: 60, qty: 1 },
  ]);

  const [subtotal, setSubtotal] = useState(150);
  const [vat, setVat] = useState(20);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");

  const paymentMethods = {
    mpesa: "/icons/mpesa.svg",
    airtelmoney: "/icons/airtelmoney.svg",
    paypal: "/icons/paypal.svg",
    // visa: "/icons/visa.svg",
    // mastercard: "/icons/mastercard.svg",
  };

    // Automatically calculate subtotal and VAT on render/update
  useEffect(() => {
    const total = orderedItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    setSubtotal(total);
    setVat(Math.round(total * 0.16));
  }, [orderedItems]);


  const handleClearOrder = () => {
    setOrderedItems([]);
    setSubtotal(0);
    setVat(0);
  };


  const handleSubmitOrder = async () => {
    const orderData = {
      items: orderedItems.map(item => ({
        name: item.name,
        price: item.price,
        qty: item.qty,
      })),
      subtotal,
      vat,
      total: subtotal + vat,
      paymentMethod,
      orderDate,
    };
    try {
      const order = await createOrder(orderData);
      console.log("Order created successfully:", order);
      alert("Order created successfully!");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to submit order");
    }
  };

  const handleUpdateOrder = async () => {
    const orderData = {
      items: orderedItems.map(item => ({
        name: item.name,
        price: item.price,
        qty: item.qty,
      })),
      subtotal,
      vat,
      total: subtotal + vat,
      paymentMethod,
      orderDate,
    };
    try {
      await updateOrder(orderId, orderData);
      alert("Order updated successfully!");
   
    } catch (error) {
      alert("Failed to update order");
    }
  };


  // Function to delete the order
  // This function will be called when the user clicks the delete button
  const handleDeleteOrder = async () => {
    try {
      await deleteOrder(orderId);
      alert("Order deleted successfully!");
      setOrderedItems([]);

    } catch (error) {
      alert("Failed to delete order");
    }
  };

  return (
    <div className="orders-page">
      <NavBar />
      <div className="orders-content">
        <div className="order-section1">
          <div className="order-section1-text">
            <h2>Order ID: {orderId}</h2>
            <p className="order-date">Order date: {orderDate}</p>
            <div className="separator"></div>

            {orderedItems.map((item, index) => (
              <div className="ordered-item" key={index}>
                <p className="item-name">{item.name}</p>
                <div className="item-details">
                  <p className="item-price">Ksh {item.price}</p>
                  <p className="item-qty">Qty: {item.qty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-summary">
          <div className="order-summary-header">
            <h2>Order Summary</h2>
            <button
              onClick={handleClearOrder}
              className="clear-order-btn"
              title="Clear Order"
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={handleSubmitOrder}
              className="submit-order-btn"
              title="Place Order"
            >
              Place Order
            </button>
          </div>
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Ksh {subtotal}</span>
            </div>
            <div className="summary-row">
              <span>VAT (16%)</span>
              <span>Ksh {vat}</span>
            </div>
            <hr />
            <div className="summary-row total">
              <strong>Total</strong>
              <strong>Ksh {subtotal + vat}</strong>
            </div>
          </div>

          <div className="payment-methods">
            <h3>Pay Via</h3>
            <div className="payment-options">
              {Object.entries(paymentMethods).map(([key, src]) => (
                <img
                  key={key}
                  src={src}
                  alt={key}
                  className={`payment-icon ${paymentMethod === key ? "selected" : ""
                    }`}
                  onClick={() => setPaymentMethod(key)}
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
