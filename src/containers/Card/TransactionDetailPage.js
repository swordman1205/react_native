import React, {Component, StyleSheet, Text, Image, View, InteractionManager} from 'react-native';
import Dimensions from 'Dimensions';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import ProgressHUD from 'react-native-progress-hud';
import _ from 'lodash';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import FontawesomeIcon from 'react-native-vector-icons/FontAwesome';

import Header from '../../components/Header';
import {loadTransactionDetails} from '../../redux/actions/transactionActions';

//Get the screen width and height.
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

class MainCard extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const {transaction_detail: {Amount, Description}, style} = this.props;
		const balance = Amount ? numeral(numeral().unformat(Amount.substr(0, Amount.indexOf(' ')))).format('0,0.00') : '';
		const currency = Amount ? Amount.substr(Amount.indexOf(' ') + 1) : '';
		return (
			<View style = {[mainCardStyles.mainCard, this.props.style]}>
				<Text style={mainCardStyles.paymentAmountLabel}>
					TRANSACTION AMOUNT
				</Text>
				<View style={mainCardStyles.bottomView}>
					<Text style={mainCardStyles.paymentAmountBig}>
						{balance ? balance.substr(0, balance.lastIndexOf('.')) : ''}
						<Text style={mainCardStyles.paymentAmountSmall}>
							{balance ? (balance.substr(balance.lastIndexOf('.')) + ' ' + currency) : ''}
						</Text>
					</Text>
					<View style={mainCardStyles.paymentTypeBlock}>
						<Text numberOfLines={1} style={mainCardStyles.paymentLoader}>
							{Description}
						</Text>
						<View style={mainCardStyles.paymentUnitButtonBlock}>
							<Button style={mainCardStyles.paymentUnitButton} onPress={() => Actions.currencyModal()}>
								{currency}
							</Button>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const mainCardStyles = StyleSheet.create({
	mainCard: {
		backgroundColor: '#ff6466',
		width: screen_width * 0.8,
		height: screen_height * 0.25,
		borderRadius : 3,
		padding: screen_width * 0.0625,
		shadowColor: 'black',
		shadowOpacity: 0.3,
		shadowRadius: 10,
		shadowOffset:{
			width: 0,
			height: 10
		},
	},

	paymentAmountLabel: {
		fontSize: screen_height * 0.017,
		color: '#3D313D',
		fontFamily: 'JosefinSans-Bold'
	},

	bottomView: {
		left: screen_width * 0.0625, 
		bottom: screen_width * 0.0625, 
		position: 'absolute',
		flex: 1,
		width: screen_width * 0.675,
	},

	paymentAmountBig: {
		fontSize: 55,
		height: 55,
		fontFamily: 'Letter Gothic Std',
		color: 'white',
	},

	paymentAmountSmall: {
		fontSize: 13,
		fontFamily: 'JosefinSans-Bold',
	},

	paymentLoader: {
		color: 'white',
		fontSize: 17,
		height: 17,
		fontFamily: 'LetterGothicStd-Bold',
		color: 'white',
		width: screen_width * 0.5
	},

	paymentTypeBlock: {
		 flex: 1, 
		 flexDirection: 'row'
	},

	paymentUnitButtonBlock: {
		right: 0,
		position: 'absolute',

	},

	paymentUnitButton: {
		color: 'white',
		fontSize: 13,
		backgroundColor: '#677ada',
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 15,
		overflow: 'hidden',
		fontFamily: 'JosefinSans-Bold'
	}
});

class DetailInfo extends Component{
	constructor(props){
		super(props);
	}

	render(){
		const {icon, title, text, disable_border} = this.props;
		return(
			<View style={[detailInfoStyles.detailInfo, {borderBottomWidth: disable_border ? 0 : 1}]}>
				<View style={detailInfoStyles.mainBlock}>
					<FontawesomeIcon name={icon.name} size={20} color={icon.color} />
					<View style={detailInfoStyles.titleAndText}>
						<Text style={detailInfoStyles.title}>{_.toUpper(title)}</Text>
						<Text style={detailInfoStyles.text}>{_.toUpper(text)}</Text>
					</View>
				</View>
			</View>
		);
	}
}

const detailInfoStyles = StyleSheet.create({
	detailInfo: {
		flex: 0.25,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomColor: '#dee8ef',
		backgroundColor: 'transparent'
	},

	mainBlock: {
		flexDirection: 'row',
		alignItems: 'flex-end'
	},

	title: {
		color: '#aebecc',
		fontSize: screen_height * 0.016,
		fontFamily: 'Letter Gothic Std'
	},

	text: {
		color: '#44566c',
		fontSize: screen_height * 0.024,
		marginTop: 3,
		fontFamily: 'Letter Gothic Std'
	},

	headerPlayerPhoto: {
		height: screen_height * 0.023,
		width: screen_width * 0.0625,
		marginBottom: screen_height * 0.005,
		resizeMode : 'contain'
	},

	titleAndText: {
		marginLeft: screen_width * 0.018
	}
})

class DetailCard extends Component{
	constructor(props){
		super(props);
	}

	render(){
		const {transaction_detail, details} = this.props;
		
		let TransactionAmount = '', TransactionDate = '', TransactionNumber = '', MerchantLocation = '', ExtraDetails = '';
		if (details && details.ResponseCode == 1 && details.Details)
		{
			TransactionAmount = details.Details.TransactionAmount.Value;
			TransactionDate = details.Details.TransactionDate.Value;
			TransactionNumber = details.Details.TransactionNumber.Value;
			MerchantLocation = details.Details.MerchantLocation.Value;
			ExtraDetails = details.Details.ExtraDetails;
		}
		return (
			<View style = {detailCardStyles.detailCard}>
				<MainCard style={detailCardStyles.marginMainCard} transaction_detail = {transaction_detail}/>
				<DetailInfo 
					icon={{name: 'tag', color: '#c0d0df'}}
					title='TRANSACTION NUMBER'
					text={TransactionNumber}/>
				<DetailInfo 
					icon={{name: 'calendar', color: '#c0d0df'}}
					title='TRANSACTION DATE' 
					text={TransactionDate ? moment(TransactionDate, moment.ISO_8601).format('MMMM DD, YYYY h:mm A') : ''}/>
				<DetailInfo 
					icon={{name: 'map-marker', color: '#c0d0df'}}
					title='MERCHANT LOCATION' 
					text={MerchantLocation}/>
				<DetailInfo 
					icon={{name: 'lightbulb-o', color: '#c0d0df'}}
					title='TRANSACTION DETAILS' 
					text={ExtraDetails}
					disable_border={true}/>
			</View>
		);
	}
}

const detailCardStyles = StyleSheet.create({
	detailCard:{
		backgroundColor: '#FFFFFF',
		width: screen_width * 0.9,
		flex: 1,
		borderRadius : 3,
		alignItems: 'stretch',
		paddingLeft:  screen_width * 0.05,
		paddingRight:  screen_width * 0.05,
	},

	marginMainCard: {
		marginTop: -screen_height * 0.074,
	}
});

const TransactionDetailPage = React.createClass({
	mixins: [ProgressHUD.Mixin],

	contextTypes: {
		showProgressHUD: React.PropTypes.func,
		dismissProgressHUD: React.PropTypes.func
	},

	componentDidMount(){

		const {user, mobileAccountId, transaction_detail} = this.props;
		
		InteractionManager.runAfterInteractions(() => {
	      this.props.loadTransactionDetails(user.MobileSessionToken, mobileAccountId, transaction_detail.TransactionId)
	    });		
	},

	render() {

		const {transaction_detail, transactions, card_no} = this.props;
		return (
			<View style={styles.transactionDetails}>
				<View style = {styles.mainBlock}>
					<Text style={styles.heading}>
						TRANSACTION DETAILS
					</Text>
					<DetailCard transaction_detail={transaction_detail} details={transactions.detail} />
				</View>
				<View style={styles.headerContainer}>
					<Header ref={header => this._header = header} title={card_no} pageBackgroundColor='#FFFFFF' />
				</View>
				<ProgressHUD
					isVisible={transactions.detail_loading}
		          isDismissible={true}
		          overlayColor="rgba(0, 0, 0, 0.5)"
		        />
			</View>
		)
	}
});

const styles = StyleSheet.create({
	transactionDetails: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#3D313D',
		width: screen_width
	},

	heading: {
		height: screen_height * 0.12,
		color: 'white',
		fontSize: screen_height * 0.03,
		fontFamily: 'Letter Gothic Std'
	},

	mainBlock: {
		position: 'absolute',
		alignItems: 'center',
		bottom: screen_width * 0.05,
		left: screen_width * 0.05,
		top: screen_width * 0.05 + 60
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
  state => ({user: state.auth.user, transactions: state.transactions}),
  {loadTransactionDetails}
)(TransactionDetailPage);
