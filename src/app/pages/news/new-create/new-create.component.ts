import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-new-create',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './new-create.component.html',
  styleUrl: './new-create.component.scss'
})
export class NewCreateComponent {

}
