import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    this.viewportScroller.setOffset([0, 90]);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  goToSection(sectionId: string) {
    this.closeMenu();

    const onHome = this.router.url === '/inicio' || this.router.url === '/';
    if (onHome) {
      this.scrollToSection(sectionId);
      return;
    }

    this.router.navigate(['/inicio']).then(() => {
      setTimeout(() => this.scrollToSection(sectionId), 100);
    });
  }

  private scrollToSection(sectionId: string) {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    const headerOffset = 90;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
}
