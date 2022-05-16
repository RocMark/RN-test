const Colors = {
  primary: 'red',
  secondary: 'grey',
  white: '#fff',
  black: '#000',
  item1Color
}

function item1Color(deviceWidth) {
  if (deviceWidth > 380) return 'red'
  return 'green'
}

export default Colors
