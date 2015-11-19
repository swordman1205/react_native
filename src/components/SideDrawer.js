import React, { Component, StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';

import Drawer from 'react-native-drawer';
import SideDrawerContent from './SideDrawerContent';

export default class SideDrawer extends Component {
  render() {
    return (
      <Drawer
        content={<SideDrawerContent />}
        acceptPan={false}
        tapToClose={true}
        openDrawerOffset={0.5}
        panCloseMask={0.2}
        closedDrawerOffset={0}
        onOpen={this.props.openHandler}
        onClose={this.props.closeHandler}
      >
        {React.Children.map(this.props.children, c => React.cloneElement(c, {
          route: this.props.route
        }))}
      </Drawer>
    )
  }
}