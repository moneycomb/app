Meteor.methods({

  analyzeEatingOut: function (userId) {

    this.unblock();

    check(userId, String);

    console.log("method: analyzeEatingOut : Analyze Eating Out Start");
    var starttime = new Date().getTime();


    var PP = MyPurchasePlaces.find({
      userId: userId,
      cell: 'eo'
    }, {sort: {date: 1}}).fetch();

    let multiple = 0;
    let total = 0;
    _.each(PP, function (place) {
      if (place.multiple === true) multiple++;
      total++;
    });



// Benchmark execution time
    var endtime = new Date().getTime();
    var time = endtime - starttime;
    console.log('method: analyzeEatingOut : Analyze Eating Out END. Elapsed time=' + time);

    Analysis.update({userId: this.userId},
      {
        $set: {
          eoanalysis: {
            total: total,
            multiple: multiple
          }
        }
      });
  }

});

