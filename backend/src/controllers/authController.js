export const singup = (req, res) => {
    const { fullName, email, password } = req.body;
    try {
    } catch (error) {}
    res.send("Sign Up");
};

export const login = (req, res) => {
    res.send("Login");
};

export const logout = (req, res) => {
    res.send("Logout");
};
