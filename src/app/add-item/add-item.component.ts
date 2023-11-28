import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
})
export class AddItemComponent {
  newItem: any = {};

  @Output() itemAdded = new EventEmitter<void>();

  constructor(private router: Router, private shoppingListService: ShoppingListService) {}

  addItem(): void {
    this.shoppingListService.addItem(this.newItem);
    this.newItem = {}; // Limpar o objeto para o próximo item
    this.itemAdded.emit();

    // Navegar de volta à lista de compras após adicionar o item
    this.router.navigate(['/']);
  }
}
