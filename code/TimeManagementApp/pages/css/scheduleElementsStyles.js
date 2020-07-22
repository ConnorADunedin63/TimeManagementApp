import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  bodyContainer: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#20639B'
  },
  innerContainer: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'stretch',

  },
  hourContainer: {
    minHeight: 100,
    backgroundColor: 'white',
    alignItems: 'stretch'
  },
  hourContainerEven: {
    minHeight: 100,
    backgroundColor: 'grey',
    alignItems: 'stretch'
  },
  hourMark: {
    alignSelf: 'center',
    marginBottom: 20
  },
  minutesContainer: {
    height: 40, 
    alignItems: 'center'
  },
  minuteMark: {
    marginLeft: 5
  },
  pageTitle: {
    fontSize: 32,
    textDecorationLine: 'underline',
    color: 'white'
  },
  todayButton: {
    alignItems: 'stretch',
    marginTop: 50
  },
  tableTitle: {
    fontSize: 24,
    textDecorationLine: 'underline',
    color: 'white'
  }
});
