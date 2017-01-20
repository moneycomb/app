/*****************************************************************************/
/* DisplayMessage: Event Handlers */
/*****************************************************************************/
Template.DisplayMessage.events({
});

/*****************************************************************************/
/* DisplayMessage: Helpers */
/*****************************************************************************/
Template.DisplayMessage.helpers({
  messageIcon: function() {
    const icons = {
      'suggestion': 'money icon',
      'trynew': 'leaf icon',
      'reflect': 'heart icon',
      'stat': 'pie chart icon',
      'compare': 'users icon',
      'attention': 'warning icon'
    };

    if(icons.hasOwnProperty(this.type)){
      return icons[this.type];
    } else {
      return "help icon";
    }
  },

  messageColor: function() {
    const colors = {
      'suggestion': 'yellow',
      'trynew': 'teal',
      'reflect': 'blue',
      'stat': 'blue',
      'compare': 'grey',
      'attention': 'pink'
    };

    if(colors.hasOwnProperty(this.type)){
      return colors[this.type];
    } else {
      return "grey";
    }
  },


});

/*****************************************************************************/
/* DisplayMessage: Lifecycle Hooks */
/*****************************************************************************/
Template.DisplayMessage.onCreated(function () {
});

Template.DisplayMessage.onRendered(function () {
});

Template.DisplayMessage.onDestroyed(function () {
});
