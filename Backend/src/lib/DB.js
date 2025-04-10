import mongoose from 'mongoose'
async function ConnectDb() {
    try {
        const con = await mongoose.connect(process.env.MongoDb_Url)
        console.log(`MongoDb Connected Successfully: ${con.connection.host}`)
    }
    catch (error) {
        console.error('MongoDb Connection Error:' + error);
    }
};
export default ConnectDb;