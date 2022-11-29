"use strict"


//dependencies
const fs = require('fs');
const querystring = require('querystring');
const axios = require('axios');
const async = require('async');
const dotenv = require('dotenv');

//TAMU api key
dotenv.config();
const API_KEY = process.env.SECRET_KEY;
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'

// geocode addresses
let meetingsData = [];
let addresses = JSON.parse(fs.readFileSync("addressData"));


// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    let query = {
        streetAddress: value,
        city: "New York",
        state: "NY",
        apikey: API_KEY,
        format: "json",
        version: "4.01"
    };

    // construct a querystring from the `query` object's values and append it to the api URL
   
   const addressCoordinates = {
       address: "",
       latLong: []
   }
   
    let apiRequest = API_URL + '?' + querystring.stringify(query);
    
    (async () => {
        try {
            // 		const response = await got(apiRequest);
            console.log(apiRequest)

            // 		const response = await axios.get(apiRequest);



            axios.get(apiRequest)
                .then(function(response) {
                    // handle success
                    const geo = response.data.OutputGeocodes[0].OutputGeocode
                    // console.log(geo)
                    addressCoordinates.address = value 
                    addressCoordinates.latLong.lat = geo.Latitude
                    addressCoordinates.latLong.long = geo.Longitude
                    
                    // console.log(response.data)
                    meetingsData.push(addressCoordinates);

                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                })
                .finally(function() {
                    // always executed
                });

        }
        catch (error) {
            console.log(error.response);
        }
    })();

    // sleep for a couple seconds before making the next request
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync('first.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in this zone: ${meetingsData.length}`);
});
