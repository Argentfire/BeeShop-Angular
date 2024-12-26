import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './@modules/angular-material.module';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './@components/cart/shopping-cart/shopping-cart.component';
import { HomeComponent } from './@components/home/home.component';
import { NavigationComponent } from './@components/navigation/navigation.component';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    ShoppingCartComponent,
    NavigationComponent
  ],
  imports: [
    AppRoutingModule,
    AngularMaterialModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
})
export class AppModule { }
