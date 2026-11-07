import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenusComponent } from "./menus/menus.component";
import { EspecialesComponent } from './especiales/especiales.component';
import { initializeApp } from 'firebase/app'; // Importa la función para inicializar Firebase

// Configuración de Firebase de las apps web
const firebaseConfig = {
  apiKey: 'AIzaSyArTdzzhUjcgfp-5bd7r1NcgaTA9lSuMDo',
  authDomain: 'cartamrsabor.firebaseapp.com',
  databaseURL: 'https://cartamrsabor-default-rtdb.firebaseio.com',
  projectId: 'cartamrsabor',
  storageBucket: 'cartamrsabor.firebasestorage.app',
  messagingSenderId: '138217414534',
  appId: '1:138217414534:web:10765ec52ca3a797e7d607',
};

// Inicializa Firebase
export const appFirebase = initializeApp(firebaseConfig);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // 'auto' sigue la preferencia del sistema; 'light'/'dark' la fuerzan
  theme: 'auto' | 'light' | 'dark' = 'auto';
  readonly themeIcons = { auto: '🌗', light: '☀️', dark: '🌙' };
  readonly themeLabels = { auto: 'Automático', light: 'Claro', dark: 'Oscuro' };

  ngOnInit(): void {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') this.theme = saved;
    } catch {}
    this.applyTheme();
  }

  cycleTheme(): void {
    const order: ('auto' | 'light' | 'dark')[] = ['auto', 'light', 'dark'];
    this.theme = order[(order.indexOf(this.theme) + 1) % order.length];
    try {
      if (this.theme === 'auto') localStorage.removeItem('theme');
      else localStorage.setItem('theme', this.theme);
    } catch {}
    this.applyTheme();
  }

  private applyTheme(): void {
    const root = document.documentElement;
    if (this.theme === 'auto') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', this.theme);
  }

  scrollToTop(): void{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Esto hace que la navbar2 se oculte al bajar y aparezca al subir
  /* prevScrollpos = window.scrollY;

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
    */

}
