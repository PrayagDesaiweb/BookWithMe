const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient; // calling the mogodb client costructor

let url = "mongodb://localhost:27017/demodb";

let _db // this underscore variable is used in this file only to fetch the type of database schema

const mongoconnect = (callback) => { // callback function passed on creating and connecting application to the database server
    mongoClient.connect(url,{useNewUrlParser:true}).
    then(client =>{
        console.log('Connected');
            _db = client.db()
            callback(client);
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




/* Error in connecting database
(node:24668) UnhandledPromiseRejectionWarning: MongoNetworkError: failed to connect to server [localhost:27017] on first connect [MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017]
    at Pool.<anonymous> (C:\Users\Hp\Desktop\web-dev\BookWithMe\node_modules\mongodb-core\lib\topologies\server.js:564:11)
    at Pool.emit (events.js:182:13)
    at Connection.<anonymous> (C:\Users\Hp\Desktop\web-dev\BookWithMe\node_modules\mongodb-core\lib\connection\pool.js:317:12)
    at Object.onceWrapper (events.js:273:13)
    at Connection.emit (events.js:182:13)
    at Socket.<anonymous> (C:\Users\Hp\Desktop\web-dev\BookWithMe\node_modules\mongodb-core\lib\connection\connection.js:246:50)
    at Object.onceWrapper (events.js:273:13)
    at Socket.emit (events.js:182:13)
    at emitErrorNT (internal/streams/destroy.js:82:8)
    at emitErrorAndCloseNT (internal/streams/destroy.js:50:3)
(node:24668) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a
catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
(node:24668) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code. */