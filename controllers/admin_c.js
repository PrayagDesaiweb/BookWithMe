
const RegisterUser = require('../models/RegisterUser');
const UserAuthentication = require('../models/UserAuthentication');
const HostAuthentication = require('../models/HostAuthentication');
const ManageUser = require('../models/ManageUser');
const ManageHostProperty = require('../models/ManageHostProprty');
const RegisterHost = require('../models/RegisterHost');

exports.postbecomeHost = (req,res,next) =>{

    console.log(req.body)
    let sess = req.session;
    sess.unique_host_name = req.body.unique_user_name;
    const unique_user_name = req.body.unique_user_name;
    const name = req.body.name;
    const email = req.body.password;
    const password = req.body.password;
    const contactNo = req.body.contactNo;
    const something_about_me = req.body.something_about_me;
    const registered_host = new RegisterHost(name, email, password, contactNo, unique_user_name, something_about_me);
    registered_host.save().then(result =>{
       // console.log(result);
    }).catch(err => {
        //console.log(err)
    })

    RegisterHost. fetchIdByName(sess.unique_host_name).then(hostId =>{
        console.log(hostId);
        sess.host_id = hostId;
    }).catch(err =>{
        console.log(err);
    })

    res.render('reg-hosts/host_reg_succ',{
        name: name
    });

}

exports.postbecomeUser = (req, res, next) => {
    //console.log(req.body);
    const unique_user_name = req.body.unique_user_name;
    const user_name = req.body.user_name;
    const user_email = req.body.user_email;
    const user_password = req.body.user_password;
    const registeruser = new RegisterUser(
        
        user_name, user_email, user_password, unique_user_name)
    registeruser.save().then(result11 => {

        let sess = req.session;
        sess.userName = unique_user_name;
        //console.log(sess)
        const manageuser = new ManageUser(sess.userName);
        manageuser.fetchUserIdByUserName(sess.userName)
        .then(result =>{
            
            sess.userCredentials = result;
            console.log(sess.userCredentials);
            //console.log(sess);
            res.render('registered-users/startbookproperties',{
                userName : sess.userCredentials.user_name
            });
        }).catch(err => {
            console.log(err);
        })
        //console.log(result);
    }).catch(err =>{
        //console.log(err);
    });

    // fetching the userId from the user collection in which the credenatials are added
    
}

exports.postAuthenticateUser = (req, res, next) => {
    const user_name_entered = req.body.user_name;
    // Aunthentication is done on username and not the name of the user
    const user_password_entered = req.body.user_password;

    const authenticate = new UserAuthentication(user_name_entered, user_password_entered);
    authenticate.authenticateUser().then(auth_result => {
        // console.log(result); this will return true or false as per as the method return value
        console.log(auth_result);

        if (auth_result){

        let sess = req.session;
        sess.userName = user_name_entered;
        //console.log(sess)
        const manageuser = new ManageUser(sess.userName);
        manageuser.fetchUserIdByUserName(sess.userName)
        .then(result =>{
            
            sess.userCredentials = result;
            console.log(sess.userCredentials);
            //console.log(sess);
            res.render('registered-users/startbookproperties',{
                userName : sess.userCredentials.user_name
            });
        }).catch(err => {
            console.log(err);
        })
        
        }
    
        else{
            
            res.render('non-registered-users/user_login',{
                message : true
            });
        }
        
        
    }).catch(err =>{
        //console.log(err); 
    })
    
}


exports.postAuthenticateHost = (req, res, next) => {
    const user_name_entered = req.body.user_name;
    //console.log(user_name_entered);
    const user_password_entered = req.body.user_password;
    //console.log(user_password_entered);
    const authenticate = new HostAuthentication(user_name_entered, user_password_entered);
    authenticate.authenticateHost().then(result => {
        // console.log(result); this will return true or false as per as the method return value
        console.log(result);
        if(result === true){

            let sess = req.session;
            sess.unique_host_name = user_name_entered;


            RegisterHost.fetchIdByName(sess.unique_host_name).then(result =>{
                
                sess.host_id = result._id;

                ManageHostProperty.findPropertyByHostIdThatAreActive(result._id.toString()).then(result1 =>{
    
                    console.log(result1);
                     res.render('reg-hosts/manage-rentals', {
                         host_rentals : result1,
                         host_name : sess.unique_host_name
                     });
             
             
             
                 }).catch(err => {
                     console.log(err);
                 })
                
            }).catch(err =>{
                console.log(err);
            })



           
            
        } // ifends

        else{

            res.render('non-registered-users/host_login',{
                message : true
            });
        } // else ends here

    }).catch(err =>{
        console.log(err); 
    })

}
