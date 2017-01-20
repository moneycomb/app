Template.registerHelper("periodOptions", function () {
    return [
        {label: "per year", value: 1},
        {label: "per month", value: 12},
        {label: "every 2 weeks", value: 26},
        {label: "every week", value: 52},
        {label: "per day", value: 365},
        {label: "per hour", value: 2000},
    ];
});


Template.registerHelper('cleanName', function (name) {
    var cn = name.replace('AUTHORIZED ON ', '');
    var lower = cn.toLowerCase();
    return lower.replace(/(^| )(\w)/g, function (x) {
        return x.toUpperCase();
    });
});

Template.registerHelper('cleanAccountName', function (name) {
    const cn = name.replace('Card', '').replace('Credit ', '');
    const lower = cn.toLowerCase();
    return lower.replace(/(^| )(\w)/g, function (x) {
        return x.toUpperCase();
    });
});


Template.registerHelper('cellColor', function (cell) {
    return MoneyComb.singleCellColor(cell);
});


Template.registerHelper('everythingElse', function () {
    const FP = FinancialProfile.findOne({userId: Meteor.userId()});
    const Al = Allocations.findOne({userId: Meteor.userId()});

    const eElse = (FP.grossincome() / 365) * 30 - Al.targetMoneyPot();

    return eElse;
});


Template.registerHelper('numberWithCommas', function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});


Template.registerHelper('humanDate', function (date) {
    return moment(date).fromNow();

});

Template.registerHelper('percentageFormat', function (number) {
    return parseFloat(number * 100).toFixed(0) + "%";

});

Template.registerHelper('dollarFormat', function (number) {
    let numRounded = parseFloat(number).toFixed(0)
    // if 5 digits or over, we will put in K
    if (numRounded >= 10000) {
        let numStr = `$${parseFloat(numRounded / 1000).toFixed(1)}K`;
        return numStr;
    } else {
        let numStr = numRounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return `$${numStr}`;
    }
});

Template.registerHelper('numberFormat', function (number) {
    let numRounded = parseFloat(number).toFixed(0)
    let numStr = numRounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numStr;
});

Template.registerHelper('level', function (hm) {

    const levels = [
        {name: "Red", cap: 500},
        {name: "Orange", cap: 1500},
        {name: "OMS 1", cap: 2500},
        {name: "Yellow", cap: 4000},
        {name: "YMS 1", cap: 55000},
        {name: "YMS 2", cap: 7000},
        {name: "YMS 3", cap: 8500},
        {name: "YMS 4", cap: 10000},
        {name: "Green", cap: 13750},
        {name: "GMS 1 ", cap: 17500},
        {name: "GMS 2 ", cap: 21250},
        {name: "GMS 3", cap: 25000},
        {name: "Blue", cap: 31250},
        {name: "BMS 1", cap: 37500},
        {name: "BMS 2 ", cap: 43750},
        {name: "BMS 3 ", cap: 50000},
        {name: "Indigo 	", cap: 75000},
        {name: "IMS 1 ", cap: 100000},
        {name: "IMS 2 ", cap: 125000},
        {name: "IMS 3 ", cap: 150000},
        {name: "Violet", cap: 100000000}
    ];

    if (hm < 500) {
        return "(Red)";
    } else if (hm < 1500) {
        return "(Orange)";
    } else if (hm < 2500) {
        return "(OMS1)";
    } else if (hm < 4000) {
        return "(Yellow)";
    } else if (hm < 5500) {
        return "(YMS1)";
    } else if (hm < 7000) {
        return "(YMS2)";
    } else if (hm < 8500) {
        return "(YMS3)";
    } else if (hm < 10000) {
        return "(YMS4)";
    } else if (hm < 13750) {
        return "(Green)";
    } else if (hm < 17500) {
        return "(GMS1)";
    } else if (hm < 21250) {
        return "(GMS2)";
    } else if (hm < 25000) {
        return "(GMS3)";
    } else if (hm < 31250) {
        return "(Blue)";
    } else if (hm < 37500) {
        return "(BMS1)";
    } else if (hm < 43730) {
        return "(BMS2)";
    } else if (hm < 50000) {
        return "(BMS3)";
    } else if (hm < 75000) {
        return "(Indigo)";
    } else if (hm < 100000) {
        return "(IMS1)";
    } else if (hm < 125000) {
        return "(IMS2)";
    } else if (hm < 150000) {
        return "(IMS3)";
    } else {
        return "(Violet)";
    }
})
;


