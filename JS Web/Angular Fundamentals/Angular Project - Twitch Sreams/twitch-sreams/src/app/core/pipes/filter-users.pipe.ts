import { Pipe, PipeTransform } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  constructor(private authService : AuthenticationService) { }
  transform(items : Array<Object>, method : string) {
    if (items && method === 'users') {
      return items.filter(u => {
        if (u['username'] === 'reader') {
          return false;
        } else if (u['username'] === this.authService.currentUser.username) {
          return false;
        }
        return true;
      });
    } else if (items && method === 'friends') {
      const currentUser = items.find(u => u['username'] === this.authService.currentUser.username);

      return items.filter(u => {
        if (u['username'] === 'reader') {
          return false;
        } else if (u['username'] === currentUser['username']) {
          return false;
        } else if (currentUser['friends'].includes(u['username'])) {
          return true;
        }
      });
    }
  }
}
