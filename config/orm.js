//Requiring connection parameters for Mysql connection//
var connection = require("./connection.js");

//Mysql connection//
connection.connect(function(err) {
  if (err) {
    console.error('error: ' + err.stack);
    return;
  };
  console.log('connected as: ' + connection.threadId);
});

var orm = {
  //SELECT ALL====================================================//
    selectAll: function(cb) {
      var query = "SELECT * FROM burgers"
      connection.query(query, function(err, result) {
        if (err) throw err;
        cb(result);
      });
    },
    //INSERT ONE====================================================//
    insertOne: function(burger_name, cb) {
      var query = "INSERT INTO burgers SET ?"
      connection.query(query, {
        burger_name: burger_name,
        devoured: false
      }, function(err, result) {
        if (err) throw err;
        cb(result);
      });
    },
    //UPDATE ONE====================================================//
    updateOne: function(burgerID, cb) {
      var query = "UPDATE burgers SET ? WHERE ?";
      connection.query(query, [ {devoured: true}, {id: burgerID} ], function(err, result) {
        if (err) throw err;
        cb(result);
      });
    }
};
//Export Orm object so it can be used by controller//
module.exports = orm;