Template.registerHelper('prettyDate', function (date) {
    return moment(date).format("MM/DD/YY hh:mm:ss");
});

Template.registerHelper('shortDate', function (date) {
    return moment(date).format("MM/DD/YY");
});

Template.registerHelper('LightenDarkenColor', function (col, amt) {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
});


Template.registerHelper('aspectColor', function (aspectString) {

    const color = {
        'Cutting Edge': '#FDD835',
        'The Warrior': '#FFB300',
        'The Guru': '#FB8C00',
        'Trendsetter': '#00695C',
        'The Good Life': '#26A69A'
    }

    return color[aspectString]

});


Template.registerHelper('aspectPassionCategory1', function (aspectString) {


    const color = {
        'Cutting Edge': 'e',
        'The Warrior': 'r',
        'The Guru': 't',
        'Trendsetter': 'eo',
        'The Good Life': 'e'
    }

    return color[aspectString]

});

Template.registerHelper('aspectPassionCategory2', function (aspectString) {


    const color = {
        'Cutting Edge': 'ds',
        'The Warrior': 's',
        'The Guru': 'e',
        'Trendsetter': 's',
        'The Good Life': 'eo'
    }

    return color[aspectString]

});


Template.registerHelper('aspectIcons', function (aspectString) {


    const color = {
        'Cutting Edge': 'cuttingedge.png',
        'The Warrior': 'warrior.png',
        'The Guru': 'guru.png',
        'The Guru': 'guru.png',
        'Trendsetter': 'trendsetter.png',
        'The Good Life': 'goodlife.png'
    }

    return color[aspectString]

});


Template.registerHelper('cellName', function (abbrev) {

    const rv = {
        'eo': 'Eating Out',
        'ds': 'Digital Services',
        'r': 'Recharge',
        's': 'Shopping',
        'e': 'Entertainment',
        't': 'Travel',
        'o': 'Core',
        'bf': 'Sting! Fees!'
    }

    return rv[abbrev]
});

Template.registerHelper('cellColor', function (abbrev) {

    const rv = {
        'eo': '#fdd835',
        'ds': '#ffb300',
        'r': '#fb8c00',
        's': '#80cbc4',
        'o': '#848484',
        'e': '#26a69a',
        't': '#00695c',
        'other': '#424242',
        'bf': '#ff4082'
    }

    if (abbrev in rv) {
        return rv[abbrev];
    } else {
        return '848484';
    }

});


Template.registerHelper('cellColor2', function (abbrev) {

    if (abbrev == null) {
        return '848484'
    }
    ;


    const rv = {
        'eo': 'fdd835',
        'ds': 'ffb300',
        'r': 'fb8c00',
        's': '80cbc4',
        'e': '26a69a',
        'i': '848484',
        't': '00695c',
        'o': '848484',
        'bf': 'ff4082',
        'fd': '848484',
        'h': '848484',
        'k': '848484',
        'g': '848484',
        'pay': '848484',
    };

    if (abbrev in rv) {
        return rv[abbrev];
    } else {
        return '848484';
    }

});


Template.registerHelper('GHsubcellName', function (abbrev) {
    if (abbrev == "" || abbrev == null) {
        return "..."
    } else {
        return MoneyComb.singlecellname(abbrev)
    }
});

Template.registerHelper('GHcellName', function (abbrev) {
    if (abbrev == "" || abbrev == null) {
        return "..."
    } else {
        return MoneyComb.singlecellname(abbrev)
    }
});




