import { Router, Response, Request } from "express";
import { createUser, getAllUsers, getUserProfile, updateUserProfile, deleteUserProfile, ensureAdmin, ensureAuthenticated, loginUser } from "../controllers/userControllers";
import { createFood, getAllFoodItems, getFoodById, checkAvailabality, updateFood, deleteFood, filterByCategory, storeImage } from "../controllers/foodControllers";
import { getAllOrders, getOrderById, getOrdersByStatus, createOrder, updateOrder, deleteOrder } from "../controllers/orderControllers";
import { createOrderItem, deleteAllOrderItems, deleteOrderItem, getAllOrderItems, getOrderItemByFoodId, getOrderItemById, getOrderItemsByOrderId, updateOrderItem } from "../controllers/orderItemControllers";

const router = Router();

// User routes
router.get("/api/users", ensureAuthenticated, ensureAdmin, getAllUsers);
router.get("/api/user/:id", ensureAuthenticated, getUserProfile);
router.put("/api/user/:id", ensureAuthenticated, updateUserProfile);
router.delete("/api/user/:id", ensureAuthenticated, deleteUserProfile);
// Authentication routes
router.post("/api/signup", createUser);
router.post("/api/login", loginUser);
router.post("/api/logout", ensureAuthenticated, (req, res) => {
    // Invalidate the JWT token by removing it from the client-side storage
    res.status(200).json({ message: "User logged out successfully" });
});

// Middleware to ensure authentication and authorization
router.use(ensureAuthenticated);

//Menu Routes
router.get("api/menu", ensureAuthenticated, ensureAdmin, getAllFoodItems);
router.get("api/menuitem/:id", ensureAuthenticated, getFoodById);
router.put("api/menuitem/:id", ensureAuthenticated, updateFood);
router.delete("api/menuitem/:id", ensureAuthenticated, ensureAdmin, deleteFood);
router.post("api/menuitem/new", ensureAuthenticated, ensureAdmin, createFood);
router.post("api/menuitem/:id", ensureAuthenticated, checkAvailabality);
router.post("api/menuitem/image/:id", ensureAuthenticated, ensureAdmin, storeImage);
router.post("api/menu/:category", filterByCategory);

//Order Routes
router.get("api/orders", ensureAdmin, getAllOrders);
router.get("api/order/:id", ensureAdmin, getOrderById);
router.get("api/order/status/:status", ensureAdmin, getOrdersByStatus);
router.put("api/order/:id", updateOrder);
router.delete("api/order/:id", deleteOrder);
router.post("api/order/new", ensureAuthenticated, createOrder);

//Order Item Routes
router.get("api/orderitems", ensureAdmin, getAllOrderItems);
router.get("api/orderitem/:id", getOrderItemById);
router.get("api/orderitem/food/:id", ensureAdmin, getOrderItemByFoodId);
router.get("api/orderitem/order/:id", ensureAdmin, getOrderItemsByOrderId);
router.post("api/orderitem/new", createOrderItem);
router.put("api/orderitem/:id", updateOrderItem);
router.delete("api/orderitem/:id", deleteOrderItem);
router.delete("api/orderitems", ensureAdmin, deleteAllOrderItems);

export default router;