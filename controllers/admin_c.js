const RegisterHost = require('../models/RegisterHost');

exports.postbecomeHost = (req,res,next) =>{

    console.log(req.body)
    //res.send('I am served')

    const name = req.body.name;
    const email = req.body.password;
    const password = req.body.password;
    const contactNo = req.body.contactNo;
    const registered_host = new RegisterHost(name, email, password, contactNo);
    registered_host.save().then(result =>{
        console.log(result);
    }).catch(err => {
        console.log(err)
    })

}