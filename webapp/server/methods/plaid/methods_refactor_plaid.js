/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

//PLAID ERROR CODE REFERENCE
//Error Code Details
//100X: Bad Request
//110X: Unauthorized
//120X: User Authentication Invalid
//130X: Institutions Error
//140X: Entities Error
//150X: Categories Error
//160X: Item Missing
//170X: Server Error
//180X: Planned Maintenance

//var Plaid = Meteor.npmRequire('plaid');

//var client_id = Meteor.settings.public.plaid_client_id;
//var secret = Meteor.settings.public.plaid_secret;
//var env = Meteor.settings.public.plaid_env;


//var client_id = process.env.PLAID_CLIENT_ID;
//var secret = process.env.PLAID_SECRET;
//var env = process.env.PLAID_ENV;

//var plaidClient = new Plaid.Client(client_id, secret, Plaid.environments.tartan);

Meteor.methods({


  plaidRetrieveTransactions: function (access_token, options) {

    check(access_token, String);
    check(options, String);

    //todo add the ability to retrieve transactions with options

    this.unblock();

    const plaidServer = process.env['PLAID_SERVER'];
    const apiEndPoint = plaidServer+'/connect/get';

    return Meteor.http.call("POST", apiEndPoint, {
      data: {
        'client_id': process.env['PLAID_CLIENT_ID'],
        'secret': process.env['PLAID_SECRET'],
        //'client_id': Meteor.settings.plaid_api_key,
        //'secret': Meteor.settings.plaid_secret,
        'access_token': access_token

      },

      function (error, result)
      {
        if (error) {

          //todo handle errors gracefully

          console.log(error);
        } else {

          //console.log(result.content);

          console.log("here...");
          var x = JSON.parse(results.content);
          console.log(x);

        }
        ;
      }
    })
  }

});
