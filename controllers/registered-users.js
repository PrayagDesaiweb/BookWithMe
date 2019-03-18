const ManageUser  = require('../models/ManageUser');
const Bookings = require('../models/Bookings');
const Review = require('../models/Review');

/* 

Session is 

{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"userName":"prayagdesai","userCredentials":{"_id":"5c80e57cc9cc3e52a433ea74","user_name":"Prayag Desai","user_email":"prayagdesai777@gmail.com","user_password":"password","unique_user_name":"prayagdesai"}}


*/

exports.postSearchProperties = (req, res, next) => {

    // this is coming from request body
    const city = req.body.city;
    const state = req.body.state;
    const dateArray = req.body.date;
    const chk_in_date = dateArray[0];
    const chk_out_date = dateArray[1];
    const accomodation_Strength = req.body.accomodation_strength;

    // this is coming from session
    let sess = req.session;
    const user_id = sess._id;
    const name = sess.user_name;
    const user_email = sess.user_email;
    const user_password = sess.user_password;
    const userName = sess.unique_user_name;

    // if there are more bookings in the booking database and how to check for multiple bookings of the same property is left to implement. Implement this later

    ManageUser.fetchfromHostProperties(city, state)
    .then(result => {
        let sess = req.session;
        
        //console.log(result); //this is working and this is printing the output of this query
        const availableProperties = [];

        result.forEach(element =>{
           // console.log(element);
            if (element.accomodation_strength >= accomodation_Strength ){
                //console.log(element)
                var hostRentalFrom = new Date(element.chk_in_date);
                //console.log(' host from is ' + hostRentalFrom)
                var hostRentalTo = new Date(element.chk_out_date);
                //console.log('host to is  ' + hostRentalTo);
                var userRentalFrom = new Date(chk_in_date);
                //console.log('user rental from ' + userRentalFrom);
                var userRentalto = new Date(chk_out_date);
                //console.log('user rental to ' + userRentalto);

               // console.log(userRentalFrom > hostRentalFrom);
                //console.log(userRentalFrom < hostRentalTo);
                //console.log(userRentalto > hostRentalFrom);
                //console.log( userRentalto < hostRentalTo);

                if (userRentalFrom > hostRentalFrom && userRentalFrom < hostRentalTo && userRentalto > hostRentalFrom && userRentalto < hostRentalTo)
                {
                    availableProperties.push(element);
                    //console.log(result);
                  //  console.log('yes')
                }

                else{
                    // do nothing. conditions not satisfied so do not insert into the array of availabe properties
                }
            }

            

           
        }) // foreach ends here


        //console.log(availableProperties);
        //res.send(req.session);
        res.render('registered-users/view-properties',{
            properties : availableProperties,
            city : city,
            state: state
            
            // here the credentials are not needed to paass to the ejs view. Update this later
        })



    }).catch(err =>{
        console.log(err);
    })
    
}

exports.getManageCredentials = (req, res, next) => {

    let sess = req.session;
   // console.log(sess);
   // console.log('hi' + sess.userCredentials.user_name);
    
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

       // console.log(result);
    }).catch(err =>{
        console.log(err);
    })
    res.redirect('http://localhost:3000/user-login');
}


