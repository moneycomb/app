Meteor.methods({

  // https://plaid.com/docs/#delete-user

  plaidDeleteUser: function (access_token) {

    check(access_token, String);

    this.unblock();

    const plaidServer = process.env['PLAID_SERVER'];
    const apiEndPoint = plaidServer+'/connect/';

    return Meteor.http.call("DELETE", apiEndPoint, {
      data: {
        'client_id': process.env['PLAID_CLIENT_ID'],
        'secret': process.env['PLAID_SECRET'],
        // 'client_id': Meteor.settings.plaid_api_key,
        //'secret': Meteor.settings.plaid_secret,
        'access_token': access_token
      },

      function (error, result)
      {
        if (error) {

          //this did not end well ;-) Figure it out!
          console.log(error);

        } else {

          console.log("method: plaidDeleteUser : Account removed from Plaid");
          var x = JSON.parse(results.content);

          console.log(x.message);
        }
        ;
      }
    })
  }

})