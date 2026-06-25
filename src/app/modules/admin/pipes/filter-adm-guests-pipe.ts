import { Pipe, PipeTransform } from '@angular/core';
import { Convidado } from '../services/admin-guests-service';

@Pipe({
  name: 'filterAdmGuests',
  standalone: false
})
export class FilterAdmGuestsPipe implements PipeTransform {
  transform(convidados: Convidado[], search: string, status: string): Convidado[] {
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