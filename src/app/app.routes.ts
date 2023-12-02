import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemListComponent } from './item-list/item-list.component';


const routes: Routes = [
  { path: 'add-item', component: AddItemComponent },
  { path: 'item-list', component: ItemListComponent },
  { path: '', redirectTo: '/item-list', pathMatch: 'full' },
  { path: 'edit-item/:id', component: AddItemComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
