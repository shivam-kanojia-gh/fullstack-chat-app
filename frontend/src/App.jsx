import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
    // call the hook and destructure the state or function, grab that value and use it
    const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
    const { theme } = useThemeStore();

    console.log(onlineUsers);    

    // checking auth whenever we visit app
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    console.log({ authUser });

    if (isCheckingAuth && !authUser) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    return (
        <div data-theme={theme}>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={authUser ? <HomePage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/signup"
                    element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/login"
                    element={!authUser ? <LoginPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/profile"
                    element={
                        authUser ? <ProfilePage /> : <Navigate to="/login" />
                    }
                />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>

            <Toaster />
        </div>
    );
};

export default App;
