import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// 1. Load environment variables so process.env.MONGODB_URL works
dotenv.config();

const seedDatabase = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);


        // 3. Hash the password once (MUST be a string "123456", not a number)
        console.log("Hashing password...");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("123456", salt);

        const seedUsers = [
            // Female Users
            {
                email: "emma.thompson@example.com",
                fullName: "Emma Thompson",
                password: hashedPassword, // No need for `${}`, just pass the variable!
                profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
            },
            {
                email: "olivia.miller@example.com",
                fullName: "Olivia Miller",
                password: hashedPassword,
                profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
            },
            {
                email: "sophia.davis@example.com",
                fullName: "Sophia Davis",
                password: hashedPassword,
                profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
            },
            {
                email: "ava.wilson@example.com",
                fullName: "Ava Wilson",
                password: hashedPassword,
                profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
            },
            {
                email: "isabella.brown@example.com",
                fullName: "Isabella Brown",
                password: hashedPassword,
                profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
            },
            {
                email: "mia.johnson@example.com",
                fullName: "Mia Johnson",
                password: hashedPassword,
                profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
            },
            {
                email: "charlotte.williams@example.com",
                fullName: "Charlotte Williams",
                password: hashedPassword,
                profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
            },
            {
                email: "amelia.garcia@example.com",
                fullName: "Amelia Garcia",
                password: hashedPassword,
                profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
            },

            // Male Users
            {
                email: "james.anderson@example.com",
                fullName: "James Anderson",
                password: hashedPassword,
                profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
            },
            {
                email: "william.clark@example.com",
                fullName: "William Clark",
                password: hashedPassword,
                profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
            },
            {
                email: "benjamin.taylor@example.com",
                fullName: "Benjamin Taylor",
                password: hashedPassword,
                profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
            },
            {
                email: "lucas.moore@example.com",
                fullName: "Lucas Moore",
                password: hashedPassword,
                profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
            },
            {
                email: "henry.jackson@example.com",
                fullName: "Henry Jackson",
                password: hashedPassword,
                profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
            },
            {
                email: "alexander.martin@example.com",
                fullName: "Alexander Martin",
                password: hashedPassword,
                profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
            },
            {
                email: "daniel.rodriguez@example.com",
                fullName: "Daniel Rodriguez",
                password: hashedPassword,
                profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
            },
        ];

        // 4. Insert the new securely hashed users
        await User.insertMany(seedUsers);
        console.log("Database seeded successfully! You can now log in.");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

// Call the function
seedDatabase();
