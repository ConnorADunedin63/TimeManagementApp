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
    alignItems: 'stretch',
  },
  pageTitle: {
    fontSize: 32,
    textDecorationLine: 'underline',
    color: 'white'
  },
  formTag: {
    color: 'white'
  },
  formInput: {
    marginTop: 10,
    backgroundColor: 'white'
  },
  subheading: {
    fontSize: 18,
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
  deleteItem: {
    flex: 1,
    marginTop: 5,
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
  }
});
