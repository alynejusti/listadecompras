import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
})
export class AddItemComponent {
  newItem: any = {};
  formErrors: any = {};
 
  @Output() itemAdded = new EventEmitter<void>();

  constructor(private router: Router, private shoppingListService: ShoppingListService) {}

  addItem(): void {
    if (this.validateForm()) {
      this.shoppingListService.addItem(this.newItem);
      this.newItem = {}; // Limpar o objeto para o próximo item
      this.itemAdded.emit();

      // Armazenar no Web Storage
      this.storeInLocalStorage();
      
      // Navegar de volta à lista de compras após adicionar o item
      this.router.navigate(['/']);
    }
  }

  validateForm(): boolean {
    this.formErrors = {};

    // Validar a descrição usando uma expressão regular e o comprimento máximo
    const descriptionRegex = /^[a-zA-Z\s]+$/;
    if (!descriptionRegex.test(this.newItem.description)) {
      this.formErrors.description = 'Descrição inválida. Use apenas letras e espaços.';
    } else if (this.newItem.description.length > 20) {
      this.formErrors.description = 'Descrição deve ter no máximo 20 caracteres.';
    }
  
    // Validar a quantidade como número positivo
    if (this.newItem.quantity <= 0) {
      this.formErrors.quantity = 'Quantidade inválida. Insira um número positivo.';
    }
  
    // Validar o preço com no máximo 7 números e 2 dígitos após a vírgula
    const priceRegex = /^\d{1,5}(\.\d{1,2})?$/;
    if (!priceRegex.test(this.newItem.price.toString())) {
      this.formErrors.price = 'Preço inválido. Insira um número com no máximo 7 dígitos e 2 decimais.';
    }
  
    // Retornar verdadeiro se não houver erros
    return Object.keys(this.formErrors).length === 0;
  }

  storeInLocalStorage(): void {
    const shoppingList = JSON.parse(localStorage.getItem('shoppingList') || '[]');
    shoppingList.push(this.newItem);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }
}