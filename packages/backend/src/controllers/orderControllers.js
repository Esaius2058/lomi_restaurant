import prisma from "../utils/prisma/prisma";

export async function createOrder(req, res) {
    try {
        const order = await prisma.order.create({
            data: {
                user: {
                    connect: {
                        id: req.user.id,
                    },
                },
                food: {
                    connect: {
                        id: req.body.foodId,
                    },
                },
            },
        });

        res.status(201).json(order);
    } catch (error) {
        console.error("Error creating order: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getAllOrders(req, res) {
    try {
        const orders = await prisma.order.findMany({
            where: {
                userId: req.user.id,
            },
            include: {
                food: true,
            },
        });

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getOrderById(req, res) {
    try{
        const order = await prisma.order.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });

        if(!order){
            return res.status(404).json({ message: "Order not found" });
        }       

        res.status(200).json(order);
    }catch(error){
        console.error("Error fetching order by id: ", error);
        res.status(500).json({ message: "Internal Server Error" });1
    }
}

export async function updateOrder(req, res) {
    try{
        const order = await prisma.order.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                status: req.body.status,
            },
        });

        res.status(200).json(order);
    }catch(error){
        console.error("Error updating order: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteOrder(req, res) {
    try{
        await prisma.order.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });

        res.status(204).end();
    }catch(error){
        console.error("Error deleting order: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getOrdersByStatus(req, res) {
    try{
        const orders = await prisma.order.findMany({
            where: {
                status: req.params.status,
            },
            include: {
                food: true,
            },
        });

        res.status(200).json(orders);
    }catch(error){
        console.error("Error fetching orders by status: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}