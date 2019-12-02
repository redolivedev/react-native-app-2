import {StyleSheet} from 'react-native';

export const colors = {
  black: '#1a1917',
  gray: '#404040',
  lightGray: '#ACACAC',
  red: '#EE2A19',
  lightRed: '#FF7D64',
  burgandy: '#BC0B38',
  green: '#13EAA8',
  background1: 'white',
  background2: '#EAEAEA',
};

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black,
  },
  scrollableContainer: {
    backgroundColor: colors.background1,
    paddingHorizontal: 50,
    paddingVertical: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background1,
    padding: 50,
  },
  twoColumn: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  card: {
    padding: 25,
    margin: 25,
    borderRadius: 9,
    backgroundColor: 'white',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    fontSize: 18,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: colors.lightGray,
  },
  labelStyle: {
    fontSize: 13,
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  labelStyleGray: {
    color: '#666',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  section: {
    marginBottom: 5,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    paddingVertical: 20,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollview: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 22,
  },
  subtitle: {
    fontSize: 17,
    marginBottom: 8,
    color: colors.burgandy,
  },
  bodyCopy: {
    fontSize: 15,
    color: colors.gray,
    lineHeight: 20,
    marginBottom: 50,
  },
  largeCopy: {
    fontSize: 20,
  },
  box: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  circle: {
    backgroundColor: '#333',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  listNum: {
    color: '#666',
    width: 23,
    height: 23,
    backgroundColor: '#fff',
    textAlign: 'center',
    borderRadius: 12,
    marginRight: 8,
    fontWeight: 'bold',
    fontSize: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  listText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
  },
});
