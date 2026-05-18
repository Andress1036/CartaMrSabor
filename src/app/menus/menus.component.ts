import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { child, get, getDatabase, ref } from 'firebase/database';
import { HttpClientJsonpModule } from '@angular/common/http';
import menuCarrusel from '../../assets/database/menu.json';

import { appFirebase } from '../app.component';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.css',
})
export class MenusComponent implements OnInit {
  menuList: any[] = [];
  menuFirebase: any = {};

  ngOnInit(): void {
    const db = getDatabase(appFirebase);
    const dbRef = ref(db);
    get(child(dbRef, 'menuDia')).then((snapshot) => {
      if (snapshot.exists()) {
        this.menuFirebase = snapshot.val();
      }
    });
    get(child(dbRef, 'menu')).then((snapshot) => {
      if (snapshot.exists()) {
        this.menuList = Object.values(snapshot.val());
      }
    });
  }

  // Función para extraer la palabra entre "Menu" y "de" en prueba
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
    return match ? match[1] : "";
  }
}
