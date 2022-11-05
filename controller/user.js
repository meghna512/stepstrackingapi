const shortid = require('shortid');
const bcrypt = require('bcrypt');

const Users = require('../models/user');

const loginUser = async (req, res) => {
    try {
        if(req.body.phoneNumber){
            let user;
            user = await Users.findOne({ phoneNumber: req.body.phoneNumber});
            if(user) {
                return  res.status(200).json({'message': 'Login Successful'});
            } else {
                return res.send("Redirected to Signup Page");
            }
        }else {
            return res.status(401).json({ message: "Invalid Input" });
        }
    } catch(err){
        return res.status(500).json({'message': err.message});
    }
};

const signupUser = async (req, res) => {
    try {
        const newUser = new Users();
        newUser.userName = req.body.userName;
        newUser.phoneNumber = req.body.phoneNumber;
        newUser.uid = shortid.generate();
        newUser.password = bcrypt.hashSync(req.body.password, 10);
        await newUser.save();

        return res.status(201).json({ "message": "sign up successful" });        
    }catch (err) {
        return res.status(500).json({ "message": err.message });
    }
};

module.exports = {
    loginUser,
    signupUser
}