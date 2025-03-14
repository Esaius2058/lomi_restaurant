import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleCreateUser, handleUpdateUser, handleDeleteUser,handleGetAllUsers, handleGetUser, handleGetUserByEmail } from "../config/queries/userQueries";

export async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const existingUser = await handleGetUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await handleCreateUser(email, name, hashedPassword);

    //generate JWT token
    const token = jwt.sign(
        { id: newUser.id },
        process.env.JWT_SECRET,
        { expiresIn: "4h" }
    );

    res.status(201).json({ message: "User registered successfully",token });
  } catch (error) {
    console.error("Error creating user: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function loginUser(req, res) {
    try{
        const { email, password } = req.body;

        const user = await handleGetUserByEmail(email);

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials, no such user!" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: "Wrong Password" });
        }

        //generate JWT token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "4h" }
        );

        res.status(200).json({ message: "User logged in successfully", token });
    }catch(error){
        console.error("Error logging in user: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function ensureAuthenticated(req, res, next) {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        return next();
    })(req, res, next);
}

export async function ensureAdmin(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
    }

    return next();
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

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateUserProfile(req, res) {
    try {
        const userId = req.user.id;
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await handleUpdateUser(userId, username, email, hashedPassword);

        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        console.error("Error updating user profile: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteUserProfile(req, res) {
    try {
      const userId = req.user.id;
        await handleDeleteUser(userId);

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user profile: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}