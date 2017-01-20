/*****************************************************************************/
/* Step2: Event Handlers */
/*****************************************************************************/
Template.Step2.events({

  'click .proceed': function(e,t) {

    var allocation = MoneyComb.recommendedAllocation(Meteor.userId());
    _.extend(allocation, {userId: Meteor.userId()});
    let A = Allocations.findOne({userId: Meteor.userId()})

    if (A != undefined) {
      Allocations.update(A._id, {$set: allocation})
    } else {
      console.log('Inserting Allocation(Plan) for the first time')
      Allocations.insert(allocation)
    }

    Meteor.call('updateSpendStatistics', function(error,result) {
      Meteor.call('updateMyPurchasePlaces',Meteor.userId());
    });

    Router.go('/ob/step3');

  },


  'click .linklater': function(e,t) {

    var allocation = MoneyComb.recommendedAllocation(Meteor.userId());
    _.extend(allocation, {userId: Meteor.userId()});
    let A = Allocations.findOne({userId: Meteor.userId()})

    if (A != undefined) {
      Allocations.update(A._id, {$set: allocation})
    } else {
      console.log('Inserting Allocation(Plan) for the first time')
      Allocations.insert(allocation)
    }

    Meteor.call('updateSpendStatistics', function(error,result) {
      Meteor.call('updateMyPurchasePlaces',Meteor.userId());
    });

    Router.go('/dashboard');

  },


  'click .plaid-link': function (event,t) {

      var plaidlinkHandler = Plaid.create({
        env: Meteor.settings.public.plaid_env,
        clientName: 'your Moneycomb account',
        key: '505704614c705498646afea6bffe29',   // 505704614c705498646afea6bffe29
        product: 'connect',
        longtail: true,
        onSuccess: function (public_token) {

          Meteor.call('plaidExchange', public_token, function (error, results) {

            if (error) {
              console.log("plaidExchange: An error has occured:");
              console.log(error);
              return error
            }

            // console.log('Exchange success');
            // console.log(results.content);
            var blob = JSON.parse(results.content);
            var access_token = blob.access_token;


            //Now get the accounts and transactions usiing the access token

            Meteor.call('plaidConnectAT', access_token, function (error, results) {

              if (error) {
                console.log("An error has occured:");
                console.log(error);
                return error
              }

              var blob = JSON.parse(results.content);
              var accounts = blob.accounts;
              var transactions = blob.transactions;

              Meteor.call('plaidAddAccounts', accounts, access_token);

              Meteor.call('plaidAddTransactions', transactions, function(err,result) {
                Meteor.call('updateSpendStatistics');
              });


              mixpanel.track("Linked an account");

                
            });

          });
        }
      });

      plaidlinkHandler.open();

  }
});

/*****************************************************************************/
/* Step2: Helpers */
/*****************************************************************************/
Template.Step2.helpers({

  accounts: function() {
    return FinAccounts.find({userId: Meteor.userId()});
  },

  haveAccounts: function () {
    let num = FinAccounts.find({userId: Meteor.userId()}).count();

    return (num != 0);
  },

  categorizationPct: function() {
   

    // console.log("here...");
    //return "Yo";
  }

});

/*****************************************************************************/
/* Step2: Lifecycle Hooks */
/*****************************************************************************/
Template.Step2.onCreated(function () {

  // Let's call the spendStats just to creat a blank Analysis record.
  // Important if the user does not link and account right away and then tries to go to the dashboard...
  Meteor.call('updateSpendStatistics');

  this.haveSufficientCategorization = new ReactiveVar(false);

  var self = this;
  self.autorun(function () {

    self.subscribe('accounts');
  });
});

Template.Step2.onRendered(function () {
  mixpanel.track("Sign Up - Viewing Link Account");
});

Template.Step2.onDestroyed(function () {
});
