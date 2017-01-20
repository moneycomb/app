Meteor.methods({
  logActivity: function(type, title, text) {

    this.unblock();

    check(type, String);
    check(title,String);
    check(text,String);

    MoneyComb.addActivityFeedItem(Meteor.userId(),type,title,text)
  }
})