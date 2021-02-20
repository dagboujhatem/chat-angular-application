import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'inboxFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(item => {
      return item.firstName.toLocaleLowerCase().includes(searchText) ||
       item.lastName.toLocaleLowerCase().includes(searchText);
    });
  }
}