import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

await prisma.food.create({
    data: {
        id: "1",
        name: "Ugali Mayai",
        price: "120",
        category: "Main DIshes",
        image_url: "http://127.0.0.1:5173/images/ugali-mayai.png",
        availability: "True",
        created_at: new Date(),
    },
    data: {
        id: "2",
        name: "Githeri",
        price: "90",
        category: "Main Dishes",
        image_url: "http://127.0.0.1:5173/images/githeri.png",
        availability: "True",
        created_at: new Date(),
    },
    data: {
        id: "3",
        name: "Pilau Special",
        price: "120",
        category: "Main Dishes",
        image_url: "http://127.0.0.1:5173/images/pilau_special.png",
        availability: "True",
        created_at: new Date(),
    },
    data: {
        id: "4",
        name: "Kenyan Andazi",
        price: "20",
        category: "Snacks",
        image_url: "http://127.0.0.1:5173/images/mandazi.png",
        availability: "True",
        created_at: new Date(),
    },
    data: {
        id: "5",
        name: "Kenyan Samosas",
        price: "50",
        category: "Snacks",
        image_url: "http://127.0.0.1:5173/images/samosas.png",
        availability: "True",
        created_at: new Date(),
    },
    data: {
        id: "6",
        name: "Kenyan Chapatis",
        price: "20",
        category: "Snacks",
        image_url: "http://127.0.0.1:5173/images/chapatis.png",
        availability: "True",
        created_at: new Date(),
    },
    data: {
        id: "7",
        name: "Kenyan Tea",
        price: "30",
        category: "Drinks",
        image_url: "http://127.0.0.1:5173/images/tea.jpg",
        availability: "True",
        created_at: new Date(),
    },
    data: {
        id: "8",
        name: "Soda",
        price: "70",
        category: "Drinks",
        image_url: "http://127.0.0.1:5173/images/soda.png",
        availability: "True",
        created_at: new Date(),
    },
    data: {
        id: "9",
        name: "Fresh Juice",
        price: "50",
        category: "Drinks",
        image_url: "http://127.0.0.1:5173/images/juice.png",
        availability: "True",
        created_at: new Date(),
    }

});