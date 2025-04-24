import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React from 'react'
import NoteList from '../../components/Notelist';
import AddNoteModal from '../../components/AddNoteModal';
import noteService from '@/services/noteService';
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/authContext";

export default function NotesScreen() {
    const router = useRouter()
    const { user, loading: authLoading } = useAuth()

    const [notes, setNotes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.replace('/auth')
        }
    }, [user, authLoading])

    useEffect(() => {
        if (user) {
            fetchNotes()
        }
    }, [user])

    const fetchNotes = async () => {
        setLoading(true)
        try {
            const response = await noteService.getNotes(user.$id);

            if (response.error) {
                setError(response.error);
                Alert.alert('Error', response.error)
            } else {
                // Make sure notes is an array before setting state
                const notesData = Array.isArray(response.data) ? response.data : [];
                setNotes(notesData)
                setError(null)
            }
        } catch (err) {
            console.error("Error fetching notes:", err);
            setError("Failed to fetch notes");
            Alert.alert('Error', "Failed to fetch notes");
        } finally {
            setLoading(false)
        }
    }

    // Add new Note
    const addNote = async () => {
        if (newNote.trim() === '') return;

        console.log("Adding note:", newNote); // Debug log
        console.log("User ID:", user.$id); // Debug log
        
        try {
            const response = await noteService.addNote(user.$id, newNote);
            console.log("Response from addNote:", response); // Debug log

            if (response.error) {
                Alert.alert("Error", response.error);
            } else {
                // Make sure we're accessing the data correctly
                const newNoteItem = response.data;
                console.log("New note:", newNoteItem); // Debug log
                
                setNotes(prevNotes => [...prevNotes, newNoteItem]);
            }
        } catch (err) {
            console.error("Error adding note:", err);
            Alert.alert("Error", "Failed to add note");
        }
        
        setNewNote('');
        setModalVisible(false);
    }

    // delete note
    const deleteNote = async (id) => {
        Alert.alert('Delete Note', 'Are you sure you want to delete this note', [
            {
                text: 'Cancel',
                style: 'cancel'
            }, {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    try {
                        const response = await noteService.deleteNote(id)
                        if (response.error) {
                            Alert.alert('Error', response.error)
                        } else {
                            setNotes(notes.filter((note) => note.$id !== id))
                        }
                    } catch (err) {
                        console.error("Error deleting note:", err);
                        Alert.alert('Error', "Failed to delete note");
                    }
                }
            }
        ])
    }

    // edit note
    const editNote = async (id, newText) => {
        if (!newText.trim()) {
            Alert.alert('Error', 'Note text cannot be empty')
            return
        }
        
        try {
            const response = await noteService.updateNote(id, newText)
            
            if (response.error) {
                Alert.alert('Error', response.error)
            } else {
                setNotes((prevNotes) => 
                    prevNotes.map((note) => 
                        note.$id === id ? {...note, text: newText} : note
                    )
                )
            }
        } catch (err) {
            console.error("Error updating note:", err);
            Alert.alert('Error', "Failed to update note");
        }
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size='large' color='#007bff' />
            ) : (
                <>
                    {error && <Text style={styles.errorText}>{error}</Text>}

                    {notes.length === 0 ? (
                        <Text style={styles.noNotesTexts}>you have no Notes..</Text>
                    ): (<NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />) }
                    
                </>
            )}

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+ ADD NOTE</Text>
            </TouchableOpacity>
            
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
    },
    noNotesTexts: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight:'bold',
        color: '#555',
        marginTop: 15,
    }
})