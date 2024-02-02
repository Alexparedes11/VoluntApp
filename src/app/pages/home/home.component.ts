import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { FiltersBarComponent } from '../../components/filters-bar/filters-bar.component';
import { MainService } from '../../services/main.service';
import { HttpClientModule } from '@angular/common/http';
import { EventCardDTO } from '../../models/dto/EventCardDTO';
import { Event } from '../../models/Event';
import { exampleEvents } from '../../data/exampleEventList';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [MainService],
  imports: [HeaderComponent, FooterComponent, EventCardComponent, FiltersBarComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private mainService: MainService) { }
  events: EventCardDTO[] = [];

  ngOnInit(): void {
    this.mainService.getEvents().subscribe(
      (data) => {
        this.events = data.content;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
}
