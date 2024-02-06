import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-createnotice',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './createnotice.component.html',
  styleUrl: './createnotice.component.scss'
})
export class CreatenoticeComponent {

}
