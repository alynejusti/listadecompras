import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private apiUrl = 'http://localhost:3000/items';
  private newItemSource = new BehaviorSubject<any>(null);
  private items: any[] = [];
  newItem$ = this.newItemSource.asObservable();

  async getItems(): Promise<any[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error('Erro ao obter itens da API');
      }
      return response.json();
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  }

  async addItem(item: any): Promise<void> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error('Erro ao adicionar item à API');
      }

      // Emitir o novo item para os ouvintes
      this.newItemSource.next(item);
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  }

  async deleteItem(id: number): Promise<void> {
    try {
      const deleteUrl = `${this.apiUrl}/${id}`;
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir item da API');
      }

      // Atualizar a lista de itens após a exclusão
      this.items = this.items.filter((item) => item.id !== id);
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  }
}