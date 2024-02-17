import conf from "../conf/conf";
import { Client, Databases, Query, ID } from "appwrite";

class Service{
    client = new Client();
    database;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId);
        this.database = new Databases(this.client);
    }
    async writeOn(obj){
        try {
            let id = obj.id
            let t = obj.todo
            let complete = obj.isCompleted
            const done = await this.database.createDocument(
                conf.databaseId,
                conf.collectionId,
                ID.unique(),
                {
                    "ID":id,
                    "Todo": t,
                    "isComplete":complete
                }
            );
            return done;
            
        } catch (error) {
            throw error;
        }
    }

    async getAll(){
        try {
           return await this.database.listDocuments(
                conf.databaseId,
                conf.collectionId,
                []
            );
          } catch (error) {
            console.error("Error:", error);
          }
    }
    async delteFile(id){
         await this.database.deleteDocument(conf.databaseId, conf.collectionId,id);
    }
    async deleteAll(){
        try {
            let a = await this.database.listDocuments(
                 conf.databaseId,
                 conf.collectionId,
                 []
             );
             a.documents.map(async (item)=>{
                await this.database.deleteDocument(conf.databaseId, conf.collectionId,item.$id);
             })
           } catch (error) {
             console.error("Error:", error);
           }
    }

}


const authService = new Service();
export default authService