// See: http://docs.meteor.com/api/passwords.html
import { Accounts } from 'meteor/accounts-base';

Accounts.emailTemplates.siteName = "Moneycomb";
Accounts.emailTemplates.from = "Moneycomb Support <info@mymoneycomb.com>";
Accounts.emailTemplates.resetPassword.from = function() {
  return "Moneycomb Support <info@mymoneycomb.com>";
};

Accounts.emailTemplates.resetPassword.subject = function() {
  return "Reset your MoneyComb password";
};


// this is a kludge to change the harshly worded "login forbidden" message
// see: https://github.com/meteor-useraccounts/core/issues/216
var myMsg = "Incorrect Login";
Accounts.validateLoginAttempt(function(attempt){
  if (attempt.error){
    var reason = attempt.error.reason;
    if (reason === "User not found" || reason === "Incorrect password")
      throw new Meteor.Error(403, myMsg);
  }
  return attempt.allowed;
});

/*
Accounts.onResetPasswordLink( function(token, done) {
  console.log("Password reset for user " + Meteor.userId());
  window.location('http://www.mymoneycomb.com');
});

    */
