import { AfterViewInit, Component } from '@angular/core';
import { DesayunoComponent } from '../desayuno/desayuno.component';
import { EspecialesComponent } from '../especiales/especiales.component';
import { MenusComponent } from '../menus/menus.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [DesayunoComponent, EspecialesComponent, MenusComponent, RouterModule],
  templateUrl: './carta.component.html',
  styleUrl: './carta.component.css'
})
export class CartaComponent implements AfterViewInit{

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

}
