import { Component, OnInit, } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit{

recipes: Recipe[];

constructor(private recipeService : RecipeService, private router: Router, private route: ActivatedRoute){}

ngOnInit() {
  this.recipeService.recipesChanged.subscribe((recipe: Recipe[]) => {
    this.recipes = recipe;
  })
  this.recipes = this.recipeService.getRecipe();
}

onNewRecipe(){
  this.router.navigate(['new'], {relativeTo: this.route});
}
}
