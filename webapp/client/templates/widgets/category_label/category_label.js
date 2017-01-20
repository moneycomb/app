Template.CategoryLabel.helpers({

  labeltext: function() {

    console.log(this.icon);

    const textlabels = {
      'eo': 'Eating Out',
      'ds': 'Digital Services',
      'r': 'Recharge',
      't': 'Travel',
      'e': 'Entertainment',
      's': 'Shopping',
    }

    return textlabels[this.icon]

  }

});

