try {


if (Meteor.isServer) {

  let environment = process.env.NODE_ENV;

  // if we are in development mode, make log equal to console.log...else use Papertrail...

  // if (environment != 'development') {

  //creating a global server logger
  log = Winston;

  log.add(Winston_Papertrail, {
    levels: {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
      auth: 4
    },
    colors: {
      debug: 'blue',
      info: 'green',
      warn: 'red',
      error: 'red',
      auth: 'red'
    },

    host: "logs4.papertrailapp.com",
    port: 23318,
    handleExceptions: true,
    json: true,
    colorize: true,
    logFormat: function (level, message) {
      return level + ': ' + message;
    }
  });

}

// https://papertrailapp.com/systems/setup

//log.info(" =====> Meteor App restarted " + new Date(Date.now()) + " <=====");

}catch(err) {
  console.log(err);
}