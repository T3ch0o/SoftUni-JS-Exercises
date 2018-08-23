import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';

import { FormsService } from '../../core/services/forms.service';
import { CategoryService } from '../../core/services/category.service';
import { TwitchService } from '../../core/services/twitch.service';

import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/app.state';
import { ICategory } from '../../core/interfaces/category.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition('* => *', useAnimation(fadeIn))
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  public loginComponent : boolean;
  public registerComponent : boolean;
  public currentStreams : Array<Object> = [];
  public currentStream : string = ``;
  public category$ : ICategory;
  public categorySubscription : any;

  constructor(private formsService : FormsService,
              private categoryService : CategoryService,
              private twitchService : TwitchService,
              private store : Store<AppState>) { }

  ngOnInit() {
    this.formsService.loadComponent.subscribe(
      (opening) => {
        if (opening['component'] === 'login') {
          this.loginComponent = opening['render'];
          this.registerComponent = false;
        } else if (opening['component'] === 'register') {
          this.registerComponent = opening['render'];
          this.loginComponent = false;
        } else {
          this.loginComponent = false;
          this.registerComponent = false;
        }
      }
    );

    this.categorySubscription = this.categoryService.getAllCategories()
      .subscribe(() => {
        this.store.select('categories')
          .subscribe(data => {
            this.currentStreams = this.twitchService.getTopStream(data);
            data.sort((c1, c2) : number => {
              if (c1.votes['likes'].length < c2.votes['likes'].length) {
                return 1;
              } else if (c1.votes['likes'].length > c2.votes['likes'].length) {
                return -1;
              }

              return 0;
            });

            this.category$ = data[0];
            console.log(this.category$);
            setTimeout(() => {
              // @ts-ignore
              this.changeCurrentStream(this.currentStreams[0].channel.name);
            }, 800);
          });
      });
  }

  changeCurrentStream(name) {
    this.currentStream = `https://player.twitch.tv/?channel=${name}`;
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
  }
}
