import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sidebar-component',
  standalone: false,
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
  host: { style: 'display: contents' }
})
export class SidebarComponent {

  constructor(private router: Router) {}

  logout() {
    // Aqui no futuro limpar o token do usuário (ex: localStorage.clear())
    this.router.navigate(['/auth/login']); 
  }
}
