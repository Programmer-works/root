import mongoose from "mongoose";


const StudentSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    grade:{
        type:String,
        required:true
    },
    sex:{
        type:String,
        required:true
    },
    studentReport: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
})

const Student = mongoose.model('Student',StudentSchema)

export default Student