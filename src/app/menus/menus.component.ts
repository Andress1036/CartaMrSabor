import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { child, get, getDatabase, ref } from 'firebase/database';
import { HttpClientJsonpModule } from '@angular/common/http';
import menuCarrusel from '../../assets/database/menu.json';

import { appFirebase } from '../app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.css',
})
export class MenusComponent implements OnInit {
  menuList: any[] = [];
  menuFirebase: any = {};
  blinking: { [id: number]: boolean } = {};


  ngOnInit(): void {
    const db = getDatabase(appFirebase);
    const dbRef = ref(db);
    get(child(dbRef, 'menuDia')).then((snapshot) => {
      if (snapshot.exists()) {
        this.menuFirebase = snapshot.val();
      }
    });
    get(child(dbRef, 'menu')).then((snapshot) => { // .then() se ejecuta después de obtener los datos de Firebase, es una función asincrónica que maneja la promesa devuelta por get()
      if (snapshot.exists()) {
        this.menuList = Object.values(snapshot.val());
        this.menuList.forEach((plato) => {
          this.blinking[plato.id] = true; // inicia el parpadeo
        });
      }
    });



  }

  // Función para extraer la palabra entre "Menu" y ".webp" de la url de img del menu y el casero y los demás
  extraerPalabra(texto: string, id: number): string {
    let splitWord: string;
    switch (id) {
      case 1:
        splitWord = 'Menu';
        break;
      case 2:
        splitWord = 'Seco';
        break;
      case 3:
        splitWord = 'Casero';
        break;
      case 4:
        splitWord = 'Bandeja';
        break;
      case 5:
        splitWord = 'Combo';
        break;
      default:
        splitWord = 'Ejecutivo';
    }
    const regex = new RegExp(`${splitWord}(.*?).webp`);
    const match = texto.match(regex);
    return match ? match[1] : '';
  }

  // ---- Deslizar el dedo para cambiar de foto en los carruseles ----
  // No usamos el touch nativo de Bootstrap (data-bs-touch) porque le pone
  // "touch-action: pan-y" al carrusel y eso bloquea el zoom con dos dedos.
  // Aquí solo se cambia de foto con UN dedo, un gesto claramente horizontal y
  // sin zoom aplicado; con dos dedos (pellizco) o con la página ampliada no se toca nada.
  private touchStartX = 0;
  private touchStartY = 0;
  private touchMultiple = false;
  private readonly swipeMin = 50; // px mínimos para contar como deslizamiento

  onTouchStart(event: TouchEvent): void {
    if (event.touches.length > 1) {
      this.touchMultiple = true; // es un pellizco (zoom), no un deslizamiento
      return;
    }
    this.touchMultiple = false;
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  // El navegador cancela el gesto (por ejemplo al tomar él el zoom): no hacer nada
  onTouchCancel(): void {
    this.touchMultiple = false;
  }

  onTouchEnd(event: TouchEvent, id: number): void {
    if (event.touches.length > 0) return; // todavía queda algún dedo apoyado
    const huboPellizco = this.touchMultiple;
    this.touchMultiple = false;
    if (huboPellizco) return;
    // Con la página ampliada, deslizar sirve para moverse por la imagen
    if ((window.visualViewport?.scale ?? 1) > 1.01) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - this.touchStartX;
    const dy = touch.clientY - this.touchStartY;
    if (Math.abs(dx) < this.swipeMin || Math.abs(dx) < Math.abs(dy) * 1.5) return;

    // Se usa el botón del carrusel para conservar su animación y el fin del parpadeo
    const carrusel = document.getElementById('carousel-' + id);
    const boton = carrusel?.querySelector<HTMLElement>(
      dx < 0 ? '.carousel-control-next' : '.carousel-control-prev'
    );
    boton?.click();
  }

  detenerBlink(id: number) {
    this.blinking[id] = false; // detiene el parpadeo
  }
}
