import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 5, maxLength: 100 },
    email: { type: String, required: true, unique: true },
   studentId: {
  type: String,
    required: true,
    match: [/^[A-Za-z0-9]{10,14}$/, "Student ID must be 10 to 14 characters with letters and digits"]
    },


    password: { type: String, required: true },
    score: { type: String, default: "0" }, // Default score set to 0
    attempts: { type: Number, default: 0 } // only count attempts

}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;
