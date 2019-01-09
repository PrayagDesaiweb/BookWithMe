const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient; // calling the mogodb client costructor

let url = "mongodb://localhost:27017/practiceBookWithMe";

let _db // this underscore variable is used in this file only to fetch the type of database schema

const mongoconnect = (callback) => { // callback function passed on creating and connecting application to the database server
    mongoClient.connect(url,{useNewUrlParser:true}).
    then(client =>{
        console.log('Database connection successfull')
        callback(client)
    })
    .catch(err =>{
        console.log('Error in connecting database');
        throw err;
    })
}
 // this function connects to the database _db or else returns error on not finding database
const getDb = () =>{
    if(_db)
    {
        return _db;
    }
    else{
        throw 'No database found';
    }
}

exports.mongoconnect = mongoconnect;
exports.getDb = getDb;
