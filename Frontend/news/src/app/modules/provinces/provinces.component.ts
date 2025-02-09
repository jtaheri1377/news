import { Component } from '@angular/core';

@Component({
  selector: 'app-provinces',
  standalone: false,
  
  templateUrl: './provinces.component.html',
  styleUrl: './provinces.component.scss'
})
export class ProvincesComponent {
province:string| null=null;
options = [
  {label: 'همه استان ها', value: null},
  {label: 'تهران', value: 1},
  {label: 'اصفان', value: 2},
  {label: 'مشهد', value: 3},
  {label: 'قم', value: 4},
];
}
