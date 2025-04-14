import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React from 'react'
import NoteList from '../../components/Notelist';
import AddNoteModal from '../../components/AddNoteModal';
import noteService from '@/services/noteService';

export default function NotesScreen() {
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
    const addNote = async() => {
        if(newNote.trim() === '') return;

       const response = await noteService.addNote(newNote)

       if(response.error) {
        Alert.alert("Error ", response.error)
       } else {
        setNotes([...notes, response.data])
       }
        setNewNote('');
        setModalVisible(false);
    }
    // delete note

    const deleteNote = async (id) => {{
        Alert.alert('Delete Note', 'Are you sure you want to delete this note',[
            {
                text: 'cancel',
                style: 'cancel'
            }, {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    const response = await noteService.deleteNote(id)
                    if(response.error) {
                        Alert.alert('Error', response.error)
                    } else {
                        setNotes(notes.filter((note) =>note.$id !== id))
                    }
                }
                
            }
        ])
    }}
    
    return (
        <View style={styles.container}>
        {loading ? (
            <ActivityIndicator size='large' color='#007bff'/>
        ) : (
            <>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <NoteList notes={notes} onDelete={deleteNote}/>
            </>
        )}

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
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16
    }
})