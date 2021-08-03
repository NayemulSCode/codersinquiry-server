import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        _id :{
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        phoneNumber:{
            type: Number,
            default: 0
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;

// module.exports = mongoose.model("User", UserSchema);