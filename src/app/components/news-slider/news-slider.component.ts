import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { NewsDTO } from '../../models/dto/NewsDTO';
import { Router, NavigationExtras, Routes } from '@angular/router';
import { NewsListComponent } from '../../pages/news/news-list/news-list.component';

@Component({
  selector: 'app-news-slider',
  standalone: true,
  imports: [],
  providers: [NewsService],
  templateUrl: './news-slider.component.html',
  styleUrl: './news-slider.component.scss'
})
export class NewsSliderComponent {
  constructor(private newsService: NewsService, private router: Router) { }
  news: NewsDTO[] = [];
  
  ngOnInit(): void {
    this.newsService.getNews().subscribe(
      (data) => {
      this.news = data.content;
      this.images = this.news.map((news) => news.imagen);
      }
    );
  }

  images: string[] = [];
  currentImage: number = 0;

  nextImage() {
    this.currentImage = (this.currentImage + 1) % this.images.length;
  }

  prevImage() {
    this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length;
  }
  goToNew() {
    const currentNewsId = this.news[this.currentImage].id;
    
    this.router.navigate(['/news']);
  }
}