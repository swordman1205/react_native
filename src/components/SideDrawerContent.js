import React, { Component, StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import Drawer from 'react-native-drawer';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {logout} from '../redux/actions/authActions';

class SideDrawerContent extends Component {
  
  static contextTypes = {
    drawer: React.PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  handleSignOut() {
    this.props.logout();
    Actions.login();
  }

  handleTransitionToHome() {
    if (this.props.currentRoute != 'main_home') {
      this.context.drawer.close();
      Actions.main_home();
    }
  }

  handleTransitionToWithdraw() {
    if (this.props.currentRoute != 'withdraw') {
      this.context.drawer.close();
      Actions.withdraw();
    }
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: '#453744'}]}>
        <TouchableOpacity activeOpacity={0.7} onPress={this.handleTransitionToHome.bind(this)}>
          <View style={styles.menuItem}>
            <Icon name="home" size={35} color="white" style={{marginBottom: 5}} />
            <Text style={styles.menuItemLabel}>HOME</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <View style={styles.menuItem}>
            <Image source={require('../../assets/images/menu/transactions.png')} style={styles.menuItemLogo} />
            <Text style={styles.menuItemLabel}>TRANSACTIONS</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <View style={styles.menuItem}>
            <Image source={require('../../assets/images/menu/payments.png')} style={styles.menuItemLogo} />
            <Text style={styles.menuItemLabel}>PAYMENTS</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={this.handleTransitionToWithdraw.bind(this)}>
          <View style={styles.menuItem}>
            <Image source={require('../../assets/images/menu/withdraw.png')} style={styles.menuItemLogo} />
            <Text style={styles.menuItemLabel}>WITHDRAW</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <View style={styles.menuItem}>
            <Image source={require('../../assets/images/menu/support.png')} style={styles.menuItemLogo} />
            <Text style={styles.menuItemLabel}>SUPPORT</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <View style={styles.menuItem}>
            <Image source={require('../../assets/images/menu/refer_friend.png')} style={styles.menuItemLogo} />
            <Text style={styles.menuItemLabel}>REFER A FRIEND</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={this.handleSignOut.bind(this)}>
          <Text style={styles.signoutButton}>SIGN OUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  state => ({drawerBackgroundColor: state.drawer.backgroundColor, currentRoute: state.global.currentRoute}),
  { logout }
)(SideDrawerContent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 15,
    marginRight: -1,
    alignItems: 'center'
  },
  menuItem: {
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 35  
  },
  menuItemLogo: {
    width: 30,
    height: 50,
    resizeMode: 'contain'
  },
  menuItemLabel: {
    color: '#d5dde3',
    fontSize: 12,
    fontFamily: 'Josefin Sans',
  },
  signoutButton: {
    color: '#ff6167',
    fontSize: 15,
    fontFamily: 'JosefinSans-Bold',
  }
});
