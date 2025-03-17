import prisma from "../utils/prisma/prisma";
import {
  handleCreateOrder,
  handleGetOrderById,
  handleUpdateOrder,
  handleDeleteOrder,
  handleGetAllOrders,
  handleGetOrderByStatus,
} from "../config/queries/orderQueries";

export async function createOrder(req, res) {
  const userId = req.user.id;
  const totalPrice = req.body.totalPrice;
  try {
    const order = await handleCreateOrder(userId, totalPrice);

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllOrders(req, res) {
  try {
    const orders = await handleGetAllOrders();

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOrderById(req, res) {
  const userId = req.user.id;
  const orderId = parseInt(req.params.id);

  try {
    const order = await handleGetOrderById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order by id: ", error);
    res.status(500).json({ message: "Internal Server Error" });
    1;
  }
}

export async function updateOrder(req, res) {
  const orderId = parseInt(req.params.id);
  const totalPrice = req.body.totalPrice;
  try {
    const order = await handleUpdateOrder(orderId, totalPrice);

    res.status(200).json(order);
  } catch (error) {
    console.error("Error updating order: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteOrder(req, res) {
  const orderId = parseInt(req.params.id);

  try {
    await handleDeleteOrder(orderId);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting order: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOrdersByStatus(req, res) {
  const status = req.query.status;

  try {
    const orders = await handleGetOrderByStatus(status);

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders by status: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
