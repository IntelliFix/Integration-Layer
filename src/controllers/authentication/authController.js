const User = require('../../models/User');
const jwt = require('jsonwebtoken');


//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', name: '', phoneNumber: '', password: ''};

    //duplicates error code
    if (err.code === 11000) {
        errors.email = "That email is already registered";
        return errors
    }

    //validation errors
    if (err.message.includes('User validation failed')){
        Object.values(err.errors).forEach( ({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'thisisoursecret', {
        expiresIn: maxAge       //The jwt remains valid for 3 days
    })
}


module.exports.signup_get = (req, res) => {
    
    //Render signup view
    res.render('signup');   
}

module.exports.login_get = (req, res) => {

    //Render singin view
    res.render('login');  
}

module.exports.signup_post = async (req, res) => {
    const{email, password, name, phoneNumber} = req.body;
    
    try{
        const user = await User.create({email, password, name, phoneNumber});
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({user: user._id});
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const{email, password} = req.body;
    console.log(email, password);
    
    res.send('user login');
}

