import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';

@Component({
  selector: 'copilot-iep-nx-filter-activities',
  standalone: true,
  imports: [CommonModule, FormsModule, KENDO_DROPDOWNLIST],
  templateUrl: './filter-activities.component.html',
  styleUrl: './filter-activities.component.scss',
})
export class FilterActivitiesComponent {
  viewAsOptions = ['User', 'Group', 'All'];
  functionsOptions = ['Function 1', 'Function 2', 'Function 3'];
  documentTypeOptions = ['Type A', 'Type B', 'Type C'];
  activityStatusOptions = ['Open', 'Closed', 'In Progress'];
  activityTypeOptions = ['Type X', 'Type Y', 'Type Z'];
  finishByOptions = ['Today', 'This Week', 'This Month'];
  dateTypeOptions = ['Created', 'Due', 'Completed'];

  selectedViewAs: string | null = null;
  selectedFunction: string | null = null;
  selectedDocumentType: string | null = null;
  selectedActivityStatus: string | null = null;
  selectedActivityType: string | null = null;
  selectedFinishBy: string | null = null;
  selectedDateType: string | null = null;

  totalDocuments = 1321;
  backlogs = 16;
  forecast = 199;
  notAcknowledged = 3;
  step = 5;
  rulestream = 3;

  cards = [
    { title: 'Today', description: '1 out of 1 are not completed' },
    { title: 'FW 6, 2025 (This Week)', description: '6 out of 15 are not completed' },
    { title: 'FW 7, 2025 (Next Week)', description: '4 out of 8 are not completed' },
    { title: 'FW 8,2025', description: '4 out of 8 are not completed' },
    { title: 'Card 5', description: 'Description for card 5' },
    { title: 'Card 6', description: 'Description for card 6' },
  ];
  cardIndex = 0;
  get visibleCards() {
    return this.cards.slice(this.cardIndex, this.cardIndex + 4);
  }
  scrollLeft() {
    if (this.cardIndex > 0) {
      this.cardIndex -= 4;
    }
  }
  scrollRight() {
    if (this.cardIndex + 4 < this.cards.length) {
      this.cardIndex += 4;
    }
  }
  clearAll() {
    this.selectedViewAs = null;
    this.selectedFunction = null;
    this.selectedDocumentType = null;
    this.selectedActivityStatus = null;
    this.selectedActivityType = null;
    this.selectedFinishBy = null;
    this.selectedDateType = null;
  }
}
