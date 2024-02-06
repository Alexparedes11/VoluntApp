import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { New } from '../../models/New';
import { DatePipe } from '@angular/common';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  standalone: true,
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  providers: [NewsService],
  imports: [HeaderComponent, FooterComponent, DatePipe]
})
export class NewsComponent {
  constructor(private newsService: NewsService) { }
  news: New[] = [];
  ngOnInit(): void {
    this.newsService.getNews().subscribe(
      (data) => {
        this.news = data.content;
      },
      (error) => {
        console.error('Error fetching news:', error);
      }
    );
  }
}

