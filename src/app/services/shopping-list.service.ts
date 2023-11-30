import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private items: any[] = [];

  getItems(): any[] {
    return this.items;
  }

  addItem(item: any): void {
    this.items.push(item);
  }

  deleteItem(index: number): void {
    this.items.splice(index, 1);
  }

}