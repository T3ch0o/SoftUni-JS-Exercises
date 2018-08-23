import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatOpenSubject : BehaviorSubject<Object> = new BehaviorSubject<Object>({ render: false, component: '', username: ''});
  public loadComponent = this.chatOpenSubject.asObservable();

  constructor() {
  }

  toggleForm(render : boolean, component : string, username : string) : void {
    this.chatOpenSubject.next({ render, component, username });
  }
}
