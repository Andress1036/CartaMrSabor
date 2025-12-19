import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {child, get, getDatabase, ref } from 'firebase/database';

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
  menuFirebase: any[]=[];

  ngOnInit(): void {
    const db = getDatabase(appFirebase);
    const dbRef = ref(db);
    get(child(dbRef, 'menuDia')).then((snapshot) => {
      if (snapshot.exists()) {
        this.menuFirebase = Object.values(snapshot.val());
      }
    });
    get(child(dbRef, 'menu')).then((snapshot) => {
      if (snapshot.exists()) {
        this.menuList = Object.values(snapshot.val());
      }
    });

}
}
