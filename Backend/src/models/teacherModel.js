import mongoose from "mongoose";
const TeacherSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true,
        minlength:6,
    },
    ssn: {
        type: String,
        uinque: true,
        required:true,
    },
    profile_pic: {
        type: String,

    }
})
const Teacher = mongoose.model('Teacher', TeacherSchema);
export default Teacher;