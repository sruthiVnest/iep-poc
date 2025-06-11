import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppBarModule } from '@progress/kendo-angular-navigation';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'iep-header',
  standalone: true,
  imports: [AppBarModule, ButtonModule, CommonModule, FormsModule],
  templateUrl: './iep-header.component.html',
  styleUrls: ['./iep-header.component.scss']
})
export class IepHeaderComponent {
  userMenuOpen = false;
  userName = 'Joe Doe'; // Replace with actual user data if available
  userEmail = 'joe.doe@email.com'; // Replace with actual user data if available
  dashboardMenuOpen = false;
  userSearch = '';
  users = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Adams'];
  filteredUsers: string[] = [];
  selectedUsers: string[] = [];
  myDashboardSelected: boolean = false;

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
  toggleDashboardMenu() {
    this.dashboardMenuOpen = !this.dashboardMenuOpen;
  }
  openDashboardSubmenu() {
    this.dashboardMenuOpen = true;
    this.userMenuOpen = true;
  }

  navigateToDashboard(role: 'admin' | 'user') {
    this.dashboardMenuOpen = false;
    if (role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  onUserSearch(term: string) {
    const lower = term.toLowerCase();
    this.filteredUsers = this.users.filter(u => u.toLowerCase().includes(lower));
  }

  toggleUserSelection(user: string) {
    const idx = this.selectedUsers.indexOf(user);
    if (idx > -1) {
      this.selectedUsers.splice(idx, 1);
    } else {
      this.selectedUsers.push(user);
    }
  }

  isUserSelected(user: string): boolean {
    return this.selectedUsers.includes(user);
  }

  toggleMyDashboard() {
    this.myDashboardSelected = !this.myDashboardSelected;
  }
}
