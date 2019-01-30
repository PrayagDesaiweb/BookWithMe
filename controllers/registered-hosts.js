const RegisterHost = require('../models/RegisterHost')
const RegisterHostProperty = require('../models/RegisterHostProperty');
const ManageHostProperty = require('../models/ManageHostProprty');

exports.postCreateOneRental = (req, res, next) => {
    user_name = req.body.user_name;
    RegisterHost.fetchIdByName(user_name).then(result =>{
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
    console.log(req.body)
    const host_name = req.body.host_name;
    const host_id = req.body.host_id;
    const property_name = req.body.property_name;
    const property_class = req.body.property_class;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const description = req.body.description;
    const chk_in_date = req.body.chk_in_date;
    const chk_out_date = req.body.chk_out_date;
    const accomodation_strength = req.body.accomodation_strength;
    const cancellation_scheme = req.body.cancellation_scheme;

    // setting sessions for hostname and host id to store the information of hosts across all the pages for remembering host sessions

    let sess = req.session;
    sess.host_name = host_name;
    sess.host_id = host_id;
    //let list_of_host_rentals;

    const registerProperty = new RegisterHostProperty(host_name,host_id,property_name,property_class,address,description,chk_in_date,chk_out_date, city, state, accomodation_strength, cancellation_scheme);
    registerProperty.save().then(result =>{
        //console.log(result);
    }).catch(err =>{
        //console.log(err);
    })

    ManageHostProperty.findPropertyByHostName(host_name).then(result =>{
        //console.log('from the controller handling of fetching the host proprtties from the ManageHostProperties models ');
       // sess.list_of_host_rentals = result;
       // let list_of_host_rentals = new Array();

       // sess.list_of_host_rentals = result;
        //console.log(result);
        
        //console.log(list_of_host_rentals);
        //sess.list_of_host_rentals = result; // session vaiable for properties of hostname
        let sess = req.session;
        sess.host_properties = result;
        res.render('reg-hosts/manage-rentals', {
            name : sess.host_name,
            id : sess.host_id,
            host_rentals : result
        });



    }).catch(err => {
        console.log(err);
    })
    
    
}


exports.getCreateRental = (req, res, next) =>{
    //console.log(req.session);
    res.render('reg-hosts/create-rentals');
}

exports.postCreateRental = (req, res, next) => {
    var sess = req.session;
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
    const chk_in_date = req.body.chk_in_date;
    const chk_out_date = req.body.chk_out_date;
    const accomodation_strength = req.body.accomodation_strength;
    const cancellation_scheme = req.body.cancellation_scheme;

    const registerProperty = new RegisterHostProperty(host_name,host_id,property_name,property_class,address,description,chk_in_date,chk_out_date, city, state, accomodation_strength, cancellation_scheme);
    registerProperty.save().then(result =>{

        


        ManageHostProperty.findPropertyByHostName(host_name).then(result =>{
           
            let sess = req.session;
            sess.host_properties = result;
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
    // for the implementation of updating the credentials of user
    //console.log(req.session);
    

    // fetch the host credentials from the host collection
    RegisterHost.fetchHostCredentials(req.session.host_name).then(result =>{
        //console.log('this is coming from the edit credntlas handler');
        let sess = req.session;
        sess.host_collection_id = result._id;
        console.log(sess.host_collection_id)

        res.render('reg-hosts/update-credentials',{
            user_credentials_props : result
        });
    }).catch(err =>{
        console.log(err);
    });

    
}

exports.updateCredentials = (req, res, next) =>{
    let sess = req.session;
    const unique_user_name = req.body.unique_user_name;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const contactNo = req.body.contactNo;

    RegisterHost.updateHostCredentials(req.session.host_collection_id, unique_user_name, name, email, password, contactNo)
    .then(result =>{
        let sess = req.session;
        res.render('reg-hosts/manage-rentals', {
            name : sess.host_name,
            id : sess.host_id,
            host_rentals : sess.host_properties
        });

    }).catch(err =>{
        console.log(err);
    });
}

exports.postEditRental = (req, res, next) =>{
    var sess = req.session;
    console.log(sess);
    console.log(req.body);
    res.send('edit rentals handled') // impleent this later todays date 29*1*2019
}

exports.postDeleteRental = (req, res, next) => {
    var sess = req.session;
    console.log(sess);
    console.log(req.body);
    res.send('This is delete rental handler. Deleting rentals will be implemeted later this is on 30 jan 2019');
}

exports.postRentalDetails = (req, res, next) => {
    var sess = req.session;
    console.log(sess);
    console.log(req.body);
    res.send('I am done working with the front end. This will be updated while I am bored and have nothing to do');
}




 //    https://www.airbnb.co.in/rooms/plus/22377418?location=Dallas%2C%20Texas%2C%20United%20States&adults=2&guests=1&s=mGqJ4LKE
