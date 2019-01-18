const RegisterHost = require('../models/RegisterHost')
const RegisterHostProperty = require('../models/RegisterHostProperty');

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
    const description = req.body.description;
    const chk_in_date = req.body.chk_in_date;
    const chk_out_date = req.body.chk_out_date;

    const registerProperty = new RegisterHostProperty(host_name,host_id,property_name,property_class,address,description,chk_in_date,chk_out_date);
    registerProperty.save().then(result =>{
        console.log(result);
    }).catch(err =>{
        console.log(err)
    })


    res.send('I am handled');
}


