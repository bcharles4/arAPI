import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minLeght: 3, maxLength: 4 },
    email: { type: String, required: true, unique: true },
    phone: {
        type: String,
        required: true,
        match: [/^\d{11}$/, "Phone number must be exactly 11 digits"]
    },
    password: { type: String, required: true },
    score: { type: String, default: "0" }, // Default score set to 0
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;
