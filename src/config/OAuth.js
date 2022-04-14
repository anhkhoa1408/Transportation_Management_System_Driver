import auth from '@react-native-firebase/auth';

export async function getPhoneNumberVerificator(phoneNumber, reSent = false) {
  return await auth().signInWithPhoneNumber(phoneNumber, reSent);
}

export async function getPhoneToken(confirm, code) {
  try {
    const data = await confirm.confirm(code);
    return await data.user.getIdToken();
  } catch (error) {
    throw 'Invalid code.';
  }
}
