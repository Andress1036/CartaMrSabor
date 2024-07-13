import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenusComponent } from "./menus/menus.component";
import { EspecialesComponent } from './especiales/especiales.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenusComponent, MenusComponent, RouterLink, EspecialesComponent, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{

}
