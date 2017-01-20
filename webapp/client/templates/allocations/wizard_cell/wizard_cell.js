import CellTargetSlider from '../../../components/CellTargetSlider';
import AllocationPie from '../../../components/AllocationPie';


/*****************************************************************************/
/* WizardCell: Event Handlers */
/*****************************************************************************/
Template.WizardCell.events({
    'click .action-next': function (e, t) {

        const currentStep = t.currentStep.get();
        const currentCell = t.currentCell.get();
        const wizardSteps = t.wizardSteps.get();
        const wizardCells = t.wizardCells.get();

        const newValue = Number(Session.get("value"));

        // save the new allocation
        const np = Session.get("newAllocationPlan");
        np[t.currentCell.get()] = newValue;
        Session.set("newAllocationPlan",np);


        const NUMSTEPS = wizardSteps.length;

        Session.set("allocated",Number(Session.get("allocated")) + newValue);

        // save the new allocation
        let A = Allocations.findOne({userId: Meteor.userId()});
        A[currentCell].target = newValue;
        Allocations.update(A._id, {$set: A});

        if (currentStep < NUMSTEPS-1 ) {
            const newStep = currentStep + 1;
            t.currentStep.set(newStep);
            t.currentCell.set(t.wizardCells.get()[newStep]);
        } else {
           Router.go('/spendsetter/wizard/summary');
        }

    },

    'click .action-previous': function (e, t) {

        const currentStep = t.currentStep.get();
        const wizardSteps = t.wizardSteps.get();
        const currentCell = t.currentCell.get();

        // save the new allocation
        //let A = Allocations.findOne({userId: Meteor.userId()});
        //A[currentCell].target = newValue;
        //Allocations.update(A._id, {$set: A});

        if (currentStep > 0 ) {
            const newStep = currentStep - 1;
            t.currentStep.set(newStep);
            t.currentCell.set(t.wizardCells.get()[newStep]);

            let curcell = t.currentCell.get();

            const newValue = Number(Session.get("value"));
            Session.set("allocated",Number(Session.get("allocated")) - Number(Session.get("newAllocationPlan")[curcell]));


        } else {
            Router.go('/spendsetter/wizard/start');
        }

    },


    'click .action-adjust-total': function (e, t) {

        const currentCell = t.currentCell.get();
        const toAdd = Number(Session.get("newAllocationPlan")[currentCell]);
        Session.set("newSpendTarget", Session.get("newSpendTarget") + toAdd);

    }
});

/*****************************************************************************/
/* WizardCell: Helpers */
/*****************************************************************************/
Template.WizardCell.helpers({

    CellTargetSlider: function() {
        return CellTargetSlider;
    },

    AllocationPie: function () {
        return AllocationPie;
    },


    numremaining() {
        const nr = Template.instance().currentStep.get();
        return 5-Number(nr);
    },

    noactivity(cell) {
        const An =  Analysis.findOne({userId: Meteor.userId()})
        const amt = An.cellSpend[cell].t30.amount;

        return (amt == 0);

    },


    currentcell: function (cell) {

        return Template.instance().currentCell.get();

    },

    places: function (cell) {
        return MyPurchasePlaces.find({cell: cell});

    },

    title: function () {
        const currentstep=Template.instance().currentStep.get();
        const wizardsteps=Template.instance().wizardSteps.get();
        let prefix = "";

        if (currentstep == 0) {
            prefix = "First we'll ";
        } else {
            prefix = _.sample(["Now let's ","Next we'll ", "Onward! Now we'll "])
        }
        return wizardsteps[currentstep];
    },

    cell: function (cell) {
        const abbrev = Template.instance().currentCell.get();
        return Cells.findOne({abbrev: abbrev});
    },

    value() {
        return Number(Session.get("value"));
    },
    
    currentStep: function () {
        return Template.instance().currentStep.get();
    },

    allocation() {
        return Allocations.findOne({userId: Meteor.userId()})
    },

    maxtarget(cell) {
        return Session.get("newSpendTarget")-Session.get("allocated");
    },

    currenttarget(cell) {
        const A = Allocations.findOne({userId: Meteor.userId()});


        return parseFloat(A[cell].target).toFixed(0);
    },

    colors() {
        return MoneyComb.cellcolor();
    },

    recommended(cell) {
        const A = Allocations.findOne({userId: Meteor.userId()});

        return parseFloat(A[cell].amount).toFixed(0);
    },

    total() {
        return Session.get("total");
    },

    currentspend(cell) {
        const An =  Analysis.findOne({userId: Meteor.userId()})
        Session.set("value",Number(parseFloat(Session.get("newAllocationPlan")[cell]).toFixed(0)));
        return An.cellSpend[cell].t30.amount;
    },

    analysis() {
        return Analysis.findOne({userId: Meteor.userId()})
    },

    remaining() {
        return Session.get("newSpendTarget")-Session.get("allocated")-Session.get("value");
    },

    allAllocated() {
        return ( Session.get("allocated") >= Session.get("newSpendTarget"));
    },

    newSpendTarget() {
      return Number(Session.get("newSpendTarget"));
    },

    allocated() {
        return Session.get("allocated");
    }

});

/*****************************************************************************/
/* WizardCell: Lifecycle Hooks */
/*****************************************************************************/
Template.WizardCell.onCreated(function () {

    if (!Meteor.userId()) {
        Router.go('/login')
    }



    const A = Allocations.findOne({userId: Meteor.userId()});
    const An = Analysis.findOne({userId: Meteor.userId()});

    const newAllocationPlan = {
        eo: An.cellSpend.eo.t30.amount,
        ds: An.cellSpend.ds.t30.amount,
        r: An.cellSpend.r.t30.amount,
        t: An.cellSpend.t.t30.amount,
        e: An.cellSpend.e.t30.amount,
        s: An.cellSpend.s.t30.amount
    };
    
    Session.set("newAllocationPlan", newAllocationPlan);
        

    const wizardSteps = ["Eating Out", "Digital Services", "Recharge", "Travel", "Entertainment", "Shopping"];
    const wizardCells = ["eo", "ds", "r", "t", "e", "s"];
    this.wizardSteps = new ReactiveVar(wizardSteps);
    this.wizardCells = new ReactiveVar(wizardCells);
    this.currentStep = new ReactiveVar(0);

    this.currentCell = new ReactiveVar(_.first(wizardCells));

    var self = this;
    self.autorun(function () {
        self.subscribe('MyPurchasePlaces',self.currentCell.get(),5);
    });


});

Template.WizardCell.onRendered(function () {
    mixpanel.track("Enter Spend Wizard");
});

Template.WizardCell.onDestroyed(function () {
});
