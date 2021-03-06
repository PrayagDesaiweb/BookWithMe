const RegisterHost = require('../models/RegisterHost')
const RegisterHostProperty = require('../models/RegisterHostProperty');
const ManageHostProperty = require('../models/ManageHostProprty');
const Bookings = require('../models/Bookings');
const Review = require('../models/Review');

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
    const rate = Number(req.body.rate);
    const accomodation_strength = req.body.accomodation_strength;
    const cancellation_scheme = req.body.cancellation_scheme;
    const date_when_booked = new Date();
    const status = 'active';


        const registerProperty = new RegisterHostProperty(host_id,property_name,property_class,address,description,chk_in_date,chk_out_date, city, state, accomodation_strength, cancellation_scheme, specifications, amenities, rate, date_when_booked, status);
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
    const rate = Number(req.body.rate);
    const specifications = req.body.specifications;
    const amenities = req.body.amenities; 
    const status = "active";
    const registerProperty = new RegisterHostProperty(host_id,property_name,property_class,address,description,chk_in_date,chk_out_date, city, state, accomodation_strength, cancellation_scheme, specifications, amenities, rate, date_when_booked, status);
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
    const host_property_id = req.body.hostProperty_id;
    let current_date = new Date();
    // priority p1 is to implement the bookings case for values of the fields for property_is_booked scenario. i.e for future booking if the host deletes the property then the user's bookings will also delete and the user will see the message that the property is been deleted by the host
    // fetch the prpoerties from the bookings in which from the collection bookings the field property_is_booked is True. This shows that there are prperty based on the 

    Bookings.fetchHostPropertyById(host_property_id).then(result =>{
        if(result.length === 0){
            Bookings.fetchPropertyDetailsFromhostProperty(host_property_id)
            .then(result1 =>{
                res.render('reg-hosts/delete-rental0',{
                    host_name : sess.host_name,
                    host_property_details : result1
                });
            }).catch(err =>{
                console.log(err);
            })
            // there are no bookings of this property. Then render the page as this case follows
             // rendering ends.
        }
        else{
            let aux_array = [];
            result.forEach(element =>{
                Bookings.fetchUserCredentialsFromUserId(element.user_id).then(result1 =>{
                    if (aux_array.length < result.length){
                        aux_array.push(result1);
                        console.log(aux_array);
    
                        if(aux_array.length === result.length){
                            console.log(aux_array);
                            res.render('reg-hosts/delete-rental1',{
                                host_name : sess.host_name,
                                bookingDetails : result,
                                userDetails : aux_array, 

                            }) // render ends
                            
                            
                        } // inner if ends
                    } // outer if ends
                }) 
                .catch(err =>{
                    console.log(err);
                }) // Bookings.fetchUserCredentialsFromUserId ends 

            }) // forEach ends
        }
    }).catch(err =>{
        console.log(err);
    }) // promise ends 
   
} // exports ends here

exports.postRentalDetails = (req, res, next) => {
    var sess = req.session;
    const host_property_id = req.body.hostProperty_id;
    Bookings.fetchPropertyDetailsFromhostProperty(host_property_id).then(hostpropertyDetails =>{
        // this hostPropertyDetails will contaon the detalils for the host property
        Bookings.fetchPropertiesFromhostProperty(host_property_id).then(propertyDetailsfromBookings =>{
            
            let aux_array = [];
            if(propertyDetailsfromBookings.length === 0){
                Review.fetchReviewsByHostPropertyId(host_property_id).then(review =>{
                    res.render('reg-hosts/rental-details',{
                        hostPropertyDetails : hostpropertyDetails ,
                        userDetails : [],
                        bookingDetails : [],
                        message : false,
                        chk_in_date : hostpropertyDetails.chk_in_date,
                        chk_out_date : hostpropertyDetails.chk_in_date,
                        host_name : sess.host_name,
                        property_review : review
                    }) // render ends
                }).catch(err =>{
                    console.log(err);
                })
                
            }
            else{

            
            propertyDetailsfromBookings.forEach(element =>{

                Bookings.fetchUserCredentialsFromUserId(element.user_id).then(result =>{
                    if (aux_array.length < propertyDetailsfromBookings.length){
                        aux_array.push(result);
                        console.log(aux_array);
    
                        if(aux_array.length === propertyDetailsfromBookings.length){
                            console.log(aux_array);
                            Review.fetchReviewsByHostPropertyId(host_property_id).then(review =>{
                                res.render('reg-hosts/rental-details',{
                                    hostPropertyDetails : hostpropertyDetails ,
                                    userDetails : aux_array,
                                    bookingDetails : propertyDetailsfromBookings,
                                    message : false,
                                    chk_in_date : hostpropertyDetails.chk_in_date,
                                    chk_out_date : hostpropertyDetails.chk_out_date,
                                    host_name : sess.host_name,
                                    property_review : review
                                }) // render ends
                            }).catch(err =>{
                                console.log(err);
                            })
                            
                        } // inner if ends
                    } // outer if ends
                })
                .catch(err =>{
                    console.log(err);
                }) // Bookings.fetchUserCredentialsFromUserId ends 

            }) // forEach ends here
        } // else ends 
        }).catch(err =>{
            console.log(err)
        }) // Bookings.fetchPropertiesFromhostPropertypromise ends 
    }).catch(err =>{
        console.log(err)
    }); // Bookings.fetchPropertyDetailsFromhostProperty promise ands

}