exports.postExplorePropertiesByCity = (req, res, next) => {
    const sess = req.session;
    const city_name = req.body.city;
    const state_name = req.body.state;
    ManageUser.fetchfromHostProperties(city_name, state_name)
    .then(result => {
        // result is the array of the array of the database entries of the hostProperties tha matches the citya and the state names    
        //console.log(result);
        res.render('registered-users/view-properties',{
            properties : result,
            city : city_name,
            state : state_name
            // here the credentials are not needed to paass to the ejs view. Update this later
        })
    }).catch(err =>{
        console.log(err);
    })
    
}

    

    exports.postBookProperty = (req, res, next) => {
        let sess = req.session;
        
        // property_id here is obtained from the request body
        const property_id = req.body.property_id;
        //console.log(property_id) this worked
        
        // fetch the properties array from the bookings collection as per as the property_id
        Bookings.fetchPropertyFromBookings(property_id).then(properties =>{
            // If the bookings collection has previous bookings properties will contain the array of the entries of the bookings collection
            /*
            console.log(properties);
            [ { _id: 5c659c591d80ff0dcc9e2297,
    check_in_date: '2018-01-03',
    check_out_date: '2018-01-05',
    host_id: '5c61153a55d41f32a8ac8e49',
    host_property_id: '5c61156c55d41f32a8ac8e4a' },
  { _id: 5c6fbddf38b9dd65682f019f,
    check_in_date: '2018-01-08',
    check_out_date: '2018-01-10',
    host_id: '5c61153a55d41f32a8ac8e49',
    host_property_id: '5c61156c55d41f32a8ac8e4a' },
  { _id: 5c6fc423e75ed902c8a17e29,
    check_in_date: '2018-01-01',
    check_out_date: '2018-01-02',
    host_id: '5c61153a55d41f32a8ac8e49',
    host_property_id: '5c61156c55d41f32a8ac8e4a' } ] or if not properties are not booked properties will contain []
            */ 
            
            if(properties.length === 0){
                // no properties currently booked. This will be the first property to be booked
                // So no need to mantain the array which has the properties dates which are already booked. 
                Bookings.fetchPropertyFromHostProperty(property_id).then(hostProperty => {
                    //console.log(hostProperty); this will have the hostProperty collection document. This will be passed to the page for rendering

                    // Now fetch the host details from the host collection as per as the host_id obtained from the result from hostProperty promise 
                    Bookings.fetchHostInformation(hostProperty.host_id).then(hostInformation =>{


                        //  Do not Fetch the property reviews from the review database if there are no bookings of that property. because if no one has booked this property, There are no reviews for that property
                        // In place of first , do rendering deiifrentlr
                        Review.fetchReviewsByHostPropertyId(property_id).then(reviews =>{
                            console.log(reviews);
                            res.render('registered-users/property-details-and-bookings',{
                                property_details : hostProperty,
                                property_review : reviews,
                                 bookedProperties: [],
                                 hostDetails : hostInformation                 
                                }) // rendering ends
                        }).catch(err =>{
                            console.log(err);
                        }) // Review.fetchReviewsByHostPropertyId promise ends 
                        //console.log(hostInformation); This will contain the information on the host document colllection.
                        
                    }).catch(err =>{
                        console.log(err);
                    }) // promise 2 ends here
                    
                 }).catch(err =>{
                    consolee.log(err);
                }) // promise 3 ends

            } // if ends here
            else{
                // properties are booked and this is returned in the form of array which has the entries from the bookings collection
                // this for loop will get the arrays of the dates which are booked. This information will be rendered with the response to the next page
                const propertyBookedDatesArray = []
                properties.forEach((element) =>{
                    from = new Date(element.check_in_date);
                    
                    to = new Date(element.check_out_date);
                     
                    while(from <= to){
                        x = from.toISOString().slice(0,10);
                     
                        propertyBookedDatesArray.push(x);
                        from.setDate(from.getDate() + 1);
                    } // while ends

                }) // foreach ends

               // console.log('booked dates on this property are  ' + propertyBookedDatesArray);
                // get the information on the property and pass to the page to render the information to the next page
                Bookings.fetchPropertyFromHostProperty(property_id).then(hostProperty => {
                    //console.log(hostProperty); this will have the hostProperty collection document. This will be passed to the page for rendering

                    // Now fetch the host details from the host collection as per as the host_id obtained from the result from hostProperty promise 
                    Bookings.fetchHostInformation(hostProperty.host_id).then(hostInformation =>{
                        //console.log(hostInformation); This will contain the information on the host document colllection.

                        // Fetch the property reviews from the database.
                        Review.fetchReviewsByHostPropertyId(property_id).then(reviews =>{
                            console.log(reviews);
                            res.render('registered-users/property-details-and-bookings',{
                                property_review : reviews,
                                property_details : hostProperty,
                                 bookedProperties: propertyBookedDatesArray,
                                 hostDetails : hostInformation                 
                                }) // rendering ends
                        }).catch(err =>{
                            console.log(err);
                        }) // Review.fetchReviewsByHostPropertyId promise ends 
                        
                    }).catch(err =>{
                        console.log(err);
                    }) // promise ends here
                    
                 }).catch(err =>{
                    consolee.log(err);
                }) // promise ends

                

            } // else ends
            

        }).catch(err =>{
            console.log(err);
        }) // promise ends 

    } // exports ends
    


