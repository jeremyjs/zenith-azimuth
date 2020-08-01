import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { useRecoilState } from 'recoil';

import Ionicons from '@expo/vector-icons/Ionicons';

import { itemsState, addItem, activateItemById, removeItemById, ItemState, iceboxItemById, createItem } from '../store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
  },
  itemLeftIcon: {
    height: 36,
  },
  itemSecondLeftIcon: {
    height: 36,
    marginLeft: 20,
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

export const Next = () => {
  const [inputText, setInputText] = useState('')
  const [items, setItems] = useRecoilState(itemsState)

  const addActionItemFromText = (newText) => {
    setItems(addItem(createItem({ title: newText, state: ItemState.Next })))
  }

  const removeActionItem = (idToRemove) => {
    setItems(removeItemById(idToRemove))
  }

  const onChangeText = (text) => {
    setInputText(text)
  }

  const onSubmitEditing = (event) => {
    addActionItemFromText(inputText)
    setInputText('')
  }

  const iceboxItem = (idToIcebox) => {
    setItems(iceboxItemById(idToIcebox))
  }

  const Item = ({ id, title }) => (
    <View style={styles.item}>
      <Ionicons
        style={styles.itemLeftIcon}
        name="ios-arrow-dropleft"
        size={32}
        color="#CCC"
        onPress={() => iceboxItem(id)}
      />
      <Ionicons
        style={styles.itemSecondLeftIcon}
        name="ios-checkmark-circle"
        size={32}
        color="#CCC"
        onPress={() => removeActionItem(id)}
      />
      <Text style={styles.itemText}>
        {title}
      </Text>
      <Ionicons
        style={styles.itemRightIcon}
        name="ios-trash"
        size={32}
        color="#CCC"
        onPress={() => removeActionItem(id)}
      />
    </View>
  );
  // 29
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
        data={items.filter(item => item.state === ItemState.Next)}
        renderItem={renderItem}
        keyExtractor={(_, index) => String(index)}
      />
    </View>
  )
}
