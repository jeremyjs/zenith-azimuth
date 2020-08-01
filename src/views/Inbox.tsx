import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { useRecoilState } from 'recoil';

import Ionicons from '@expo/vector-icons/Ionicons';

import { itemsState, addItem, activateItemById, removeItemById, ItemState, createItem } from '../store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    fontSize: 20,
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingLeft: 20,
    paddingRight: 20,
  },
  list: {
    paddingTop: 40,
    width: '100%',
  },
  item: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: 6,
    paddingBottom: 6,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  itemLeftIcon: {
    height: 36,
  },
  itemText: {
    color: 'black',
    height: 36,
    marginLeft: 20,
    fontSize: 20,
    textAlignVertical: 'center',
  },
  itemRightIcon: {
    height: 36,
    marginLeft: 'auto',
  },
});

export const Inbox = () => {
  const [inputText, setInputText] = useState('')
  const [items, setItems] = useRecoilState(itemsState)

  const addInboxItemFromText = (newText) => {
    setItems(addItem(createItem({ title: newText, state: ItemState.Inbox })))
  }

  const removeInboxItem = (idToRemove) => {
    setItems(removeItemById(idToRemove))
  }

  const onChangeText = (text) => {
    setInputText(text)
  }

  const onSubmitEditing = (event) => {
    addInboxItemFromText(inputText)
    setInputText('')
  }

  const activateItem = (idToActivate) => {
    setItems(activateItemById(idToActivate))
  }

  const Item = ({ id, title }) => (
    <View style={styles.item}>
      <Ionicons
        style={styles.itemLeftIcon}
        name="ios-trash"
        size={32}
        color="#CCC"
        onPress={() => removeInboxItem(id)}
      />
      <Text style={styles.itemText}>
        {title}
      </Text>
      <Ionicons
        style={styles.itemRightIcon}
        name="ios-arrow-dropright"
        size={32}
        color="#CCC"
        onPress={() => activateItem(id)}
      />
    </View>
  );

  const renderItem = ({ item }) => (
    <Item id={item.id} title={item.title} />
  )

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        value={inputText}
        autoCorrect={false}
      />
      <FlatList
        style={styles.list}
        data={items.filter(item => item.state === ItemState.Inbox)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  )
}