exports.postBookProperty2 =(req, res, next) =>{

    // also from the hidden fields from the host fetch the host information so that on the page renered the user can also view the host infirmation
    
    let sess = req.session;
    // This will book the property
    const user_id = sess.userCredentials._id; 
    let date_when_property_booked = new Date();
    const check_in_date = req.body.date[0];
    const check_out_date = req.body.date[1];
    const host_id = req.body.host_id;
    console.log(host_id);
    const host_property_id = req.body.host_property_id;
   //console.log(host_property_id);
    const property_name = req.body.property_name;
    const status = true;
    const host_name = req.body.host_name;

    Bookings.bookProperty(check_in_date, check_out_date,host_id,host_property_id,status,date_when_property_booked, user_id)
    .then(result =>{

        
        //console.log(result);
        res.render('registered-users/booking-successfull',{
            check_in_date : check_in_date,
            check_out_date: check_out_date,
            host_id : req.body.host_id,
            host_property_id : host_property_id,
            property_name : property_name,
            host_name : host_name,
            host_id : host_id
        })
    }).catch(err =>{
        console.log(err);
    });

    // display the page that leads you to the view/bookings page

    
    
    
}


exports.getViewBookingsPage = (req, res, next) =>{
    let sess = req.session;
    const user_name = sess.userCredentials.user_name;
    const user_id = sess.userCredentials._id; // this is of type string
    let aux_array = [];
    Bookings.fetchCurrentlyBookedUserProperties(user_id).then(currentlyBookedProperties =>{
        if(currentlyBookedProperties.length === 0){
            // if there are no bookings of this user in the bookings table
            res.render('registered-users/view-booked-properties',{
                a : [],
                b : [],
                username : user_name,
                message : false
        }); // render ends here
    } // if ends here
        else {
            currentlyBookedProperties.forEach( (element) =>{
                Bookings.fetchPropertyDetailsFromhostProperty(element.host_property_id).then(ans =>{
                    if(aux_array.length < currentlyBookedProperties.length){
                        aux_array.push(ans)
                        if(aux_array.length === currentlyBookedProperties.length){
                            //console.log('AUX ARRAY IS ')
                            //console.log(aux_array);
                            console.log('B IS ')
                            console.log(aux_array);
                            res.render('registered-users/view-booked-properties',{
                                a : aux_array,
                                b : currentlyBookedProperties,
                                username : user_name,
                                message : false
                            }) // render ends
                        } // inner if ends
                } // if ends
                
                }).catch(err =>{
                    console.log(err);
                }) //  Bookings.fetchPropertyDetailsFromhostProperty promise ends 
            }) // forEach ends
            
        } // else ends here

    }).catch(err =>{
        console.log('error in fetching host properties from bookings')
    }) //  Bookings.fetchCurrentlyBookedHostProperties promise over
    
    
}

exports.postPropertyDetails = (req, res, next) =>{
    const sess = req.session;
    const user_name = sess.userCredentials.user_name;
    const property_id = req.body.property_id;
    Bookings.fetchPropertyDetailsFromhostProperty(property_id).then(hostPropertyDetails =>{
        Review.fetchReviewsByHostPropertyId(property_id).then(review =>{
            res.render('registered-users/property_details',{
                hostPropertyDetails : hostPropertyDetails,
                host_name : user_name,
                property_review : review
            });
        }).catch(err =>{
            console.log(err);
        }) // promise over Review.fetchReviewsByHostPropertyId
    }).catch(err =>{
        console.log(err);
    }); // promise ends 
 
    
}


