import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  providers: [UserService],
  imports: [HeaderComponent, FooterComponent, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  userId: number = -1;

  editarperfil: boolean = false;

  mostrarContenedor() {
    this.editarperfil = !this.editarperfil;
  }

    constructor(private userService: UserService) { }
   
  
    ngOnInit(): void {

      this.userId = this.userService.getUserIdFromToken();

      this.userService.getUserById(this.userId).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    }

}
