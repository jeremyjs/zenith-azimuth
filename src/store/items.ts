import { atom } from 'recoil'

import { uuidv4 } from '../lib'

import { updateById } from './lib'

export enum ItemState {
  Inbox = 'Inbox',
  Next = 'Next',
  Done = 'Done',
}

export interface Item {
  id: string
  title: string
  state: ItemState
}

export const itemsState = atom({
  key: 'Items',
  default: [],
})

export const createItem = ({
  title,
  state = ItemState.Inbox,
}) => ({
  id: uuidv4(),
  title,
  state,
})

export const addItem = (item) => (oldState) => [
  ...oldState,
  item,
]

export const iceboxItemById = (id) => (oldState) => (
  updateById(oldState, id, { state: ItemState.Inbox })
)

export const activateItemById = (id) => (oldState) => (
  updateById(oldState, id, { state: ItemState.Next })
)

export const completeItemById = (id) => (oldState) => (
  updateById(oldState, id, { state: ItemState.Done })
)

export const removeItemById = (id) => (oldState) => (
  oldState.filter(item => item.id !== id)
)
