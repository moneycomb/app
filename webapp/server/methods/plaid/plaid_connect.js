Meteor.methods({

  plaidConnect: function (username, password, type) {

    check(username, String);
    check(password, String);
    check(type, String);

    this.unblock();
    const plaidServer = process.env['PLAID_SERVER'];
    const apiEndPoint = plaidServer+'/connect/';

    return Meteor.http.call("POST", apiEndPoint, {
      data: {
        'client_id': process.env['PLAID_CLIENT_ID'],
        'secret': process.env['PLAID_SECRET'],
        //'client_id': Meteor.settings.plaid_api_key,
        //'secret': Meteor.settings.plaid_secret,
        'type': type,
        'username': username,
        'password': password
      },
      function (error, result)
      {
        if (error) {
          //todo handle MFA error and go through that dance...
          log.error('plaidConnect:'+error);
        } else {
          var x = JSON.parse(result.content);
        }
        ;
      }
    })
  }

})