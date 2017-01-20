Meteor.methods({

  plaidConnectAT: function (access_token) {

    check(access_token, String);
    this.unblock();

    const plaidServer = process.env['PLAID_SERVER'];
    const apiEndPoint = plaidServer+'/connect/get';

    return Meteor.http.call("POST", apiEndPoint, {
      data: {
        'client_id': process.env['PLAID_CLIENT_ID'],
        'secret': process.env['PLAID_SECRET'],
        'access_token': access_token
      },
      function (error, result)
      {
        if (error) {
          log.error('plaidConnectAT:'+error);
        } else {
          var x = JSON.parse(result.content);
          return x;
        }
        ;
      }
    })

  }

})