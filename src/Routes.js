import React, { Component, Navigator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import RNRF, {Route, Schema, Animations, Actions, TabBar} from 'react-native-router-flux';
const Router = connect()(RNRF.Router);

import LoginPage from './containers/Auth/LoginPage';
import CirclePage from './containers/Home/CirclePage';
import CardsPage from './containers/Home/CardsPage';
import HomePage from './containers/Home/HomePage';
import WithdrawPage from './containers/Withdraw/WithdrawPage';
import CurrencyModalPage from './containers/Modal/CurrencyModalPage';
import CardDetailPage from './containers/Card/CardDetailPage';
import PaymentDetailPage from './containers/Card/PaymentDetailPage';
import TransactionDetailPage from './containers/Card/TransactionDetailPage';

import SideDrawer from './components/SideDrawer';
import Drawer from 'react-native-drawer';

import {setDrawerOpen} from './redux/actions/drawerActions';
import {logout} from './redux/actions/authActions';

class AppRouter extends Component{
  componentWillReceiveProps(nextProps) {
    if (this.props.user && this.props.user.ResponseCode == 1 && nextProps.error && nextProps.error.ResponseCode == 40) {
      this.props.logout();
      Actions.login();
    }
  }
  render() {
    return (
        <Router name="root">
          <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
          <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
          <Schema name="withoutAnimation"/>

          <Route name="login" component={LoginPage} title="Login" hideNavBar={true} initial={true} wrapRouter={true} type="reset" />
          <Route name="app" initial={false} type="reset" hideNavBar={true}>
            <SideDrawer 
              openHandler={() => {this.props.setDrawerOpen(true);}}
              closeHandler={() => {this.props.setDrawerOpen(false);}}
            >
              <Router name="app_root" hideNavBar={true}>
                <Route name="main_home" component={HomePage} title="Home" schema="default" type="replace" />
                <Route name="cards_home" component={CardsPage} title="Cards Home" type="replace" />
                <Route name="circle_home" component={CirclePage} title="Circle Home" type="replace" />
                <Route name="withdraw" component={WithdrawPage} title="Withdraw" schema="default" type="replace" />
                <Route name="card_details" component={CardDetailPage} title="Card Details" type="push" />
                <Route name="payment_details" component={PaymentDetailPage} title="Payment Details" type="push" />
                <Route name="transaction_details" component={TransactionDetailPage} title="Transaction Details" type="push" />
                <Route name="currencyModal" hideNavBar={true} component={CurrencyModalPage} title="Currency" schema="modal" wrapRouter={true} type="push" />
              </Router>
            </SideDrawer>
          </Route>
        </Router>
    );
  }
}

export default connect(
  state => ({user: state.auth.user, account: state.account.account}),
  { setDrawerOpen, logout }
)(AppRouter);
