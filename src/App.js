import React, { Component, StatusBarIOS } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './redux/configStore';
import AppRouter from './Routes';

StatusBarIOS.setStyle('light-content', true);

export default class App extends Component{
  /**
   * Render
   *
   * @return {jsx} Render <Provider /> component
   */
  render(){
    return (
        <Provider store={ configureStore() }>
            <AppRouter />
        </Provider>
    );
  }

}
