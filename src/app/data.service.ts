import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private websiteNameSubject = new BehaviorSubject<string>('');
  private websiteUrlSubject = new BehaviorSubject<string>('');
  private imageUrlSubject = new BehaviorSubject<string>('');
  private idSubject = new BehaviorSubject<string>('');
  private formStateSubject = new BehaviorSubject<string>('Add New');

  websiteName$ = this.websiteNameSubject.asObservable();
  websiteUrl$ = this.websiteUrlSubject.asObservable();
  imageUrl$ = this.imageUrlSubject.asObservable();
  id$ = this.idSubject.asObservable();
  formState$ = this.formStateSubject.asObservable();

  setWebsiteData(name: string, url: string, imageUrl: string, id:string,state: string) {
    this.websiteNameSubject.next(name);
    this.websiteUrlSubject.next(url);
    this.imageUrlSubject.next(imageUrl);
    this.idSubject.next(id);
    this.formStateSubject.next(state);
  }

}
