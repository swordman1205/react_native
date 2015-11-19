import React, {Component, PropTypes, StyleSheet, View, ScrollView, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Picker from 'react-native-picker';
import numeral from 'numeral';
import _ from 'lodash';

import Dimensions from 'Dimensions';
import Header from '../../components/Header';
import {withdraw} from '../../redux/actions/withdrawActions';

const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

const yellowColor = '#ff9860';
const orangeColor = '#ff6866';

const bankCards = [
  {
    id: 'XXXX-2764',
    balance: 13850
  },
  {
    id: 'XXXX-2765',
    balance: 13950
  },
  {
    id: 'XXXX-2766',
    balance: 14050
  },
  {
    id: 'XXXX-2767',
    balance: 14150
  }
];

const virtualCards = [
  {
    id: 'XXXX-4335',
    balance: 22423
  },
  {
    id: 'XXXX-4336',
    balance: 22523
  },
  {
    id: 'XXXX-4337',
    balance: 22623
  },
  {
    id: 'XXXX-4338',
    balance: 22723
  }
];

class WithdrawPage extends Component {
	static propTypes = {
    user: PropTypes.object,
    withdraw: PropTypes.func
  }

  constructor(props){
    super(props);
    this.state = {
      targetAmount: '',
      targetAmountError: '',
      currentBankCard: bankCards[0].id,
      currentVirtualCard: virtualCards[0].id
    }
  }

  render() {
    const {currentBankCard, currentVirtualCard} = this.state;
    const bankBalance = _.find(bankCards, (card) => card.id == currentBankCard).balance;
    const virtualBalance = _.find(virtualCards, (card) => card.id == currentVirtualCard).balance;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header />
        </View>
        <TouchableOpacity style={styles.withdrawButton}>
        	<LinearGradient start={[0, 0]} end={[1, 0]} colors={['#ff9860', '#ff8b62', '#ff7265']} style={styles.gradientBackground}>
            <Text style={styles.buttonText}>WITHDRAW</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={[styles.innerShadow]} />
        <Text style={styles.title}>WITHDRAW</Text>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            selectionColor="white"
            placeholderTextColor="gray"
            keyboardType="decimal-pad"
            style={styles.textInput}
            onChangeText={(amount) => this.setState({targetAmount: numeral(numeral().unformat(amount)).format('0,0'), targetAmountError: ''})}
            value={this.state.targetAmount}
            placeholder={'3,100'}
          />
          <Text style={styles.textInputLabel}>USD</Text>
        </View>
        <View style={styles.inputContainerBorder}>
          <View style={[styles.dottedBorder, {borderColor: yellowColor}]} />
          <View style={[styles.dottedBorder, {borderColor: orangeColor}]} />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.mainContainer}>
            <View style={styles.contentWrapper}>
              <View style={[styles.circleView, {backgroundColor: yellowColor}]}>
                <Image source={require('../../../assets/images/home/bank_card.png')} style={styles.circleIcon} />
              </View>
              <Text style={[styles.itemLabel, {marginBottom: 10}]}>FROM BANK</Text>
              <Text style={styles.cardText} onPress={() => {this.bankCardPicker.toggle();}}>{currentBankCard}</Text>
              <View style={[styles.dottedBorder, {width: 140, borderColor: yellowColor, marginBottom: 10}]} />
              <Text style={[styles.itemLabel]}>{numeral(bankBalance).format('0,0')} <Text style={styles.currencyInline}>USD</Text></Text>
            </View>
            <View style={styles.arrowIconContainer}>
              <Image source={require('../../../assets/images/withdraw/arc_arrow.png')} style={styles.arrowIcon} />
            </View>
            <View style={styles.contentWrapper}>
              <View style={[styles.circleView, {backgroundColor: orangeColor}]}>
                <Image source={require('../../../assets/images/home/virtual_balance.png')} style={styles.circleIcon} />
              </View>
              <Text style={[styles.itemLabel, {marginBottom: 10}]}>TO VIRTUAL BALANCE</Text>
              <Text style={styles.cardText} onPress={() => {this.virtualCardPicker.toggle();}}>{currentVirtualCard}</Text>
              <View style={[styles.dottedBorder, {width: 140, borderColor: orangeColor, marginBottom: 10}]} />
              <Text style={[styles.itemLabel]}>{numeral(virtualBalance).format('0,0')} <Text style={styles.currencyInline}>USD</Text></Text>
            </View>
          </View>
        </View>
        <Picker
          ref={picker => this.bankCardPicker = picker}
          pickerCancelBtnText="Cancel"
          pickerBtnText="Done"
          pickerTitle="Bank Cards"
          pickerHeight={180}
          showDuration={300}
          pickerData={bankCards.map((card) => card.id)}
          selectedValue={this.state.currentBankCard}
          onPickerDone={(v) => {this.setState({currentBankCard: v});}}
        />
        <Picker
          ref={picker => this.virtualCardPicker = picker}
          pickerCancelBtnText="Cancel"
          pickerBtnText="Done"
          pickerTitle="Virtual Cards"
          pickerHeight={180}
          showDuration={300}
          pickerData={virtualCards.map((card) => card.id)}
          selectedValue={this.state.currentVirtualCard}
          onPickerDone={(v) => {this.setState({currentVirtualCard: v});}}
        />
      </View>
    );
  }
}

