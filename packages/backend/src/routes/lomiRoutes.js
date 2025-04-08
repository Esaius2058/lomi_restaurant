import { Router } from "express";
import { ensureAuthenticated, ensureAdmin } from "../auth/auth.middleware.js";
import { createUser, getAllUsers, getUserProfile, updateUserProfile, deleteUserProfile, loginUser } from "../controllers/userControllers.js";
import { createFood, getAllFoodItems, getFoodById, checkAvailabality, updateFood, deleteFood, filterByCategory, storeImage } from "../controllers/foodControllers.js";
import { getAllOrders, getOrderById, getOrdersByStatus, createOrder, updateOrder, deleteOrder } from "../controllers/orderControllers.js";
import { createOrderItem, deleteAllOrderItems, deleteOrderItem, getAllOrderItems, getOrderItemByFoodId, getOrderItemById, getOrderItemsByOrderId, updateOrderItem } from "../controllers/orderItemControllers.js";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({message: "Backend is up and running!!"});
});
// User routes
router.get("/users", ensureAuthenticated, ensureAdmin, getAllUsers);
router.get("/user/:id", ensureAuthenticated, getUserProfile);
router.put("/user/:id", ensureAuthenticated, updateUserProfile);
router.delete("/user/:id", ensureAuthenticated, deleteUserProfile);
// Authentication routes
router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", ensureAuthenticated, (req, res) => {
    // Invalidate the JWT token by removing it from the client-side storage
    res.status(200).json({ message: "User logged out successfully" });
});

// Middleware to ensure authentication and authorization
//router.use(ensureAuthenticated);

//Menu Routes
router.get("/menu", ensureAuthenticated, ensureAdmin, getAllFoodItems);
router.get("/menuitem/:id", ensureAuthenticated, getFoodById);
router.put("/menuitem/:id", ensureAuthenticated, updateFood);
router.delete("/menuitem/:id", ensureAuthenticated, ensureAdmin, deleteFood);
router.post("/menuitem/new", ensureAuthenticated, ensureAdmin, createFood);
router.post("/menuitem/:id", ensureAuthenticated, checkAvailabality);
router.post("/menuitem/image/:id", ensureAuthenticated, ensureAdmin, storeImage);
router.post("/menu/:category", filterByCategory);

//Order Routes
router.get("/orders", ensureAdmin, getAllOrders);
router.get("/order/:id", ensureAdmin, getOrderById);
router.get("/order/status/:status", ensureAdmin, getOrdersByStatus);
router.put("/order/:id", updateOrder);
router.delete("/order/:id", deleteOrder);
router.post("/order/new", ensureAuthenticated, createOrder);

//Order Item Routes
router.get("/orderitems", ensureAdmin, getAllOrderItems);
router.get("/orderitem/:id", getOrderItemById);
router.get("/orderitem/food/:id", ensureAdmin, getOrderItemByFoodId);
router.get("/orderitem/order/:id", ensureAdmin, getOrderItemsByOrderId);
router.post("/orderitem/new", createOrderItem);
router.put("/orderitem/:id", updateOrderItem);
router.delete("/orderitem/:id", deleteOrderItem);
router.delete("/orderitems", ensureAdmin, deleteAllOrderItems);

export default router;