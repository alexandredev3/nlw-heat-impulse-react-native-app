import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logoutText: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
    marginRight: 20
  }
});