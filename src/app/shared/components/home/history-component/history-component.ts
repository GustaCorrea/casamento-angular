import { Component } from '@angular/core';

@Component({
  selector: 'home-history-component',
  standalone: false,
  templateUrl: './history-component.html'
})
export class HistoryComponent {
  photos = [
    { src: "/image/primeiro-encontro.jpg.webp", caption: "Nosso primeiro encontro" },
    { src: "/image/PedidoCasamento.png", caption: "O pedido de casamento" },
    { src: "/image/noivado.jpg", caption: "Noivado" },
  ];
}
