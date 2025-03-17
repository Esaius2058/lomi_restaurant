import prisma from "../../config/prisma";

export async function handleCreateOrder(userId, totalPrice) {
  try {
    const order = await prisma.order.create({
      data: {
        userId,
        totalPrice,
      },
    });
    return order;
  } catch (error) {
    console.error("Error creating order: ", error);
  }
}


export async function handleGetOrderById(orderId) {
  try {
    const orderItem = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    return orderItem;
  } catch (error) {
    console.error("Error fetching order by id: ", error);
  }
}

export async function handleUpdateOrder(orderId, totalPrice) {
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        totalPrice,
      },
    });
    return updatedOrder;
  } catch (error) {
    console.error("Error updating order: ", error);
  }
}
export async function handleDeleteOrder(orderId) {
  try {
    const order = await prisma.order.delete({
      where: {
        id: orderId,
      },
    });
    return order;
  } catch (error) {
    console.error("Error deleting order: ", error);
  }
}

export async function handleGetAllOrders() {
  try {
    const orders = await prisma.order.findMany();
    return orders;
  } catch (error) {
    console.error("Error fetching orders: ", error);
  }
}