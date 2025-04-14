import databaseService from "./databaseService";
import { ID } from "react-native-appwrite";
import { config } from "./appwrite";

// Use the config from appwrite.js instead of accessing process directly
const dbId = config.db;
const colId = config.col.notes;

const noteService = {
    // Get notes 
    async getNotes() {
        const response = await databaseService.listDocuments(dbId, colId);
        if (response.error) {
            return { error: response.error };
        } 
        return { data: response.data }; // Access the data property
    },
    //ADD NEW NOTES
    async addNote(text) {
        if(!text){
            return {error: 'Note text cannot be empty'}
        }
        const data = {
            text: text,
            createdAt: new Date().toISOString()
        }
        const response = await databaseService.createDocument(dbId,colId,data,ID.unique())
        if(response?.error) {
            return {error: response.error}
        }
        return {data: response }
    },
    //DELETE note

    async deleteNote(id){
        const response = await databaseService.deleteDocument(dbId,colId,id);
        if(response?.error) {
            return{error: response.error}
        }
        return{ success: true }
    }
};

export default noteService;