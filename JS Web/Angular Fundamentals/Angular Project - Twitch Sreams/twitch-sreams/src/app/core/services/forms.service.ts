import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  private formsOpenSubject : BehaviorSubject<Object> = new BehaviorSubject<Object>({ render: false, component: '' });
  public loadComponent = this.formsOpenSubject.asObservable();

  constructor() {
  }

  toggleForm(render : boolean, component : string) : void {
    this.formsOpenSubject.next({ render, component });
  }
}
