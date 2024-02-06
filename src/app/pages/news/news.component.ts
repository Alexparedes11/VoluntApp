import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { New } from '../../models/New';
import { DatePipe } from '@angular/common';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-news',
  standalone: true,
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  providers: [EventService],
  imports: [HeaderComponent, FooterComponent, DatePipe]
})
export class NewsComponent {
  constructor(private eventService: EventService) { }
  news: New[] = [];
  ngOnInit(): void {
    this.eventService.getNews().subscribe(
      (data) => {
        this.news = data.content;
      },
      (error) => {
        console.error('Error fetching news:', error);
      }
    );
  }
}
