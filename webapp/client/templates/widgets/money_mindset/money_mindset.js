
/*****************************************************************************/
/* MoneyMindset: Helpers */
/*****************************************************************************/
Template.MMSGraphic.helpers({

  fill: function(mmsProfile) {

    let cellColors = MoneyComb.cellcolor();

    let rv = {
      eo: {
        q1: cellColors.eo,
        q2: cellColors.eo,
        q3: cellColors.eo,
        q4: cellColors.eo,
      },
      ds: {
        q1: cellColors.ds,
        q2: cellColors.ds,
        q3: cellColors.ds,
        q4: cellColors.ds,
      },
      r: {
        q1: cellColors.r,
        q2: cellColors.r,
        q3: cellColors.r,
        q4: cellColors.r,
      },
      t: {
        q1: cellColors.t,
        q2: cellColors.t,
        q3: cellColors.t,
        q4: cellColors.t,
      },
      e: {
        q1: cellColors.e,
        q2: cellColors.e,
        q3: cellColors.e,
        q4: cellColors.e,
      },
      s: {
        q1: cellColors.s,
        q2: cellColors.s,
        q3: cellColors.s,
        q4: cellColors.s,
      },

    }

    return rv;

  },


  opacity: function() {

    const dimmed = 0.2;
    const lit = 1.0;

    let mmsProfile = this.profile;

    console.log(mmsProfile);

    _.each(mmsProfile, function(m) {
      console.log(m);
    });

    let rv = {
      eo: {
        q1: lit,
        q2: lit,
        q3: lit,
        q4: dimmed,
      },
      ds: {
        q1: lit,
        q2: dimmed,
        q3: dimmed,
        q4: dimmed,
      },
      r: {
        q1: lit,
        q2: lit,
        q3: dimmed,
        q4: dimmed,
      },
      t: {
        q1: lit,
        q2: lit,
        q3: lit,
        q4: lit,
      },
      e: {
        q1: lit,
        q2: lit,
        q3: lit,
        q4: dimmed,
      },
      s: {
        q1: lit,
        q2: lit,
        q3: lit,
        q4: dimmed,
      },

    }

    return rv;

  },



});

