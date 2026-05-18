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

  detenerBlink(id: number) {
    this.blinking[id] = false; // detiene el parpadeo
  }
}
