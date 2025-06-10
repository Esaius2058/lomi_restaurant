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
router.get("/user/me", ensureAuthenticated, getUserProfile);
router.put("/user/me", ensureAuthenticated, updateUserProfile);
router.delete("/user/me", ensureAuthenticated, deleteUserProfile);
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
router.get("/menu-items", ensureAuthenticated, ensureAdmin, getAllFoodItems);
router.get("/menu-items/:id", ensureAuthenticated, getFoodById);
router.put("/menu-items/:id", ensureAuthenticated, updateFood);
router.delete("/menu-items/:id", ensureAuthenticated, ensureAdmin, deleteFood);
router.post("/menu-items/new", ensureAuthenticated, ensureAdmin, createFood);
router.post("/menu-items/:id", ensureAuthenticated, checkAvailabality);
router.post("/menu-items/image/:id", ensureAuthenticated, ensureAdmin, storeImage);
router.post("/menu-items/:category", filterByCategory);

//Order Routes
router.get("/orders", ensureAdmin, getAllOrders);
router.get("/order/:id", ensureAdmin, getOrderById);
router.get("/order/status/:status", ensureAdmin, getOrdersByStatus);
router.put("/order/:id", updateOrder);
router.delete("/order/:id", deleteOrder);
router.post("/order/new", ensureAuthenticated, createOrder);

//Order Item Routes
router.get("/order-items", ensureAdmin, getAllOrderItems);
router.get("/order-items/:id", getOrderItemById);
router.get("/order-items/food/:id", ensureAdmin, getOrderItemByFoodId);
router.get("/order-items/order/:id", ensureAdmin, getOrderItemsByOrderId);
router.post("/order-items/new", createOrderItem);
router.put("/order-items/:id", updateOrderItem);
router.delete("/order-items/:id", deleteOrderItem);
router.delete("/order-items", ensureAdmin, deleteAllOrderItems);

export default router;