import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[];
  private unsubscribeChange : Subscription;

  addedIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  constructor(private shoppingService : ShoppingService){
    
  }
  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredient();
    this.unsubscribeChange =  this.shoppingService.changeIngredients.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }

  ngOnDestroy(): void {
    this.unsubscribeChange.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingService.startEditing.next(index); 
  }
}
