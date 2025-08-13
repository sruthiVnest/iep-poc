import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'filterByText',
  standalone:true
})
export class FilterByTextPipe implements PipeTransform {
  transform(items: string[], searchText: string): string[] {
    if (!items) return [];
    if (!searchText) return items;
 
    searchText = searchText.toString();
    return items.filter(item => item.toLowerCase().includes(searchText));
  }
}