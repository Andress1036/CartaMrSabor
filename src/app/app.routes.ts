import { Routes } from '@angular/router';
import { MenusComponent } from './menus/menus.component';
import { EspecialesComponent } from './especiales/especiales.component';
import { DesayunoComponent } from './desayuno/desayuno.component';

export const routes: Routes = [
  {path: 'menus', component: MenusComponent},
  {path: 'especiales', component: EspecialesComponent},
  {path: 'desayuno', component: DesayunoComponent}
];
