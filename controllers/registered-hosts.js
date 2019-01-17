const RegisterHost = require('../models/RegisterHost')

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
    const address = req.body.address;
    const description = req.body.description;
    const chk_in_date = req.body.chk_in_date;
    const chk_out_date = req.body.chk_out_date;


    res.send('I am handled');
}