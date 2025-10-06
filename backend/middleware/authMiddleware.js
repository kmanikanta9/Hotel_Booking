import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // Call req.auth() (not req.auth)
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not Authenticated" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Protect middleware error:", error);
    res.status(500).json({ success: false, message: "Server error in protect middleware" });
  }
};
