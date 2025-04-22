import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useState, useRef } from "react";

const NoteItem = ({note, onDelete, onEdit}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);  // Fixed typo in variable name
  const inputRef = useRef(null);
  
  const handleSave = () => {
    if(editedText.trim() === '') return;
    onEdit(note.$id, editedText);
    setIsEditing(false);
  };
  
  return(
    <View style={styles.noteItem}>
      {isEditing ? (
        <TextInput
          ref={inputRef}
          style={styles.input}  // Fixed style name
          value={editedText}
          onChangeText={setEditedText}  // Changed to onChangeText
          autoFocus
          onSubmitEditing={handleSave}
          returnKeyType="done"
        />
      ) : (
        <Text style={styles.noteText}>{note.text}</Text>
      )}
      <View style={styles.actions}>
        {isEditing ? (
          <TouchableOpacity onPress={() => {
            handleSave();
            inputRef.current?.blur();
          }}>
            <Text style={styles.edit}>💾</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.edit}>🖋️</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => onDelete(note.$id)}>
          <Text style={styles.delete}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  noteText: {
    fontSize: 18,
    flex: 1,  // Added to make text take available space
  },
  input: {  // Added missing style
    fontSize: 18,
    flex: 1,
    padding: 0,
  },
  delete: {
    fontSize: 15,
  }, 
  actions: {
    flexDirection: 'row',
    alignItems: 'center',  // Added to vertically center icons
  },
  edit: {
    fontSize: 18,
    marginRight: 10,
    color: 'blue'
  }
});

export default NoteItem;