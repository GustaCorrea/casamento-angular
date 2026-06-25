import { Component } from '@angular/core';

@Component({
  selector: 'sidebar-component',
  standalone: false,
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
  host: { style: 'display: contents' }
})
export class SidebarComponent {}
