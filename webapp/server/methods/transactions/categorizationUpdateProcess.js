Meteor.methods({

  categorizationUpdateProcess: function(sleeptime,iterations,pollplaiditeration) {
      categorizationProgress(Meteor.userId(),sleeptime,iterations,pollplaiditeration);
  }

})

