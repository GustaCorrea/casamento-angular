import { Component } from '@angular/core';

@Component({
  selector: 'header-component',
  standalone: false,
  templateUrl: './header-component.html'
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}