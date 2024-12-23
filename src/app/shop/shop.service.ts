import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private baseURL: string = "https://localhost:7076";
  constructor(
    private httpClient: HttpClient) {
  }

  getHoney<T>() {
    return this.httpClient.get(`${this.baseURL}/Honey`);
  }

  getProducts<T>() {
    return this.httpClient.get(`${this.baseURL}/GetProducts`);
  }

  // getImage(): Observable<Blob> {
  //   return this.httpClient.get(`${this.baseURL}/GetImage`, {responseType: 'blob'});
  // }

  getImage<T>() {
    return this.httpClient.get(`${this.baseURL}/GetImage`);
  }

  foo(): Observable<any> {
    const obj = {
      productId: '5',
      productType: 'Honey',
      imagePath: 'D:\foo.jpg'
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(`${this.baseURL}/SetProductImage`, obj);
  }

  getHoneyImages<T>(prodId: string) {
    // return this.httpClient.get(`${this.baseURL}/Honey/GetImages/${prodId}`);
    return this.httpClient.get(`${this.baseURL}/Honey/GetImages/${prodId}`);
  }

  getThumbnail<T>(prodId: string) {
    return this.httpClient.get(`${this.baseURL}/Honey/GetThumbnail/${prodId}`);
  }

  test<T>(url: string) {
    return this.httpClient.get(url);
  }
}
