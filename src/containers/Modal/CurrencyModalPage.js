import React, {Component, PropTypes, StyleSheet, View, ScrollView, Image, Text, TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Dimensions from 'Dimensions';
import {setCurrency} from '../../redux/actions/currencyActions';
import {Currencies} from '../../constants';

const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

class CurrencyModalPage extends Component {
	static propTypes = {
    user: PropTypes.object,
    setCurrency: PropTypes.func
  }

  constructor(props){
    super(props);
  }

  onChooseCurrency(currency) {
		this.props.setCurrency(currency);
    Actions.pop();
	}

  render() {
    return (
      <View style={styles.container}>
      	<View style={styles.titleContainer}>
          <Text style={styles.title}>CURRENCY VIEW</Text>
          <View style={styles.dismissButton}>
            <Icon.Button name="close" size={25} color="white" backgroundColor="transparent" onPress={()=>{Actions.pop();}} />
          </View>
        </View>
        <ScrollView automaticallyAdjustContentInsets={false} style={styles.currenciesViewContainer}>
          {Currencies.map((c, i) => {
            return (
              <TouchableHighlight key={i} underlayColor={'#7688de'} onPress={this.onChooseCurrency.bind(this, c.name)}>
                <View style={styles.currencyItemContainer}>
                  <Image source={c.image} style={styles.currencyLogo} />
                  <Text style={styles.currencyLabel}>{c.name}</Text>
                  <Text style={styles.currencyDescription}>{c.description}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
	state => ({user: state.auth.user}),
  { setCurrency }
)(CurrencyModalPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#677ada',
    paddingVertical: 20,
    paddingHorizontal: 0
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#8595e1'
  },
  title: {
    flex: 1,
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
    fontSize: 20,
    textAlign: 'center'
  },
  dismissButton: {
    position: 'absolute',
    top: 8,
    right: 0
  },
  currenciesViewContainer: {
    flex: 1
  },
  currencyItemContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#8595e1',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  currencyLogo: {
    width: 35,
    resizeMode: 'contain',
    marginRight: 25
  },
  currencyLabel: {
    color: 'white',
    fontFamily: 'LetterGothicStd-Bold',
    fontSize: 18,
    marginRight: 20
  },
  currencyDescription: {
    color: '#bdc4ed',
    fontFamily: 'LetterGothicStd-Bold',
    fontSize: 18,
  }
});