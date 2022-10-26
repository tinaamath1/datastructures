"use strict"


//dependencies
const fs = require('fs');
const querystring = require('querystring');
const axios = require('axios');
const async = require('async');
const dotenv = require('dotenv');

//TAMU api key
dotenv.config();
const API_KEY = 'process.env';
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'

// geocode addresses
let meetingsData = [];
let addresses = ["109 W 129th St", "240 W 145th", "469 W 142nd St", "204 W 134th St"];

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
   
   let addressCoordinates = {
       address: "",
       latLong: []
   }
   
    let apiRequest = API_URL + '?' + querystring.stringify(query);
    console.log(apiRequest)
    (async () => {
        try {
            // 		const response = await got(apiRequest);
            console.log(apiRequest)

            // 		const response = await axios.get(apiRequest);

            axios.get(apiRequest)
                .then(function(response) {
                    // handle success
                    
                    addressCoordinates.address = value 
                    addressCoordinates.latLong.lat = OutputGeocodes[0].OutputGeocode.Latitude
                    addressCoordinates.latLong.long = OutputGeocodes[0].OutputGeocode.Longitude
                    
                    console.log(response.data)
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
    fs.writeFileSync('data/first.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in this zone: ${meetingsData.length}`);
});
