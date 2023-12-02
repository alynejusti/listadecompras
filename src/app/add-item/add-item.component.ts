import { Component, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
})
export class AddItemComponent {
  newItem: any = {};
  formErrors: any = {};
  editMode = false;
  itemId: number | null = null;

  @Output() itemAdded = new EventEmitter<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shoppingListService: ShoppingListService
  ) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.itemId = +params['id'];
        this.loadItemForEdit();
      }
    });
  }

  loadItemForEdit(): void {
    this.shoppingListService.getItemDetails(this.itemId!).subscribe(item => {
      this.newItem = { ...item };
    });
  }

  addItem(): void {
    if (this.validateForm()) {
      if (this.editMode) {
        this.shoppingListService.updateItem(this.newItem).subscribe(() => {
          this.router.navigate(['/item-list']);
        });
      } else {
        this.shoppingListService.addItem(this.newItem).subscribe(() => {
          this.newItem = {}; // Limpar o objeto para o próximo item
          this.itemAdded.emit();

          // Armazenar no Web Storage
          this.storeInLocalStorage();

          // Navegar de volta à lista de compras após adicionar o item
          this.router.navigate(['/item-list']);
        });
      }
    }
  }

  validateForm(): boolean {
    this.formErrors = {};

    // Validar a descrição permitindo letras e acentos
    const descriptionRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
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