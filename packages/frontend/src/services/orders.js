const api = process.meta.VITE_API_URL || "http://localhost:3000/api";

export async function getOrders() {
  try {
    const response = await fetch(`${api}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const orders = await response.json();
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function getOrderById(orderId) {
  try {
    const response = await fetch(`${api}/order/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch order");
    }
    const order = await response.json();
    return order;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw error;
  }
}

export async function getOrderByStatus(status) {
  try {
    const response = await fetch(`${api}/order/status/${status}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch orders by status");
    }
    const orders = await response.json();
    return orders;
  } catch (error) {
    console.error("Error fetching orders by status:", error);
    throw error;
  }
}

export async function createOrder(orderData) {
  try {
    const response = await fetch(`${api}/order/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error("Failed to create order");
    }
    const order = await response.json();
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

export async function updateOrder(orderId, orderData) {
  try {
    const response = await fetch(`${api}/order/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error("Failed to update order");
    }
    const updatedOrder = await response.json();
    return updatedOrder;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
}

export async function deleteOrder(orderId) {
  try {
    const response = await fetch(`${api}/order/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete order");
    }
    return { message: "Order deleted successfully" };
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
}