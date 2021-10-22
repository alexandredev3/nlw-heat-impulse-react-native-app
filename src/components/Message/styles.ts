import { StyleSheet } from 'react-native';

import { COLORS, FONTS } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 36
  },
  messageText: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
    lineHeight: 20,
    marginBottom: 12,
  },
  userName: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
    marginLeft: 16
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  }
});