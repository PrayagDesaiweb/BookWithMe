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

    const host_name = req.session.host_name;
    console.log(host_name);
    const host_id = req.session.host_id;
    console.log(host_id);
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
        console.log(result);
    }).catch(err =>{
        console.log(err);
    })

    res.send('successfull insertion');

    
}


