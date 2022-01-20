export const container = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFF',
  height: '100%',
  width: '100%',
  alignItems: 'stretch',
  flex: 1,
};

export const subContainer = {
  marginHorizontal: 20,
  marginVertical: 10,
};

export const containerOverlay = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

export const header = {
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 25,
  paddingHorizontal: 20,
};

export const shadowCard = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,

  elevation: 4,
};

export const shadowInput = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

export const row = {
  flexWrap: 'nowrap',
  flexDirection: 'row',
  justifyContent: 'center',
};

export const column = {
  flexWrap: 'nowrap',
  flexDirection: 'column',
  justifyContent: 'center',
};

export const button = {
  alignItems: 'center',
  justifyContent: 'center',
  width: '40%',
  backgroundColor: '#3B3DBF',
  borderRadius: 8,
  padding: 12,
  alignSelf: 'center',
  margin: 10,
};

export default { container, subContainer, shadowCard, row, column, button };
