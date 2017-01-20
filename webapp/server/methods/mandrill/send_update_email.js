Meteor.methods({

  sendUpdateEmail: function (userid) {

    this.unblock();

    const user = Meteor.users.findOne({_id: userid});
    const An = Analysis.findOne({userId: userid});
    const Al= Allocations.findOne({userId: userid});

    // const to = user.emails[0].address;
    const to = "info@mymoneycomb.com";
    const global_merge_vars = [];
    global_merge_vars.push({"name": "fname", "content": user.profile.first_name});

    const cells = Cells.find().fetch();
    _.each(cells, function (cell) {

      global_merge_vars.push({"name": cell.abbrev+"plan", "content": parseFloat(Al[cell.abbrev].target).toFixed(0)});
      global_merge_vars.push({"name": cell.abbrev+"act", "content": parseFloat(An.cellSpend[cell.abbrev].t30.amount).toFixed(0)});

    })

    console.log(global_merge_vars);
    
    const mandrillRequest = {
      "key": "jQfGDVYYlA37opS7uJYO9w",
      "template_name": "spendupdate",
      "template_content": [
        {
          "name": "example name",
          "content": "example content"
        }
      ],
      "message": {
        "subject": "Your Moneycomb Update",
        "from_email": "info@mymoneycomb.com",
        "from_name": "The MoneyComb Team",
        "to": [
          {
            "email": to,
            "type": "to"
          }
        ],
        "important": false,
        "bcc_address": "info@mymoneycomb.com",
        "merge": true,
        "merge_language": "handlebars",
        "global_merge_vars": global_merge_vars
      }
    }

    var res = Mandrill.messages.sendTemplate(mandrillRequest);
    console.log(res);
    
  }

})
