Meteor.methods({

  sendWelcomeEmail: function (to, fname) {

    this.unblock();
    check(to, String);

    const mandrillRequest = {
      "key": "jQfGDVYYlA37opS7uJYO9w",
      "template_name": "nu-welcome",
      "template_content": [
        {
          "name": "example name",
          "content": "example content"
        }
      ],
      "message": {
        "subject": "Welcome to MoneyComb",
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
        "global_merge_vars": [
          {
            "name": "fname",
            "content": fname
          }
        ]
      }
    }

    var res = Mandrill.messages.sendTemplate(mandrillRequest);
    console.log(res);
  }

})
