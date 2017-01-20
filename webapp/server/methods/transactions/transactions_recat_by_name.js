Meteor.methods({

  transactionsRecatByName: function(name, cell, subcell) {

    check(name, String)
    check(cell, String)
    // check(subcell, Object)


    let numUpdated = Transactions.update({userId: Meteor.userId(),name: name},
      {$set: {
        cell: cell,
        subcell: subcell
      }
    },{multi: true})

    log.info('Bulk modified '+numUpdated+' transactions to '+cell+','+subcell);

      return { numUpdated };

  }

})

