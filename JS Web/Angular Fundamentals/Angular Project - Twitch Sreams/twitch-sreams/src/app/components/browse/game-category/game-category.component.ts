import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';

import { AppState } from '../../../core/store/app.state';
import { ICategory } from '../../../core/interfaces/category.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FormsService } from '../../../core/services/forms.service';
import { TwitchService } from '../../../core/services/twitch.service';
import { CategoryService } from '../../../core/services/category.service';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-game-category',
  templateUrl: './game-category.component.html',
  styleUrls: ['./game-category.component.css'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))])
  ]
})
export class GameCategoryComponent implements OnInit, OnDestroy {
  public category$ : ICategory;
  public categoryId : string;
  public categorySubscription : any;
  public streamsSubscription : any;
  public addStreamComponent : boolean;
  public streams$ : Observable<Array<Object>>;
  public liked : boolean;
  public disliked : boolean;

  constructor(private store : Store<AppState>,
              private route : ActivatedRoute,
              private formsService : FormsService,
              private twitchService : TwitchService,
              private categoryService : CategoryService,
              private router : Router,
              private authService : AuthenticationService) {
    this.categoryId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.categorySubscription = this.store.select('categories')
      .subscribe(data => {
        this.category$ = data.filter(c => c.id === this.categoryId)[0];
        if (!this.category$) {
          this.router.navigate(['/browse/categories']);
        }
      });

    this.formsService.loadComponent.subscribe(
      (opening) => {
        if (opening['component'] === 'stream') {
          this.addStreamComponent = opening['render'];
          if (!opening['render']) {
            this.getStreams();
          }
        }
      });

    setTimeout(() => this.getStreams(), 100);
  }

  getStreams() {
    if (this.category$) {
      const username = this.authService.currentUser.username;
      // @ts-ignore
      this.liked = this.category$.votes.likes.includes(username);
      // @ts-ignore
      this.disliked = this.category$.votes.dislikes.includes(username);

      this.twitchService.getStreams(this.category$.streams)
        .subscribe(() => {
          this.streamsSubscription = this.store
            .select('streams')
            .subscribe(streams => {
              // @ts-ignore
              this.streams$ = [...streams];
              // @ts-ignore
              for (const stream of this.streams$) {
                const streamTitle = stream.channel.status;
                stream.streamTitle = streamTitle;
                if (streamTitle.length > 25) {
                  stream.channel.status = streamTitle.substring(0, 25) + '...';
                }

                const index = this.category$.streams.findIndex(e => e['channelName'] === stream.channel.name);
                stream.creatorImagePath = this.category$.streams[index]['creatorImage'];
                stream.creator = this.category$.streams[index]['creatorName'];
              }
            })
        });
    }
  }

  setBanner() {
    return {
      background: `radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.6) 100%), url(${this.category$.banner})`,
      'background-size': 'cover',
    }
  }

  loadComponent(component) {
    this.formsService.toggleForm(true, component);
  }

  vote(vote) {
    const payload = this.category$;
    const username = this.authService.currentUser.username;
    delete payload.id;
    // @ts-ignore
    let likes = payload.votes.likes;
    // @ts-ignore
    let dislikes = payload.votes.dislikes;

    if (vote === 'like') {
      if (!likes.includes(username)) {
        likes.push(username);
        this.liked = true;
        if (dislikes.includes(username)) {
          dislikes.splice(dislikes.indexOf(username), 1);
          this.disliked = false;
        }
        payload.votes = {
          likes,
          dislikes
        };

        this.categoryService.updateCategory(payload, this.categoryId);
      }
    } else {
      if (!dislikes.includes(username)) {
        dislikes.push(username);
        this.disliked = true;
        if (likes.includes(username)) {
          likes.splice(likes.indexOf(username), 1);
          this.liked = false;
        }
        payload.votes = {
          likes,
          dislikes
        };

        this.categoryService.updateCategory(payload, this.categoryId);
      }
    }
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
    if (this.category$) {
      this.streamsSubscription.unsubscribe();
    }
  }
}
