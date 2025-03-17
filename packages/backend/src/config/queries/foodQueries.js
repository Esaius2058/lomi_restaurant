import prisma from "../../config/prisma";

export function handleError(error) {
    console.error("Error:", error);
    process.exit(1);
}

export async function handleFetchMenu() {
    const menu = await prisma.food.findMany();
    return menu;
}

export async function handleAddFoodItem({ name, price, category, image_url}) {
    const foodItem = await prisma.food.create({
        data: {
            name,
            price,
            category,
            image_url,
        },
    });
    return foodItem;
}

export async function handleEditFoodItem(id, name, price, category) {
    const foodItem = await prisma.food.update({
        where: {
            id,
        },
        data: {
            name,
            price,
            category,
        },
    });
    return foodItem;
}

export async function handleDeleteFoodItem(id) {
    const foodItem = await prisma.food.delete({
        where: {
            id,
        },
    });
    return foodItem;
}

export async function handleStoreFoodImage(id, image_url) {
    const foodItem = await prisma.food.update({
        where: {
            id,
        },
        data: {
            image_url,
        },
    });
    return foodItem;
}

export async function handleFilterByCategory(category) {
    const foodItems = await prisma.food.findMany({
        where: {
            category,
        },
    });
    return foodItems;
}

export async function handleMarkAvailability(id, availability) {
    const foodItem = await prisma.food.update({
        where: {
            id,
        },
        data: {
            availability,
        },
    });
    return foodItem;
}

export async function handleGetFoodItem(id) {
    const foodItem = await prisma.food.findUnique({
        where: {
            id,
        }
    })
    return foodItem;
}
