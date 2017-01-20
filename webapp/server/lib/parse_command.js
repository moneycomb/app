parse_command = function (text) {

  // first let's lower case the text...
  const command = text.toLowerCase();
  console.log(command);


  const record = {
    cmd: 'unknown',      // default -- assume unknown command. overide below
    original: text
  }

  // status command
  const statusCmd = /^status/;

  if (statusCmd.test(command)) {
    record.cmd = 'status';
  }

  if (/^\?/.test(command)) {
    record.cmd = 'status';
  }

  // EXTRACTION

  // extract Dollar Amount
  const extractDollar = /\$?[0-9]+(\.[0-9][0-9])?/;

  let extract = command.match(extractDollar);
  if (extract != null) {
    console.log('dollar amt...');
    // we have a dollar amount
    // strip off '$' if we have one
    // convert to a number
    //let amount = Number()
    let amount = extract[0];
    record.amount = Number(amount.replace(/^\$/, ''));
    record.cmd = 'spend';
  }

  // now ...if the word "free" was mentioned!
  if (/free\s/.test(command)) {
    console.log('alerts command...');
    record.amount = 0;
  }


// COMMANDS

  // help command
  const helpCmd = /^helpme/;
  if (helpCmd.test(command)) {
    record.cmd = 'help';
  }

  // spent command
  const spentCmd = /spent\s|spend\s/;
  if (spentCmd.test(command)) {
    record.cmd = 'spend';
  }

  // (should i) command
  const spendCmd = /^should\s|^should|^what if|^can\s/;
  if (spendCmd.test(command)) {
    record.cmd = 'whatif';
  }

  // turn alerts on or off command
  const alertsCmd = /^alerts/;
  if (alertsCmd.test(command)) {
    console.log('alerts command...');
    record.cmd = 'alerts';
  }


  // extract category
  const keywords = {
    eo: ['ate', 'eat', 'breakfast', 'lunch', 'coffee', 'dinner', 'pizza', 'takeout'],
    ds: ['cell', 'phone', 'cable', 'netflix'],
    r: ['haircut', 'gym', 'yoga', 'massage', 'golf', 'manicure', 'pedicure'],
    t: ['rental', 'plane', 'airfare', 'flight', 'tour', 'hotel', 'uber', 'taxi', 'cab','vacation','trip'],
    e: ['festival','ticket', 'tickets', 'movies', 'game', 'bar', 'drinks', 'movies', 'movie', 'concert', 'show', 'play'],
    s: ['shopping', 'groceries', 'gas', 'clothes', 'target', 'walmart']
  }

  let found_category = "o";

  _.each(keywords, function (cell, key) {
    _.each(cell, function (kw) {
      if (command.indexOf(`${kw}`) != -1) {
        // we have found a keyword!
        found_category = key;
      }
    });
  });

  record.cell = found_category;


  // action phrases (to essentially ignore)
  const phrases = [
    'went ',
    'attended ',
    'buy ',
    'bought ',
    'spent ',
    'spend ',
    'pay ',
    'paid ',
    'splurged ',
    'for ',
    'on ',
    'to ',
    'at '
  ];

  let remaining = command;
  console.log(`command = ${command}`)

  _.each(phrases, function (phrase) {
    let regex = new RegExp(phrase);
    remaining = remaining.replace(regex, '');
  });

  remaining = remaining.replace(/\$?[0-9]+(\.[0-9][0-9])?/, '');  // remove the dollar amount
  record.name = remaining.replace(/\b[a-z]/g, function (f) {
    return f.toUpperCase();
  }).trim();

  return record;

}