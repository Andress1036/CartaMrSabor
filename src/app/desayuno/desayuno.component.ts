import { Component } from '@angular/core';
import jsonData from '../../assets/database/desayunos.json'

@Component({
  selector: 'app-desayuno',
  standalone: true,
  imports: [],
  templateUrl: './desayuno.component.html',
  styleUrl: './desayuno.component.css'
})
export class DesayunoComponent {

  desayunos: any[] = jsonData.desayuno;

}
