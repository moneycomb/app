// Taxee.io -  http(s)://taxee.io/api/v1/calculate
Meteor.methods({

  calc_taxes: function (income, filing_status, state) {

    console.log(income + filing_status + state);

    check(income, Number);
    check(filing_status, String);
    check(state, String);

    this.unblock();
    return Meteor.http.call("POST", "https://taxee.io/api/v1/calculate/2014/", {
      data: {
        'pay_rate': 100000,
        'filing_status': 'single',
        'pay_periods': 1,
        'state': 'NC',
        'year': '2014'
      },
      function (error, result)
    {
      if (error) {

        //todo handle MFA error and go through that dance...

        console.log(error);

      } else {
        //console.log(result.content);

        var x = JSON.parse(result.content);
        console.log(x);
        console.log(result.content);
      }
      ;
    }
  })
  },



});
