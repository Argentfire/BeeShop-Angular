import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private httpClient: HttpClient) {

  }

  public getProducts()  {
    this.httpClient.get('https://localhost:7076/Honey')
      .subscribe(
        (response) => {
          debugger
        },
        (error) => {

        }
    );
  }
}