export default connect(
	state => ({user: state.auth.user}),
  { withdraw }
)(WithdrawPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3a3442',
    paddingTop: 64,
    paddingBottom: 65,
    paddingHorizontal: 0,
    alignItems: 'center'
  },
  headerContainer: {
    position: 'absolute',
    left: 0,
    top: 20,
    width: screen_width,
    flexDirection: 'row'
  },
  withdrawButton: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: screen_width,
    height: 50
  },
  gradientBackground: {
    flex: 1,
    width: screen_width,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'JosefinSans-Bold',
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  innerShadow: {
    position: 'absolute',
    left: 10,
    bottom: 65,
    width: (screen_width - 20),
    height: 250,
    backgroundColor: '#3a43515f',
    borderRadius: 5
  },
  shadow: {
    shadowOffset:{
      width: 0,
      height: 0
    },
    borderRadius: 10,
    shadowRadius: 50,
    shadowColor: '#3b414e',
    shadowOpacity: 0.3,
  },
  title: {
    color: '#afaeb1',
    fontFamily: 'LetterGothicStd-Bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: 270
  },
  textInput: {
    flex: 1,
    height: 80,
    color: 'white',
    fontSize: 80,
    fontFamily: 'Letter Gothic Std',
    textAlign: 'center'
  },
  textInputLabel: {
    color: '#ffffff9f',
    fontSize: 15,
    fontFamily: 'Josefin Sans',
    paddingBottom: 15
  },
  inputContainerBorder: {
    flexDirection: 'row',
    width: 270
  },
  dottedBorder: {
    flex: 1,
    borderWidth: 2,
    borderStyle: 'dotted',
    height: 2,
    marginRight: 2
  },
  mainContainer: {
    flexDirection: 'row'
  },
  contentWrapper: {
    paddingVertical: 20,
    alignItems: 'center'
  },
  circleView: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  circleIcon: {
    width: 50,
    resizeMode: 'contain'
  },
  arrowIconContainer: {
    marginHorizontal: -15
  },
  arrowIcon: {
    width: 80,
    resizeMode: 'contain'
  },
  itemLabel: {
    color: '#afb1b5',
    fontSize: 15,
    fontFamily: 'Josefin Sans',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  cardText: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Letter Gothic Std',
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderStyle: 'dotted',
  },
  currencyInline: {
    color: '#7c8087',
    fontSize: 12,
    fontFamily: 'Letter Gothic Std',
    backgroundColor: 'transparent'
  }
});