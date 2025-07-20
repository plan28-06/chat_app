import User from "../middlewares/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (password.length < 6) {
            return res
                .Status(400)
                .json({ message: "Password must be atleast 6 characters" });
        }
        const user = await User.findOne({ email });
        if (user)
            return res.Status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if (newUser){
            
        }
    } catch (error) {}
    res.send("Sign Up");
};

export const login = (req, res) => {
    res.send("Login");
};

export const logout = (req, res) => {
    res.send("Logout");
};
