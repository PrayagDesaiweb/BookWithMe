const RegisterHost = require('../models/RegisterHost')
const RegisterHostProperty = require('../models/RegisterHostProperty');
const ManageHostProperty = require('../models/ManageHostProprty');
const Bookings = require('../models/Bookings');

exports.postCreateOneRental = (req, res, next) => {
    let sess = req.session;
    user_name = sess.unique_host_name;
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
    const date_when_booked = new Date();


        const registerProperty = new RegisterHostProperty(host_id,property_name,property_class,address,description,chk_in_date,chk_out_date, city, state, accomodation_strength, cancellation_scheme, specifications, amenities, rate, date_when_booked);
        registerProperty.save().then(result => {
            //console.log(result);
            //Another promise to findProperty by username so that the correct page can be rendered

            ManageHostProperty.findPropertyByHostId(sess.host_id).then(hostProperties =>{
                console.log(hostProperties);
                let sess = req.session;
                res.render('reg-hosts/manage-rentals', {
                    host_rentals : hostProperties,
                    host_name : sess.unique_host_name
                });
            }).catch(err =>{
                console.log(err) // catch of the inner promise 
            }); // inner promse ends here

        }).catch(err =>{
            console.log(err);
        });
   
    
} // exports ends here


exports.getCreateRental = (req, res, next) =>{
    let sess = req.session;
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
    const date_when_booked = new Date();
    const rate = req.body.rate;
    const specifications = req.body.specifications;
    const amenities = req.body.amenities; 
    const registerProperty = new RegisterHostProperty(host_id,property_name,property_class,address,description,chk_in_date,chk_out_date, city, state, accomodation_strength, cancellation_scheme, specifications, amenities, rate, date_when_booked);
    registerProperty.save().then(result =>{

        


        ManageHostProperty.findPropertyByHostId(sess.host_id).then(result =>{
           
            res.render('reg-hosts/manage-rentals', {
                host_name : sess.host_name,
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
    
    const unique_user_name = req.body.unique_user_name;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const contactNo = req.body.contactNo;

    // On updating the credentials the user will again have to logIn using his new credentials

    RegisterHost.updateHostCredentials(sess.host_id, unique_user_name, name, email, password, contactNo)
    .then(result =>{

         res.redirect('http://localhost:3000/host-login');
        

    }).catch(err =>{
        console.log(err);
    });
}

exports.postEditRental = (req, res, next) =>{
    /* Scenarios for editing rentals
    1. The host can edit the rental if the property has not been booked by users
    2. The host can change the availiility of his/her property, i.e he-she can extend the date of bookings (this is the current priority)
      */

     // fetch the properties from hostProperty. If the property shows bookings on that property than only host can extend dates.
       
    let sess = req.session;
    let host_id = sess.host_id;
    //console.log(host_id);
    const host_property_id = req.body.hostProperty_id;
    //console.log('Hi' + typeof(host_property_id)) // this will come from the card's button click
    Bookings.fetchHostPropertiesFromBookings(host_property_id).then(result =>{
        //console.log(result); 
        if(result === null){
            // if someone has not booked the property the host can change multiple properties details.
            Bookings.fetchPropertyFromHostProperty(req.body.hostProperty_id).then(property =>{
                console.log(property);
                res.render('reg-hosts/edit-rental0',{
                host_name : sess.host_name,
                hostProperty : property
                })
            }).catch(err =>{
                console.log(err)
            })
            
        } // if ends
        else{
            // if the property is booked. The host can change limited credentials of the property
            Bookings.fetchPropertyFromHostProperty(req.body.hostProperty_id).then(property =>{
                console.log(property);
                res.render('reg-hosts/edit-rental1',{
                    host_name : sess.host_name,
                hostProperty : property
                })
            }).catch(err =>{
                console.log(err)
            })
            // Fetch the hostProperty Details from hostProperty collections and pass data to registered-users/edit-rental1
            
        }
    }).catch(err =>{
        console.log(err);
    })
    
   
   
}

exports.postDeleteRental = (req, res, next) => {
    let sess = req.session;
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

exports.postUpdatePropertyInformation = (req, res, next) =>{
    
    const property_name = req.body.property_name;
    const description = req.body.description;
    const specifications = req.body.specifications;
    const amenities = req.body.amenities;
    const chk_in_date = req.body.date[0];
    const chk_out_date = req.body.date[1];
    const host_property_id = req.body.host_property_id;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const rate = req.body.rate;
    const property_class= req.body.property_class;
    const cancellation_scheme = req.body.cancellation_scheme;
    const accomodation_strength = req.body.accomodation_strength;
    const date_updated  = new Date();
    ManageHostProperty.updatePropertyAfterEditingCredentials(date_updated,cancellation_scheme,accomodation_strength,amenities,property_name,description,specifications,chk_in_date,chk_out_date,host_property_id,city,state,address,property_class,rate)
    .then(result =>{
        Bookings.fetchPropertyFromBookings(host_property_id).then(bookingElement =>{
            console.log(bookingElement);
            res.render('reg-hosts/rental-details',{
                hostProperty : req.body,
                
            })
        }).catch(err =>{
            console.log(err);
        }) // Bookings.fetchPropertyFromBookings
    }).catch(err =>{
        console.log(err) // ManageHostProperty.updatePropertyAfterEditingCredentials promise 
    })
    res.send(req.body);
}





 //    https://www.airbnb.co.in/rooms/plus/22377418?location=Dallas%2C%20Texas%2C%20United%20States&adults=2&guests=1&s=mGqJ4LKE
// add password recovery 