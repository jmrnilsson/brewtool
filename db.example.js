// io.on('calculated-abv', function (data) {
//   var gravity =
//   {
//     session: session,
//     timestamp: moment.utc().valueOf(),
//     originalGravity: data.originalGravity,
//     finalGravity: data.finalGravity
//   };
//   db.gravities.add(gravity);
// });

// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');
//
// db.serialize(function() {
//   db.run("CREATE TABLE tGravity (session TEXT, timestamp INTEGER, originalgravity REAL, finalgravity REAL)");
//   db.run("CREATE TABLE tSense (session TEXT, timestamp INTEGER, celsius REAL)");
//
//   var stmt = db.prepare("INSERT INTO tGravity VALUES (?, ?, ?, ?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run('a'+1, 11000, 1.5, 1.2 + 0.1 * i);
//   }
//   stmt.finalize();
//
//   db.each("SELECT rowid AS id, session, timestamp, originalgravity, finalgravity FROM tGravity", function(err, row) {
//     console.log(err);
//       console.log(row.id + ": " + row.session + ", " + row.timestamp + ", " + row.originalgravity + ", " + row.finalgravity);
//   });
// });
//
// db.close();