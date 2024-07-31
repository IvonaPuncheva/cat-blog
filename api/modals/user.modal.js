import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://i.pinimg.com/236x/5a/1f/e8/5a1fe8218365f792ef0f5604670e9030.jpg",       
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;