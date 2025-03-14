import { idText } from "typescript";
import prisma from "../../utils/prisma/prisma";

export async function handleCreateOrder(userId, totalPrice) {
    const order = await prisma.order.create({
        data: {
            userId,
            totalPrice,
        }
    });
}

export async function handleGetOrderById(orderId) {
    const orderItem = await prisma.order.findUnique({
        where: {
            id: orderId
        }
    });
}

export async function handleUpdateOrder(orderId, totalPrice) {
    const order = await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            totalPrice
        }
    });
}   
export async function handleDeleteOrder(orderId) {
    const order = await prisma.order.delete({
        where: {
            id: orderId
        }
    });
}
export async function handlecreateOrderItem(orderId, productId, quantity) {
    const orderItem = await prisma.orderItem.create({
        data: {
            orderId,
            productId,
            quantity
        }
    });
}
export async function handleReadOrderItems(orderId) {
    const orderItems = await prisma.orderItem.findMany({
        where: {
            orderId
        }
    });
}   
export async function handleUpdateOrderItem(orderItemId, quantity) {
    const orderItem = await prisma.orderItem.update({
        where: {
            id: orderItemId
        },
        data: {
            quantity
        }
    });
}
export async function handleDeleteOrderItem(orderItemId) {       
    const orderItem = await prisma.orderItem.delete({
        where: {
            id: orderItemId
        }
    });
}