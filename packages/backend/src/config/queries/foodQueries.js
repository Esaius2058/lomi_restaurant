import prisma from "../utils/prisma/prisma";

export function handleError(error) {
    console.error("Error:", error);
    process.exit(1);
}

export async function handleFetchMenu() {
    const menu = await prisma.food.findMany();
    return menu;
}

export async function handleAddFoodItem({ name, price, category }) {
    const foodItem = await prisma.food.create({
        data: {
            name,
            price,
            category,
        },
    });
    return menuItem;
}

export async function handleEditFoodItem(name, price, category) {
    const foodItem = await prisma.food.update({
        where: {
            name,
        },
        data: {
            price,
            category,
        },
    });
    return foodItem;
}

export async function handleDeleteFoodItem(name) {
    const foodItem = await prisma.food.delete({
        where: {
            name,
        },
    });
    return foodItem;
}

export async function handleStoreFoodImage(name, image_url) {
    const foodItem = await prisma.food.update({
        where: {
            name,
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

export async function handleMarkAvailability(name, availability) {
    const foodItem = await prisma.food.update({
        where: {
            name,
        },
        data: {
            availability,
        },
    });
    return foodItem;
}

