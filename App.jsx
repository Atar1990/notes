import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Home from './Home';
import Category from './Category';
import Note from './Note';
import { createId } from './helper'


const defState = {
  currentPage: 'home',
  currentCategory: {},
  currentNote: {},
  categories: [{
    id: "1",
    name: "work",
    notes: [{
      id: '1',
      text: "atar"
    }],
  }]
}

export default function App() {

  const [state, setState] = useState(defState);

  const getNote = () => {
    const category = state.categories.find(c => c.id === state.currentCategory);
    const note = category.notes.find(n => n.id === state.currentNote);
    return note;
  }

  const saveNote = text => {
    const newCategories = [...state.categories];
    const category = newCategories.find(c => c.id === state.currentCategory);
    const note = category.notes.find(n => n.id === state.currentNote);
    note.text = text;
    setState({
      ...state,
      currentPage: 'category',
      categories: newCategories
    })
  }

  const addCategory = () => {
    const newCategory = {
      id: createId(),
      name: "new category",
      notes: []
    };
    const newCategories = [...state.categories, newCategory];
    setState({
      ...state,
      categories: newCategories
    })
  }

  const clickCategory = category => {
    setState({
      ...state,
      currentPage: 'category',
      currentCategory: category.id
    })
  }

  const backClick = () => {
    setState({
      ...state,
      currentPage: "home"
    })
  }

  const newNote = () => {
    const newCategories = [...state.categories];
    const category = newCategories.find(c => c.id === state.currentCategory);
    category.notes.push({
      id: createId(),
      text: 'new note'
    })
    setState({
      ...state,
      categories: newCategories
    })
  }

  const clickOnNote = note => {
    setState({
      ...state,
      currentPage: 'note',
      currentNote: note.id
    })
  }

  const getCurrentCategory = () => {
    return state.categories.find(c => c.id === state.currentCategory)
  }

  return (
    <View style={styles.container}>
      {state.currentPage === 'home' && (
        <Home
          categories={state.categories}
          addCategory={() => { addCategory() }}
          clickOnCategory={(category) => { clickCategory(category) }}></Home>
      )}
      {state.currentPage === 'category' && (
        <Category
          category={getCurrentCategory()}
          backClick={() => { backClick() }}
          createNewNote={() => { newNote() }}
          deleteNote={(id) => { }}
          clickOnNote={(note) => { clickOnNote(note) }}></Category>
      )}
      {state.currentPage === 'note' && (
        <Note
          note={getNote()}
          saveNote={(text) => { saveNote(text) }}></Note>
      )}
      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
