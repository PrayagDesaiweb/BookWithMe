const mongoDb = require('mongodb');

const getDb = require('../util/database').getDb;

class RegisterHostProperty{

    constructor(host_id, property_name, property_class,address, description,chk_in_date,chk_out_date, city, state, accomodation_strength, cancellation_scheme,specifications, amenities, rate, date_when_booked){
    
        this.host_id = host_id;
        this.property_name = property_name;
        this.property_class = property_class;
        this.address = address;
        this.description = description;
        this.chk_in_date = chk_in_date;
        this.chk_out_date = chk_out_date;
        this.city = city;
        this.state = state;
        this.accomodation_strength = accomodation_strength;
        this.cancellation_scheme = cancellation_scheme;
        this. amenities =  amenities;
        this.specifications = specifications;
        this.rate = rate;
        this.date_when_booked = date_when_booked;
    }

    save(){

        let db = getDb();
        return db.collection('hostProperty').insertOne(this)
        .then(result =>{
            //console.log(result);
        }).catch(err =>{
            //console.log(err);
        });
    }


    static fetchPropertyFromId(hostId){

        let db = getDb();
        return db.collection('hostProperty').findOne({_id : new mongoDb.ObjectId(hostId)}).then(result =>{
            console.log(result);
        }).catch(err =>{
            console.log(err)
        });
    }
}

module.exports = RegisterHostProperty;