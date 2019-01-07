

exports.getIndexPage = (req, res, next) =>{
    res.render('non-registered-users/index',{
        title:'Index page',
    });
}

exports.getbecomeHost = (req, res, next) => {
    res.render('non-registered-users/become_certified_host');
}