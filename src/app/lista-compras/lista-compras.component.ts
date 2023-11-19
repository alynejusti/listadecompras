import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']
})
export class ListaComprasComponent {
  items: any[] = [];
  newItem: any = {};
  editedItem: any = null;

  addItem() {
      // Adiciona um novo item à lista
      this.items.push(this.newItem);
      this.newItem = {}; // Limpa o objeto para um novo item
  }

  editItem(item: any) {
      // Ativa o modo de edição
      this.editedItem = item;
  }

  saveItem() {
      // Salva as alterações no item editado
      this.editedItem = null; // Desativa o modo de edição
  }

  cancelEdit() {
      // Cancela a edição do item
      this.editedItem = null; // Desativa o modo de edição
  }

  deleteItem(index: number) {
    const deletedItem = this.items[index].description;
    // Exibir alerta
    alert(`Item "${deletedItem}" excluído com sucesso!`);
      // Exclui o item da lista
      this.items.splice(index, 1);
  }
}
