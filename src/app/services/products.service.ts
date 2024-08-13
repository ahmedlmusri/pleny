import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'https://dummyjson.com/products';
  searchingProduct = new Subject<string>();
  isSearching = new Subject<boolean>()
  constructor(private http: HttpClient) {}

  getProducts(limit: number, skip: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?limit=${limit}&skip=${skip}`);
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search?q=${query}`);
  }

  filterProductsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/category/${category}`);
  }

  sortProducts(order: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?sortBy=title&order=${order}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/category-list`);
  }
}
