import mock from "./mockControllers.js";
import request from "supertest";
import { jest } from "@jest/globals";

await jest.unstable_mockModule("../controllers/userControllers.js", () => ({
    createUser: mock.createUser,
    getAllUsers: mock.getAllUsers,
    getUserProfile: mock.getUserProfile,
    updateUserProfile: mock.updateUserProfile,
    deleteUserProfile: mock.deleteUserProfile,
    loginUser: mock.loginUser,
}));

await jest.unstable_mockModule("../auth/auth.middleware.js", () => ({
    ensureAuthenticated: mock.ensureAuthenticated,
    ensureAdmin: mock.ensureAdmin
}))

const appModule = await import("../app.js");
const app = appModule.default;

describe("Mock Server is running", () => {
    it("should return server status", async () => {
        const res = await request(app)
            .get("/api/")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body).toEqual({ message: "Backend is up and running!!" });
    });
});

describe("User Routes", () => {
    it("should create a user", async () => {
        const res = await request(app)
            .post("/api/signup")
            .send({ name: "Gabrielle Mendoza", email: "gabby93@gmail.com", password: "hello" });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("User created");
    });

    it("should log a user in", async () => {
        const res = await request(app)
            .post("/api/login")
            .send({ email: "gabby93@gmail.com", password: "hello" });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("User logged in");
    });

    it("should get all users", async () => {
        const res = await request(app)
            .get("/api/users")
            .set("Authorization", "Bearer kfmlfallmvmlalvlab");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]);
    });

    it("should get a user profile", async () => {
        const res = await request(app)
            .get("/api/user/1")
            .set("Authorization", "Bearer kfmlfallmvmlalvlab");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: 1, name: 'John Doe' });
    });

    it("should update a user profile", async () => {
        const res = await request(app)
            .put("/api/user/2")
            .set("Authorization", "Bearer kfmlfallmvmlalvlab")
            .send({email: "gabby93@gmail.com", password: "hello"});

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            message: "User updated",
            updatedUser: {email: "gabby93@gmail.com", password: "hello"}
        });
    });

    it("should delete a user's profile", async () => {
        const res = await request(app)
        .delete("/api/user/2")
        .set("Authorization", "Bearer kfmlfallmvmlalvlab");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "User deleted"});
    });
});

/*
jest.mock("../controllers/foodControllers.js", () => ({
    createFood: mock.createFood,
    getAllFoodItems: mock.getAllFoodItems,
    getFoodById: mock.getFoodById,
    checkAvailabality: mock.checkAvailabality,
    updateFood: mock.updateFood,
    deleteFood: mock.deleteFood,
    filterByCategory: mock.filterByCategory,
    storeImage: mock.storeImage
}));

jest.mock("../controllers/orderControllers.js", () => ({
    getAllOrders: mock.getAllOrders,
    getOrderById: mock.getOrderById,
    getOrdersByStatus: mock.getOrdersByStatus,
    createOrder: mock.createOrder,
    updateOrder: mock.updateOrder,
    deleteOrder: mock.deleteOrder
}));

jest.mock("../controllers/orderItemControllers.js", () => ({
    getAllOrderItems: mock.getAllOrderItems,
    getOrderItemByFoodId: mock.getOrderItemByFoodId,
    getOrderItemByOrderIdAndFoodId: mock.getOrderItemByOrderIdAndFoodId,
    getOrderItemsByOrderId: mock.getOrderItemsByOrderId,
    createOrderItem: mock.createOrderItem,
    updateOrderItem: mock.updateOrderItem,
    deleteAllOrderItems: mock.deleteAllOrderItems,
    deleteOrderItem: mock.deleteOrderItem
}));*/