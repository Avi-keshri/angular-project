import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  recipe: Recipe;
  recipeForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private rpService: RecipeService) { }


  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params.id;
        this.editMode = !Number.isNaN(+params.id) ? true : false;
        this.recipe = this.rpService.getRecipeThroughIndex(this.id);
      })
    this.initialize();
  }

  private initialize() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let newIngredients: FormArray<any> = new FormArray([]);
    if (this.editMode) {
      recipeName = this.recipe.name;
      recipeImagePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
      for (let recipe of this.recipe.ingredient) {
        newIngredients.push(new FormGroup({
          name: new FormControl(recipe.name, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]),
          amount: new FormControl(recipe.amount, [Validators.required, Validators.pattern('^([1-9][0-9]*)$')])
        }))
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl<string>(recipeName, [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z \-\']+')]),
      imagePath: new FormControl<string>(recipeImagePath, Validators.required),
      description: new FormControl<string>(recipeDescription, [Validators.required, Validators.minLength(20)]),
      ingredients: newIngredients,
    })
  }

  addIngredients() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]),
      amount: new FormControl<string>('', [Validators.required, Validators.pattern('^([1-9][0-9]*)$')]),
    }));
  }

  submit() {
    const ingredientArr = [];
    const newNameInput = this.recipeForm?.value.name;
    const newDescriptionInput = this.recipeForm?.value.description;
    const newImagepathInput = this.recipeForm?.value.imagePath;
    this.recipeForm?.value.ingredients.forEach(element => {
      ingredientArr.push(new Ingredient(element.name, element.amount));
    });
    if (this.editMode) {
      this.rpService.updateRecipeItem(this.id, new Recipe(newNameInput, newDescriptionInput, newImagepathInput, ingredientArr));
    } else {
      this.rpService.addRecipeItem(new Recipe(newNameInput, newDescriptionInput, newImagepathInput, ingredientArr));
    }
    this.router.navigate(['recipes']);
  }

  removeIngredients(index: number) {
    const ingredients = this.recipeForm.get('ingredients') as FormArray;
    ingredients.removeAt(index);
  }

  onClear() {
    this.recipeForm.reset();
    this.editMode = false;
    this.router.navigate(['recipes']);
  }

}
