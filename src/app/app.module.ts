import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { AppRoutingModule } from './app.routes';
import { ShoppingListService } from './services/shopping-list.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, AddItemComponent, ItemListComponent],
  imports: [BrowserModule, FormsModule, RouterModule, AppRoutingModule, HttpClientModule],
  providers: [ShoppingListService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
