import React from 'react'
import { Image, SafeAreaView, StyleSheet, View, Text } from 'react-native'
import { MotiView } from 'moti'
import moment from 'moment'

const HeaderHomePage = ({user}) => {
	console.log(user)
	const formatDate = (date) => {
		return moment(date).locale('pt-br').format('DD/MM/YYYY');
	};
		
  return (
		<View  
			style={styles.container}
		>
	
			<Image
				style={styles.stretch}
				source={require('../../../assets/background.png')}
			/>
			<MotiView 
				style={styles.shadowBox}
				from={{rotateX: '-100deg', opacity:0}}
				animate={{rotateX: '0deg', opacity:1}}
				transition={{type: 'timing', delay:100, duration:2000}}
			>
				<SafeAreaView style={styles.boxAreaTop}>
					<Image
						style={styles.logoBoxArea}
						source={require('../../../assets/logo-bg-none.png')}
					/>
				</SafeAreaView>
				<SafeAreaView style={styles.boxAreaBottom}>
					<Text style={styles.textName}>{user?.name}</Text>
					<View>
						<Text style={styles.since}>Cadastro:</Text>
						<Text style={styles.stampDate}>{formatDate(user?.createdAt)}</Text>
					</View>
				</SafeAreaView>
			</MotiView>
		</View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 0,
		width: '100%',
		backgroundColor: 'none'
	},

	singleText: {
		fontSize: 16,
		alignItems: 'center',
		textAlign: 'center',
	},
	stretch: {
		width: 'full',
		height: '60%',
		margin: 'none',
		boxShadow: '5px 20px 20px #bce08f',
	},
	shadowBox: {
		display: 'flex',
		width: '80%',
		marginLeft: '10%',
		height: 180,
		position: 'absolute',
		backgroundColor: 'white',
		padding: 20,
		marginTop: 100,
		borderRadius: 16,
		opacity: 0.9, 
		shadowColor: '#bce08f',
		shadowOffset: { width: 0, height: 2 },  // Distância da sombra
		shadowOpacity: 0.8,  // Opacidade da sombra
		shadowRadius: 2,  // Raio de difusão da sombra
		elevation: 5,  // Elevation é específico para Android
	},
	boxAreaTop: {
    justifyContent: 'flex-end', 
    alignItems: 'center',       
    flexDirection: 'row',       
    position: 'relative',   
	},
	boxAreaBottom: {	
		position:'absolute',
		bottom: 8,
		left: 2,
		right: 2,   
		justifyContent: 'space-between', 
		alignItems: 'center',
		flexDirection: 'row',     
	},
	logoBoxArea: {
		position: 'relative',
		width: 140,
		height: 45,
	},
	textName: {
		marginLeft:8,
		fontSize: 12,
		color: '#1f2937',
		fontFamily: 'monospace',
		fontWeight: 'bold',
		letterSpacing: -0.5,
		maxWidth: 200
	},	
	since: {
		color: '#1f2937',
		marginRight:16,
		fontSize: 10
	},
	stampDate: {
		color: '#1f2937',
		marginRight:8,
		fontSize: 10,
		fontFamily: 'monospace',
		letterSpacing: -1,
		fontWeight:'bold'
	}
});

export default HeaderHomePage