export const protectRoute = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).json({
                message: "Unauthorized,  Please login first",
            });
        }
        const decoded = jwt.verift(token, process.env.JWT_KEY);
        if (!decoded) {
            res.status(401).json({
                message: "Unauthorized,  Please login first",
            });
        }
        const user = await User.findOne(decoded.userId).select("-password");
        req.user = user;
        next();
        
    } catch (error) {
        console.log("Error is protectRoute middleware ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
