import { Component } from '@angular/core';
import jsonData from '../../assets/database/especiales.json';

@Component({
  selector: 'app-especiales',
  standalone: true,
  imports: [],
  templateUrl: './especiales.component.html',
  styleUrl: './especiales.component.css'
})
export class EspecialesComponent {

  especial: any[] = jsonData.especial;

}
