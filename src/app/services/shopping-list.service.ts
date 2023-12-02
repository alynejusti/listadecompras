import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private apiUrl = 'http://localhost:3000/items';
  private newItemSource = new BehaviorSubject<any>(null);
  newItem$ = this.newItemSource.asObservable();

  constructor(private http: HttpClient) {}

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addItem(item: any): Observable<void> {
    return this.http.post<void>(this.apiUrl, item);
  }

  updateItem(item: any): Observable<void> {
    const updateUrl = `${this.apiUrl}/${item.id}`;
    return this.http.put<void>(updateUrl, item);
  }

  getItemDetails(id: number): Observable<any> {
    const detailsUrl = `${this.apiUrl}/${id}`;
    return this.http.get<any>(detailsUrl);
  }

  deleteItem(id: number): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(deleteUrl);
  }
}