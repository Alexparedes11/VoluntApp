import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { DatePipe } from '@angular/common';
import { EventService } from '../../services/event.service';
import { NewsDTO } from '../../models/dto/NewsDTO';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  standalone: true,
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  imports: [HeaderComponent, FooterComponent, DatePipe],
})
export class NewsComponent {
}

