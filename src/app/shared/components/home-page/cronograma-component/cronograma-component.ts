import { Component } from '@angular/core';


@Component({
  selector: 'cronograma-component',
  standalone: false,
  templateUrl: './cronograma-component.html'
})
export class CronogramaComponent {
  scheduleItems = [
    { time: "14:00", event: "Cerimônia Civil", location: "Cartório Central", icon: "heart" },
    { time: "16:00", event: "Cerimônia Religiosa", location: "Igreja Nossa Senhora das Graças", icon: "heart" },
    { time: "18:00", event: "Coquetel de Boas-Vindas", location: "Salão Jardim", icon: "map-pin" },
    { time: "19:30", event: "Jantar e Recepção", location: "Salão Principal", icon: "map-pin" },
    { time: "21:00", event: "Corte do Bolo", location: "Salão Principal", icon: "clock" },
    { time: "22:00", event: "Pista de Dança", location: "Salão de Festas", icon: "clock" },
  ];
}