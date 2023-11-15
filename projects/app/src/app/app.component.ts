import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ItemComponent } from "./item/item.component";
import { ShoppinglistComponent } from "./shoppinglist/shoppinglist.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet, ItemComponent, ShoppinglistComponent]
})
export class AppComponent {
  title = 'app';
}
