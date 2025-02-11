import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },

    password: {
        type: String,
        required: true,
        min: 6
    },

    role: {
        type: String,
        enum: ["admin", "client"],
        default: 'client',
    },

},
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;