
import { Component, OnInit } from '@angular/core';
import { child, get, getDatabase, ref } from 'firebase/database';

import { appFirebase } from '../app.component';

@Component({
  selector: 'app-desayuno',
  standalone: true,
  imports: [],
  templateUrl: './desayuno.component.html',
  styleUrl: './desayuno.component.css'
})
export class DesayunoComponent implements OnInit {

  desayunos: any[] = [];

  ngOnInit(): void {
    const db = getDatabase(appFirebase);
    const dbRef = ref(db);
    get(child(dbRef, 'desayuno')).then((snapshot) => {
      if (snapshot.exists()) {
        this.desayunos = Object.values(snapshot.val());
      }
    });
}
}
