const MongoClient = require('mongodb').MongoClient;


// provides a thin wrapper
export default class MongoConnector {
    constructor(config){
        this._config = config;    
    }
    async connect(onSuccess, onFailure) => {
        try {
            const client = await MongoClient.connect(uri,{ useNewUrlParser: true });
            this.db = client.db(dbName);
            const collectionName = 'prospects';
            
            client.close();
      } catch(e) {
        console.error(e)
      }
    }

    async insertCollection (collectionName, data) => {
      return new Promise(function (resolve, reject) {
        this.db.collection(collectionName).insertMany(data, function (error, result) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    }
}


// Connect to the db

/*
const queryCollection = (name, query, db) => {
  return new Promise(function (resolve, reject) {
    db.collection(name).find(query).toArray(function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
} 
*/


