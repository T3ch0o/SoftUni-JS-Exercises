import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user.interface';
import { map } from 'rxjs/operators';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import * as UserActions from '../../core/store/actions/users.action'

const appKey = 'kid_r1H54C8SX';
const usersUrl = `https://baas.kinvey.com/user/${appKey}`;
const meUrl = `https://baas.kinvey.com/user/${appKey}/`;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http : HttpClient,
              private store : Store<AppState>) { }

  getUsers() {
    return this.http.get(usersUrl)
      .pipe(map((response : IUser[]) => {
        response.sort((u1, u2) : number => {
          if (u1.username > u2.username) {
            return 1;
          } else if (u1.username < u2.username) {
            return -1;
          }
          return 0;
        });
        this.store.dispatch(new UserActions.AddUser(response));
      }));
  }

  updateUser(body) {
    const id = body._id;
    delete body._acl;
    delete body._kmd;

    this.http.put(meUrl + id, body)
      .subscribe(() => {
        this.getUsers()
          .subscribe();
      });
  }
}
