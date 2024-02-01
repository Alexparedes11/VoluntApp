import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { exampleNews } from '../../data/exampleNewList';
import { New } from '../../models/New';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-news',
    standalone: true,
    templateUrl: './news.component.html',
    styleUrl: './news.component.scss',
    imports: [HeaderComponent, FooterComponent, DatePipe]
})
export class NewsComponent {
    news: New[] = exampleNews;
}
