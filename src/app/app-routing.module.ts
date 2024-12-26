import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './@components/about/about.component';
import { ShoppingCartComponent } from './@components/cart/shopping-cart/shopping-cart.component';
import { ContactComponent } from './@components/contact/contact.component';
import { HomeComponent } from './@components/home/home.component';
import { ProductDetailsComponent } from './@components/shop/product-details/product-details.component';
import { ShopComponent } from './@components/shop/shop.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'details', component: ProductDetailsComponent },
  { path: 'cart', component: ShoppingCartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
