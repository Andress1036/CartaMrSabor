import { Component, OnInit } from '@angular/core';
import { child, get, getDatabase, ref } from 'firebase/database';

import { appFirebase } from '../app.component';

@Component({
  selector: 'app-especiales',
  standalone: true,
  imports: [],
  templateUrl: './especiales.component.html',
  styleUrl: './especiales.component.css'
})
export class EspecialesComponent implements OnInit {

  especial: any[] = [];
  ngOnInit(): void {
    const db = getDatabase(appFirebase);
    const dbRef = ref(db);
    get(child(dbRef, 'especial')).then((snapshot) => {
      if (snapshot.exists()) {
        this.especial = Object.values(snapshot.val());
      }
    });
}
}
