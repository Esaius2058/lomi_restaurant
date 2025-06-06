const api = process.meta.VITE_API_URL || "http://localhost:3000/api";

export async function getOrderItems() {
  try {
    const response = await fetch(`${api}/order-items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch order items");
    }
    const orderItems = await response.json();
    return orderItems;
  } catch (error) {
    console.error("Error fetching order items:", error);
    throw error;
  }
}

export async function getOrderItemById(orderItemId) {
  try {
    const response = await fetch(`${api}/order-items/${orderItemId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch order item");
    }
    const orderItem = await response.json();
    return orderItem;
  } catch (error) {
    console.error("Error fetching order item by ID:", error);
    throw error;
  }
}

export async function getOrderItemsByOrderId(orderId) {
  try {
    const response = await fetch(`${api}/order-items/order/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch order items by order ID");
    }
    const orderItems = await response.json();
    return orderItems;
  } catch (error) {
    console.error("Error fetching order items by order ID:", error);
    throw error;
  }
}

export async function getOrderItemByFoodId(foodId) {
  try {
    const response = await fetch(`${api}/order-items/food/${foodId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch order item by food ID");
    }
    const orderItem = await response.json();
    return orderItem;
  } catch (error) {
    console.error("Error fetching order item by food ID:", error);
    throw error;
  }
}

export async function createOrderItem(orderItemData) {
  try {
    const response = await fetch(`${api}/order-items/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(orderItemData),
    });
    if (!response.ok) {
      throw new Error("Failed to create order item");
    }
    const newOrderItem = await response.json();
    return newOrderItem;
  } catch (error) {
    console.error("Error creating order item:", error);
    throw error;
  }
}

export async function updateOrderItem(orderItemId, orderItemData) {
  try {
    const response = await fetch(`${api}/order-items/${orderItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(orderItemData),
    });
    if (!response.ok) {
      throw new Error("Failed to update order item");
    }
    const updatedOrderItem = await response.json();
    return updatedOrderItem;
  } catch (error) {
    console.error("Error updating order item:", error);
    throw error;
  }
}

export async function deleteOrderItem(orderItemId) {
  try {
    const response = await fetch(`${api}/order-items/${orderItemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete order item");
    }
    return { message: "Order item deleted successfully" };
  } catch (error) {
    console.error("Error deleting order item:", error);
    throw error;
  }
}
