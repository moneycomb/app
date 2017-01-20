Meteor.methods({

  analyzeCredit: function (userId) {

    this.unblock();
    console.log("method: analyzeCredit: SERVER METHOD: Analyze Credit Start");

    check(userId, String);

    var starttime = new Date().getTime();

    var analysis = {}


    var FA = FinAccounts.find({
      userId: userId,
      type: 'credit',
    }).fetch();

    analysis.numCreditCards = 0;
    analysis.totalCreditLimit = 0;
    analysis.totalCreditBalance = 0;

    _.each(FA, function (account) {
      analysis.numCreditCards++;
      analysis.totalCreditLimit += account.balance.available
      analysis.totalCreditBalance += account.balance.current
      console.log(account.type);
    });

    analysis.creditratio = analysis.totalCreditBalance / analysis.totalCreditLimit

    console.log(analysis);

    var endtime = new Date().getTime();
    var time = endtime - starttime;
    console.log('method: analyzeCredit: SERVER METHOD: Analyze Credit END. Elapsed time=' + time);

    console.log("method: analyzeCredit: Analysis - updated");
    Analysis.update({userId: Meteor.userId()},
      {
        $set: {
          creditanalysis: analysis,
        }
      });
  }

});

