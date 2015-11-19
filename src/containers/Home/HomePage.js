import React, { Component, StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import Button from 'react-native-button';
import ProgressHUD from 'react-native-progress-hud';
import numeral from 'numeral';
import _ from 'lodash';

import reactMixin from 'react-mixin';

import Header from '../../components/Header';
import {Actions} from 'react-native-router-flux';
import {loadAccountInfo} from '../../redux/actions/accountActions';

//Get the screen width and height.
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;
const pageBackgroundColor = '#252f3e';

class PaymentCard extends Component{
	constructor(props){
		super(props);
	}

	onSeeCards(info){
		if (info.number_of_cards > 0) {
			Actions.card_details({card_type: info.type});	
		}
	}

	render(){
		const {props} = this;
		const {img_src, info, onResponderRelease} = props;
		return(
			<TouchableOpacity onPress={onResponderRelease} style={{top:screen_height-60}}>
				<View style={[cardStyles.paymentCard, props.style, {backgroundColor: props.info.backgroundColor}]}>
					<View style={cardStyles.textGroup}>
						<Image style={cardStyles.image}
		               		source={info.img_src}>
		               	</Image>
		               	{
		               		info.is_active
		               		?
			               		<View style={cardStyles.cardNum}>
				               		<Text style={cardStyles.cardNumLabel}>{info.number_of_cards}
				                	</Text>
				                </View>
				            :
				            	null
		            	}
	                	<View>
		                	<Text style={cardStyles.textBalance}>{info.balance}
								<Text style={cardStyles.textUnit}>{info.unit}
		                		</Text>
		                	</Text>
		                	<Text style={cardStyles.textTitle}>{info.title}</Text>
		                	{
		                		info.is_active
		                		?
			                		<Button style={cardStyles.seeCardsButton} onPress={this.onSeeCards.bind(this, info)}>
										SEE CARDS
									</Button>
								:
									null
							}
	                	</View>
	                </View>
				</View>
			</TouchableOpacity>

		)
	}
}

const cardStyles = StyleSheet.create({

	paymentCard: {
		shadowOffset:{
            width: 0,
            height: 30
          },
          shadowRadius: 15,
          shadowColor: 'black',
			shadowOpacity: 0.5,
	},

	textGroup: {
		flexDirection: 'row',
		backgroundColor: 'transparent'
	},

	image: {
		width: screen_width*0.15,
		resizeMode: 'contain',
		marginTop: - screen_width * 0.03,
		marginLeft: screen_width * 0.09,
		marginRight: screen_width * 0.09,
	},

	seeCardsButton: {
		color: 'white',
		fontSize: screen_width * 0.03,
		backgroundColor: '#FFFFFF30',
		paddingTop: screen_width * 0.025,
		paddingBottom: screen_width * 0.025,
		paddingLeft: screen_width * 0.067,
		paddingRight: screen_width * 0.067,
		borderRadius: screen_width * 0.04,
		overflow: 'hidden'
	},

	textBalance: {
		fontFamily: 'Letter Gothic Std',
		fontSize: screen_width/10,
		color: 'white'
	},

	textUnit:{
		fontSize: screen_width/30,
	},

	textTitle:{
		fontFamily: 'JosefinSans-Bold',
		color: '#743a41',
		fontSize: screen_width/30,
		marginBottom: screen_height*0.02
	},

	cardNum: {
		backgroundColor: 'white',
		width: screen_width * 0.067,
		height: screen_width * 0.067,
		borderRadius: screen_width * 0.034,
		position: 'absolute',
		left: screen_width * 0.19,
		top: screen_width * 0.1,
		alignItems: 'center',
		flex: 1,
		justifyContent:'center'

	},

	cardNumLabel: {
		fontFamily: 'JosefinSans-Bold',
		color: '#743a41',
		backgroundColor: 'transparent',
	}
});

const HomePage = React.createClass({

	mixins: [ProgressHUD.Mixin],

	contextTypes: {
    showProgressHUD: React.PropTypes.func,
    dismissProgressHUD: React.PropTypes.func
  },

  getInitialState () {
  	return {activeIndex: 0};
  },

  componentDidMount() {
		// this.showProgressHUD();
	},

	onResponderRelease (index){
		this.setState ({activeIndex : index});
	},

	render() {

		const {props} = this;
		const virtuals = _.filter(props.account.PaymentMethods, (m) => m.Type == 3)
		const banks = _.filter(props.account.PaymentMethods, (m) => m.Type == 2)
		const debits = _.filter(props.account.PaymentMethods, (m) => m.Type == 1)

		let paymentCards = [
			{
				title: "VIRTUAL BALANCE",
				type: "virtual_balance",
				backgroundColor: "#ff5d58",
				balance: (virtuals.length > 0 && virtuals[0].Balance ? numeral(numeral().unformat(virtuals[0].Balance.AccountBalance)).format('0,0.00') : ''),
				unit: (virtuals.length > 0 ? virtuals[0].Currency : 'USD'),
				number_of_cards: virtuals.length,
				img_src: require('../../../assets/images/home/virtual_balance.png'),
				padding_top: (screen_height-60)/3,
				is_active: false,
				index: 0
			},

			{
				title: "BANK CARDS",
				type: "bank_card",
				backgroundColor: "#ff8c56",
				balance: (banks.length > 0 && banks[0].Balance ? numeral(numeral().unformat(banks[0].Balance.AccountBalance)).format('0,0.00') : ''),
				unit: (banks.length > 0 ? banks[0].Currency : 'USD'),
				number_of_cards: banks.length,
				img_src: require('../../../assets/images/home/bank_card.png'),
				padding_top: (screen_height-60)/3,
				is_active: false,
				index: 1
			},
			{
				title: "DEBIT CARDS",
				type: "debit_card",
				backgroundColor: "#ffb155",
				balance: (debits.length > 0 && debits[0].Balance ? numeral(numeral().unformat(debits[0].Balance.AccountBalance)).format('0,0.00') : ''),
				unit: (debits.length > 0 ? debits[0].Currency : 'USD'),
				number_of_cards: debits.length,
				img_src: require('../../../assets/images/home/debit_card.png'),
				padding_top: (screen_height-60)/3,
				is_active: false,
				index: 2
			}
		];

		paymentCards.splice(0, 0, paymentCards.splice(this.state.activeIndex, 1)[0] );
		paymentCards[0].is_active = true;
		paymentCards[0].padding_top /= 2;

		const _self = this;
		let paymentCardViews = paymentCards.reverse().map(function(card, index){
			return (
				<PaymentCard key={card.index} info = {card} style={[styles.paymentCard, 
					{bottom: index*(screen_height-60)/4 + 60, position: 'absolute', paddingTop: card.padding_top}]}
					onResponderRelease={_self.onResponderRelease.bind(_self, card.index)}/>
			)
		});

		
		return (
			<View style={styles.outerContainer}>
				<View style={styles.headerContainer}>
					<Header title="THERESA GREBIN" pageBackgroundColor={pageBackgroundColor} showRightNextButton={false} showHomeSwitchButtons={true} />
				</View>
				<View style={styles.innerContainer}>
					{paymentCardViews}
				</View>
				<ProgressHUD
					isVisible={this.props.loading}
          isDismissible={true}
          overlayColor="rgba(0, 0, 0, 0.5)"
        />
			</View>
		)
	}
});

const styles = StyleSheet.create({
	outerContainer: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: pageBackgroundColor,
		width: screen_width,
		paddingTop: 64
	},
	headerContainer: {
    position: 'absolute',
    left: 0,
    top: 20,
    width: screen_width,
    flexDirection: 'row'
  },
	innerContainer: {
		position: 'relative',
		flex: 1,
		top: 64,
		width: screen_width
	},
	paymentCard: {
		width: screen_width,
		height: (screen_height-60)/2,
	}
});

export default connect(
	state => ({...state.account}),
  { loadAccountInfo }
)(HomePage);
