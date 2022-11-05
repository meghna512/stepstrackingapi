const shortid = require('shortid');
const bcrypt = require('bcrypt');
const Users = require('../models/user');
const  map = require('../helper')

const loginUser = async (req, res) => {
    try {
        if(req.body.phoneNumber){
            let user;
            user = await Users.findOne({ phoneNumber: req.body.phoneNumber});
            if(user) {
                req.session.userId = user.uid;
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
}

const signupUser = async (req, res) => {
    try {
        const newUser = new Users();
        newUser.userName = req.body.userName;
        newUser.phoneNumber = req.body.phoneNumber;
        newUser.uid = shortid.generate();
        newUser.password = bcrypt.hashSync(req.body.password, 10);
        await newUser.save();
        const token = jwt.sign({ userName: newUser.userName }, process.env.SECRET);
        return res.status(201).json({ token });
        
    }catch (err) {
        return res.status(500).json({ "message": err.message });
    }
}
const logoutUser = async (req, res) =>{
    try{
        const ws = map.get(req.session.userId);
        console.log('Destroying session');
        req.session.destroy(function () {
            if (ws) ws.close();
        });
        return res.status(200).json({'message': "Successfully logged out"})
    } catch(err){
        return res.status(500).json({'message': err.message});
    }
}


module.exports = {
    loginUser,
    signupUser,
    logoutUser
}