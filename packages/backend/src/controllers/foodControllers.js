import prisma from "../utils/prisma/prisma";
import {
  handleAddFoodItem,
  handleDeleteFoodItem,
  handleEditFoodItem,
  handleError,
  handleFetchMenu,
  handleFilterByCategory,
  handleMarkAvailability,
  handleStoreFoodImage,
} from "../config/queries/foodQueries";

export async function createFood(req, res, next) {
  try {
    const { name, price, category } = req.body;
    const food = await handleAddFoodItem(name, price, category).catch(
      handleError
    );

    res.status(201).json(food);
  } catch (error) {
    console.error("Error creating food: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllFoodItems(req, res) {
  try {
    const food = await handleFetchMenu().catch(handleError);

    res.status(200).json(food);
  } catch (error) {
    console.error("Error fetching food: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getFoodById(req, res) {
  try {
    const food = await han

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json(food);
  } catch (error) {
    console.error("Error fetching food by id: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateFood(req, res) {
  try {
    const food = await prisma.food.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      },
    });

    res.status(200).json(food);
  } catch (error) {
    console.error("Error updating food: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteFood(req, res) {
  try {
    await prisma.food.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting food: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
