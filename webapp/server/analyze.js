Meteor.methods({

  analyze: function (type) {
    this.unblock();

    check(type, String);

    var cursor = Transactions.find();
    console.log(cursor.count());


    // set up cells
    var pods = Pods.find();
    pod_id = {};
    pods.forEach(function (pod) {
      pod_id[pod.abbrev] = pod._id;
    });


    // Lets set up the categories
    var categories = Categories.find();
    Cat2Pod = {};

    categories.forEach(function (cat) {
      Cat2Pod[cat.category_id] = cat.pod;
    });


    cursor.forEach(function (transaction) {

      // here we go with the rules

      // Red Flags

      if (_.contains(['10001000','10000000','10007000'],transaction.category_id)) {
        Transactions.update({_id: transaction._id}, {$set: {redflag: true}});
        console.log("Red flag! " + transaction.name);
      }

      if (transaction.amount >= 1000) {
        console.log("A big one!" + transaction.name);

      }


      // General pod rules

      if (transaction.category_id !="") {
        var pod = Cat2Pod[transaction.category_id];

        console.log(transaction.name + ":" + transaction.category_id + "->"+pod);
        Transactions.update({_id: transaction._id}, {$set: {pod: pod_id[pod]}});
      }

      // Shopping
      //if (_.contains(['19018000'],transaction.category_id)) {
      //
      //  console.log("Shopping....dress or Nest?" + transaction.name);
      //  Transactions.update({_id: transaction._id}, {$set: {pod: pod_id[1]}});
      //}



      // Flag travel based on distance...what?! ;-)
      if (transaction.meta.location.coordinates) {

        var mylat = 35.832504;
        var mylong = -79.067467;

        var transLat = transaction.meta.location.coordinates.lat;
        var transLong = transaction.meta.location.coordinates.lon;

        var rangeThreshold = 40000;

        if (distanceBetween(mylat,mylong,transLat,transLong) > rangeThreshold) {

          console.log("Distant! " +transaction.name);
          Transactions.update({_id: transaction._id}, {$set: {pod: pod_id[8]}});

        };

      }

    });

  }

});


function distanceBetween(lat1,lon1,lat2,lon2) {

  var R = 6371000; // metres
  var LA1 = lat1* Math.PI / 180;
  var LA2 = lat2* Math.PI / 180;
  var deltaOne = (lat2-lat1)* Math.PI / 180;
  var deltaTwo = (lon2-lon1)* Math.PI / 180;

  var a = Math.sin(deltaOne/2) * Math.sin(deltaOne/2) +
    Math.cos(LA1) * Math.cos(LA2) *
    Math.sin(deltaTwo/2) * Math.sin(deltaTwo/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;

  return d;

}




