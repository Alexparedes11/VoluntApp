import { CommonModule, DatePipe } from '@angular/common';
import { Component } from "@angular/core";
import { FooterComponent } from "../../../components/footer/footer.component";
import { HeaderComponent } from "../../../components/header/header.component";
import { NewsDTO } from "../../../models/dto/NewsDTO";
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-news-list',
  standalone: true,
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
  providers: [NewsService, DatePipe],
  imports: [HeaderComponent, FooterComponent, DatePipe, CommonModule],
})
export class NewsListComponent {

  constructor(private newsService: NewsService) { }

  // Creamos dos objetos NewsDTO
  news: NewsDTO[] = [];
  news2: NewsDTO[] = [];

  ngOnInit(): void {
    // Obtener noticias de la api de nuestra aplicación
    this.newsService.getNews().subscribe(
      (data) => {
        this.news2 = data.content;
      }
    );

    // Obtener noticias de la RSS
    this.newsService.getNewsRSS().subscribe(
      (xmlData) => {
        this.newsService.parseXMLData(xmlData).subscribe(
          (parsedData) => {
            // Procesa los datos del feed RSS aquí
            this.news = this.parseRSSData(parsedData);
          },
          (error) => {
            console.error('Error al analizar datos XML:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener noticias:', error);
      }
    );
  }

  private parseRSSData(data: any): NewsDTO[] {
    // Implementa la lógica para parsear los datos del feed RSS
    // y retornar un arreglo de objetos NewsDTO
    if (data && data.rss && data.rss.channel && data.rss.channel[0] && data.rss.channel[0].item) {
      return data.rss.channel[0].item.map((item: any) => {
          const mediaContent = item['media:content'] ? item['media:content'][0] : null;
          const mediaContentUrl = mediaContent ? mediaContent.$.url : null;
          const creator = item['dc:creator'] ? item['dc:creator'][0] : null;
          const pubDate = item.pubDate ? new Date(item.pubDate[0]) : null;

          return {
              titulo: item.title[0],
              contenido: item.description[0],
              imagen: mediaContentUrl,
              autor: creator,
              fecha: pubDate,
              link: item.link[0]
          };
      });
    } else {
        return [];
    }
  
  }

  
}

