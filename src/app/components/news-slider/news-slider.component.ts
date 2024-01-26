import { Component } from '@angular/core';

@Component({
  selector: 'app-news-slider',
  standalone: true,
  imports: [],
  templateUrl: './news-slider.component.html',
  styleUrl: './news-slider.component.scss'
})
export class NewsSliderComponent {
  imagesPath: string = '/assets/images/';
  images: string[] = ['bosque', 'cascada', 'montana', 'rio'];
  currentImage: number = 0;

  nextImage() {
    this.currentImage = (this.currentImage + 1) % this.images.length;
  }

  prevImage() {
    this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length;
  }

}
