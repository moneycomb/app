/*****************************************************************************/
/* ProfileProgess: Event Handlers */
/*****************************************************************************/
Template.ProfileProgess.events({
});

/*****************************************************************************/
/* ProfileProgess: Helpers */
/*****************************************************************************/
Template.ProfileProgess.helpers({
  stepstatus: function () {

    stepstatus = {};

    var template = Template.instance();
    var step = template.data.step;

    console.log("step =" + step);

    if (step === 1) {
      stepstatus.s1="active";
      stepstatus.s2="";
      stepstatus.s3="disabled";
    } else if (step === 2) {
      stepstatus.s1="completed";
      stepstatus.s2="active";
      stepstatus.s3="disabled";

    } else if (step === 3) {
      stepstatus.s1="completed";
      stepstatus.s2="completed";
      stepstatus.s3="active";
    }

    return stepstatus;

  }
});

/*****************************************************************************/
/* ProfileProgess: Lifecycle Hooks */
/*****************************************************************************/
Template.ProfileProgess.onCreated(function () {
});

Template.ProfileProgess.onRendered(function () {
});

Template.ProfileProgess.onDestroyed(function () {
});
