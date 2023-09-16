// pages/api/users.js

import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
  try {
    await dbConnect();
    // Ensure the database is connected before proceeding
    console.log("hi, get-all-users");
    // Access the User collection
    const users = await User.find({}).exec();

    // Send the data as a JSON response
    return res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