exports.postRatings = (req, res, next) => {
    let sess = req.session;
    // User cannot give review on the property that he has not stayed in yet.
    const user_name = sess.userCredentials.user_name;
    const user_id = sess.userCredentials._id;
    const property_id = req.body.property_id;
    const chk_in_date_from_booking = req.body.chk_in_date_from_booking;
    const chk_out_date_from_booking = req.body.chk_out_date_from_booking;
    const bookings_database_id = req.body.bookings_database_id;

    const today = new Date();
    const check_in_date = new Date(chk_in_date_from_booking);
    const check_out_date = new Date(chk_out_date_from_booking);

    if(today < check_in_date){
        // This will make sure that if you stayed in the property then and then you can rate and review the property else not.
        res.render('registered-users/review',{
            user_name : user_name,
            user_id : user_id,
            property_id : property_id,
            isEligible : false,
            bookings_id : bookings_database_id,
            check_in_date : check_in_date,
            check_out_date : check_out_date,
            message : "It seems that you are trying to book the property that you have not still stayed. This is not allowed. Once you have a nice and comfortable stay in this property, you can automatically then be able to have reviews and suggestions"
             
        });
    }// if ends

    else{
        res.render('registered-users/review',{
            user_name : user_name,
            user_id : user_id,
            property_id : property_id,
            isEligible : true,
            bookings_id : bookings_database_id,
            check_in_date : check_in_date,
            check_out_date : check_out_date
            
        });
    }
   /* res.render('registered-users/review',{
        user_name : user_name,
        user_id : user_id,
        property_id : property_id,
         
    });
    */
}

exports.postStoreRatings = (req, res, next) =>{

    const experience = req.body.experience;
    const feedback_of_property = req.body.feedback_of_property;
    const feedback_about_host = req.body.feedback_about_host;
    const rating = req.body.selected_rating;
    const bookings_id = req.body.bookings_id;
    const user_id = req.body.bookings_id;
    const user_name = req.body.user_name;
    const chk_in_date = req.body.check_in_date;
    const chk_out_date = req.body.check_out_date;
    const property_id = req.body.property_id;
    const review = new Review(experience, feedback_of_property, feedback_about_host, rating, bookings_id, user_id, user_name,chk_in_date,chk_out_date, property_id );
    review.saveFeedback().then(result =>{
        console.log('success');
        res.redirect('/view/bookings'); // go the user dashboard
    }).catch(err =>{
        console.log(err);
    })

}

exports.getUserDashBoard = (req, res, next) =>{
    
    let sess = req.session;
    const user_name = sess.userCredentials.user_name;
    const user_id = sess.userCredentials._id; // this is of type string
    let aux_array = [];
    Bookings.fetchCurrentlyBookedUserProperties(user_id).then(currentlyBookedProperties =>{
        if(currentlyBookedProperties.length === 0){
            // if there are no bookings of this user in the bookings table
            res.render('registered-users/view-booked-properties',{
                a : [],
                b : [],
                username : user_name,
                message : false
        }); // render ends here
    } // if ends here
        else {
            currentlyBookedProperties.forEach( (element) =>{
                Bookings.fetchPropertyDetailsFromhostProperty(element.host_property_id).then(ans =>{
                    if(aux_array.length < currentlyBookedProperties.length){
                        aux_array.push(ans)
                        if(aux_array.length === currentlyBookedProperties.length){
                            //console.log('AUX ARRAY IS ')
                            //console.log(aux_array);
                            console.log('B IS ')
                            console.log(aux_array);
                            res.render('registered-users/view-booked-properties',{
                                a : aux_array,
                                b : currentlyBookedProperties,
                                username : user_name,
                                message : false
                            }) // render ends
                        } // inner if ends
                } // if ends
                
                }).catch(err =>{
                    console.log(err);
                }) //  Bookings.fetchPropertyDetailsFromhostProperty promise ends 
            }) // forEach ends
            
        } // else ends here

    }).catch(err =>{
        console.log('error in fetching host properties from bookings')
    }) //  Bookings.fetchCurrentlyBookedHostProperties promise over
    
    
        
        
}

exports.getExploreAndBookProperties = (req, res, next) =>{
    let sess = req.session;
    res.render('registered-users/startbookproperties',{
                userName : sess.userCredentials.user_name
            });
}

