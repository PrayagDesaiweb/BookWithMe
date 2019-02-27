const RegisterHost = require('../models/RegisterHost')
const RegisterHostProperty = require('../models/RegisterHostProperty');
const ManageHostProperty = require('../models/ManageHostProprty');

exports.postCreateOneRental = (req, res, next) => {
    let sess = req.session;
    user_name = req.body.user_name;
    RegisterHost.fetchIdByName(user_name).then(result =>{
        sess.host_id = result._id;
        sess.unique_host_name = result.unique_user_name;
        hostName = result.name;
        hostId = result._id;
        res.render('reg-hosts/create_first_rental',{
            hostId : hostId,
            hostName : hostName
        })
    }).catch(err =>{
        console.log(err);
    })
    
}

exports.postFetchfromCreatefirstRentals = (req, res, next) => {

    let sess = req.session;
     
    

    const unique_host_name = sess.unique_host_name;
    const host_name = req.body.host_name; // do not use this information in the hostProperty table. because the hanges reflected in host will not be reflected inside this hostProprty Collection
    const host_id = sess.host_id;
    const property_name = req.body.property_name;
    const property_class = req.body.property_class;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const description = req.body.description;
    const specifications = req.body.specifications ;
    const amenities = req.body.amenities;
    const chk_in_date = req.body.date[0];
    const chk_out_date = req.body.date[1];
    const rate = req.body.rate;
    const accomodation_strength = req.body.accomodation_strength;
    const cancellation_scheme = req.body.cancellation_scheme;


        const registerProperty = new RegisterHostProperty(host_id,property_name,property_class,address,description,chk_in_date,chk_out_date, city, state, accomodation_strength, cancellation_scheme, specifications, amenities, rate);
        registerProperty.save().then(result => {
            //console.log(result);
            //Another promise to findProperty by username so that the correct page can be rendered

            ManageHostProperty.findPropertyByHostId(sess.host_id).then(hostProperties =>{
                console.log(hostProperties);
                let sess = req.session;
                res.render('reg-hosts/manage-rentals', {
                    host_rentals : hostProperties
                });
            }).catch(err =>{
                console.log(err) // catch of the inner promise 
            }); // inner promse ends here

        }).catch(err =>{
            console.log(err);
        });
   
    
} // exports ends here


exports.getCreateRental = (req, res, next) =>{
    //console.log(req.session);
    res.render('reg-hosts/create-rentals');
}

exports.postCreateRental = (req, res, next) => {
    var sess = req.session;
    const unique_host_name = sess.unique_host_name;
    const host_name = req.session.host_name;
    //console.log(host_name);
    const host_id = req.session.host_id;
    //console.log(host_id);
    const property_name = req.body.property_name;
    const property_class = req.body.property_class;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const description = req.body.description;
    const chk_in_date = req.body.date[0];
    const chk_out_date = req.body.date[1];
    const accomodation_strength = req.body.accomodation_strength;
    const cancellation_scheme = req.body.cancellation_scheme;

    const registerProperty = new RegisterHostProperty(host_id,property_name,property_class,address,description,chk_in_date,chk_out_date, city, state, accomodation_strength, cancellation_scheme);
    registerProperty.save().then(result =>{

        


        ManageHostProperty.findPropertyByHostId(sess.host_id).then(result =>{
           
            res.render('reg-hosts/manage-rentals', {
                name : sess.host_name,
                id : sess.host_id,
                host_rentals : result
            });

            
    
    
    
        }).catch(err => {
            console.log(err);
    }); // this ends here
        
    }).catch(err =>{
        console.log(err);
    })

    

    
}


exports.getUpdateCredentials = (req, res, next) => {
    
    let sess = req.session;
    
    // fetch the host credentials from the host collection
    RegisterHost.fetchHostCredentials(sess.host_id).then(result =>{
        
        res.render('reg-hosts/update-credentials',{
            user_credentials_props : result
        });
    }).catch(err =>{
        console.log(err);
    });

    
}

exports.updateCredentials = (req, res, next) =>{
    let sess = req.session;
    console.log(sess);
    console.log(req.body);
    const unique_user_name = req.body.unique_user_name;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const contactNo = req.body.contactNo;

    RegisterHost.updateHostCredentials(sess.host_id, unique_user_name, name, email, password, contactNo)
    .then(result =>{

        console.log(result);
        // anoter nexted promise for fetching properties of the user from the hostProperty collection
        ManageHostProperty.findPropertyByHostId(sess.host_id).then(hostProperties =>{
            let sess = req.session;
            console.log('hostName is ' + sess.unique_host_name);
            console.log(hostProperties);
        res.render('reg-hosts/manage-rentals', {
            name : sess.host_name,
            id : sess.host_id,
            host_rentals : hostProperties
        }); // rendering finished
        }).catch(err =>{
            console.log(err)
        }); // Manageuser.findPropertyByHostName ends
        

    }).catch(err =>{
        console.log(err);
    });
}

exports.postEditRental = (req, res, next) =>{
    var sess = req.session;
    var id = sess.hostProperty_id;
    console.log('start');
    RegisterHostProperty.fetchPropertyFromId(hostId);
    console.log('end');
    console.log(sess);
    console.log(req.body);
   
    res.render('reg-hosts/edit-rental'); // impleent this later todays date 29*1*2019
}

exports.postDeleteRental = (req, res, next) => {
    var sess = req.session;
    console.log('session is ' + sess);
    console.log('request body is + ' + req.body);
    res.send('This is delete rental handler. Deleting rentals will be implemeted later this is on 30 jan 2019');
}

exports.postRentalDetails = (req, res, next) => {
    var sess = req.session;
    console.log(sess);
    console.log(req.body);
    res.send('I am done working with the front end. This will be updated while I am bored and have nothing to do');
}





 //    https://www.airbnb.co.in/rooms/plus/22377418?location=Dallas%2C%20Texas%2C%20United%20States&adults=2&guests=1&s=mGqJ4LKE
