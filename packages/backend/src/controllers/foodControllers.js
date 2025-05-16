import {
  handleAddFoodItem,
  handleDeleteFoodItem,
  handleEditFoodItem,
  handleError,
  handleFetchMenu,
  handleFilterByCategory,
  handleGetFoodItem,
  handleMarkAvailability,
  handleStoreFoodImage,
} from "../config/queries/foodQueries.js";

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
    const food = await handleGetFoodItem(parseInt(req.params.id)).catch(
      handleError
    );

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json(food);
  } catch (error) {
    console.error("Error fetching food by id: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function storeImage(req, res) {
  try{
    const { image, id } = req.body;
    await handleStoreFoodImage(id, image);

    res.status(200).json( {message: "Image uploaded successfully!" });
  }catch(error){
    console.error("Error uploading image: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function checkAvailabality(req, res) {
  try{
    const { id } = req.params;
    const available = await handleMarkAvailability(id);

    res.status(200).json({available});
  }catch(error){
    console.error("Error checking availability: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function filterByCategory(req, res) {
  try{
    const { category } = req.params;
    const filteredMenu = await handleFilterByCategory(category);

    res.status(200).json({ filteredMenu });
  }catch(error){
    console.error("Error filtering menu: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateFood(req, res) {
  try {
    const food = await handleEditFoodItem(
      parseInt(req.params.id),
      req.body.name,
      req.body.price,
      req.body.category
    ).catch(handleError);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json(food);
  } catch (error) {
    console.error("Error updating food: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteFood(req, res) {
  try {
    await handleDeleteFoodItem(parseInt(req.params.id)).catch(handleError);

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting food: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
