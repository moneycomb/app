SysSettings = new Mongo.Collection('SysSettings');

// Deny all client-side updates on the Cells collection
// Best practice from: http://guide.meteor.com/security.html
SysSettings.deny({
  insert() { return true },
  update() { return true },
  remove() { return true },
});


SysSettingsSchema = new SimpleSchema({
  spend_speed_lookback: {
    type: Number,
    decimal: true,
    label: "Spend Speed Lookback",
    defaultValue: 0.35,
    min: 0,
    max: 1
  }
});


SysSettings.attachSchema(SysSettingsSchema);