

exports.getIndexPage = (req, res, next) =>{
    res.render('non-registered-users/index',{
        title:'Index page',
    });
}

exports.getbecomeHost = (req, res, next) => {
    res.render('non-registered-users/become_certified_host');
}

exports.getbecomeUser = (req, res, next) => {
    res.render('non-registered-users/become-registered-user');
}

exports.getuserLogin = (req, res, next) => {
    res.send('this is the user login page');
}