import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button, Linking, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// import * as Permissions from 'expo-permissions';
// import * as Contacts from 'expo-contacts';

export default function App(props) {

  // const [contacts, setContacts] = useState( [] );
  const [permissions, setPermissions] = useState(false);
  const [drinkCounter, setDrinkCounter] = useState(0);
  const [wineCounter, setWineCounter] = useState(0);
  const [beerCounter, setBeerCounter] = useState(0);
  const [liquorCounter, setLiquourCounter] = useState(0);

  let todaysDate = new Date().toDateString();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    resetCounters();
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  // const getPermissions = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.CONTACTS);
  //   setPermissions(true);
  // };



  // const showContacts = async () => {
  //   const contactList = await Contacts.getContactsAsync();
  //   setContacts(contactList.data);
  // };

  // const call = contact => {
  //   console.log({contact});
  //   let phoneNumber = contact.phoneNumbers[0].number.replace(/[\(\)\-s]/g, '');
  //   let link = `tel:${phoneNumber}`;
  //   Linking.canOpenURL(link)
  //     .then((supported) => Linking.openURL(link) ) 
  //     .catch(console.error);
  // };

  const chooseDrink = choice => {
    setDrinkCounter(1+drinkCounter);
    if (choice === 'wine') setWineCounter(1+wineCounter);
    if (choice === 'beer') setBeerCounter(1+beerCounter);
    if (choice === 'liquor') setLiquourCounter(1+liquorCounter);
  }

  const resetCounters = () => {
    setDrinkCounter(0);
    setWineCounter(0);
    setBeerCounter(0);
    setLiquourCounter(0);
  }

  useEffect( () => {
    chooseDrink;
  }, [drinkCounter]);

  return (
    <>
    <View style={styles.container}>
      <Text>The Drink Counter</Text>
      {/* <Text>Total drinks ({drinkCounter}) since {date.toDateString()}</Text> */}

      <View>
      <View>
        <Button onPress={showDatepicker} title="Pick a Start Date" />
      </View>
      <Text> Total drinks ({drinkCounter}) since </Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>

      <Button onPress={()=> chooseDrink('wine')} title="Wine"></Button>
      <Text>({wineCounter})</Text>
      <Button onPress={()=> chooseDrink('beer')} title="Beer"></Button>
      <Text>({beerCounter})</Text>
      <Button onPress={()=> chooseDrink('liquor')} title="Liquor"></Button>
      <Text>({liquorCounter})</Text>
      <StatusBar style="auto" />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  // header: {
  //   flex: 1,
  //   alignItems: 'center',
  //   marginTop: '15%',
  //   // justifyContent: 'center',

  // },
  
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
