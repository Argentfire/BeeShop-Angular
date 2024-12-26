import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShopService } from '../shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  // imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() item: any;
  @Input() amountLeft!: number;
  @Input() description!: string;
  @Input() id!: string;
  @Input() name!: string;
  @Input() price!: number;
  @Input() type!: number;
  @Input() weight!: number;
  @Input() thumbnail!: string;

  constructor(private shopService: ShopService,
    private router: Router) {
  }

  foo() {
    this.router.navigate(['/details'], {
      queryParams: {
        id: this.id,
        name: this.name,
        description: this.description,
        price: this.price,
        amountLeft: this.amountLeft,
        weight: this.weight
      }
    });
  }
}
