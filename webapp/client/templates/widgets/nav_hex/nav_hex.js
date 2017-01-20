/*****************************************************************************/
/* NavHex: Event Handlers */
/*****************************************************************************/
Template.NavHex.events({
    'click .navhex': function (e, t) {
        /*$('.closemenu')
         .dropdown({action: 'hide'});*/

        $('.closemenu')
            .removeClass('visible')
            .addClass('hidden');


        $('.cellsdd')
            .removeClass('active')
            .removeClass('visible');

        var selected = e.currentTarget.id;
        console.log(`here....closing it! and routing to ${selected}`);
        //Router.go('cells.detail', {_abbrev: selected});
        if (selected == 'o') {
            Router.go('/transactions/other');
        } else {
            Router.go('/cells/' + selected);
        }

    },

    'click .hideme': function (e, t) {
        $('.cellsdd')
            .dropdown({action: 'hide'});
        console.log("hide dropdown");
    },

    'click .mp-navhex': function (e, t) {
        var selected = e.currentTarget.id;
        Router.go('/dashboard');
    },

    "mouseover .navhex": function (e, t) {

        var selected = e.currentTarget.id;
        var hoverColor = MoneyComb.singleCellColor(selected);
        var selector = selected + "-hex";
        $('#' + selector).css('fill', hoverColor);
    },

    'mouseleave .navhex': function (e, t) {

        let selected = e.currentTarget.id;
        var selector = selected + "-hex";
        $('#' + selector).css('fill', '#848484');
    },

    'mouseleave #NavHex': function (e, t) {
        let selected = e.currentTarget.id;
        $('#' + selected).addClass('animated pulse');

    },


});

/*****************************************************************************/
/* NavHex: Helpers */
/*****************************************************************************/
Template.NavHex.helpers({
    cellColor: function () {
        let fillcolors = {eo: '#9e9e9e', ds: '#9e9e9e', r: '#9e9e9e', t: '#9e9e9e', e: '#9e9e9e', s: '#9e9e9e'};
        fillcolors[this.cell] = MoneyComb.singleCellColor(this.cell);

        return fillcolors;
    }
});

/*****************************************************************************/
/* NavHex: Lifecycle Hooks */
/*****************************************************************************/
Template.NavHex.onCreated(function () {
});

Template.NavHex.onRendered(function () {
    $('.ui.dropdown')
        .dropdown()
    ;
});

Template.NavHex.onDestroyed(function () {
});
