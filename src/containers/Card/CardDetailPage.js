import React, { Component, PropTypes, StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, InteractionManager } from 'react-native';
import Dimensions from 'Dimensions';
import Swiper from 'react-native-swiper';
import Button from 'react-native-button';
import ProgressHUD from 'react-native-progress-hud';
import { connect } from 'react-redux';
import _ from 'lodash';
import numeral from 'numeral';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontawesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';

import Header from '../../components/Header';
import {CardTypes} from '../../constants';
import {setHeaderTitle} from '../../redux/actions/globalActions';
import {loadTransactions} from '../../redux/actions/transactionActions';
import {loadPayments} from '../../redux/actions/paymentActions';

//Get the screen width and height.
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

const cardColors = {virtual_balance: '#ff6d61', bank_card: '#ff9860', debit_card: '#ffba60'};

class PaymentHistoryCard extends Component{
	constructor(props){
		super(props);
	}

	goPaymentDetail(){
		Actions.payment_details({
			mobileAccountId: this.props.mobileAccountId,
			card_no: this.props.cardNo,
			payment_detail: this.props.data,
		});
	}

	render(){

		const {data} = this.props;
		const balance = data.Amount ? numeral(numeral().unformat(data.Amount.substr(0, data.Amount.indexOf(' ')))).format('0,0.00') : '';
		const currency = data.Amount ? data.Amount.substr(data.Amount.indexOf(' ') + 1) : '';
		return(
			<TouchableOpacity onPress = {this.goPaymentDetail.bind(this)}>
				<View style={[paymentCardStyles.paymentHistoryCard]}>
					<View style={paymentCardStyles.leftPanel}>
						<Text style={paymentCardStyles.balance_integer}>{balance ? balance.substr(0, balance.lastIndexOf('.')) : ''}
							<Text style={paymentCardStyles.balance_decimal}>{balance ? (balance.substr(balance.lastIndexOf('.')) + ' ' + currency) : ''}</Text>
						</Text>
						<Text style={paymentCardStyles.payment_description}>{data.Loader}</Text>
					</View>
					<View style={paymentCardStyles.rightPanel}>
						<Text style={paymentCardStyles.date_time}>{moment(data.Date, moment.ISO_8601).format('MM DD YYYY h:mm A')}</Text>
						<View style={paymentCardStyles.statusPanel}>
							<Text style={paymentCardStyles.status}>{data.PaymentStatusCategory == 1 ? 'LOADED' : 'REJECTED'}</Text>
							<FontawesomeIcon name={`${data.PaymentStatusCategory == 1 ? 'check' : 'info'}-circle`} size={20} color={data.PaymentStatusCategory == 1 ? '#c0d0df' : '#ff7380'} />
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

class TransactionHistoryCard extends Component{
	constructor(props){
		super(props);
	}

	goTransactionDetail(){
		Actions.transaction_details({
			mobileAccountId: this.props.mobileAccountId,
			card_no: this.props.cardNo,
			transaction_detail: this.props.data
		});
	}

	render(){
		const {data} = this.props;
		const balance = data.Amount ? numeral(numeral().unformat(data.Amount.substr(0, data.Amount.indexOf(' ')))).format('0,0.00') : '';
		const currency = data.Amount ? data.Amount.substr(data.Amount.indexOf(' ') + 1) : '';
		return(
			<TouchableOpacity onPress = {this.goTransactionDetail.bind(this)}>
				<View style={[paymentCardStyles.paymentHistoryCard]}>
					<View style={paymentCardStyles.leftPanel}>
						<Text style={paymentCardStyles.balance_integer}>{balance ? balance.substr(0, balance.lastIndexOf('.')) : ''}
							<Text style={paymentCardStyles.balance_decimal}>{balance ? (balance.substr(balance.lastIndexOf('.')) + ' ' + currency) : ''}</Text>
						</Text>
						<Text numberOfLines={1} style={paymentCardStyles.payment_description}>{data.Description}</Text>
					</View>
					<View style={paymentCardStyles.rightPanel}>
						<Text style={paymentCardStyles.date_time}>{moment(data.Date, moment.ISO_8601).format('MM DD YYYY h:mm A')}</Text>
						<View style={paymentCardStyles.statusPanel}>
							<Text style={paymentCardStyles.status}>{data.TransactionStatusCategory == 1 ? 'LOADED' : 'REJECTED'}</Text>
							<FontawesomeIcon name={`${data.TransactionStatusCategory == 1 ? 'check' : 'info'}-circle`} size={20} color={data.TransactionStatusCategory == 1 ? '#c0d0df' : '#ff7380'} />
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

const paymentCardStyles = StyleSheet.create({
	paymentHistoryCard: {
		marginTop: 10,
		flex: 1,
		backgroundColor: 'white',
		width: screen_width - 60,
		padding: 20,
		borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	balance_integer: {
		fontSize: 35,
		fontFamily: 'Letter Gothic Std',
		color: '#44566c'
	},
	
	balance_decimal: {
		fontSize: 12,
		color: '#a3b6c7',
		fontFamily: 'Josefin Sans',
	},

	payment_description: {
		fontSize: 18,
		color: '#ff6167',
		fontFamily: 'LetterGothicStd-Bold',
		width: screen_width * 0.4
	},

	rightPanel: {
		alignItems: 'flex-end'
	},

	date_time: {
		fontSize: 15,
		color: "#a3b6c7",
		fontFamily: 'Josefin Sans',
		marginBottom: 10
	},

	statusPanel: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	status: {
		fontSize: 15,
		color: "#44566c",
		fontFamily: 'Josefin Sans',
		textAlign: 'left',
		marginRight: 5
	}

});

const CardDetailPage = React.createClass({

	mixins: [ProgressHUD.Mixin],

	propTypes: {
		card_type: PropTypes.string,
		card_no: PropTypes.string
	},

	defaultProps: {
		card_type: '',
		card_no: ''
	},

	contextTypes: {
    showProgressHUD: React.PropTypes.func,
    dismissProgressHUD: React.PropTypes.func
  },

	getInitialState() {
		const {card_type, card_no, account} = this.props;
		this.filtered_cards = account.PaymentMethods ? account.PaymentMethods.filter((c) => (card_type ? c.Type == (CardTypes.indexOf(card_type) + 1) : true)) : [];
		this.initial_index = card_no ? _.findIndex(this.filtered_cards, (c) => c.PrimaryField == card_no) : 0;	
	},

	componentDidMount() {
		const {user} = this.props;
		if (this.filtered_cards.length > 0) {
			if (this.initial_index > 0) {
				// As loop is enabled, according to source code, it should add 1 to index.
				this.refs.detail_swiper.updateIndex({x: (this.initial_index + 1) * screen_width}, 'x');
			}
			const fromDate = moment().subtract(1, 'month').toISOString();
			const toDate = moment().toISOString();
			InteractionManager.runAfterInteractions(() => {
	      this.props.loadTransactions(user.MobileSessionToken, this.filtered_cards[this.initial_index].MobileAccountId, fromDate, toDate);
				this.props.loadPayments(user.MobileSessionToken, this.filtered_cards[this.initial_index].MobileAccountId, fromDate, toDate);
	    });
		}
	},

	componentWillReceiveProps(nextProps) {
		if (!this.props.transactions.list && nextProps.transactions.list) {
			console.log('transaction list: ', nextProps.transactions.list);
		}
	},

	componentDidUpdate(prevProps, prevState) {
		this.refs.detail_swiper.updateIndex({x: (this.initial_index + 1) * screen_width}, 'x');
	},

	onSwipeChange(e, state, context) {
		const {user} = this.props;
		const fromDate = moment().subtract(1, 'month').toISOString();
		const toDate = moment().toISOString();
		this._root.setNativeProps({style: {backgroundColor: cardColors[CardTypes[this.filtered_cards[state.index].Type - 1]]}});
		// this._prevButton.setNativeProps({style: {color: cardColors[this.filtered_cards[state.index].type]}});
		// this._nextButton.setNativeProps({style: {color: cardColors[this.filtered_cards[state.index].type]}});
		this.initial_index = state.index;
		this.props.setHeaderTitle(this.filtered_cards[state.index].PrimaryField);
		this.props.loadTransactions(user.MobileSessionToken, this.filtered_cards[state.index].MobileAccountId, fromDate, toDate);
		this.props.loadPayments(user.MobileSessionToken, this.filtered_cards[state.index].MobileAccountId, fromDate, toDate);
	},

	render() {
		const {props, filtered_cards} = this;
		const currentColor = cardColors[CardTypes[this.filtered_cards[this.initial_index].Type - 1]];
		const currentCardNo = this.filtered_cards[this.initial_index].PrimaryField;
		let paymentHistory = null;
		let transactionHistory = null;
		if (this.props.payments && this.props.payments.list && this.props.payments.list.ResponseCode == 1 && this.props.payments.list.PaymentHeadersList.length > 0) {
			paymentHistory = this.props.payments.list.PaymentHeadersList.map((item, index) => (<PaymentHistoryCard key={`payment_history_${index}`} data={item} mobileAccountId={this.filtered_cards[this.initial_index].MobileAccountId} cardNo={this.filtered_cards[this.initial_index].PrimaryField} />));
		}
		if (this.props.transactions && this.props.transactions.list && this.props.transactions.list.ResponseCode == 1 && this.props.transactions.list.TransactionHeadersList.length > 0) {
			transactionHistory = this.props.transactions.list.TransactionHeadersList.map((item, index) => (<TransactionHistoryCard key={`transaction_history_${index}`} data={item} mobileAccountId={this.filtered_cards[this.initial_index].MobileAccountId} cardNo={this.filtered_cards[this.initial_index].PrimaryField} />));
		}

		let paymentCardViews = filtered_cards.map((card, index) => {
			const balance = card.Balance ? numeral(numeral().unformat(card.Balance.AccountBalance)).format('0,0.00') : '';
			return <ScrollView key={index}>
				<View style={[styles.container, {backgroundColor: cardColors[CardTypes[card.Type - 1]]}]}>
					<View style={styles.topPanel}>
						<Text style={styles.cardTypeLabel}>{_.upperCase(CardTypes[card.Type - 1])}</Text>
						<View style={styles.separator}></View>
						<View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
							<Text style={styles.balance}>{balance ? balance.substr(0, balance.lastIndexOf('.')) : ''}
								<Text style={{fontSize: 40, letterSpacing: -5}}>{balance ? balance.substr(balance.lastIndexOf('.')) : ''}</Text>
							</Text>
							<Button style={styles.currencyButton} onPress={() => Actions.currencyModal()}>{card.Currency}</Button>
						</View>
						<Text style={styles.description}>AVAILABLE ON CARD</Text>
					</View>
					<View style={styles.bottomPanel}>
						<View style={styles.recent_payments}>
							<Text style={styles.sectionTitle}>RECENT PAYMENTS</Text>
							{paymentHistory}
						</View>
						<View style={styles.recent_payments}>
							<Text style={styles.sectionTitle}>RECENT TRANSACTIONS</Text>
							{transactionHistory}
						</View>
					</View>
				</View>
			</ScrollView>
		});

		return (
			<View ref={ root => this._root = root} style={[styles.cardDetail, {backgroundColor: currentColor}]}>
				<Swiper 
					ref="detail_swiper"
					onMomentumScrollEnd={this.onSwipeChange}
					showsButtons={true} paginationStyle={styles.paginationStyle} 
					dot={(<View style={styles.dotStyle} />)}
					activeDot={(<View style={styles.activeDotStyle} />)}
					buttonWrapperStyle={styles.buttonWrapperStyle}
					prevButton={<Text ref={prevButton => this._prevButton = prevButton} style={[styles.buttonText]}>‹</Text>}
					nextButton={<Text ref={nextButton => this._nextButton = nextButton} style={[styles.buttonText]}>›</Text>}
					index={0}
				>
					{paymentCardViews}
				</Swiper>
				<View style={styles.headerContainer}>
					<Header ref={header => this._header = header} title={currentCardNo} pageBackgroundColor={cardColors[this.filtered_cards[0].type]} />
				</View>
				<ProgressHUD
					isVisible={this.props.transactions.loading || this.props.payments.loading}
          isDismissible={true}
          overlayColor="rgba(0, 0, 0, 0.5)"
        />
			</View>
		)
	}
});

const styles = StyleSheet.create({

	cardDetail: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'transparent',
		width: screen_width,
	},
	container: {
		width: screen_width,
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'transparent'
	},

	headerContainer: {
    position: 'absolute',
    left: 0,
    top: 20,
    width: screen_width,
    flexDirection: 'row'
  },

  paginationStyle: {
  	top: (-screen_height + 175)
  },

  buttonWrapperStyle: {
  	top: -120
  },

  dotStyle: {
  	backgroundColor: 'rgba(255, 255, 255, .5)',
  	width: 6,
  	height: 6,
  	borderRadius: 3, 
  	marginLeft: 3, 
  	marginRight: 3, 
  	marginTop: 3, 
  	marginBottom: 3
  },

  activeDotStyle: {
		backgroundColor: 'rgba(255, 255, 255, 1)',
		width: 6,
		height: 6,
		borderRadius: 3,
		marginLeft: 3,
		marginRight: 3,
		marginTop: 3,
		marginBottom: 3
  },

	topPanel:{
		marginTop: 120,
		alignItems: 'center',
	},

	separator:{
		height: 3,
		marginTop: 10,
		marginBottom: 15,
		width: 25,
		backgroundColor: '#7f424c'
	},

	cardTypeLabel: {
		fontSize: 28,
		fontFamily: 'LetterGothicStd-Bold',
		color: 'white'
	},

	balance: {
		fontSize: 80,
		fontFamily: 'Letter Gothic Std',
		color: 'white',
		letterSpacing: -10
	},

	description:{
		fontSize: 13,
		fontFamily: 'JosefinSans-Bold',
		color: '#7f424c',
		marginTop: -15
	},

	bottomPanel:{
		marginTop: 50,
		paddingHorizontal: 30,
		width: screen_width
	},

	sectionTitle: {
		fontSize: 15,
		color: 'white',
		fontFamily: 'JosefinSans-Bold',
		opacity: 0.9
	},

	buttonText:{
		color: 'white',
		fontSize: 30,
		fontFamily: 'LetterGothicStd-Bold',
		opacity: 0.8
	},

	recent_payments:{
		marginBottom: 30
	},

	currencyButton: {
		color: 'white',
		fontSize: 13,
		fontFamily: 'JosefinSans-Bold',
		backgroundColor: '#677ada',
		paddingVertical: 5,
		paddingHorizontal: 10,
		overflow: 'hidden',
		borderRadius: 10,
		alignSelf: 'flex-end',
		marginBottom: 30
  },
});

export default connect(
  state => ({user: state.auth.user, account: state.account.account, transactions: state.transactions, payments: state.payments}),
  {setHeaderTitle, loadTransactions, loadPayments}
)(CardDetailPage);