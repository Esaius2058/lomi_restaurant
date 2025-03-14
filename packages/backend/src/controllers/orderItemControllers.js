import prisma from "../utils/prisma/prisma";

export async function createOrderItem(req, res) {
    try {
        const orderItem = await prisma.orderItem.create({
            data: {
                order: {
                    connect: {
                        id: req.body.orderId,
                    },
                },
                food: {
                    connect: {
                        id: req.body.foodId,
                    },
                },
                quantity: req.body.quantity,
            },
        });

        res.status(201).json(orderItem);
    } catch (error) {
        console.error("Error creating order item: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getAllOrderItems(req, res) {
    try {
        const orderItems = await prisma.orderItem.findMany({
            where: {
                orderId: req.params.orderId,
            },
            include: {
                food: true,
            },
        });

        res.status(200).json(orderItems);
    } catch (error) {
        console.error("Error fetching order items: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getOrderItemById(req, res) {
    try {
        const orderItem = await prisma.orderItem.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });

        if (!orderItem) {
            return res.status(404).json({ message: "Order item not found" });
        }

        res.status(200).json(orderItem);
    } catch (error) {
        console.error("Error fetching order item by id: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateOrderItem(req, res) {
    try {
        const orderItem = await prisma.orderItem.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                quantity: req.body.quantity,
            },
        });

        res.status(200).json(orderItem);
    } catch (error) {
        console.error("Error updating order item: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteOrderItem(req, res) {
    try {
        await prisma.orderItem.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });

        res.status(204).end();
    } catch (error) {
        console.error("Error deleting order item: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteAllOrderItems(req, res) {
    try {
        await prisma.orderItem.deleteMany({
            where: {
                orderId: req.params.orderId,
            },
        });

        res.status(204).end();
    } catch (error) {
        console.error("Error deleting all order items: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getOrderItemByFoodId(req, res) {
    try {
        const orderItem = await prisma.orderItem.findFirst({
            where: {
                foodId: parseInt(req.params.foodId),
            },
        });

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
    try {
        const orderItem = await prisma.orderItem.findFirst({
            where: {
                orderId: parseInt(req.params.orderId),
                foodId: parseInt(req.params.foodId),
            },
        });

        if (!orderItem) {
            return res.status(404).json({ message: "Order item not found" });
        }

        res.status(200).json(orderItem);
    } catch (error) {
        console.error("Error fetching order item by order id and food id: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}