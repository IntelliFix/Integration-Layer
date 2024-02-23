module.exports.signup_get = (req, res) => {
    // res.render('signup');   //Enter signup react page
}

module.exports.login_get = (req, res) => {
    // res.render('login');  //Enter singin react page
}

module.exports.signup_post = (req, res) => {
    const{email, password} = req.body;
    console.log(email, password);

    res.send('new signup');
}

module.exports.login_post = (req, res) => {
    const{email, password} = req.body;
    console.log(email, password);
    
    res.send('user login');
}

