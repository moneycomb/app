/*****************************************************************************/
/* ActivityFeedItem: Event Handlers */
/*****************************************************************************/
Template.ActivityFeedItem.events({
});

/*****************************************************************************/
/* ActivityFeedItem: Helpers */
/*****************************************************************************/
Template.ActivityFeedItem.helpers({
  typeIcon: function(type) {
    const icons = {
      'sync': 'refresh icon',
      'alert': 'warning sign icon',
      'idea': 'idea icon',
      'hp': 'theme icon',
      'congrats': 'thumbs outline up icon',
      'commitment': 'check circle icon',
      'info': 'info circle icon',
      'hive': 'users icon',
      'profile': 'user icon',
      'spend': 'dollar icon'
    }

    return icons[type];
  }
});

/*****************************************************************************/
/* ActivityFeedItem: Lifecycle Hooks */
/*****************************************************************************/
Template.ActivityFeedItem.onCreated(function () {
});

Template.ActivityFeedItem.onRendered(function () {
});

Template.ActivityFeedItem.onDestroyed(function () {
});
