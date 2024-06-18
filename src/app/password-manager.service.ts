import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc} from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore: Firestore, private auth: Auth) { }

  addNewWebsite(data: object){
    const db = collection(this.firestore, 'websites');
    return addDoc(db,data);
  }

  updateWebsite(id:string, data: object){
    const docInstance = doc(this.firestore, 'websites', id);
    return updateDoc(docInstance, data);
  }

  deleteWebsite(id:string){
    const docInstance = doc(this.firestore, 'websites', id);
    return deleteDoc(docInstance);
  }

  loadWebsites(){
    const db = collection(this.firestore,'websites');
    return collectionData(db,{idField:'id'});
  }

  addPassword(data:any, siteId:string){
    const db = collection(this.firestore, `/websites/${siteId}/passwords`);
    return addDoc(db,data);
  }

  editPassword(data:any, siteId:string, passwordId:string){
    const docInstance = doc(this.firestore, `/websites/${siteId}/passwords`, passwordId);
    return updateDoc(docInstance, data);
  }

  deletePassword(siteId:string, passwordId:string){
    const docInstance = doc(this.firestore, `/websites/${siteId}/passwords`, passwordId);
    return deleteDoc(docInstance);
  }

  loadPasswords(siteId: string){
    const db = collection(this.firestore, `/websites/${siteId}/passwords`);
    return collectionData(db,{idField:'id'});
  }

  login(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
