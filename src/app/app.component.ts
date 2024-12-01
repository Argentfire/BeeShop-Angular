import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
// import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    NavigationComponent,
    // BrowserModule
  ]
})

export class AppComponent {
  title = 'Пчелен Магазин Милкови';
}
