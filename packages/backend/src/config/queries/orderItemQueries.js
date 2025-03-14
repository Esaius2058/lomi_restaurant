import { idText } from "typescript";
import prisma from "../../utils/prisma/prisma";
export async function handleCreateOrderItem (total,order,orderId,food,foodId,quantity) {
   try {
       const orderItem = await prisma.orderItem.create({
           data: {
               total,
               order,
               orderId,
               food,
               foodId,
               quantity
           }
       });
       return orderItem;
   }
   catch (error) {
       console.error("Error creating order item",error);
   }
}

export async function handleUpdateOrderItem (orderItemId,quantity) {
   try {
       const orderItem = await prisma.orderItem.update({
           where: {
               id: orderItemId
           },
           data: {
               quantity
           }
       });
       return orderItem;
   }
   catch (error) {
       console.error("Error updating order item",error);
   }
}   

export async function handleDeleteOrderItem (orderItemId) {
   try {
       const orderItem = await prisma.orderItem.delete({
           where: {
               id: orderItemId
           }
       });
       return orderItem;
   }
   catch (error) {
       console.error("Error deleting order item",error);
   }
}

export async function handleGetOrderItemById (orderItemId) {
   try {
       const orderItem = await prisma.orderItem.findUnique({
           where: {
               id: orderItemId
           }
       });
       return orderItem;
   }
   catch (error) {
       console.error("Error getting order item by id",error);
   }
}

export async function handleGetAllOrderItems () {
   try {
       const orderItems = await prisma.orderItem.findMany();
       return orderItems;
   }
   catch (error) {
       console.error("Error getting all order items",error);
   }
}