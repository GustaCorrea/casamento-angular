import { Component } from '@angular/core';

@Component({
  selector: 'historia-component',
  standalone: false,
  templateUrl: './historia-component.html'
})
export class HistoriaComponent {
  photos = [
    { src: "/image/primeiro-encontro.jpg.webp", caption: "Nosso primeiro encontro" },
    { src: "/image/PedidoCasamento.png", caption: "O pedido de casamento" },
    { src: "/image/noivado.jpg", caption: "Noivado" },
  ];
}