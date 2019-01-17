const RegisterHost = require('../models/RegisterHost');
const RegisterUser = require('../models/RegisterUser');

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
