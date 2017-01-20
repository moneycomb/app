UI.registerHelper('formatTime', function(context, options) {
  if(context)
    return moment(Date()).format('MM/DD/YYYY, hh:mm');
});

