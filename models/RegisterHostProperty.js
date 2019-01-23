const mongoDb = require('mongodb');

const getDb = require('../util/database').getDb;

class RegisterHostProperty{

    constructor(host_name, host_id, property_name, property_class,address, description,chk_in_date,chk_out_date, city, state){
        this.host_name = host_name;
        this.host_id = host_id;
        this.property_name = property_name;
        this.property_class = property_class;
        this.address = address;
        this.description = description;
        this.chk_in_date = chk_in_date;
        this.chk_out_date = chk_out_date;
        this.city = city;
        this.state = state;
    }

    save(){

        let db = getDb();
        return db.collection('hostProperty').insertOne(this)
        .then(result =>{
            console.log(result);
        }).catch(err =>{
            console.log(err);
        });
    }
}

module.exports = RegisterHostProperty;