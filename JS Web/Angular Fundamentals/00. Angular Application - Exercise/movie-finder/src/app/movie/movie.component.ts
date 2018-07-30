import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  public movie : Object;

  constructor(private moviesService : MoviesService ,private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.moviesService.getMovie(id).subscribe(movie => {
        this.movie = movie;
      });
    });
  }

}
