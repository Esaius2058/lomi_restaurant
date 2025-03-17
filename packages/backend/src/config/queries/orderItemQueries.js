import prisma from "../../config/prisma";

export async function createOrderItem(total, orderId, foodId){
    try{
        const orderItem = await prisma.orderItem.create({
            data: {
                total,
                orderId,
                foodId,
            },
        });
        return orderItem;
    }catch(error){
        console.error("Error creating order item: ", error);
    }
}

export async function getOrderItemById(orderItemId){
    try{
        const orderItem = await prisma.orderItem.findUnique({
            where: {
                id: orderItemId,
            },
        });
        return orderItem;
    }catch(error){
        console.error("Error fetching order item by id: ", error);
    }
}

export async function updateOrderItem(orderItemId, total){
    try{
        const updatedOrderItem = await prisma.orderItem.update({
            where: {
                id: orderItemId,
            },
            data: {
                total,
            },
        });
        return updatedOrderItem;
    }catch(error){
        console.error("Error updating order item: ", error);
    }
}

export async function handleDeleteAllOrderItems(){
    try{
        const orderItems = await prisma.orderItem.deleteMany();
        return orderItems;
    }catch(error){
        console.error("Error deleting all order items: ", error);
    }
}

export async function deleteOrderItem(orderItemId){
    try{
        const orderItem = await prisma.orderItem.delete({
            where: {
                id: orderItemId,
            },
        });
        return orderItem;
    }catch(error){
        console.error("Error deleting order item: ", error);
    }
}

export async function getOrderItemsByOrderId(orderId){
    try{
        const orderItems = await prisma.orderItem.findMany({
            where: {
                orderId,
            },
        });
        return orderItems;
    }catch(error){
        console.error("Error fetching order items by order id: ", error);
    }
}

export async function getOrderItemsByFoodId(foodId){
    try{
        const orderItems = await prisma.orderItem.findMany({
            where: {
                foodId,
            },
        });
        return orderItems;
    }catch(error){
        console.error("Error fetching order items by food id: ", error);
    }
}

export async function getOrderItemsByFoodIdAndOrderId(foodId, orderId){
    try{
        const orderItems = await prisma.orderItem.findMany({
            where: {
                foodId,
                orderId,
            },
        });
        return orderItems;
    }catch(error){
        console.error("Error fetching order items by food id and order id: ", error);
    }
}