exports.getCancelProperty = (req, res, next) =>{
    let sess = req.session;
    const user_name = sess.userCredentials.user_name;
    const user_id = sess.userCredentials._id; // this is of type string
    let aux_array = [];
    Bookings.fetchCurrentlyBookedUserProperties(user_id).then(currentlyBookedProperties =>{
        if(currentlyBookedProperties.length === 0){
            // if there are no bookings of this user in the bookings table
            res.render('registered-users/delete-booking',{
                a : [],
                b : [],
                username : user_name,
                message : false
        }); // render ends here
    } // if ends here
        else {
            currentlyBookedProperties.forEach( (element) =>{
                Bookings.fetchPropertyDetailsFromhostProperty(element.host_property_id).then(ans =>{
                    if(aux_array.length < currentlyBookedProperties.length){
                        aux_array.push(ans)
                        if(aux_array.length === currentlyBookedProperties.length){
                            //console.log('AUX ARRAY IS ')
                            //console.log(aux_array);
                            console.log('B IS ')
                            console.log(aux_array);
                            res.render('registered-users/delete-booking',{
                                a : aux_array,
                                b : currentlyBookedProperties,
                                username : user_name,
                                message : false
                            }) // render ends
                        } // inner if ends
                } // if ends
                
                }).catch(err =>{
                    console.log(err);
                }) //  Bookings.fetchPropertyDetailsFromhostProperty promise ends 
            }) // forEach ends
            
        } // else ends here

    }).catch(err =>{
        console.log('error in fetching host properties from bookings')
    }) //  Bookings.fetchCurrentlyBookedHostProperties promise over
    
    

    
}

exports.postBookingDetails = (req, res, next) =>{
    // booking details
    let sess = req.session;
    const property_name = req.body.property_name;
    const available_from_property = req.body.available_from_property;
    const available_to_property = req.body.available_to_property;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const bookings_database_id = req.body.bookings_database_id;
    const chk_in_date_from_booking  = req.body.chk_out_date_from_booking;
    const chk_out_date_from_booking = req.body.chk_in_date_from_booking;
    const cancellation_scheme = req.body.cancellation_scheme;
    const rate = req.body.rate;
    const date_when_property_booked = req.body.date_when_property_booked;
    
    /* 
    
    } */
    res.render('registered-users/booking-details',{
            property_name : property_name,
            available_from_property : available_from_property,
            address : address,
            rate : rate,
            available_to_property : available_to_property,
            city : city,
            state : state,
            bookings_database_id : bookings_database_id.toString(),
            chk_in_date_from_booking : chk_in_date_from_booking,
            chk_out_date_from_booking : chk_out_date_from_booking,
            cancellation_scheme : cancellation_scheme,
            date_when_property_booked : date_when_property_booked
    });
}

exports.postDeleteBookings = (req, res, next) =>{
    let sess = req.session;
    const property_name = req.body.property_name;
    const available_from_property = req.body.available_from_property;
    const available_to_property = req.body.available_to_property;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const bookings_database_id = req.body.bookings_database_id;
    const chk_in_date_from_booking  = req.body.chk_out_date_from_booking;
    const chk_out_date_from_booking = req.body.chk_in_date_from_booking;
    const cancellation_scheme = req.body.cancellation_scheme;
    const rate = req.body.rate;
    const date_when_property_booked = req.body.date_when_property_booked;
    if(cancellation_scheme === "Free_cancelation")
    {
        res.render('registered-users/free-cancelation',{
            property_name : property_name,
            available_from_property : available_from_property,
            address : address,
            available_to_property : available_to_property,
            city : city,
            rate : rate,
            state : state,
            bookings_database_id : bookings_database_id,
            chk_in_date_from_booking : chk_in_date_from_booking,
            chk_out_date_from_booking : chk_out_date_from_booking,
            date_when_property_booked : date_when_property_booked 
        }) // render ends 
    }
    else{
        const cancellation_charge = 0.25 * rate;
        res.render('registered-users/paid-cancelation',{
            property_name : property_name,
            available_from_property : available_from_property,
            address : address,
            rate : rate,
            available_to_property : available_to_property,
            city : city,
            state : state,
            bookings_database_id : bookings_database_id,
            chk_in_date_from_booking : chk_in_date_from_booking,
            chk_out_date_from_booking : chk_out_date_from_booking,
            date_when_property_booked : date_when_property_booked,
            cancellation_charge : cancellation_charge 
        })
    
}
}
// mean ratings on the search page

