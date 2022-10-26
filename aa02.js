// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

var allMeetings =[] 


// load the cheerio object into a variable, `content`
// which holds data and metadata about the html file (written as txt)
var content = fs.readFileSync('data/m08.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

$('tr').each(function(i, elem) {
    if ($(elem).attr("style")=="margin-bottom:10px") {
        let row = $(elem).html();
        parseZones(row);
        console.log('*************')
        

                // var thisMeeting = {}; // Your function and data collection go here! 
                
            
            }
        });

    // create a function 

    function parseZones (rawText) {
        // create an object to hold locationName, addressName, address, directionInstructions, state, and zipCode
        
          // get metadata
        const meetings = rawText.split("</td>")[0]
        console.log (meetings)
    //     // const meetingDays_arr = rawText.split('\t\t\t\t  \t    <b>').slice(2)
    //     // console.log (meetingDays_arr) 
        
        
    //     // const locationDetails = {}
    //     // locationDetails.locationName = rawText.split('h4 style="margin:0;padding:0')[1].split('</h4><br>')[0].split(';">')[1]
    //     // locationDetails.addressName = rawText.split('\t\t\t\t  \t    <b>')[1].split('</b><br>\n')[0]
    //     // locationDetails.address = rawText.split('\t\t\t\t\t\t')[1].split(', \n')[0];
    //     // // locationDetails.directionInstructions= rawText.split('<b>')[1].split("<br>")[2].replace("\t\t\t\t\t\t",'').trim()//.split('\t\t\t\t\t\t<br>(')[1]//.split('\n')[0]
    //     // // locationDetails.state= 'NY';
    //     // locationDetails.zipCode= rawText.match(/(\d{5})/g);//.split(" NY ")[1].slice(0,5)
    //     // locationDetails.wheelChairAccess= rawText.includes('Wheelchair Access');
    //     // locationDetails.meetings=[]
    //     // console.log(locationDetails)
        
    
    //     const meetingDays_arr = rawText.split("</td>")[1].split('\t\t\t\t  \t    <b>').splice(1)
    //     console.log (meetingDays_arr)  
    //     // meetings = []

    // //meeting times 
        
    //      for (let i = 1; i < meetingDays_arr.length; i ++ ) {
        
    //     let newmeeting = meetingDays_arr[i];
    
        
    //     let days = newmeeting.split(" ")[0];
    //     let startTime = newmeeting.split(" From</b>  ")[1]//.substring(8);
    //     let endTime = newmeeting.split(" <b>to</b> ")[2]//.substring(8);
        
    //     // allMeetings.push(meetingDetails)
        
    //      }
        

    //     // console.log (meetingDetails)
          
    
    

    
    
    
//     // log trs
//     function logTrs (tr) {
//         console.log(tr)
//         console.log('*************')
//         // console.log(meetings)
//         console.log('*************')
//         meetings.push(tr)
//         // console.log(meetings.length)
        
//     }    
     }
//  parseZones(content)