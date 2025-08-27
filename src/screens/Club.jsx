import { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getAllReward } from '../lib/actions/rewardRequest';
import { createRescueItem } from '../lib/actions/rescueRequest';
import { getCurrentUser } from '../lib/actions/userRequest';
import { showToast } from '../lib/functions/showToast';

const Club = () => {
  const user = useSelector((state) => state.user?.currentUser) || { name: 'Usuário', score: 0 };
  const rewards = useSelector((state) => state.reward?.list) || [];
  const dispatch = useDispatch();
useEffect(() => {
  if (user && user.token) {
    // Atualiza usuário atual sempre que abrir a tela
    getCurrentUser(dispatch, user);
    // E também pega os rewards
    getAllReward(dispatch, user);
  }
}, [dispatch, user?._id]);

// função handleRedeem declarada antes do renderReward
  const handleRedeem = (reward) => {
    const payload = {
      userName: user.name,
      item: reward.name,
      points: reward.points,
    };
    createRescueItem(dispatch, user, payload);
    showToast('success', `Parabéns, Você ganhou um ${reward.name}!\nMais informações com atendimento CRO!`);
  };

  const renderReward = ({ item }) => {
    const canRedeem = user.score >= item.points;
    return (
      <View style={[styles.card, canRedeem ? styles.cardActive : styles.cardInactive]}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.rewardName}>{item.name}</Text>
        <Text style={styles.rewardPoints}>Requer {item.points} pontos</Text>

        {canRedeem ? (
          <TouchableOpacity style={styles.redeemButton} onPress={() => handleRedeem(item)}>
            <Text style={styles.buttonText}>Resgatar</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.missingPoints}>
            Faltam {item.points - user.score} pontos
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={rewards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderReward}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {/* Espaço extra pro scroll “puxar” */}
            <View style={{ height: 50 }} />

            {/* Header real */}
            <View style={styles.header}>
              <Text style={styles.title}>🎁 Clube de Benefícios Digital</Text>
              <Text style={styles.subtitle}>
                Bem-vindo{user.name ? `, ${user.name}` : ''}! Aproveite seus pontos acumulados.
              </Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreLabel}>Seus pontos</Text>
                <Text style={styles.score}>{user.score} pts</Text>
              </View>
            </View>
          </>
        }
        bounces={true}          // permite o efeito elástico
        overScrollMode="always" // overflow visível no Android
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContent: {
    paddingBottom: 120, // deixa espaço pra barra fixa
    paddingHorizontal: 10,
  },
  fixedBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 10,
  },
  header: {
    backgroundColor: '#1F2937',
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    marginTop: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  scoreContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
    paddingLeft: 10,
    marginTop: 12,
  },
  scoreLabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  score: {
    color: '#22c55e',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginHorizontal: 4,
    overflow: 'visible', // permite overflow quando puxar
  },
  cardActive: {
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  cardInactive: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    opacity: 0.7,
  },
  imageContainer: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 10,
    marginBottom: 8,
  },
  image: {
    width: 80,
    height: 80,
  },
  rewardName: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#1E2836',
  },
  rewardPoints: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
    textAlign: 'center',
  },
  redeemButton: {
    marginTop: 8,
    backgroundColor: '#1E2836',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  missingPoints: {
    marginTop: 8,
    color: '#dc2626',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Club;

