

exports.getIndexPage = (req, res, next) =>{
    res.render('non-registered-users/index',{
        title:'Index page',
    });
}

exports.getbecomeHost = (req, res, next) => {
    res.render('non-registered-users/become_certified_host',{
        duplicateMessage : false
    });
}

exports.getbecomeUser = (req, res, next) => {
    res.render('non-registered-users/become-registered-user',{
        duplicateMessage : false
    });
}

exports.getuserLogin = (req, res, next) => {
    res.render('non-registered-users/user_login',{
        message : false
    });
}

exports.gethostLogin = (req, res, next) => {
    res.render('non-registered-users/host_login',{
        message : false
    });
}   