
import React, {StyleSheet, View, Component, Text, Switch} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import numeral from 'numeral';
import Dimensions from 'Dimensions';

import CardSet from '../../components/CardSet.js';
import Header from '../../components/Header';
import {CardTypes} from '../../constants';

const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;
const pageBackgroundColor = '#252f3e';

class CardsPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      base_exponent: 0,
      show_expired: false
    }
  }

  render() {
    let paymentMethods = this.props.account.PaymentMethods;
    if (!this.state.show_expired) {
      paymentMethods = _.filter(paymentMethods, (m) => m.Status != 99);
    }
    const cards = _.map(paymentMethods, (m) => ({type: CardTypes[m.Type - 1], balance: (m.Balance ? numeral(numeral().unformat(m.Balance.AccountBalance)).format('0,0.00') : ''), card_no: m.PrimaryField, currency: m.Currency}));
    let cardsSet = <CardSet cards={cards} />
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center', width: screen_width, position: 'absolute'}}>
          <View style={styles.separator}></View>
          <Text style={styles.welcome}>WELCOME BACK!</Text>
        </View>
        {cardsSet}
        <View style={{alignItems: 'center', bottom: 10, width: screen_width, position: 'absolute'}}>
          <View style={{alignItems: 'center', flexDirection: 'row', flex:1}}>
            <View style={{transform: [{scaleX:  0.7}, {scaleY: 0.7}]}}>
              <Switch onValueChange={(value) => this.setState({show_expired: value})}  value={this.state.show_expired}/>
            </View>
            <Text style={styles.welcome}>  SHOW CANCELED & EXPIRED</Text>
          </View>
        </View>
        
        <View style={styles.headerContainer}>
          <Header title="THERESA GREBIN" pageBackgroundColor={pageBackgroundColor} showRightNextButton={false} showHomeSwitchButtons={true} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pageBackgroundColor,

  },
  headerContainer: {
    position: 'absolute',
    left: 0,
    top: 20,
    width: screen_width,
    flexDirection: 'row'
  },

  separator: {
    height: 3,
    marginTop: screen_width*0.02 + 60,
    marginBottom: screen_width*0.05,
    width: screen_width*0.0625,
    backgroundColor: '#737c8a',
    justifyContent: 'center'
  },

  welcome: {
    color: '#737c8a',
    fontFamily: 'JosefinSans-Bold',
    fontSize: 15
  }
});

export default connect(
  state => ({...state.account}),
  {}
)(CardsPage);