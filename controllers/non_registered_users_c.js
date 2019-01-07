

exports.getIndexPage = (req, res, next) =>{
    res.render('non-registered-users/index',{
        title:'Index page',
    });
}