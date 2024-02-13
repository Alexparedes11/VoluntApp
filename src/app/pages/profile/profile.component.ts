import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDTO } from '../../models/dto/UserDTO';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  providers: [ProfileService, UserService],
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

    constructor(private profileService: ProfileService, private userService: UserService) { }

    user: UserDTO = {} as UserDTO;
  
    ngOnInit(): void {

      this.userId = this.userService.getUserIdFromToken();

      this.profileService.getData(this.userId).subscribe(
        (data) => {
          console.log(data);
          this.user = data;
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    }

}
