import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma/prisma";

export async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    //generate JWT token
    const token = jwt.sign(
        { id: newUser.id },
        process.env.JWT_SECRET,
        { expiresIn: "4h" }
    );

    res.status(201).json({ message: "User registered successfully",token });
  } catch (errror) {
    console.error("Error creating user: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function loginUser(req, res) {
    try{
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

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

export async function getUserProfile(req, res) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
            select: {
                id: true,
                username: true,
                email: true,
            },
        });

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}