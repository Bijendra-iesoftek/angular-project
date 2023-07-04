import { Injectable } from "@angular/core";
import { Recipe } from "./recipes.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    // private recipes: Recipe[] = [
    //     new Recipe('A Test Recipe',
    //      'This is simply a test',
    //     'https://images.themodernproper.com/billowy-turkey/production/posts/2020/Vegetable-Soup-8.jpg?w=1800&q=82&fm=jpg&fit=crop&dm=1600877034&s=268795775242c05a41f59ab8f417389b',
    //     [
    //       new Ingredient('Cheese', 1),
    //       new Ingredient('Tomaot', 4)
    //     ]),
    //     new Recipe('A Test Recipe', 
    //     'This is simply a test', 
    //     'https://images.themodernproper.com/billowy-turkey/production/posts/2020/Vegetable-Soup-8.jpg?w=1800&q=82&fm=jpg&fit=crop&dm=1600877034&s=268795775242c05a41f59ab8f417389b',
    //     [
    //       new Ingredient('Cheese', 1),
    //       new Ingredient('Tomaot', 4)
    //     ]),
    //     new Recipe('A Test Recipe', 
    //     'This is simply a test', 
    //     'https://images.themodernproper.com/billowy-turkey/production/posts/2020/Vegetable-Soup-8.jpg?w=1800&q=82&fm=jpg&fit=crop&dm=1600877034&s=268795775242c05a41f59ab8f417389b',
    //     [
    //       new Ingredient('Cheese', 1),
    //       new Ingredient('Tomaot', 4)
    //     ]),
    //     new Recipe('A Test Recipe', 
    //     'This is simply a test', 
    //     'https://images.themodernproper.com/billowy-turkey/production/posts/2020/Vegetable-Soup-8.jpg?w=1800&q=82&fm=jpg&fit=crop&dm=1600877034&s=268795775242c05a41f59ab8f417389b',
    //     [
    //       new Ingredient('Cheese', 1),
    //       new Ingredient('Tomaot', 4)
    //     ])
      
    //   ];

    private recipes: Recipe[] = [];

      recipesChanged = new Subject<Recipe[]>();
      constructor(private shoppingService: ShoppingService){}

      getRecipe(){
        return this.recipes.slice();
      }

      setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipeById(index: number){
        return this.recipes.slice()[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
}