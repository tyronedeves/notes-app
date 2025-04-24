import databaseService from "./databaseService";
import { ID , Query} from "react-native-appwrite";
import { config } from "./appwrite";


// Use the config from appwrite.js instead of accessing process directly
const dbId = config.db;
const colId = config.col.notes;

const noteService = {
    // Get notes 
    async getNotes(userId) {
        if (!userId) {
            console.error('Error: Missing user id in getNotes()')
            return {
                data:[], error:'User ID missing'
            }
        }

        try {
            const response = await databaseService.listDocuments(dbId, colId,[
                Query.equal('user_id',userId)
            ]);
            return response
        } catch (error) {
           console.log('error fetching notes:', error.message)
           return {data: [],error: error.message}
        }
    },
    //ADD NEW NOTES
    async addNote(text, user_id) {
        if(!text){
            return {error: 'Note text cannot be empty'}
        }
        const data = {
            text: text,
            createdAt: new Date().toISOString(),
            user_id: user_id
        }
        const response = await databaseService.createDocument(dbId,colId,data,ID.unique())
        if(response?.error) {
            return {error: response.error}
        }
        return {data: response }
    },
    // update
    async updateNote(id,text){
        const response = await databaseService.updateDocument(dbId,colId,id,{
            text
        })
        if(response?.error) {
            return{error: response.error}
        }
        return {data: response}
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