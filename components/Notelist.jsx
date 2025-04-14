import { View, Text , FlatList} from 'react-native'
import React from 'react'
import NoteItem from './Noteitem'

const NoteList = ({notes}) => {
    return(
        <View>
              <FlatList
                 data={notes}
                 keyExtractor={(item)=> item.$id}
                 renderItem={({item})=> <NoteItem note={item}/>}
                 />
        </View>
    )
}

export default NoteList