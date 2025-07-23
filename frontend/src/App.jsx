import React from "react";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Navbar from "./components/Navbar.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { Routes, Route } from "react-router-dom";
const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/signup" element={<SignUpPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/settings" element={<SettingsPage />}></Route>
                <Route path="/profile" element={<ProfilePage />}></Route>
            </Routes>
        </div>
    );
};

export default App;
