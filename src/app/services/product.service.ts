import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private appURl: string;
  private apiURl: string;

  constructor(private http: HttpClient) {
    this.appURl = environment.endpoint
    this.apiURl = 'api/products'
  }

  getProducts(): Observable<Product[]> {
    // const token = localStorage.getItem('token')
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Product[]>(`${this.appURl}${this.apiURl}`,)
  }
}
