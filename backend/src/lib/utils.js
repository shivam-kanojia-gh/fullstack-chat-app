import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    // first thing it takes is the payload using which you
    // can differentiate the user depending on the token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    // send generated token in cookie
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // in milliseconds
        httpOnly: true, // Prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development", // http or https, in localhost it will be not secure but in production it will be
    });
    return token;
};
