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


        console.log(availableProperties);
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


exports.postExplorePropertiesByCity = (req, res, next) => {
    const sess = req.session;
    const city_name = req.body.city;
    const state_name = req.body.state;
    ManageUser.fetchfromHostProperties(city_name, state_name)
    .then(result => {
        // result is the array of the array of the database entries of the hostProperties tha matches the citya and the state names    
        console.log(result);
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

exports.postBookProperty = (req, res, next) =>{
    let sess = req.session;

    const property_id = req.body.property_id;
    // fetch the properties detail from the database according to the property_id
    ManageUser.fetchPropertyFromPropertyId(property_id).then(result =>{
        

        // here in this page only bookings is implemented right now
        res.render('registered-users/property-details-and-bookings',{
            property_details : result
             // result is object which is document of hostProperty collection
             // https://www.airbnb.co.in/rooms/plus/14741205?location=Dallas%2C%20Texas%2C%20United%20States&adults=2&guests=1&s=scBf0ZlJ this is how yoy make the web page
        })
        //console.log(result);
    }).catch(err =>{
        console.log(err);
    });


    // Him and I hasley, G-easy


    
}


exports.postBookProperty2 =(req, res, next) =>{
    let sess = req.session;
    const check_in_date = req.body.date[0];
    const check_out_date = req.body.date[1];
    const host_id = req.body.host_id;
    const host_property_id = req.body.host_property_id;
    Bookings.bookProperty(check_in_date, check_out_date,host_id,host_property_id)
    .then(result =>{
        //console.log(result);
    }).catch(err =>{
        console.log(err);
    })
    
    res.send(req.body);
}