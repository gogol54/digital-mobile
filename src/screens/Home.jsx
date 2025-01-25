import 
  React, { 
  useEffect, 
  useState 
} from 'react';
import { 
  StyleSheet, 
  View,
} from 'react-native';
import HeaderHomePage from '../components/home/HeaderHomePage';
import MainHomePage from '../components/home/MainHomePage';
import BottomBar from '../components/BottomBar';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersList } from '../lib/actions/userRequest';
import { listOfFiles, getStatus } from '../lib/actions/requestData';

const Home = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (user && user.token) {
      setIsReady(true);
    } else {
      setIsReady(false); // Caso o usuário seja `null`, redefina `isReady`
    }
  }, [user]);

  useEffect(() => {
    if (isReady && user) {
      if (user.userType !== 'pacient') {
        getUsersList(dispatch, user);
        getStatus(dispatch, user);
      }
      listOfFiles(dispatch, user);
    }
  }, [isReady, user, dispatch]);

  return (
    <View style={styles.container}
>
      {user && <HeaderHomePage user={user} />}
      {user && <MainHomePage user={user} />}
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  boxList: {
    flex: 1,
    padding: 20,
    margin: 20,
    marginBottom: '120',
  },
});

export default Home;
