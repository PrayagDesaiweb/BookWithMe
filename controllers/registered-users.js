const ManageUser  = require('../models/ManageUser');

exports.postSearchProperties = (req, res, next) => {

    // this is coming from request body

    const city = req.body.city;
    const state = req.body.state;
    const chk_in_date = req.body.chk_in_date;
    const chk_out_date = req.body.chk_in_date;
    const accomodation_strength = req.body.accomodation_strength;

    // this is coming from session

    let sess = req.session;
    const user_id = sess._id;
    const name = sess.user_name;
    const user_email = sess.user_email;
    const user_password = sess.user_password;
    const userName = sess.unique_user_name;

    // fetch all the properties available meeting the requirement for 

    res.send(req.session);

    
}

exports.getManageCredentials = (req, res, next) => {

    let sess = req.session;
    console.log(sess);
    console.log('hi' + sess.userCredentials.user_name);
    
    res.render('registered-users/manage-credentials', {
        unique_user_name : sess.userCredentials.unique_user_name,
        user_email : sess.userCredentials.user_email,
        user_password : sess.userCredentials.user_password,
        user_name : sess.userCredentials.user_name

    });
}


exports.postUpdateCredentials = (req, res, next) => {
    let sess = req.session;
    console.log( 'session is ' + sess);
    //console.log(typeof(sess.userCredentials)); this is of type object
    //console.log('body is ' + req.body);
    const userId = sess.userCredentials._id;
    const uniqueUserName = req.body.unique_user_name;
    const userName = req.body.user_name;
    const userEmail = req.body.user_email;
    const userPassword = req.body.user_password;
    ManageUser.updateUserCredentials(userId, uniqueUserName, userName, userEmail, userPassword )
    .then(result => {
        // update the session here with the updated credentials.
        // once the user changes the credentials, He is supposed to enter the credentials again. So redirect to the login page

        console.log(result);
    }).catch(err =>{
        console.log(err);
    })
    res.redirect('http://localhost:3000/user-login');
}