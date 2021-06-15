/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList
} from 'react-native';
import {Provider} from 'react-redux';
import {useSelector} from 'react-redux';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {store} from './state/store';

const AppDelegate = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const App: () => Node = () => {
  console.log('<Section /> component')

  const logs = useSelector(state => state.logs);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        style={styles.list}
        data={logs.data}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <LogItem log={item} />}
      />
    </SafeAreaView>
  );
};

const LogItem = ({log}) => {
  function getFormattedDateToLocalPattern(isoDateString) {
    return new Date(isoDateString).toLocaleString()
  }

  return (
    <View style={styles.logContainer}>
      <Text style={styles.logTime}>
        {getFormattedDateToLocalPattern(log.time)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  logContainer: {
    borderBottomWidth: 1,
    borderColor: '#FFF',
    marginBottom: 5,
    height: 40
  },
  logTime: {
    fontSize: 20,
    color: '#FFF'
  }
});

export default AppDelegate;
