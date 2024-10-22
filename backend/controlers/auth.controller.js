import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, country, streetAddress, postCode, city, phone, companyName } = req.body
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let emailResult = emailRegex.test(email);
        if (!emailResult) {
            return res.status(400).json({ error: `Invalid email format` });
        }


        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ error: "Email is already taken" })
        }


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            country,
            streetAddress,
            postCode,
            city,
            phone,
            companyName
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                country: newUser.country,
                streetAddress: newUser.streetAddress,
                postCode: newUser.postCode,
                city: newUser.city,
                phone: newUser.phone,
                companyName: newUser.companyName
            })
        } else {
            res.status(400).json({ error: "Failed to create user" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
}



export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "email and password are required" })
        }

        const user = await User.findOne({ email })

        const isPasswordValid = await bcrypt.compare(password, user?.password || "")
        if (!user || !isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" })
        }

        generateTokenAndSetCookie(user._id, res)


        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            country: user.country,
            streetAddress: user.streetAddress,
            postCode: user.postCode,
            city: user.city,
            phone: user.phone,
            companyName: user.companyName
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error in Login" })
    }
}
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error in Logout" })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")
        res.status(200).json(user)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error in getUser" })
    }
}
