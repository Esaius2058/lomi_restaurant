import prisma from "../utils/prisma/prisma";
import { handleCreateOrderItem, handleGetOrderItemById, handleUpdateOrderItem, handleDeleteOrderItem, handleGetOrderItemsByOrderId, handleDeleteAllOrderItems,handleGetOrderItemsByFoodId, handleGetOrderItemsByFoodIdAndOrderId } from "../config/queries/orderItemQueries";

export async function createOrderItem(req, res) {
    const total = req.body.total;
    const orderId = req.body.orderId;
    const foodId = req.body.foodId;

    try {
        const orderItem = await handleCreateOrderItem(total, orderId, foodId);
        res.status(201).json(orderItem);
    } catch (error) {
        console.error("Error creating order item: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getAllOrderItems(req, res) {
    try {
        const orderItems = await getAllOrderItems();

        res.status(200).json(orderItems);
    } catch (error) {
        console.error("Error fetching order items: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getOrderItemById(req, res) {
    const orderItemId = parseInt(req.params.id);
    try {
        const orderItem = await handleGetOrderItemById(orderItemId);

        if (!orderItem) {
            return res.status(404).json({ message: "Order item not found" });
        }

        res.status(200).json(orderItem);
    } catch (error) {
        console.error("Error fetching order item by id: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getOrderItemsByOrderId = async (req, res) => {
    const orderId = parseInt(req.params.orderId);

    try {
        const orderItems = await handleGetOrderItemsByOrderId(orderId);

        res.status(200).json(orderItems);
    } catch (error) {
        console.error("Error fetching order items by order id: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateOrderItem(req, res) {
    const orderId = parseInt(req.params.id);
    const totalPrice = req.body.totalPrice;

    try {
        const orderItem = await handleUpdateOrderItem(orderId, totalPrice);

        res.status(200).json(orderItem);
    } catch (error) {
        console.error("Error updating order item: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteOrderItem(req, res) {
    const orderItemId = parseInt(req.params.id);

    try {
        await handleDeleteOrderItem(orderItemId);

        res.status(204).end();
    } catch (error) {
        console.error("Error deleting order item: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteAllOrderItems(req, res) {
    try {
        await handleDeleteAllOrderItems();

        res.status(204).end();
    } catch (error) {
        console.error("Error deleting all order items: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getOrderItemByFoodId(req, res) {
    const foodId = parseInt(req.params.foodId);

    try {
        const orderItem = await handleGetOrderItemsByFoodId(foodId);

        if (!orderItem) {
            return res.status(404).json({ message: "Order item not found" });
        }

        res.status(200).json(orderItem);
    } catch (error) {
        console.error("Error fetching order item by food id: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getOrderItemByOrderIdAndFoodId(req, res) {
    const orderId = parseInt(req.params.orderId);
    const foodId = parseInt(req.params.foodId);

    try {
        const orderItem = await handleGetOrderItemsByFoodIdAndOrderId(foodId, orderId);

        if (!orderItem) {
            return res.status(404).json({ message: "Order item not found" });
        }

        res.status(200).json(orderItem);
    } catch (error) {
        console.error("Error fetching order item by order id and food id: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}