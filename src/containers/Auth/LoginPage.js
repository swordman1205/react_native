import React, {Component, PropTypes, StyleSheet, View, Image, Text, TextInput, ActivityIndicatorIOS, AlertIOS} from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AsyncStorage} from 'react-native';

import Dimensions from 'Dimensions';
import {loginWithUsernamePassword, loginWithUserCache, logout} from '../../redux/actions/authActions';
import {loadAccountInfo} from '../../redux/actions/accountActions';

import {LOCAL_STORAGE_TOKEN_KEY} from '../../constants';

const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

class LoginPage extends Component {
	static propTypes = {
    user: PropTypes.object,
    error: PropTypes.object,
    loading: PropTypes.bool,
    loginWithUsernamePassword: PropTypes.func,
    loginWithCacheToken: PropTypes.func,
    logout: PropTypes.func
  }

  constructor(props){
    super(props);
    this.state = {
    	username: '',
    	usernameError: '',
    	password: '',
    	passwordError: '',
			loadingText: 'Logging in...'
    };
		this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem(LOCAL_STORAGE_TOKEN_KEY).then((value) => {
      if(value){
        const user = JSON.parse(value);
        console.log('cache token: ', user.MobileSessionToken);
        //this.props.loadAccountInfo(user.MobileSessionToken);
        this.props.loginWithUserCache(user);
      }
    }).done();
  }

  componentWillReceiveProps(newProps) {
		if (!this.props.auth.user && newProps.auth.user) {
			// login success action
      this.props.loadAccountInfo(newProps.auth.user.MobileSessionToken);
		}
    if (!this.props.auth.error && newProps.auth.error) {
			// login fail action
			AlertIOS.alert('Error', newProps.auth.error.Description);
		}
    if (!this.props.account.account && newProps.account.account) {
      Actions.app();
      this.setState({username: '', password: ''});
    }
    if (!this.props.account.error && newProps.account.error) {
      if (this.props.auth.user && this.props.auth.user.MobileSessionToken) {
        this.props.logout();
      }
    }
	}

  _onSubmit() {
		const {username, password} = this.state;
		if(username == '' || password == '') {
			this.setState(Object.assign({}, username == '' ? {usernameError: '*Username is required.'} : {}, password == '' ? {passwordError: '*Password is required.'}: {} ));
			return;
		}
		this.setState({loadingText: 'Logging in...'});
		this.props.loginWithUsernamePassword(username, password);
	}

  render() {
    const isLoading = this.props.auth.loading || this.props.account.loading;
    return (
      <View style={styles.container}>
      	<Image source={require('../../../assets/images/login_bg.png')} style={styles.backgroundImage} />
        <Button style={styles.languageButton} onPress={() => {}}>EN</Button>
        <Image source={require('../../../assets/images/white_logo.png')} style={styles.logoImage} />
        <Text style={styles.headerLabel}>HOLA THERESA</Text>
        <View style={[styles.loginForm, styles.shadow]}>
        	<View style={styles.formItem}>
        		<Icon name="user" size={20} color="#ff6467" style={{marginRight: 10}} />
        		<View style={{flex: 1}}>
        			<Text style={styles.formLabel}>USERNAME</Text>
        			<TextInput
        				autoCapitalize="none"
								autoCorrect={false}
								returnKeyType="next"
						    style={styles.textInput}
						    onChangeText={(username) => this.setState({username, usernameError: ''})}
						    value={this.state.username}
						    placeholder={'THERESA GREBIN'}
                editable={!isLoading}
						  />
        		</View>
        	</View>
        	<View style={styles.formItem}>
        		<Icon name="lock" size={20} color="#ff6467" style={{marginRight: 10}} />
        		<View style={{flex: 1}}>
        			<Text style={styles.formLabel}>PASSWORD</Text>
        			<TextInput
        				autoCapitalize="none"
								autoCorrect={false}
								secureTextEntry={true}
								returnKeyType="go"
						    style={styles.textInput}
						    onChangeText={(password) => this.setState({password, passwordError: ''})}
						    value={this.state.password}
						    placeholder={'PASSWORD'}
                editable={!isLoading}
						  />
        		</View>
        	</View>
        	<View style={styles.formItem}>
        		<Button style={styles.forgotPasswordButton}>forgot password?</Button>
        	</View>
        	<Button style={[styles.loginButton, styles.shadow]} onPress={this._onSubmit}>LOG IN</Button>
        </View>
        {!!this.state.usernameError && (
						<Text style={styles.errorLabel}>{this.state.usernameError}</Text>
					)}
        {!!this.state.passwordError && (
						<Text style={styles.errorLabel}>{this.state.passwordError}</Text>
					)}
        {isLoading &&
					<View style={styles.loadingContainer}>
						<ActivityIndicatorIOS animating={true} isSmall={true} color={'white'} />
            <Text style={styles.loadingLabel}>{this.state.loadingText}</Text>
          </View>
        }
        <View style={styles.bottomContainer}>
        	<View style={styles.separator} />
        	<Button style={styles.firstTimeButton}>first time with payoneer?</Button>
        </View>
      </View>
    );
  }
}

