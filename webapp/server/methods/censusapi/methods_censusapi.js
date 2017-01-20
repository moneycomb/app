// http://geocoding.geo.census.gov/geocoder/geographies/address?street=
// 121+Parmalee+Court&city=Cary&state=NC&benchmark=Public_AR_Census2010&
// vintage=Census2010_Census2010&layers=14&format=json

Meteor.methods({

  census_lookup: function (street, city, state) {

    this.unblock();

    check(street,String);
    check(city,String);
    check(state,String);

    var query_string = "street=" + street;
    query_string = query_string + "&city=" + city;
    query_string = query_string + "&state=" + state;

    var append = "&benchmark=Public_AR_Census2010&vintage=Census2010_Census2010&layers=14&format=json";


    return Meteor.http.call("GET", "http://geocoding.geo.census.gov/geocoder/geographies/address", {
        query: encodeURI(query_string) + append
      },
      function (error, result) {
        if (error) {

          //todo handle MFA error and go through that dance...

          console.log(error);
        } else {
          //console.log(result.content);

          console.log("here...");
          var x = JSON.parse(result.content);
          console.log(x);
          console.log(result.content);

        };
      })
},


})
;
