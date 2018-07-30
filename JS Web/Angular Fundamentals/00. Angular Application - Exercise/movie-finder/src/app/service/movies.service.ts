import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiKey = '09bb4a52d3b04afd0eda7cf099d93f97';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  readonly path : string = 'https://api.themoviedb.org/3/';
  readonly popular : string = 'discover/movie?sort_by=popularity.desc';
  readonly theaters : string = 'discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22';
  readonly kids : string = 'discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc';
  readonly dramas : string = 'discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10';
  readonly search : string = 'search/movie?query=';
  readonly authentication : string = '&api_key=';

  constructor(private http : HttpClient) {
  }

  getPopular() {
    return this.http.get(this.path + this.popular + this.authentication + apiKey);
  }

  getTheatres() {
    return this.http.get(this.path + this.theaters + this.authentication + apiKey);
  }

  getKidsMovies() {
    return this.http.get(this.path + this.kids + this.authentication + apiKey);
  }

  getBestDramas() {
    return this.http.get(this.path + this.dramas + this.authentication + apiKey);
  }

  getMovie(id) {
    return this.http.get(this.path + `movie/${id}` + '?api_key=' + apiKey);
  }

  findMovie(name) {
    return this.http.get(this.path + this.search + name +this.authentication + apiKey);
  }
}
