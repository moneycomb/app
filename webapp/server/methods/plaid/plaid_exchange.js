Meteor.methods({

  plaidExchange: function (public_token) {

    check(public_token, String);
    this.unblock();

    const plaidServer = process.env['PLAID_SERVER'];
    const apiEndPoint = plaidServer+'/exchange_token';

    console.log('method: plaidExchange : Plaid API endpoint = '+apiEndPoint);
    console.log('method: plaidExchange : Public token='+ public_token);

    return Meteor.http.call("POST", apiEndPoint, {
      data: {
        'client_id': process.env['PLAID_CLIENT_ID'],
        'secret': process.env['PLAID_SECRET'],
        'public_token': public_token
      }
    });
  }

})