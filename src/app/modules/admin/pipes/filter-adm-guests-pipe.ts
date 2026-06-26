import { Pipe, PipeTransform } from '@angular/core';
import { Guest } from '../../../shared/constants/Guest';

@Pipe({
  name: 'filterGuests',
  standalone: false
})
export class FilterGuestPipe implements PipeTransform {
  transform(convidados: Guest[], search: string, status: string): Guest[] {
    if (!convidados) return [];

    let filtered = convidados;

    if (status !== 'Todos') {
      filtered = filtered.filter(c => c.status === status);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(c =>
        c.nome.toLowerCase().includes(searchLower) ||
        (c.telefone && c.telefone.includes(search)) ||
        (c.email && c.email.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }
}
