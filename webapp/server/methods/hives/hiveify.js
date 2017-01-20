Meteor.methods({
  'hiveify': function () {

    this.unblock();

    console.log('method: hiveify')

    const MINHIVESIZE = 10;

    let myFP = FinancialProfile.findOne({userId: Meteor.userId()});
    let myHive = myFP.whichHive();

    let FP = FinancialProfile.find().fetch();

    console.log(myHive);

    var L0Hive = '*****';
    var L1Hive = myHive.substring(0, 1) + '****';
    var L2Hive = myHive.substring(0, 2) + '***';
    var L3Hive = myHive.substring(0, 3) + '**';
    var L4Hive = myHive.substring(0, 4) + '*';
    var L5Hive = myHive;

    var L5 = Hives.findOne({name: L5Hive});
    var L4 = Hives.findOne({name: L4Hive});
    var L3 = Hives.findOne({name: L3Hive});
    var L2 = Hives.findOne({name: L2Hive});
    var L1 = Hives.findOne({name: L1Hive});

    if (L5 != undefined && L5.members >= MINHIVESIZE) {
      var myAutoHive = L5Hive;
    } else if (L4 != undefined && L4.members >= MINHIVESIZE) {
      var myAutoHive = L4Hive;
    } else if (L3 != undefined && L3.members >= MINHIVESIZE) {
      var myAutoHive = L3Hive;
    } else if (L2 != undefined && L2.members >= MINHIVESIZE) {
      var myAutoHive = L2Hive;
    } else if (L1 != undefined && L1.members >= MINHIVESIZE) {
      var myAutoHive = L1Hive;
    } else {
      var myAutoHive = L0Hive;
    }

    FinancialProfile.update({_id: myFP._id},{$set: {autohive: myAutoHive}})
    console.log("method: hiveify : User %s autohive updated to %s",myFP._id, myAutoHive)

  }
});