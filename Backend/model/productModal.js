import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productImage: {
        type: String,
        required: true
    },
    productTitle: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {
    timestamps: true,
});

export const Product = mongoose.model("Products", productSchema);
 