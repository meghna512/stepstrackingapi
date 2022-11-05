const validateInput = (req, res, next) => {
    if (req.body.userName && req.body.password && req.body.phoneNumber) {
        return next();
    }
    return res.status(400).json({message: 'Please enter a valid username or password or phonenumber'});
}

module.exports = {
    validateInput
};


