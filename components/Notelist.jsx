import { View, Text, FlatList } from 'react-native';
import React from 'react';
import NoteItem from './Noteitem';

const NoteList = ({ notes, onDelete , onEdit}) => {
    return (
        <View>
            <FlatList
            data={notes}
            keyExtractor={(item)=> item.$id}
            renderItem={({item}) => <NoteItem note={item}
            onDelete={onDelete} onEdit={onEdit} />
        }
            
            />
        </View>
    )
     
};

export default NoteList;