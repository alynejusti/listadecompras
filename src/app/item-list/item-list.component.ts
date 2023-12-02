
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
})
export class ItemListComponent implements OnInit {
  items: any[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shoppingListService.newItem$.subscribe(newItem => {
      if (newItem) {
        this.items.push(newItem);
      } else {
        this.loadItems();
      }
    });

    this.loadItems();
  }

  navigateToAddItem(): void {
    this.router.navigate(['../add-item'], { relativeTo: this.route });
  }

  navigateToEditItem(index: number): void {
    const itemId = this.items[index].id;
    this.router.navigate([`../edit-item/${itemId}`], { relativeTo: this.route });
  }

  confirmDeleteIndex: number | null = null;

  confirmDeleteItem(index: number): void {
    this.confirmDeleteIndex = index;
  }

  deleteItem(index: number): void {
    this.shoppingListService.deleteItem(this.items[index].id).subscribe(() => {
      this.confirmDeleteIndex = null;
      this.loadItems(); // Certifique-se de recarregar os itens após excluir um
    });
  }

  cancelDelete(): void {
    this.confirmDeleteIndex = null;
  }

  private loadItems(): void {
    this.shoppingListService.getItems().subscribe(items => {
      this.items = items;
    });
  }
}