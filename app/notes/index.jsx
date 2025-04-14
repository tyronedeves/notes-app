import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import NoteList from '../../components/Notelist';
import AddNoteModal from '../../components/AddNoteModal';
import noteService from '@/services/noteService';

export default function NotesScreen() { // Removed the extra curly brace here
    const [notes, setNotes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotes()
    }, [])

    const fetchNotes = async() => {
        setLoading(true)
        const response = await noteService.getNotes();

        if (response.error) {
            setError(response.error);
            Alert.alert('Error', response.error)
        } else {
            setNotes(response.data)
            setError(null)
        }

        setLoading(false)
    }

    // Add new Note
    const addNote = () => {
        if(newNote.trim() === '') return;

        setNotes((prevNotes) => [
            ...prevNotes,
            {id: Date.now().toString(), text: newNote } // Fixed Date.now function call
        ])
        setNewNote(''); // Removed unnecessary comma
        setModalVisible(false);
    }
    
    return (
        <View style={styles.container}>
            <NoteList notes={notes} />
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+ ADD NOTE</Text>
            </TouchableOpacity>
            {/* MODAL */}
            <AddNoteModal
                modalVisibile={modalVisible}
                setModalVisible={setModalVisible}
                newNote={newNote}
                setNewNote={setNewNote}
                addNote={addNote}
            />
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    
    addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
})