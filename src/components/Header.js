import React, {Component, PropTypes, View, StyleSheet, Text} from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dimensions from 'Dimensions';

import {setDrawerBackground} from '../redux/actions/drawerActions';

const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

class Header extends Component {

	static propTypes = {
		title: PropTypes.string,
		showRightNextButton: PropTypes.bool,
		showHomeSwitchButtons: PropTypes.bool,
		pageBackgroundColor: PropTypes.string
	}

	static defaultProps = {
		title: '',
		showRightNextButton: true,
		showHomeSwitchButtons: false,
		pageBackgroundColor: 'transparent'
	}

	static contextTypes = {
		drawer: React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.state = { title: props.title };
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.newTitle != '' && this.state.title != nextProps.newTitle) {
			this.setState({title: nextProps.newTitle});
		}
	}

	handleDrawerToggle() {
		console.log('drawer toggle.');
		if (this.props.isOpen) {
			this.context.drawer.close();
		}	else {
			this.props.setDrawerBackground(this.props.pageBackgroundColor); this.context.drawer.open();
		}
	}

	showHomeView() {
		const {currentRoute} = this.props;
		if (currentRoute != '' && currentRoute != 'main_home') {
			Actions.main_home();
		}
	}

	showCardsView() {
		const {currentRoute} = this.props;
		if (currentRoute != 'cards_home') {
			Actions.cards_home();
		}
	}

	showCircleView() {
		const {currentRoute} = this.props;
		if (currentRoute != 'circle_home') {
			Actions.circle_home();
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text ref={title => this._title = title} style={styles.title}>
					{this.state.title}
				</Text>
				<Button onPress={this.handleDrawerToggle.bind(this)}>
					<Icon name={this.props.isOpen ? 'close' : 'menu'} size={30} color="white" />
				</Button>
				{this.props.showHomeSwitchButtons && (
					<View style={styles.rightButtonsContainer}>
						<Button onPress={this.showHomeView.bind(this)}>
							<Icon name="home" size={20} color="white" style={{marginRight: 5}} />
						</Button>
						<Button onPress={this.showCardsView.bind(this)}>
							<Icon name="content-copy" size={20} color="white" style={{marginRight: 5}} />
						</Button>
						<Button onPress={this.showCircleView.bind(this)}>
							<Icon name="group-work" size={20} color="white" />
						</Button>
					</View>
				)}
				{this.props.showRightNextButton && 
					<Button onPress={()=>{Actions.pop();}}>
						<Icon name="chevron-right" size={30} color="white" />
					</Button>
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
  	flex: 1,
  	height: 44,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'
  },
  title: {
  	position: 'absolute',
  	width: screen_width,
  	left: 0,
  	top: 15,
  	color: 'white',
  	fontSize: 18,
  	fontFamily: 'JosefinSans-Bold',
  	textAlign: 'center'
  },
  rightButtonsContainer: {
  	flexDirection: 'row'
  }
});

const HeaderWrapper = connect(
	state => ({drawerBackgroundColor: state.drawer.backgroundColor, isOpen: state.drawer.isOpen, currentRoute: state.global.currentRoute, newTitle: state.global.headerTitle}),
  { setDrawerBackground }
)(Header);

export default HeaderWrapper;
