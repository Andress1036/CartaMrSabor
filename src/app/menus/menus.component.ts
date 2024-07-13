import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import jsonData from '../../assets/database/menu.json';


@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.css',
})
export class MenusComponent {

  menuList: any[] = jsonData.menu;

}
