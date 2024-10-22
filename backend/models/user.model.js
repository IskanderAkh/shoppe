import mongoose, { mongo } from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    country: {
        type: String,
        required: true
    },
    streetAddress:{
        type: String,
        required: true
    },
    postCode:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            default: [],
        }
    ],
    downloads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            default: [],
        }
    ],
    cart: [cartItemSchema],

    wishList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            default: [],
        }
    ],
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User