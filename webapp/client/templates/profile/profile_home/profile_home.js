/*****************************************************************************/
/* ProfileHome: Event Handlers */
/*****************************************************************************/
Template.ProfileHome.events({

  'click .action-delete': function(e,t) {
    $('.delete-modal')
      .modal({
        closable  : true,
        onDeny    : function(){
          return false;
        },
        onApprove : function() {
          console.log("I would delete the account here....")
          Meteor.call('deleteMyAccount', function() {
            Meteor.logout(function () {
              Router.go('/');
            })
          })
        }
      })
      .modal('show')
  },

  'submit form .personal-info': function (e, t) {
    e.preventDefault();

    console.log(e);
    console.log(t);


    // todo add kids or not to profile

    var first_name = e.target.first_name.value;
    console.log(first_name);

    var last_name = e.target.last_name.value;
    console.log(last_name);
    var email = e.target.email.value;
    console.log(email);
    var gender = e.target.gender.value;
    console.log(gender);
    var age = e.target.age.value;
    console.log(age);
    var income = e.target.income.value;
    console.log(income);
    var pay_period = e.target.pay_period.value;

    var zipcode = e.target.zipcode.value;
    var status = e.target.status.value;
    var rentown = e.target.rentown.value;

    //todo STRONG checking of arguments;


    Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.first_name': first_name,
        'profile.last_name': last_name,
        'profile.age': age,
        'profile.gender': gender,
        'profile.income': income,
        'profile.pay_period': pay_period,
        'profile.zipcode': zipcode,
        'profile.status': status,
        'profile.rentown': rentown
      }
    });


    sAlert.success('Profile updated successfully.');


    /* Router.go("/"); */

  },

  'click .action-accounts': function () {
    Router.go("/accounts");
    //href="{{pathFor "accounts.list"}}"
  },

  'click .action-debts': function () {
    Router.go("/debts");
  },

  'click .action-advanced': function () {
    Router.go("/profile/advanced");
  },

  'click .action-quiz': function () {
    Router.go("/profile/quiz");
  }

});

/*****************************************************************************/
/* ProfileHome: Helpers */
/*****************************************************************************/
Template.ProfileHome.helpers({

  fp: function() {
    return FinancialProfile.findOne({userId: Meteor.userId()});
  },

  hive: function() {
    let FP = FinancialProfile.findOne({userId: Meteor.userId()});
    return Hives.findOne({name: FP.autohive});
  }

});

/*****************************************************************************/
/* ProfileHome: Lifecycle Hooks */
/*****************************************************************************/
Template.ProfileHome.onCreated(function () {
  if (! Meteor.userId() ) { Router.go('/login')};
  // Subscribe to subscriptions at the Template level
  var self = this;

  self.autorun(function () {
    //self.subscribe('moneymindset');
    //self.subscribe('financialprofile');
    //self.subscribe('allocation');
  });

});

Template.ProfileHome.onRendered(function () {

});

Template.ProfileHome.onDestroyed(function () {
});
