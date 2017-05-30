//**BEFORE INIT PUT npm install !! in your terminal

// I declare all global variables

const Xray = require('x-ray'); //scraper content module
const json2csv = require('json2csv');//json to csv module
const fs = require('fs');//file system module
const x = Xray();//xray function

const gmt = new Date().toString();//date to string
var date = new Date().toISOString().//date to string using ISO standard
            replace(/T/, ' ').      // replace T with a space
            replace(/\..+/, '');   // delete the dot and everything after
            date = date.substr(0,10); //and use only 10 character and delete the rest
const fields = ['Title', 'Price', 'imgURL','URL','Time'];  //fields of CSV
var dataFolder = "./data"

  x('http://shirts4mike.com/shirts.php', 'ul.products li', //I define the url and scope
  [{
    Title: x('a@href', 'img@alt'), //and select the data to scrape
    Price: x('a@href', '.price'),
    imgURL:x('a@href', 'img@src'),
    URL:('a@href','a@href')
  }])(function(err, shirts){//callback function
    //I define the variable of error message not found

    if (err) {//if it doesnt connect to server

        let errNotFound = "“There’s been a 404 error. Cannot connect to the to http://shirts4mike.com.”";

        console.log(errNotFound);
        let wstream = fs.createWriteStream('./scraper-error.log'); //create the log file
        wstream.write(`${errNotFound} [${gmt}]<error message>`);//write the message in log file
       } else {

      if (!fs.existsSync(dataFolder)) {// If ./data doesn't exist, create it
            fs.mkdirSync(dataFolder);
          } 
          
        var Time = new Date().toTimeString().split(" ")[0]; //i capture the time

        for (var i = 0; i < shirts.length; i+= 1){ //i set the time in the array with for
          shirts[i].Time = Time;
        }

        let csv = json2csv({ data: shirts, fields: fields}); //json to csv

        fs.writeFile('./data/'+ date +'.csv', csv, function(err) { //csv is written in data folder.
        if (err) throw err;
          console.log('file saved');
        });
        }
      });