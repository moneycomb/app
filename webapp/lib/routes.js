Router.configure({
    layoutTemplate: 'MasterLayout',
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound'
});

Router.route('/loggingout', function () {
    this.layout('OnboardingLayout');
    this.render('LogoutSplash');
});

Router.route('/honeymoney', function () {
    this.render('HoneyMoneyHome');
});

Router.route('/discover/results', function () {
    this.layout('OnboardingLayout');
    this.render('ExplainQuizResults');
});

Router.route('/discover/takequiz', function () {
    this.layout('OnboardingLayout');
    console.log("here!");
    this.render('TakeQuiz');
});

Router.route('/discover', function () {
    this.layout('OnboardingLayout');
    this.render('IntroQuiz');
});

Router.route('/moneypot', function () {
    this.render('Dashboard')
});

Router.route('/static/ss', function () {
    this.render('StaticSS')
});

Router.route('/moneymindsets/key', function () {
    this.render('MoneyMindsetKey')
});

Router.route('/mindset/explain', function () {
    this.render('ExplainMindset');
});


Router.route('/main', function () {
    this.render('Main');
});


Router.route('/debts', function () {
    this.render('DebtsList');
});

Router.route('/test', function () {
    this.layout('MasterLayout');
    this.render('TestHome');
});


Router.route('/mycategories', function () {
    this.render('ManageHome');
});

Router.route('/myactivities', function () {
    this.render('MyActivities');
});


Router.route('/income', function () {
    this.render('Income');
});


Router.route('/ob/info', function () {
    this.layout('OnboardingLayout');
    this.render('Info');
});

Router.route('/ob/intro', function () {
    this.layout('OnboardingLayout');
    this.render('Intro');
});


Router.route('/ob/step1b', function () {
    this.layout('OnboardingLayout');
    this.render('Step1b');
});

Router.route('/ob/step2', function () {
    this.layout('OnboardingLayout');
    this.render('Step2');
});

Router.route('/unsubscribe/:_uid', function () {
    var params = this.params; // { _uid: "5" }
    var userId = params._uid; // "5"
    console.log('HERE!!!!!!');
    this.render('Unsubscribe');
});

Router.route('/ob/step3', function () {
    this.layout('OnboardingLayout');
    this.render('Step3');
});

Router.route('/ob/step3b', function () {
    this.layout('OnboardingLayout');
    this.render('Step3b');
});


Router.route('/spendsetter/wizard/start', function () {
    this.render('WizardWelcome');
});

Router.route('/spendsetter/wizard/overall', function () {
    this.render('WizardOverall');
});

Router.route('/spendsetter/wizard/set', function () {
    this.render('WizardCell');
});

Router.route('/spendsetter/wizard/saveq', function () {
    this.render('WizardSavingsQ');
});

Router.route('/spendsetter/wizard/save', function () {
    this.render('WizardSavings');
});

Router.route('/spend', function () {
    this.render('AddTransaction');
});


Router.route('/spendsetter/wizard/summary', function () {
    this.render('WizardSummary');
});

Router.route('/spendsetter', function () {
    this.render('AllocationsHome');
});

Router.route('/ad/actions', function () {
    this.render('Actions');
});

Router.route('/analysis', function () {
    this.render('Analysis');
});


Router.route('/insights', function () {
    this.render('InsightsHome');
});


Router.route('/myprofile', function () {
    this.render('ProfileHome');
});

Router.route('/dashboard', function () {
    this.render('Main');
});


Router.route('/profile/quiz', function () {
    this.render('MoneyMindset');
});

Router.route('/account/:_accountId', function () {
    this.render('AccountsDetail', {
        data: {
            accountId: this.params._accountId
        }
    });
});


Router.route('/accounts', {
    name: 'accounts.list',
    controller: 'AccountsController',
    action: 'list',
    where: 'client'
});

/*
Router.route('/cells/:_abbrev', {
    name: 'cells.detail',
    controller: 'CellsController',
    action: 'detailbyabbrev',
    where: 'client'
});
*/
Router.route('/cells/:_abbrev', function () {
    this.wait(Meteor.subscribe('cells'));

    if (this.ready()) {
        console.log(this.params._abbrev);
        const C = Cells.findOne({abbrev: this.params._abbrev});
        console.log(C);

        this.render('CellsDetail', {
            data: C });
    }
});

Router.route('/review', function () {
        this.render('Review');
    },
    {
        name: 'transactions.review'
    });

Router.route('/transactions/uncategorized', function () {
        this.render('Uncategorized');
    },
    {
        name: 'transactions.uncategorized'
    });

Router.route('/transactions/new', function () {
        this.render('NewTransactions');
    },
    {
        name: 'transactions.new'
    });

Router.route('/transactions/other', function () {
        this.render('OtherTransactions');
    },
    {
        name: 'transactions.other'
    });


Router.route('/transactions/hidden', function () {
        this.render('Hidden');
    },
    {
        name: 'transactions.hidden'
    });


Router.route('/transaction/:_id', function () {
    this.wait(Meteor.subscribe('Transactions.single', this.params._id))

    if (this.ready()) {
        T = Transactions.findOne({_id: this.params._id})
        this.render('TransactionsDetail', {data: {T}})
    } else {
        this.render('Loading')
    }
});

Router.route('/', function () {
    this.layout('OnboardingLayout');
    this.render('Home');
});







