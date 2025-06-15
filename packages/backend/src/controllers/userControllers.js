import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleCreateUser, handleUpdateUser, handleDeleteUser, handleGetAllUsers, handleGetUser, handleGetUserByEmail } from "../config/queries/userQueries.js";

export async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;

        const existingUser = await handleGetUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await handleCreateUser(email, name, hashedPassword);

        //generate JWT token
        const token = jwt.sign(
            { 
                sub: newUser.id,
                id: newUser.id 
            },
            process.env.JWT_SECRET,
            { expiresIn: "4h" }
        );

        res.status(201).json({ message: "User registered successfully", token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
         });
    } catch (error) {
        console.error("Error creating user: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await handleGetUserByEmail(email);
        console.log("User: ", user);

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials, no such user!" });
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);

        if (!passwordMatch) {
            return res.status(400).json({ message: "Wrong Password" });
        }

        //generate JWT token
        const token = jwt.sign(
            { 
                sub: user.id,
                id: user.id 
            },
            process.env.JWT_SECRET,
            { expiresIn: "4h" }
        );

        res.status(200).json({ message: "User logged in successfully", token , user: {
                id: user.id,
                name: user.name,
                email: user.email
            }});
    } catch (error) {
        console.error("Error logging in user: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getAllUsers(req, res) {
    try {
        const users = await handleGetAllUsers();

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching all users: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getUserProfile(req, res) {
    try {
        const userId = req.user.id;
        const user = await handleGetUser(Number(userId));

        res.status(200).json({ user: {
            id: user.id,
            name: user.name,
            email: user.email
        }});
    } catch (error) {
        console.error("Error fetching user profile: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateUserProfile(req, res) {
    try {
        const userId = req.user.id;
        //const password = req.user.passwordHash;
        const { name, email, newpassword, oldpassword } = req.body;

        const currentUser = await handleGetUser(userId);
        if (!currentUser) {
            return res.status(404).json({ message: "User not found"});
        }

        // Verify old password only if changing password
        if (newpassword) {
            if (!oldpassword) {
                return res.status(400).json({ message: "Old password is required to set a new password."});
            }
            const passwordMatch = await bcrypt.compare(oldpassword, currentUser.passwordHash);


            if (!passwordMatch) {
                return res.status(400).json({ message: "Current password is incorrect" });
        }
        }

        const hashedPassword = newpassword ? await bcrypt.hash(newpassword, 10): currentUser.passwordHash;

        const updatedUser = await handleUpdateUser(userId, name || currentUser.name, email || currentUser.email, hashedPassword);

        let token;
        if (email && email !== currentUser.email) {
            token = jwt.sign(
                { 
                    sub: updatedUser.id,
                    id: updatedUser.id 
                },
                process.env.JWT_SECRET,
                { expiresIn: "4h" }
            );
        }

        res.status(200).json({ message: "Profile updated successfully", user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email
            },
            token: token || undefined
        });
    } catch (error) {
        console.error("Error updating user profile: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteUserProfile(req, res) {
    try {
        const userId = req.user.id;
        const { password } = req.body

        const passwordMatch = await bcrypt.compare(password, req.user.passwordHash);

        if (!passwordMatch) {
            return res.status(400).json({ message: "Wrong password!!" });
        }


        await handleDeleteUser(userId);

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user profile: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}