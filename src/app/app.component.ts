import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
      <app-navigation/>
      <router-outlet/>
    `
  })

export class AppComponent {
  title = 'Пчелен Магазин Милкови';
}