export default connect(
	state => ({auth: state.auth, account: state.account}),
  { loginWithUsernamePassword, loginWithUserCache, logout, loadAccountInfo }
)(LoginPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20
  },
  backgroundImage: {
  	position: 'absolute',
  	left: 0,
  	top: 0,
  	width: screen_width,
  	height: screen_height,
    resizeMode: 'cover', // or 'stretch'
  },
  logoImage: {
  	width: screen_width * 0.5,
  	alignSelf: 'center',
    resizeMode: 'contain', // or 'stretch'
    marginBottom: 40
  },
  headerLabel: {
  	color: '#8b4744',
  	alignSelf: 'center',
  	fontFamily: 'LetterGothicStd-Bold',
  	fontSize: 20,
  	marginBottom: 10
  },
  loginForm: {
  	backgroundColor: 'white',
		position: 'relative',
		marginBottom: 40
  },
  formItem: {
  	padding: 20,
  	flexDirection: 'row',
  	alignItems: 'center',
  	borderBottomWidth: 2,
  	borderBottomColor: '#dee8ef'
  },
  formLabel: {
  	color: '#8ea5ba',
  	fontFamily: 'Josefin Sans',
  	fontSize: 13,
  	marginBottom: 2
  },
  textInput: {
  	height: 25,
  	fontFamily: 'LetterGothicStd-Bold',
  	fontSize: 22,
  	flex: 1
  },
  languageButton: {
		color: 'white',
		fontSize: 15,
		backgroundColor: 'rgba(255, 255, 255, 0.15)',
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 15,
		alignSelf: 'flex-end',
		marginBottom: 30
  },
  forgotPasswordButton: {
  	color: '#ff6467',
  	fontFamily: 'Josefin Sans',
  	fontSize: 15,
  	marginBottom: 10
  },
  loginButton: {
  	position: 'absolute',
  	bottom: -21,
  	right: 15,
  	fontFamily: 'Josefin Sans',
  	fontSize: 18,
  	color: 'white',
  	backgroundColor: '#677ada',
  	paddingVertical: 13,
  	paddingHorizontal: 40
  },
  bottomContainer: {
  	flex: 1,
  	justifyContent: 'flex-end',
  	alignItems: 'center'
  },
  firstTimeButton: {
  	color: 'white',
  	fontFamily: 'Josefin Sans',
  	fontSize: 15
  },
  separator: {
  	width: 30,
  	height: 3,
  	backgroundColor: '#7f424c',
  	marginBottom: 30
  },
  shadow: {
  	shadowOffset:{
      width: 0,
      height: 30
    },
    shadowRadius: 15,
    shadowColor: 'black',
		shadowOpacity: 0.3,
  },
  loadingContainer: {
  	flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	loadingLabel: {
		color: 'white',
		marginLeft: 5
	},
	errorLabel: {
		color: 'white',
		marginBottom: 3,
		alignSelf: 'center'
	}
});