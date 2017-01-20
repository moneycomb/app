/*
Meteor.autorun(function () {

    Meteor.setInterval(function() {

        console.log("checking for inactivity...");
        const period = 120;

        const period_time_ago = moment().subtract(period,"minutes");
        const last_activity = moment(Session.get("last_activity"));

        if ( last_activity.isBefore(period_time_ago)) {
            console.log(`Client logout due to ${period} minutes of inactivity`);
            Meteor.logout();
            Router.go("/");
        }
    }, 600000);

});

    */