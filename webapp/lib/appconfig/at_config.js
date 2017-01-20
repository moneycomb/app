
/*
Accounts.config({
    loginExpirationInDays: 0.8,
});
*/

AccountsTemplates.configure({
    defaultLayout: 'MasterLayout',
});

AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    enforceEmailVerification: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: false,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 500,

    // Hooks
    onLogoutHook: function () {
        Router.go('/');
        window.location = "http://www.mymoneycomb.com";
        console.log(Meteor.user().primaryemail() + ' logged out');
    },

    /*
    onSubmitHook: function () {
      Router.go('/');
    },
    */

    postSignUpHook: function (userId, info) {
        console.log("postSignUp Hook...");
    },

    texts: {
        navSignIn: "Log In",
        navSignOut: "Logout",
        button: {
            signUp: "Sign Up!",
            signIn: "Log In",
        },
        socialSignUp: "Register",
        resendVerificationEmailLink_pre: "Verification email lost?",
        resendVerificationEmailLink_link: "Send again",
        title: {
            forgotPwd: "Forgot Your Password?"
        },

        title: {
            changePwd: "Change your password",
            enrollAccount: "Enroll Title",
            forgotPwd: "Recover your password",
            resetPwd: "Reset your password",
            signIn: "",
            signUp: "",
            verifyEmail: "Verify Your MoneyComb Account",
        }
    },
});


// Available codes are: changePwd, enrollAccount, forgotPwd, resetPwd, signIn, signUp):

Accounts.onLogin(function () {

    if (Meteor.user().hasAccounts) {

        // Let's skip this check for now for mobile....speed it up?


        // Let's first see when the account was last updated
        const lastSyncedDateTime = Meteor.user().profile.lastSynced;

        const lookbackWindow = moment().subtract(8, "h");    // if time of last synced is before 4 hours ago...
        const lastSynced = ( lastSyncedDateTime != undefined ? moment(lastSyncedDateTime) : "never");

        console.log(`User ${Meteor.userId()} login, last synced on ${lastSynced}`);

        /*

        if (lastSynced != "never") {

            if (lastSynced.isBefore(lookbackWindow)) {
                console.log(`Transaction data is stale..syncing all accounts for User ${Meteor.userId()}`);
                Meteor.call('plaidSyncAllAccounts', function (err, result) {

                    if (err) console.log(err);

                    if (result.amount != 0) {
                        //sAlert.info("$" + parseFloat(result.amount).toFixed(0) + " in new spending (" + result.new + " transactions)");
                        console.log('Accounts.onLogin: updating spend statistics for user %s', Meteor.userId());
                        Meteor.call('updateSpendStatistics', function (error, result) {
                            Meteor.call('updateMyPurchasePlaces', Meteor.userId());
                        });

                    } else {
                        //sAlert.info("No new spending purchases");
                    }

                });
            }

        }*/



    } else {
        console.error('Accounts.onLogin: error : User has no associated Accounts');
    }

    // Let's timestamp the login
    let profile = Meteor.user().profile;
    profile['lastLogin'] = new Date();
    Meteor.users.update({_id: Meteor.userId()}, {$set: {profile: profile}});

});

AccountsTemplates.addField({
    _id: 'first_name',
    type: 'text',
    displayName: "First Name",
    required: true,
    min: 2,
    max: 24,
    placeholder: {
        signUp: "First Name"
    },
    func: function (value) {
        return false;
    },
    errStr: 'Only "First Name" allowed!',
});


AccountsTemplates.addField({
    _id: 'last_name',
    type: 'text',
    displayName: "Last Name",
    required: true,
    min: 2,
    max: 24,
    placeholder: {
        signUp: "Last Name"
    },
    func: function (value) {
        return false;
    },
    errStr: 'Only "First Name" allowed!',
});


AccountsTemplates.addField({
    _id: 'reg_code',
    type: 'hidden'
});

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/login',
    layoutTemplate: 'LoginLayout',
    template: 'MoneyCombSignIn',
    redirect: function () {
        Router.go('/');
    }
});

AccountsTemplates.configureRoute('signUp', {
    name: 'register',
    path: '/register',
    layoutTemplate: 'LoginLayout',
    template: 'MoneyCombSignUp',
    redirect: '/ob/info',
});

AccountsTemplates.configureRoute('resetPwd', {
    layoutTemplate: 'LoginLayout',
    redirect: function () {
        var user = Meteor.user();
        if (user)
            Router.go('/');
    }
});

AccountsTemplates.configureRoute('changePwd', {
    layoutTemplate: 'LoginLayout',
    template: 'Booger',
    redirect: function () {
        Router.go('/');
    }
});


AccountsTemplates.configureRoute('forgotPwd', {
    layoutTemplate: 'LoginLayout',
    redirect: function () {
        Router.go('/');
    }
});


AccountsTemplates.removeField('password');
AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    placeholder: {
        signUp: "Password"
    },
    required: true,
    minLength: 8,
    //re: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
    errStr: 'At least 1 digit, 1 lowercase and 1 uppercase',
});

