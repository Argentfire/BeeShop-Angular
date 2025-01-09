import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseOrder } from '../../models/purchase-order';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private baseURL: string = "https://46.55.204.92:5001";
  constructor(
    private httpClient: HttpClient) {
  }

  getHoney<T>(id: string) {
    return this.httpClient.get(`${this.baseURL}/GetProduct/${id}`);
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

  createPurchaseOrder<T>(purchaseOrder: PurchaseOrder) {
    return this.httpClient.post<PurchaseOrder>(`${this.baseURL}/AddPurchaseOrder`, purchaseOrder);
  }
}
