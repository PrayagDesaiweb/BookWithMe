const mongoDb = require('mongodb');
const getDb = require('../util/database').getDb;

class Review{
    constructor (experience, feedback_of_property, feedback_about_host, rating, bookings_id, user_id, user_name,chk_in_date,chk_out_date, property_id) {
        this.experience = experience;
        this.feedback_about_host = feedback_about_host;
        this.feedback_of_property = feedback_of_property;
        this.rating = rating;
        this.bookings_id = bookings_id;
        this.user_id = user_id;
        this.user_name = user_name;
        this.chk_in_date = chk_in_date;
        this.chk_out_date = chk_out_date;
        this.property_id = property_id;
        
    }

    saveFeedback() {
        let db = getDb();
        return db.collection('feedback').insertOne(this).then(result =>{
            console.log(result);
            return result;
        }).catch(err =>{
            console.log(err);
        }) // promise ends
    }

    static fetchReviewsByHostPropertyId(host_property_id){
        let db = getDb();
        return db.collection('feedback').find({property_id:host_property_id}).toArray()
        .then(result =>{
            return result;
        }).catch(err =>{
            console.log(err);
        })
    }
}

module.exports = Review;