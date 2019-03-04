import NhlApiScraper from "./nhl-scraper.mjs";

// urls
//const urls = ["https://statsapi.web.nhl.com/api/v1/draft/2016", "https://statsapi.web.nhl.com/api/v1/people/"];
const urls = ["https://statsapi.web.nhl.com/api/v1/draft/2016", "https://statsapi.web.nhl.com/api/v1/draft/2010"];
const baseUrl = "https://statsapi.web.nhl.com"
const years = [2016,2017,2018]

const scraper = new NhlApiScraper(baseUrl, urls);

const testurl = urls[0];
const xhr = new XMLHttpRequest();

scraper.enrichProspectData();

//
const dbConfig = {
    const uri = 'mongodb://localhost:27017'; 
    const dbName = 'fantasy';
}




/*
scraper.simpleGET('json').then((retr) => {
    console.log(retr);
}).catch((error) => {
    console.log(error);
});
*/
