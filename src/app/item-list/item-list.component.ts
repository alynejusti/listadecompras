import { Component } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
})export class ItemListComponent {
  items: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute, // Adicione ActivatedRoute aqui
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.items = this.shoppingListService.getItems();
  }

  navigateToAddItem(): void {
    this.router.navigate(['../add-item'], { relativeTo: this.route }); // Navegar para '../add-item' em relação à rota atual
  }

  confirmDeleteIndex: number | null = null;

  confirmDeleteItem(index: number): void {
    this.confirmDeleteIndex = index;
  }

  deleteItem(index: number): void {
    this.shoppingListService.deleteItem(index);
    this.confirmDeleteIndex = null;
  }

  cancelDelete(): void {
    this.confirmDeleteIndex = null;
  }

}