import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
   userName: {
        type:String,
        required:true
    },
    memberImage: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    email: {
        type:String,
        required:true
    },
    course: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    role:{
        type:String,
       required:true
    },
    postedAt: {
        type:Date,
        default: new Date(Date.now()),
    },
})

const Member = mongoose.model("Member", MemberSchema)

export default Member