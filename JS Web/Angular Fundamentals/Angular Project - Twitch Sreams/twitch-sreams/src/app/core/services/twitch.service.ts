import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as StreamActions from '../store/actions/streams.action';

const getTopStreamUrl = 'https://api.twitch.tv/kraken/streams/?game=';
const getStreamsUrl = 'https://api.twitch.tv/kraken/streams?channel=';

@Injectable({
  providedIn: 'root'
})
export class TwitchService {

  constructor(private http : HttpClient,
              private store : Store<AppState>) { }

  getTopStream(data) {
    let streams = [];

    for (let i = 0; i < data.length; i++) {
      if (i > 4) {
        break;
      }

      this.http.get(getTopStreamUrl + `${data[i].name}&limit=1`)
        .subscribe(data => {
          streams.push(data['streams'][0]);
        });
    }

    return streams;
  }

  getStreams(data : Array<Object>) {
    let streams = [];
    for (const categoryStream of data) {
      streams.push(categoryStream['channelName']);
    }

    return this.http.get(getStreamsUrl + streams.join(','))
      .pipe(map((response : Response) => {
        this.store.dispatch(new StreamActions.GetStreams(response['streams']));
      }));
  }
}
