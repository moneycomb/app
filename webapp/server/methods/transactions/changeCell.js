Meteor.methods({
  changeCell: function (id,newcell) {
    if (!Meteor.userId()) {
      return "NOT LOGGED IN";
    } else {
      Transactions.update({userId: Meteor.userId(), _id: id}, {$set: {cell: newcell }});
      return "SUCCESS";
    }
  }
});




