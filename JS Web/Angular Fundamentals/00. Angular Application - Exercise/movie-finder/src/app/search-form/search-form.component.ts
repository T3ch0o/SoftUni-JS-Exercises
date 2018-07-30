import { Component, Output, EventEmitter } from '@angular/core';
import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {

  @Output() private foundMovies : EventEmitter<any> = new EventEmitter<any>();
  @Output() private searchedFor : EventEmitter<string> = new EventEmitter<string>();

  constructor(private movieService : MoviesService) {
  }

  search(value) {
    this.movieService.findMovie(value.search)
      .subscribe(res => {
        this.foundMovies.emit(res);
        this.searchedFor.emit(value.search);
      });
  }
}
