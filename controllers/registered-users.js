const ManageUser  = require('../models/ManageUser');
const Bookings = require('../models/Bookings');

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
                        //console.log(hostInformation); This will contain the information on the host document colllection.
                        res.render('registered-users/property-details-and-bookings',{
                            property_details : hostProperty,
                             bookedProperties: [],
                             hostDetails : hostInformation                 
                            }) // rendering ends
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
                        res.render('registered-users/property-details-and-bookings',{
                            property_details : hostProperty,
                             bookedProperties: propertyBookedDatesArray,
                             hostDetails : hostInformation                 
                            }) // rendering ends
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
    const check_in_date = req.body.date[0];
    const check_out_date = req.body.date[1];
    const host_id = req.body.host_id;
    const host_property_id = req.body.host_property_id;
    const status = true;
    Bookings.bookProperty(check_in_date, check_out_date,host_id,host_property_id,status)
    .then(result =>{

        
        //console.log(result);
        res.render('registered-users/booking-successfull',{
            check_in_date : check_in_date,
            check_out_date: check_out_date,
            host_id : req.body.host_id,
            host_property_id : host_property_id
        })
    }).catch(err =>{
        console.log(err);
    });

    // display the page that leads you to the view/bookings page

    
    
    
}


exports.getViewBookingsPage = (req, res, next) =>{
    let sess = req.session;
    res.send(sess);
}


