var Venue = require('../../models/venues');


module.exports = function getBars(bars){
    let arr = []
    return new Promise( (resolve, reject) => {
        let barResults = bars.businesses.length
        bars.businesses.map((bar) => {
            Venue.findOne({
                id: bar.id,
                name: bar.name,
                address: bar.location.address1,
                link: bar.url,
                image: bar.image
            }, (err, venue) => {
                if(!venue){
                    let d = new Date();
                    d.setDate(d.getDate() + 1)
                    d.setHours(10)
                    d.setMinutes(0)
                    d.setSeconds(0);
                    
                    var expDate = d;
                    
                    let newVenue = new Venue({
                        id: bar.id,
                        name: bar.name,
                        address: bar.location.address1,
                        link: bar.url,
                        image: bar.image,
                        expirationDate: expDate
                        
                    }).save((err, venue) => {
                        if(err) reject(err);
                        arr.push(venue)
                        if(arr.length === barResults){
                            resolve(arr)
                        }
                    })
                } else {
                    arr.push(venue)
                    if(arr.length === barResults){
                        resolve(arr)
                    }
                }
            })
        })
    })
}