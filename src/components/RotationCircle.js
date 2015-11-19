import React, { Animated, Easing, Component, StyleSheet, Text, Image, PanResponder, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Dimensions from 'Dimensions';
import _ from 'lodash';

import HeaderMenu from './HeaderMenu';
import {Actions} from 'react-native-router-flux';

const pageBackgroundColor = '#252f3e';
const cardImages = {
  debit_card: require('../../assets/images/home/debit_card.png'), 
  bank_card: require('../../assets/images/home/bank_card.png'), 
  virtual_balance: require('../../assets/images/home/virtual_balance.png')
}; 

class RotationCircle extends Component {
  constructor(props) {
    super(props);
    this._animatedValue = new Animated.Value(0);
    this.base_exponent_backup = 0;
    this.state = {
      base_exponent: 0
    }
    this._animatedValue.addListener(({value}) => this.setState({base_exponent: value}));
  }

  componentDidMount() {
    
  }

  onPanGestureMove() {
    this.setState({'base_exponent': this.state.base_exponent-(this.gestureMoveY-this.moveY)/50});
    this.gravity = this.gestureMoveY-this.moveY;
    this.moveY = this.gestureMoveY;
  }

  goDetailPage(card){
    Actions.card_details({card_no: card.card_no});
  }

  getTitleFromType(type){
    switch(type){
      case "virtual_balance":
        return "VIRTUAL BALANCE";
      case "bank_card":
        return "BANK CARD";
      case "debit_card":
        return "DEBIT CARD";
      default:
        return "VIRTUAL BALANCE";
    }
  }

  render() {

    const {_animatedValue, gravity} = this;
    const {base_exponent} = this.state;
    const {cards} = this.props;

    this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder : () => true,
        onPanResponderGrant          : (evt, gestureState) => {this.gravity = 0; this._animatedValue.setValue(this.state.base_exponent);},
        onPanResponderMove           : (e, gestureState) => {this.setState({base_exponent: this.state.base_exponent-gestureState.dy/50}); this.gravity = gestureState.dy},
        onPanResponderRelease        : (e, gestureState) => {
          const {_animatedValue, gravity} = this;
          _animatedValue.setValue(this.state.base_exponent);
          Animated.decay(
            _animatedValue,
            {
              velocity: -gravity/1000,
              deceleration: 0.997,
            }
          ).start();
        }
    });

    var Circles = [];
    var count = cards.length;
    if(cards.length < 7)
      count *= Math.ceil(7/cards.length);
    for (var i = 0; i < count; i++) {
      var radian = Math.pow(1.1, Math.abs(((base_exponent+i*4) % (4*count) + 4*count) % (4*count)) - 2*count);
      //radian = Math.abs(radian % (Math.PI*2)-Math.PI);
      var radius = radian+1;
      if(radius > 7)
        radius = 0;
      const card = _.clone(cards[i % cards.length]);
      
      Circles.push({radius: radius/2, radian: radian, card_info: card, key: i,
        panResponder: PanResponder.create({
            onStartShouldSetPanResponder : () => true,
            onPanResponderGrant          : (evt, gestureState) => {this.gravity = 0; this._animatedValue.setValue(this.state.base_exponent); this.moveY = this.gestureMoveY = -1; this.drag = false;},
            onPanResponderMove           : (e, gestureState) => {if(this.moveY == -1) this.moveY = gestureState.moveY;  this.gestureMoveY = gestureState.moveY; this.drag = true;  this.onPanGestureMove()},
            onPanResponderRelease        : (e, gestureState) => {
              if (!this.drag){
                this.goDetailPage(card);
              }
              const {_animatedValue, gravity} = this;
              _animatedValue.setValue(this.state.base_exponent);
              Animated.decay(
                _animatedValue,
                {
                  velocity: -gravity/1000,
                  deceleration: 0.997,
                }
              ).start();
            }
        })
      });
      
    }
    circle_x = Dimensions.get('window').width;

    circle_y = circle_x * 1;
    radius = circle_x * 0.8;
    circle_radius = circle_x * 0.48;

    Circles = Circles.sort(function(a,b){
      return a.radius>b.radius?1:-1;
    }).map(function(object, index) {
      var backgroundColor = object.card_info.type == "virtual_balance" ? '#ff6d61' : (object.card_info.type == "bank_card" ? '#ff9860' : '#ffba60')
      var animateStyle = {transform: [{translateX:  -Math.sin(object.radian)*radius+circle_x}, {translateY: Math.cos(object.radian)*radius+circle_y}, 
      {scaleX: object.radius}, {scaleY: object.radius}], position: 'absolute',
        backgroundColor: backgroundColor}
      //console.log(object);
      
      const responder = object.panResponder;
      return (
        <View key={object.key}>
          <Animated.View {...responder.panHandlers}  style={[styles.circle, animateStyle, {
            shadowOffset:{
              width: 0,
              height: 10
            },
            width: circle_radius,
            height: circle_radius,
            borderRadius: circle_radius/2
            }]} key={"main"}>
            <View style={{left: 0, top: circle_radius*6/20, width: circle_radius, position: 'absolute', alignItems: 'center', backgroundColor: 'transparent'}}>
              <Image source={cardImages[object.card_info.type]} style = {{height: circle_radius*0.2, resizeMode: 'contain', marginBottom: 10}} />
              <View style = {{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={{fontSize: circle_radius*3/20, color: 'white', fontFamily: 'Letter Gothic Std'}}>{object.card_info.balance ? object.card_info.balance.substr(0, object.card_info.balance.lastIndexOf('.')) : ''}
                  <Text style={{fontSize: circle_radius*0.04, color: 'white', fontFamily: 'Letter Gothic Std'}}>{`${object.card_info.balance ? object.card_info.balance.substr(object.card_info.balance.lastIndexOf('.')) : ''} ${object.card_info.currency}`}</Text>
                </Text>
              </View>
              <Text style={{fontSize: circle_radius*3/50, color: pageBackgroundColor, fontFamily: 'JosefinSans-Bold'}}>{_.upperCase(object.card_info.type)}</Text>
            </View>
            
          </Animated.View>
        </View>
      );
    });
    const {props} = this;
    return (

      <View style={{top: 60}}>
        <View style={{left:-1000, top: -1000, width:2000, height:2000, position: 'absolute', backgroundColor: 'transparent'}} {...this._panResponder.panHandlers}/>
        {Circles}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    left: 50, top: 50, position: 'absolute'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  circle: {
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 20
  },
});

export default RotationCircle;