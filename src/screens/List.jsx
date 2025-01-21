import 
  React, { 
  useEffect, 
  useState 
} from 'react'
import { 
  View,
  StyleSheet
} from 'react-native'
import BottomBar from '../components/BottomBar'
import FlatListPage from '../components/list/FlatListPage'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersList } from '../lib/actions/userRequest'
import { getStatus, listOfFiles } from '../lib/actions/requestData'

const List = () => {
  const user = useSelector((state) => state.user?.currentUser)
  const [isReady, setIsReady] = useState(false)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (user && user.token) {
      setIsReady(true);
    }
  }, [user]);

  useEffect(() => {
    if (user && isReady) {
      if (user.userType !== 'pacient') {
        getUsersList(dispatch, user)
        getStatus(dispatch, user)
      }
      listOfFiles(dispatch, user)
    }
  }, [isReady, user, dispatch])

  return (
    <>
      <View style={styles.container}>
       <FlatListPage />
      </View>
      <BottomBar />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		marginTop: 0,
		width: '100%',
		backgroundColor: 'white', 
    marginBottom: 60
  },

});

export default List