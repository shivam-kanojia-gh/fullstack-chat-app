import { create } from "zustand";

export const useThemeStore = create((set) => ({
    // fetching and saving theme to local storage so that when we refresh we still have our theme
    theme: localStorage.getItem("chat-theme") || "coffee", // state
    setTheme: (theme) => { // setter function
        localStorage.setItem("chat-theme", theme); // setting local storage with theme
        set({ theme }); // update state
    },
}));
