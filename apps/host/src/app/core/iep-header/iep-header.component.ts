import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppBarModule } from '@progress/kendo-angular-navigation';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'iep-header',
  standalone: true,
  imports: [AppBarModule, ButtonModule, CommonModule],
  templateUrl: './iep-header.component.html',
  styleUrls: ['./iep-header.component.scss']
})
export class IepHeaderComponent {
  userMenuOpen = false;
  userName = 'Joe Doe'; // Replace with actual user data if available
  userEmail = 'joe.doe@email.com'; // Replace with actual user data if available

  constructor(private router: Router) {}
  @Output() logout = new EventEmitter<void>();
  @Input() drawerOpened = true;
  @Output() drawerToggle = new EventEmitter<void>();
 
  onLogout() {
    this.logout.emit();
    this.userMenuOpen = false;
  }
  toggleDrawer() {
    this.drawerToggle.emit();
  }
  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }
}
