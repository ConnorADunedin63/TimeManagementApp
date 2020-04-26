import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#20639B'
  },
  sectionContainer: {
     flex: 4,
     alignItems: 'stretch'
  },
  sectionHeader: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  sectionTitle: {
    marginLeft: 10,
    fontSize: 32,
    textDecorationLine: 'underline',
    color: 'white'
  },
  tableContainer: {
    flex: 3,
    marginLeft: 10,
    marginRight: 20,
  },
  sectionTable: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: 'white'
  },
  tableHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
  },
  rowItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tableRowEmpty: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  tableRowEven: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  tableRowOdd: {
    height: 50,
    backgroundColor: '#D3D3D3',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
});
