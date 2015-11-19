import React, { StyleSheet, View, Component } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import numeral from 'numeral';
import Dimensions from 'Dimensions';

import RotationCircle from '../../components/RotationCircle';
import Header from '../../components/Header';
import {CardTypes} from '../../constants';

const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;
const pageBackgroundColor = '#252f3e';

class CirclePage extends Component {

  constructor(props){
    super(props);
  }

  render() {
    let paymentMethods = this.props.account.PaymentMethods;
    const cards = _.map(paymentMethods, (m) => ({type: CardTypes[m.Type - 1], balance: (m.Balance ? numeral(numeral().unformat(m.Balance.AccountBalance)).format('0,0.00') : ''), card_no: m.PrimaryField, currency: m.Currency}));
    let rotationCircle = <RotationCircle cards={cards}/>
    return (
      <View style={styles.container}>
        {rotationCircle}
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
});

export default connect(
  state => ({...state.account}),
  {}
)(CirclePage);