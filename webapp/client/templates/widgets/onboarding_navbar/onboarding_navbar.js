/*****************************************************************************/
/* OnboardingNavbar: Event Handlers */
/*****************************************************************************/
Template.OnboardingNavbar.events({
});

/*****************************************************************************/
/* OnboardingNavbar: Helpers */
/*****************************************************************************/
Template.OnboardingNavbar.helpers({
  step1() {
    if (this.step === 1) {
      return "completed"
    } else if (this.step < 1) {
      return "disabled"
    } else {
      return ""
    }
  },

  step2() {
    if (this.step === 2) {
      return "active"
    } else if (this.step < 2) {
      return "disabled"
    } else {
      return ""
    }
  },

  step3() {
    if (this.step === 3) {
      return "active"
    } else if (this.step < 3) {
      return "disabled"
    } else {
      return "completed"
    }
  },

  opacity1() {
    if (this.step === 1) {
      return 1.0
    } else if (this.step < 3) {
      return "disabled"
    } else {
      return "completed"
    }
  },

  opacity2() {
    if (this.step < 2) {
      return 0.2
    } else {
      return 1.0
    }
  },

  opacity3() {
    if (this.step < 3) {
      return 0.2
    } else {
      return 1.0
    }
  },

});

/*****************************************************************************/
/* OnboardingNavbar: Lifecycle Hooks */
/*****************************************************************************/
Template.OnboardingNavbar.onCreated(function () {
});

Template.OnboardingNavbar.onRendered(function () {
});

Template.OnboardingNavbar.onDestroyed(function () {
});
