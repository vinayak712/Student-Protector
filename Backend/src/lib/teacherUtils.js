import jwt from "jsonwebtoken";

export const generateTeacherToken = (teacherId, res) => {
    const token = jwt.sign({ teacherId },
        process.env.JWT_SECRET, {
            expiresIn:'7d',
        }
    )
    res.cookie('jwt', token,{
        maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        sameSite: 'strict',
                secure:process.env.NODE_ENV!=='development',
    })
    console.log(" Teacher Token Generated:", token); 
    return token;
}