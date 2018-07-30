import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public popular : Object;
  public theaters : Object;
  public kidsMovies : Object;
  public dramas : Object;

  foundSearchedMovies: Object;
  searchedFor: string;

  constructor(private movies : MoviesService) {
  }

  ngOnInit() {
    this.movies.getPopular().subscribe(data => {
      this.popular = data;
    });
    this.movies.getTheatres().subscribe(data => {
      this.theaters = data;
    });
    this.movies.getKidsMovies().subscribe(data => {
      this.kidsMovies = data;
    });
    this.movies.getBestDramas().subscribe(data => {
      this.dramas = data;
    });
  }

  onFoundMovies(foundSearchedMovies: any) {
    this.foundSearchedMovies = foundSearchedMovies;
  }

  onSearchedFor(searchedFor: string) {
    this.searchedFor = searchedFor;
  }

}
