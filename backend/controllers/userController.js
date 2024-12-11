const UserModel = require('../models/usermodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
exports.users = {
    add: async (req, res) => {
        try {
            let { email,password,firstname,lastname,mobile,role } = req.body
            if (!(email,password,firstname,lastname,mobile)) {
                return res.status(400).json({ isSuccess: false, message: "All fields are Required !!" })
            }
            const userInfo = await UserModel.findOne({ email })
            if (userInfo) {
                return res.status(400).json({ isSuccess: false, message: "User is already Registered" })
            }
            let saltgen = await bcrypt.genSalt(10)
            password = await bcrypt.hash(password, saltgen)
            const user = await new UserModel({
                email,
                password,firstname,lastname,mobile,role
            }).save();
            return res.status(200).json({ isSuccess: true, message: "User Registered SuccessFully", data: user })
        } catch (error) {
            console.log(error)
            res.json({ isSuccess: false, message: "Something went wrong" })
        }
    },
    loginUser:async(req,res)=>{
        const { email, password,role } = req.body;
    try {
        let user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(200).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(200).json({ message: 'Invalid credentials' });
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            process.env.TOKEN_KEY,
            { expiresIn: "1h" },
            (err, token) => {
                if (err) throw err;
                res.json({isSuccess:true,message:"Login Successfully" ,token,role:user.role });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    },
    get: async (req, res) => {
        try {
            const users = await UserModel.find({}).select('-password')
            if (users == 0) {
                return res.status(400).json({
                    isSuccess: false,
                    message: "No user found!!"
                })
            } else {
                return res.status(200).json({
                    isSuccess: true,
                    data: users,
                    message: "All the Users Fetch Successfully"
                })
            }
        } catch (error) {
            return res.status(400).send({ isSuccess: false, message: "Something went wrong" })
        }
    },
    getOneUser: async (req, res) => {
        const { id } = req.params;
        try {
            let singleUser = await UserModel.findById(id)
            console.log(singleUser)
            return res.json({ data: singleUser })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ isSuccess: false, message: "Something went wrong" })
        }
    },
    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            let singleUser = await UserModel.findByIdAndDelete(id)
            console.log(singleUser)
            return res.json({ isSuccess:true,message:"User Deleted Succesfully" })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ isSuccess: false, message: "Something went wrong" })
        }
    },
}