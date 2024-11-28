import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ email });
        // checking if a user already exists with this email
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // hash password
        const salt = await bcrypt.genSalt(10); // 10 is convention
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });
        if (newUser) {
            // generate jwt token here
            generateToken(newUser._id, res); // mongodb stores id as _id, passing res so that it can send cookie in res
            await newUser.save(); // save user to db

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in sign up controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        // clearing cookies
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id; // this is possible because this is a protected route and we added user info to req

        if (!profilePic) {
            res.status(400).json({ message: "Profile pic is required" });
        }

        // uploading to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        // updating in db
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        ); // secure_url is a field which cloudinary gives you back
        // new : true is used to get the updated object

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in updateProfile", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user); // send the user back to the client
        // this will give you the authenticated user
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
} 
