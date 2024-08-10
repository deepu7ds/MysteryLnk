import mongoose from "mongoose";

interface ConnectionObject {
    isConnected?: number;
}

const connection: ConnectionObject = {};

async function dbConfig(): Promise<void> {
    if (connection.isConnected) {
        console.log("Database is already connected");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URL || "");
        connection.isConnected = db.connections[0].readyState;
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting to database: ", error);
        process.exit(1);
    }
}

export { dbConfig };
