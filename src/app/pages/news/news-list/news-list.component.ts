import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { DatePipe } from '@angular/common';
import { NewsDTO } from '../../../models/dto/NewsDTO';

@Component({
  selector: 'app-news-list',
  standalone: true,
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
  imports: [HeaderComponent, FooterComponent, DatePipe],
})
export class NewsListComponent {
  news: NewsDTO[] = [];
}

