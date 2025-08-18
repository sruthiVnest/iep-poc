import { Component, EventEmitter, Output } from '@angular/core';
import {
  DrawerModule,
  DrawerSelectEvent,
} from '@progress/kendo-angular-layout';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IepHeaderComponent } from '../iep-header/iep-header.component';

@Component({
  selector: 'copilot-iep-nx-app-layout',
  standalone: true,
  imports: [RouterModule, DrawerModule, CommonModule,IepHeaderComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  public expanded = false; // Drawer collapsed by default
  public mini = true; // Drawer in mini state by default
  @Output() dashboardExpandChange = new EventEmitter<boolean>();
  onToggleMenu() {
    this.expanded = !this.expanded;
  }
  public items: Array<{ text: string; route?: string; icon: string, id?: string }>
    = [
      { text: '', icon:'network_node' , id: 'filter-contract' },
      { text: 'Dashboard', icon:'widget_small' , route: '/dashboard' },
      { text: 'OTR', icon:'folder_managed' },
      { text: 'Settings', icon:'folder'  },
      { text: 'Quality', icon: 'verified', route: '/quality-dashboard' },
       { text: 'Engineering', icon:'engineering' },
      { text: 'Scheduler', icon: 'Settings' }
    ];
  public drawerOpened = false;
  public filterCollapsed = false;

  isActive(item: any): boolean {
    return this.router.isActive(item.route, {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }
  public selected = '/dashboard';

  constructor(private router: Router) {}

  onSelect(ev: any) {
    this.selected = ev.item.route;
   
    if (ev.item.id === 'filter-contract') {
      this.filterCollapsed = !this.filterCollapsed;
      this.dashboardExpandChange.emit(!this.filterCollapsed);
      const event = new CustomEvent('filterProjectsCollapse', {
        detail: { collapsed: false },
      });
      window.dispatchEvent(event);
    }
    else{
    this.router.navigate([ev.item.route]);
    }
  }

  onLogout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  onDrawerToggle() {
    this.expanded = !this.expanded;
  }
}
