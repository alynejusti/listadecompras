import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div>
  <h1>Minha Lista de Compras</h1>
    <nav>
      <a routerLink="/item-list">Lista de Itens</a>
      <router-outlet></router-outlet>
      <a routerLink="/add-item">Adicionar Item</a>
    </nav>
    <app-footer></app-footer>
  </div>
  `,
  styles: [],
})
export class AppComponent { }