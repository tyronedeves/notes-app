import databaseService from "./databaseService";

import { ID } from "react-native-appwrite";

// Appwrite database and collection id

const dbId = process.EXPO_PUBLIC_APPWRITE_DB_ID
const colId = process.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID

const  noteService = {
    //get notes 

    async getNotes() {
        const response = await databaseService.listDocuments(dbId, colId )
        if (response.error) {
            return {error: response.error}
        } 
        return {data: response}
    }
}

export default noteService;