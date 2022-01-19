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
  padding: 20,
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
  paddingTop: 40,
  paddingBottom: 30,
  paddingHorizontal: 20,
};

export const shadowCard = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowRadius: 5,
  shadowOpacity: 1.0,
  elevation: 3,
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
  alignItems: 'center',
};
export const column = {
  flexWrap: 'nowrap',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export default { container, subContainer, shadowCard, row, column };
