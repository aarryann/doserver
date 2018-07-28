/**
Database Singleton Object

database.js is used throughout the app to access the db object. To use this 
singleton object simply require it and either call getDB() or setDB(). The 
idea is to use setDB in app.js just after we connect to the db and receive 
the db object, then in any other file we need the db require and call getDB
**/

const singleton = (() => {
  let instance; //Singleton Instance
  function init() {
    let _db; //Instance db object (private)

    return {
      //Gets the instance's db object
      getDB: function() {
        return _db;
      },

      //Sets the instance's db object
      setDB: function(db) {
        _db = db;
      }
    };
  }

  return {
    //getInstance returns existing instance or creates a new one if not present
    getInstance: function() {
      if (!instance) {
        instance = init();
      }

      return instance;
    }
  };
})();

module.exports = singleton.getInstance(); 