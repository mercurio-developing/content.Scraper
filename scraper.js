// i declare all variables

const Xray = require('x-ray'); //scraper content module
const json2csv = require('json2csv');//json to csv module
const fs = require('fs');//fily system module
const x = Xray();//xray function

const gmt = new Date().toString();//date to string
var date = new Date().toISOString().//date to string using ISO standard
            replace(/T/, ' ').      // replace T with a space
            replace(/\..+/, '')     // delete the dot and everything after
            date = date.substr(0,10) //and save only 10 character, i remove next part

x('http://shirts4mike.com/shirts.php', 'ul.products li', //i define the url and scope
[{
  Title: x('a@href', 'img@alt'), //and select the date to scrape
  Price: x('a@href', '.price'),
  imgURL:x('a@href', 'img@src'),
  URL:('a@href','a@href')
}])(function(err, obj){//callback function
  //i define the variable of error message not found
  let errNotFound = "“There’s been a 404 error. Cannot connect to the to http://shirts4mike.com.”"

  if (err) {//if not connect to server
      console.log(errNotFound)
      let wstream = fs.createWriteStream('./scraper-error.log'); //create the log file
      wstream.write(`${errNotFound} [${gmt}]<error message>`);//write the message in log file
     }

  const fields = ['Title', 'Price', 'imgURL','URL'];  //fields of CSV
  let csv = json2csv({ data: obj, fields: fields}); //json to csv
  fs.writeFile('./data/'+ date +'.csv', csv, function(err) { //csv is write in data folder.
  if (err) throw err;
    console.log('file saved');
  });
});
