import React, { Animated, Easing, Component, StyleSheet, Text, Image, PanResponder, View, TouchableHighlight } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Dimensions from 'Dimensions';
import _ from 'lodash';

import {Actions} from 'react-native-router-flux';

const pageBackgroundColor = '#252f3e';
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

const cardImages = {
  debit_card: require('../../assets/images/home/debit_card.png'), 
  bank_card: require('../../assets/images/home/bank_card.png'), 
  virtual_balance: require('../../assets/images/home/virtual_balance.png')
}; 

class CardSet extends Component {
  constructor(props) {
    super(props);
    this._animatedValue = new Animated.Value(0);
    this.base_exponent_backup = 0;
    this.state = {
      base_exponent: 0
    }
    this._animatedValue.addListener(({value}) => this.setState({base_exponent: value}));

    this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder : () => true,
        onPanResponderGrant          : (evt, gestureState) => {this.gravity = 0; this._animatedValue.setValue(this.state.base_exponent); this.moveY = this.gestureMoveY = -1; this.drag = false;},
        onPanResponderMove           : (e, gestureState) => {if(this.moveY == -1) this.moveY = gestureState.moveY;  this.gestureMoveY = gestureState.moveY; this.drag = true; this.onPanGestureMove()},
        onPanResponderRelease        : (e, gestureState) => {
          const {_animatedValue, gravity} = this;
          _animatedValue.setValue(this.state.base_exponent);
          Animated.decay(
            _animatedValue,
            {
              velocity: gravity/1000,
              deceleration: 0.997,
            }
          ).start(this.stopAnimationCallback.bind(this));
        }
    });
  }

  onPanGestureMove() {
    this.setState({'base_exponent': this.state.base_exponent+(this.gestureMoveY-this.moveY)/50});
    this.gravity = this.gestureMoveY-this.moveY;
    this.moveY = this.gestureMoveY;
  }

  componentDidMount() {
    
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

  stopAnimationCallback(value){
    const {_animatedValue, gravity} = this;
    _animatedValue.setValue(this.state.base_exponent);
    Animated.timing(
      _animatedValue,
      {
        toValue: Math.round(this.state.base_exponent),
        duration: 100
      }
    ).start();
  }

  goDetailPage(card){
    Actions.card_details({card_no: card.card_no});
  }

  render() {
    //const slidingAnimationStyle = this.state
     // .slidingRadian
      //.getTranslateTransform(); // Get the initial transform style
    const {_animatedValue, gravity} = this;
    const {base_exponent} = this.state;
    const {cards} = this.props;

    var Cards = [];
    var count = cards.length;
    if(cards.length < 7)
      count *= Math.ceil(7/cards.length);
    for (var i = 0; i < count; i++) {
      var order = ((base_exponent+i) % count + count) % count;
      var scale = (order/4.0+8)/10.0;
      if(scale > 0.93 || (scale<0.9?1:(0.925-scale)*40)<0.1)
      {
        scale = 0;
        continue;
      }

      const card = _.clone(cards[i % cards.length]);
        
      Cards.push({scale: scale, order: order, card_info: card, key: i,
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
                    velocity: gravity/1000,
                    deceleration: 0.997,
                  }
                ).start(this.stopAnimationCallback.bind(this));
              }
          })
      });
    }

    center_x = Dimensions.get('window').width/2;

    top_y = Dimensions.get('window').height/3;

    radius = center_x * 0.8;
    card_radius = Dimensions.get('window').width;

    let _self = this;
    Cards = Cards.sort(function(a,b){
      return a.scale>b.scale?1:-1;
    }).map(function(object, index) {
      const backgroundColor = object.card_info.type == "virtual_balance" ? '#ff6d61' : (object.card_info.type == "bank_card" ? '#ff9860' : '#ffba60')
      const animateStyle = {transform: [{translateX:  0}, {translateY: (object.scale-0.825) * center_x * (object.scale>0.825?10:1)}, 
      {scaleX: object.scale}, {scaleY: object.scale}], position: 'absolute',
        backgroundColor: backgroundColor}
      const responder = object.panResponder;

      const animatedView = 
        <Animated.View {...responder.panHandlers} style={[styles.card, animateStyle, {
            shadowOffset:{
              width: 0,
              height: -3
            },
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width*0.5,
            borderRadius: card_radius/50,
            opacity: object.scale<0.9?1:(0.925-object.scale)*40
            }]} key={object.key}>
            <View style={{left: 0, top: 0, backgroundColor: 'transparent', justifyContent: 'space-between', flex: 1}}>
              <View style = {{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                <Text style={{fontSize: card_radius*0.04, color: pageBackgroundColor, fontFamily: 'JosefinSans-Bold'}}>{_.upperCase(object.card_info.type)}</Text>
                <Text style={{fontSize: card_radius*0.05, color: 'white', fontFamily: 'Letter Gothic Std', justifyContent: 'flex-end'}}>{object.card_info.card_no}</Text>
              </View>
              <View style = {{justifyContent: 'flex-end'}}>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                  <View>
                    <Text style={{fontSize: card_radius*0.13, color: 'white', fontFamily: 'Letter Gothic Std'}}>{object.card_info.balance ? object.card_info.balance.substr(0, object.card_info.balance.lastIndexOf('.')) : ''}
                      <Text style={{fontSize: card_radius*0.04, color: 'white', fontFamily: 'Letter Gothic Std'}}>{`${object.card_info.balance ? object.card_info.balance.substr(object.card_info.balance.lastIndexOf('.')) : ''} ${object.card_info.currency}`}</Text>
                    </Text>
                    <Text style={{fontSize: card_radius*0.04, color: pageBackgroundColor, fontFamily: 'JosefinSans-Bold'}}>AVAILABLE ON CARD</Text>
                  </View>
                  <View style={{justifyContent: 'flex-end'}}>
                    <Image 
                      source={cardImages[object.card_info.type]} style = {{height: card_radius*0.15, resizeMode: 'contain'}} />
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        return (
          <View key={object.key}>
            {animatedView}
          </View>
        );
    });

    const {props} = this;
    return (

      <View  >
        <View style={{left:-1000, top: -1000, width:2000, height:2000, position: 'absolute', backgroundColor: 'transparent'}}  key="background" {...this._panResponder.panHandlers}>
          
        </View>

        <View style={{top: top_y}} key="cards">
          
          {Cards}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    padding: 20
  },

});

export default CardSet;