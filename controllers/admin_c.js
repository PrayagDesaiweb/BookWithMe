exports.postbecomeHost = (req,res,next) =>{
    console.log(req.body);
    res.send('I am handled');
}