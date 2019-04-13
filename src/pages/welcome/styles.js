import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secundary,
    padding: metrics.basePadding * 2,
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  title: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
  },

  text: {
    textAlign: 'center',
    marginTop: metrics.baseMargin,
    fontSize: 20,
    color: colors.light,
    lineHeight: 21,
  },


  text2: {
    textAlign: 'center',
    marginTop: metrics.baseMargin + 20,
    fontSize: 20,
    color: colors.light,
    lineHeight: 21,
  },

  form: {
    marginTop: metrics.baseMargin * 2,
    alignItems: 'center',
  },

  input: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    height: 44,
    paddingHorizontal: metrics.basePadding,
    width: 420,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: metrics.baseRadius,
    height: 44,
    marginTop: metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center',
    width: 170,
  },

  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },

  error: {
    color: colors.danger,
    textAlign: 'center',
    marginTop: metrics.baseMargin,
  },

});

export default styles;
