import { View, Text, FlatList } from 'react-native';
import React from 'react';
import NoteItem from './Noteitem';

const NoteList = ({ notes, onDelete }) => {
    return (
        <View>
            <FlatList
                data={notes}
                keyExtractor={(item) => item.$id || item.id} // Fallback to item.id if $id doesn't exist
                renderItem={({ item }) => <NoteItem note={item} onDelete={onDelete} />}
                ListEmptyComponent={() => (
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text>No notes yet. Add your first note!</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default NoteList;