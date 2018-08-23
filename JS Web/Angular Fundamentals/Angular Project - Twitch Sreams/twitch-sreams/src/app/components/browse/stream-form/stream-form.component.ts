import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from '../../../core/services/forms.service';
import { CategoryService } from '../../../core/services/category.service';
import { ICategory } from '../../../core/interfaces/category.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stream-form',
  templateUrl: './stream-form.component.html',
  styleUrls: ['./stream-form.component.css']
})
export class StreamFormComponent implements OnInit {
  @Input() category : ICategory;
  public addStreamForm : FormGroup;
  public categoryId : string;

  constructor(private fb : FormBuilder,
              private formsService : FormsService,
              private categoryService : CategoryService,
              private route: ActivatedRoute) {
    this.categoryId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.addStreamForm = this.fb.group({
      channelName: ['', [ Validators.required ]]
    });
  }

  get channelName() {
    return this.addStreamForm.get('channelName');
  }

  onCloseForm(event) {
    if (event.target.classList[0] === 'background' || event.target.classList[1] === 'fa-times') {
      this.formsService.toggleForm(false, 'stream');
    }
  }

  onSubmit() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const payload = this.category;
    delete payload.id;
    payload.streams.push({
      channelName: this.addStreamForm.value.channelName,
      creatorName: user.username,
      creatorImage: user.imageUrl
    });

    this.categoryService.updateCategory(payload, this.categoryId);
    this.formsService.toggleForm(false, 'stream');
    this.categoryService.getAllCategories()
      .subscribe();
  }
}