exports.postUpdatePropertyInformation = (req, res, next) =>{
    let sess = req.session;
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
    const rate = Number(req.body.rate);
    const property_class= req.body.property_class;
    const cancellation_scheme = req.body.cancellation_scheme;
    const accomodation_strength = req.body.accomodation_strength;
    const date_updated  = new Date();
    ManageHostProperty.updatePropertyAfterEditingCredentials(date_updated,cancellation_scheme,accomodation_strength,amenities,property_name,description,specifications,chk_in_date,chk_out_date,host_property_id,city,state,address,property_class,rate)
    .then(result =>{
        Bookings.fetchPropertiesFromhostProperty(host_property_id).then(propertyDetails =>{
            console.log(propertyDetails)
            // from propertyDetails, fetch the chk_in-date and chk_out_dates of the property and dates whrn the property is booked by the user
            // from the userDetails fetch all the entries of the user Collection.
            // hostPropertyDetails is the request's body. Which has the specificaitions of the host property. This is used for designing pages.
            // fetch the perticular host property from bookings database. 
            aux_array  = [];
            // for each property in the bookings, each entry has user_id. So fetch the user credentials from the user_id
            propertyDetails.forEach(element =>{
                Bookings.fetchUserCredentialsFromUserId(element.user_id).then(result =>{
                    if (aux_array.length < propertyDetails.length){
                        aux_array.push(result);
                        console.log(aux_array);
    
                        if(aux_array.length === propertyDetails.length){
                            console.log(aux_array);
                            Review.fetchReviewsByHostPropertyId(host_property_id).then(property_review =>{
                                res.render('reg-hosts/rental-details',{
                                    hostPropertyDetails : req.body,
                                    userDetails : aux_array,
                                    bookingDetails : propertyDetails,
                                    message : true,
                                    chk_in_date : chk_in_date,
                                    chk_out_date : chk_out_date,
                                    host_name : sess.host_name,
                                    property_review : property_review

                                }) // render ends
                            })
                            
                        } // inner if ends
                    } // outer if ends
                })
                .catch(err =>{
                    console.log(err);
                }) // Bookings.fetchUserCredentialsFromUserId ends 
                
                
            }) // foreach ends            
        }).catch(err =>{
            console.log(err);
        }); // Bookings.fetchPropertiesFromhostProperty promise ends 
    
    }).catch(err =>{
        console.log(err) // ManageHostProperty.updatePropertyAfterEditingCredentials promise 
    })
    
}

exports.displayHostDashboard = (req, res, next) =>{
    // this will only fetch the information for active value of the status field of the host Property collection
    let sess = req.session;
    
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

}


exports.postdeleteThisProperty = (req, res, next) =>{
    let sess = req.session;
    const host_property_id = req.body.host_property_id;
    ManageHostProperty.changeStatusOfProperty(host_property_id).then(result =>{
        res.redirect('/host-dashboard');
    }).catch(err =>{
        console.log(err);
    })
    
    
}

exports.getRemovedRentals = (req, res, next) =>{
    let sess = req.session;
    let user_name = sess.unique_host_name;
    let host_id = sess.host_id;
    ManageHostProperty.findPropertyByHostIdThatAreInactive(host_id).then(listofhostProperties =>{
        //console.log(listofhostProperties)
        res.render('reg-hosts/view-inactive-property',{
            name : user_name,
            removedProperties : listofhostProperties
        }); // rendering over
    }).catch(err =>{
        console.log(err);
    })
    
}

exports.makePropertyActive = (req, res, next) =>{
    let sess = req.session;
    const property_id = req.body.property_id;
    let date1 = new Date();
    todays_date = date1.toISOString().split('T')[0]
    ManageHostProperty.updatePropertyStatus(property_id)
    .then(result =>{
        //console.log(result);
        ManageHostProperty.findProperty(property_id).then(property =>{
            res.render('reg-hosts/edit-to-make-property-available',{
                today : todays_date,
                name : sess.unique_host_name,
                hostProperty : property
            }) // rendering ends here
        }).catch(err =>{
            console.log(err);
        }) // ManageHostProperty.fetchHostPropertyById ends
        
    }).catch(err =>{
        console.log(err);
    }) //  ManageHostProperty.updatePropertyStatus promise ends
}

exports.updatePropertiesAfterMakingAvailable = (req, res, next) =>{
    let sess = req.session;
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
    .then(updateSuccessfull =>{
        res.redirect('/host-dashboard')
    }).catch(err =>{
        console.log(err)
    })
}

 
// add password recovery