import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  KENDO_MULTISELECT } from '@progress/kendo-angular-dropdowns';
import { KENDO_TOOLTIP } from '@progress/kendo-angular-tooltip';
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { ButtonRounded, KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import { KENDO_LABEL } from '@progress/kendo-angular-label';
@Component({
  selector: 'filter-activities',
  standalone: true,
  imports: [CommonModule, FormsModule, KENDO_MULTISELECT,KENDO_TOOLTIP,KENDO_DIALOG,KENDO_BUTTONS,KENDO_LABEL],
  templateUrl: './filter-activities.component.html',
  styleUrl: './filter-activities.component.scss',
})
export class FilterActivitiesComponent {
favouriteDialogOpen:boolean=false;
 public rounded: ButtonRounded = "full";
  viewAsOptions = ['Individual', 'Office', 'Summary'];
  functionsOptions = ['ENG', 'Non-ENG', 'Tech'];
  documentTypeOptions = ['Internal', 'External', 'Protected'];
  activityStatusOptions = ['Open', 'Closed', 'In Progress'];
  activityTypeOptions = ['560', '510', '789'];
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
  openFavourite(){
    if(this.selectedViewAs=='Office'){
      this.favouriteDialogOpen=true;
    }
  }
}
