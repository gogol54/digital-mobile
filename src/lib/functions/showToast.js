
import Toast from 'react-native-toast-message';

export const showToast = (type, title) => {
  Toast.show({
    type: type, // 'success', 'error', 'info'r
    text1: title,
    position: 'top',
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 50,
    onPress: () => Toast.hide(),
  });
};
