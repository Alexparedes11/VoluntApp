import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { exampleNews } from '../../data/exampleNewList';
import { New } from '../../models/New';
import { DatePipe } from '@angular/common';
import { MainService } from '../../services/main.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-news',
    standalone: true,
    templateUrl: './news.component.html',
    styleUrl: './news.component.scss',
    providers: [MainService],
    imports: [HeaderComponent, FooterComponent, DatePipe, HttpClientModule]
})
export class NewsComponent {
constructor(private mainService: MainService) { }
news: New[] = [];
  ngOnInit(): void {
    this.mainService.getNews().subscribe(
      (data) => {
        this.news = data.content;
      },
      (error) => {
        console.error('Error fetching news:', error);
      }
    );
  }
}
