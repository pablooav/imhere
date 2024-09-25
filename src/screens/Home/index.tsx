import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import { Participant } from '../../components/Participant';
import { useState } from 'react';

export function Home() {
  const [ participants, setParticipants] = useState<string[]>([]);
  const [ participantName, setParticipantName] = useState('');


  function handleParticipantAdd() {
    if(participantName === '') return Alert.alert('Nome do participante vazio', 'Por favor, insira o nome do participe para adiciona-lo a lista de presença.');
    else if(participants.includes(participantName)) return Alert.alert('Participante já adicionado', 'Esse participante já foi adicionado a lista de presença.');
    
    setParticipants([...participants, participantName])
    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {

    Alert.alert('Remover participante', `Deseja remover o participante ${name} da lista de presença ?`, [
      {
        text: 'Sim',
        onPress: () => {
          const newParticipants = participants.filter(participant => participant !== name)
          setParticipants(newParticipants)
          
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      },
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de setembro de 2024</Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Nome do participante" 
          placeholderTextColor="#6b6b6b"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Participant 
            name={item} 
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>Ninguém chegou no evento ainda ? Adicione participantes a sua lista de preseça.</Text>
        )}
      />
     
    </View>
  )
}