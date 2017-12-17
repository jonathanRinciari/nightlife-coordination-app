const mongoose = require('mongoose'),
        Schema = mongoose.Schema;


const venueSchema = new Schema({
    id: String,
    name: String,
    address: String,
    attending: {type: Number, default: 0},
    image: String,
    link: String,
    expirationDate: {type: Date, expires: 0},
    usersAttending: [String]
})

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;