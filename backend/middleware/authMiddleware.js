import { getAuth } from "@clerk/express";
import { clerkClient } from "@clerk/clerk-sdk-node"; // fetch user details
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const { userId } = getAuth(req); // only userId is guaranteed
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    let user = await User.findById(userId);

    // Fetch full user from Clerk if not in DB
    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);

      user = await User.create({
        _id: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        username: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
        image: clerkUser.profileImageUrl || "",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
