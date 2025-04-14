import { database } from "./appwrite";


const databaseService = {
    //LIst documents
    async listDocuments(dbId, colId) {
        try{
            const response = await database.listDocuments(dbId,colId)
            return response.documents || [];
        } catch (error) {
            console.error('error fetching documents:', error.message)
            return {error: error.message}
        }
    }
}

export default databaseService;