import React from "react";
import { useAuthStore } from "../../store/useAuthStore";

const Navbar = () => {
    const { authStore } = useAuthStore();
    return <div>Navbar</div>;
};

export default Navbar;
