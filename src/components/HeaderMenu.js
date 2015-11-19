import React, {
	Component,
	View,
	StyleSheet,
	Text
} from 'react-native';

import Dimensions from 'Dimensions';
import Button from 'react-native-button';

const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

class HeaderMenu extends Component {
	
	constructor(props) {
		super(props);
		
	}

	render() {
		return (
			<View style={styles.headerMenu}>
				<Button style={styles.button} onPress={this.props.onClickTmpButton}>
					{this.props.tmpButtonLabel}
				</Button>
				<Text>
					This is header menu place and commonly used for all pages.
				</Text>
				
			</View>
		)
	}
}

const styles = StyleSheet.create({
  headerMenu: {
    padding: 30,
    position: 'absolute',
  },

  button: {
  	color: 'white',
		fontSize: screen_height * 0.015,
		backgroundColor: '#677ada',
		paddingTop: screen_height * 0.012,
		paddingBottom: screen_height * 0.012,
		paddingLeft: screen_width * 0.067,
		paddingRight: screen_width * 0.067,
		borderRadius: screen_height * 0.02,
		overflow: 'hidden'
  }
});


export default HeaderMenu;