import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from "./../app.routes"

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

}
