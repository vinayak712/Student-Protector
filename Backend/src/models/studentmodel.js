import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true,
    },
    name: {
        type: String,
       required:true, 
    },
    password: {
        type: String,
        required: true,
        minlength: 6,    
    },
    usn:{
        type:String,
        required:true,
        unique:true,
    },
    profile_pic:{
        type:String,
    }

}
)
const Student = mongoose.model('Student', StudentSchema);
export default Student;