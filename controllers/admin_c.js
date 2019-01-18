const RegisterHost = require('../models/RegisterHost');
const RegisterUser = require('../models/RegisterUser');
const UserAuthentication = require('../models/UserAuthentication');

exports.postbecomeHost = (req,res,next) =>{

    console.log(req.body)

    const name = req.body.name;
    const email = req.body.password;
    const password = req.body.password;
    const contactNo = req.body.contactNo;
    const registered_host = new RegisterHost(name, email, password, contactNo);
    registered_host.save().then(result =>{
       // console.log(result);
    }).catch(err => {
        console.log(err)
    })

    res.render('reg-hosts/host_reg_succ',{
        name: name
    });

}

exports.postbecomeUser = (req, res, next) => {
    //console.log(req.body);
    const user_name = req.body.user_name;
    const user_email = req.body.user_email;
    const user_password = req.body.user_password;
    const registeruser = new RegisterUser(user_name, user_email, user_password)
    registeruser.save().then(result => {
        console.log(result);
    }).catch(err =>{
        console.log(err);
    });

    // fetching the userId from the user collection in which the credenatials are added

    res.render('registered-users/welcome-registered-users',{
        user_name : user_name
    });
}

exports.postAuthenticateUser = (req, res, next) => {
    const user_name_entered = req.body.user_name;
    //console.log(user_name_entered);
    const user_password_entered = req.body.user_password;
    //console.log(user_password_entered);
    const authenticate = new UserAuthentication(user_name_entered, user_password_entered);
    const x = authenticate.authenticateUser().then(result => {
        // console.log(result); this will return true
    }).catch(err =>{
        //console.log(err);  // this will return false
        
    })
    res.send('Compeleted authentication');
}
