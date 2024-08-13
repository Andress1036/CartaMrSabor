import { Component, HostListener, OnInit } from '@angular/core';
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

  scrollToTop(): void{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  prevScrollpos = window.scrollY;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollPos = window.scrollY;
    const navbar2 = document.getElementById('navbar2');

   
    if (this.prevScrollpos > currentScrollPos) {
      if (navbar2) navbar2.style.top = '0';
    } else {
      if (navbar2) navbar2.style.top = '-70px'; // Ajusta según la altura de tu navbar
    }
    this.prevScrollpos = currentScrollPos;
  }

}
