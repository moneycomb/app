Package.describe({
  name: "moneycomb",
  summary: "Basic Moneycomb Financial model - our secret sauce",
  version: "1.0.0",
  git: "https://github.com/<username>/moneycomb.git",
});


Package.onUse(function (api) {
  api.versionsFrom('0.9.0');

  api.use('ecmascript');

  var packages = [
    'iron:router'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles('lib/moneycomb.js', ['client', 'server']);
  api.addFiles('server/moneycomb.js', 'server');

  api.addFiles('server/userprofile-methods.js', 'server');

  api.export('MoneyComb');
});

