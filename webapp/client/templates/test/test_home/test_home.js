import ActivityCounter from '../../../components/ActivityCounter';
import PlanVersusActualChart from '../../../components/PlanVersusActualChart';
import TransactionCard from '../../../components/TransactionCard';
import CallToActionSlider from '../../../components/CallToActionSlider';
import SpendTrend from '../../../components/SpendTrend';
import SweetSpot from '../../../components/SweetSpot';
import TransactionList from '../../../components/TransactionList';
import FlipCard from 'react-flipcard';


import ProgressBar from 'react-progressbar';

// import BudgetRange from '../../../components/BudgetRange';

/*****************************************************************************/
/* TestHome: Event Handlers */
/*****************************************************************************/
Template.TestHome.events({
});

/*****************************************************************************/
/* TestHome: Helpers */
/*****************************************************************************/
Template.TestHome.helpers({
  TestComponent: function() {
    return TestComponent;
  },

  SweetSpot() {
    return SweetSpot;
  },

  TransactionCard: function () {
    return TransactionCard;
  },

  TransactionList: function () {
    return TransactionList;
  },

  CallToActionSlider() {
    return CallToActionSlider;
  },

  SpendTrend() {
    return SpendTrend;
  },

  ProgressBar: function () {
    return ProgressBar;
  },

  BudgetRange: function () {
    return BudgetRange;
  },

  PlanVersusActualChart: function () {
    return PlanVersusActualChart;
  },
  
  colors() {
    return MoneyComb.cellcolor();
  },

  plan() {
    return {
      "eo": 1,
      "ds": 3,
      "r": 3,
      "t": 3,
      "e": 3,
      "s": 3,

    };
  },

  actual() {
    return {
      "eo": 1,
      "ds": 2,
      "r": 2,
      "t": 3,
      "e": 3,
      "s": 2,

    };
  },

});

/*****************************************************************************/
/* TestHome: Lifecycle Hooks */
/*****************************************************************************/
Template.TestHome.onCreated(function () {
});

Template.TestHome.onRendered(function () {
  $('.pointing.menu .item').tab();
  $('.shape').shape();
});

Template.TestHome.onDestroyed(function () {
});
