const mockControllers = {
    createUser: (req, res) => res.status(201).json({ message: 'User created' }),
    loginUser: (req, res) => res.status(200).json({ message: 'User logged in' }),
    getAllUsers: (req, res) => res.status(200).json([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
    ]),
    getUserProfile: (req, res) => res.status(200).json({ id: Number(req.params.id), name: 'John Doe' }),
    ensureAuthenticated: (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        // Mock user data
        req.user = { id: 1, name: 'John Doe' };
        //req.user = { id: 2, name: 'Jane Doe' };

        // Mock authentication logic
        if (token === "kfmlfallmvmlalvlab") {
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    },
    ensureAdmin: (req, res, next) => {
        // Mock user data
        req.user = { id: 1, name: 'John Doe' };
        req.user.role = 'admin';
        //req.user = { id: 2, name: 'Jane Doe', role: 'user' };

        // Mock admin check logic
        if (req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    },
    updateUserProfile: (req, res) => res.status(200).json({
        message: 'User updated',
        updatedUser: req.body
    }),
    deleteUserProfile: (req, res) => res.status(200).json({ message: 'User deleted' }),
    createFood: (req, res) => res.status(201).json({ message: 'Food created' }),
    getAllFoodItems: (req, res) => res.status(200).json([{ id: 1, name: 'Pizza' }]),
    getFoodById: (req, res) => res.status(200).json({ id: req.params.id, name: 'Pizza' }),
    checkAvailabality: (req, res) => res.status(200).json({ available: true }),
    updateFood: (req, res) => res.status(200).json({ message: 'Food updated' }),
    deleteFood: (req, res) => res.status(200).json({ message: 'Food deleted' }),
    filterByCategory: (req, res) => res.status(200).json([{ id: 1, name: 'Pizza' }]),
    storeImage: (req, res) => res.status(201).json({ message: 'Image stored' }),
    getAllOrders: (req, res) => res.status(200).json([{ id: 1, status: 'Pending' }]),
    getOrderById: (req, res) => res.status(200).json({ id: req.params.id, status: 'Pending' }),
    getOrdersByStatus: (req, res) => res.status(200).json([{ id: 1, status: req.params.status }]),
    createOrder: (req, res) => res.status(201).json({ message: 'Order created' }),
    updateOrder: (req, res) => res.status(200).json({ message: 'Order updated' }),
    deleteOrder: (req, res) => res.status(200).json({ message: 'Order deleted' }),
    createOrderItem: (req, res) => res.status(201).json({ message: 'Order item created' }),
    deleteAllOrderItems: (req, res) => res.status(200).json({ message: 'All order items deleted' }),
    deleteOrderItem: (req, res) => res.status(200).json({ message: 'Order item deleted' }),
    getAllOrderItems: (req, res) => res.status(200).json([{ id: 1, foodId: 1 }]),
    getOrderItemByFoodId: (req, res) => res.status(200).json({ id: req.params.id, foodId: req.params.id }),
    getOrderItemById: (req, res) => res.status(200).json({ id: req.params.id, foodId: 1 }),
    getOrderItemsByOrderId: (req, res) => res.status(200).json([{ id: 1, orderId: req.params.id }]),
    updateOrderItem: (req, res) => res.status(200).json({ message: 'Order item updated' }),
};

export default mockControllers;