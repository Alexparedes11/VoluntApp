import { FooterComponent } from "../../../components/footer/footer.component";
import { DatePipe } from '@angular/common';
import { NewsService } from '../../../services/news.service';
import { HeaderComponent } from "../../../components/header/header.component";
import { Component } from "@angular/core";
import { NewsDTO } from "../../../models/dto/NewsDTO";

@Component({
  selector: 'app-news-list',
  standalone: true,
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
  providers: [NewsService, DatePipe],
  imports: [HeaderComponent, FooterComponent, DatePipe],
})
export class NewsListComponent {
  constructor(private newsService: NewsService) { }
  news: NewsDTO[] = [];
  ngOnInit(): void {
    this.newsService.getNews().subscribe(
      (data) => {
        this.news = data.content;
      }
    );
  }
}

