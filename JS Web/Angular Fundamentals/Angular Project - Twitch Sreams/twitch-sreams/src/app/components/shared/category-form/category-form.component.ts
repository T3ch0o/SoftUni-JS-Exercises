import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormsService } from '../../../core/services/forms.service';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  public addCategoryForm : FormGroup;

  constructor(private fb : FormBuilder,
              private formsService : FormsService,
              private categoryService : CategoryService) { }

  ngOnInit() {
    this.addCategoryForm = this.fb.group({
      name: ['', [ Validators.required ]],
      imageUrl: ['', [ Validators.required ]],
      banner: ['', [ Validators.required ]]
    });
  }

  get name() {
    return this.addCategoryForm.get('name');
  }

  get imageUrl() {
    return this.addCategoryForm.get('imageUrl');
  }

  get banner() {
    return this.addCategoryForm.get('banner');
  }

  onCloseForm(event) {
    if (event.target.classList[0] === 'background' || event.target.classList[1] === 'fa-times') {
      this.formsService.toggleForm(false, 'category');
    }
  }

  onSubmit() {
    const payload = this.addCategoryForm.value;
    payload.streams = [];

    this.categoryService.createCategory(payload);
  }
}
