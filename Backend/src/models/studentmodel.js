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

}
)
const Student = mongoose.model('Student', StudentSchema);
export default Student;