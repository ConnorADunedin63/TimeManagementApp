import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#20639B'
  },
  sectionTitleContainer: {
    alignItems: 'flex-start',
  },
  sectionTitleRow: {
    flexDirection: 'row'
  },
  sectionTitle: {
    fontSize: 32,
    textDecorationLine: 'underline',
    color: 'white'
  },
  sectionContainer: {
     flex: 4,
     alignItems: 'stretch'
  },
  formContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 20,
  },
  formInput: {
    marginTop: 10,
    backgroundColor: 'white'
  },
  formDateInput: {
    marginTop: 10,
    backgroundColor: '#D3D3D3'
  },
  timeBtn: {
    marginTop: 5,
  },
  createContainer: {
    marginTop: 40
  }
});
