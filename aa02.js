// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

var allMeetings =[] 


// load the cheerio object into a variable, `content`
// which holds data and metadata about the html file (written as txt)
var content = fs.readFileSync('/home/ec2-user/environment/data/m08.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

$('tr').each(function(i, elem) {
    if ($(elem).attr("style")=="margin-bottom:10px") {
        allMeetings.push(parseZones($(elem).html()));
        // parseZones(row);
        // console.log('*************')
        

                // var thisMeeting = {}; // Your function and data collection go here! 
                
            
            }
        });

    // create a function 

    function parseZones (meetingInfo) {
        // create an object to hold locationName, addressName, address, directionInstructions, state, and zipCode
        
          // get metadata
        // const meetings = rawText.split("</td>")[0]
        // console.log (meetings)
  
        
    
        let aa_locationName = meetingInfo.split('h4 style="margin:0;padding:0')[1].split('</h4><br>')[0].split(';">')[1]
        let aa_addressName = meetingInfo.split('\t\t\t\t  \t    <b>')[1].split('</b><br>\n')[0]
        let aa_address = meetingInfo.split('\t\t\t\t\t\t')[1].split(', \n')[0]
        //directionInstructions= meetingInfo.split('<b>')[1].split("<br>")[2].replace("\t\t\t\t\t\t",'').trim()//.split('\t\t\t\t\t\t<br>(')[1]//.split('\n')[0]
        let state = 'NY';
        // let aa_zipCode= meetingInfo.match(/\d{5}\)
        // .split(" NY ")[1].slice(0,5)
        let aa_wheelChairAccess= meetingInfo.includes('Wheelchair Access')
       
        
        let meetingDays = meetingInfo.split('\t\t\t\t  \t    <b>').slice(2)
        let meetingsList=[]
        
    //meeting times 
    
        meetingDays.forEach(function(element){
        
        let meetingDay =  element.split(' ')[0];
        let meetingStartTime = element.split(' ')[3]+' '+element.split(' ')[4];
        let meetingEndTime = element.split(' ')[6]+' '+element.split(' ')[7];
        let meetingType = element.split(' ')[10]
                 
        
        
        allMeetings.push({
            meetingName: aa_locationName, 
            locationName: aa_addressName,
            address: aa_address,
            // zipCode: aa_zipCode,
            wheelChairAccess: aa_wheelChairAccess, 
            day: meetingDay, 
            startTime: meetingStartTime, 
            endTime: meetingEndTime,
            type: meetingType
        })
        return allMeetings 
        })
        
        console.log (allMeetings)
    };
       
        
        // fs.writeFileSync("addressData", JSON.stringify(allMeetings))
