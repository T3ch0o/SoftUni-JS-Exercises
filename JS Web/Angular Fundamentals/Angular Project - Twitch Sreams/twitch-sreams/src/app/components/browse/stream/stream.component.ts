import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';

import { Store } from '@ngrx/store';
import { ICategory } from '../../../core/interfaces/category.interface';
import { AppState } from '../../../core/store/app.state';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))])
  ]
})
export class StreamComponent implements OnInit, OnDestroy {
  public channelName : string;
  public stream$ : any;
  public category$ : ICategory;
  public currentChat : boolean = true;
  private subscription : any;

  constructor(private route : ActivatedRoute,
              private store : Store<AppState>,
              private router : Router) {
    this.channelName = this.route.snapshot.params.name;
  }

  ngOnInit() {
    this.subscription = this.store
      .subscribe(data => {
        if (data.streams.length > 0) {
          // @ts-ignore
          this.stream$ = data.streams.find(s => s.channel.name === this.channelName);
          this.category$ = data.categories.find(c => c.name === this.stream$.game);
        } else {
          this.router.navigate(['/browse/categories'])
        }
      });
  }

  switchComponent(component) {
    this.currentChat = component === 'SiteChat';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
