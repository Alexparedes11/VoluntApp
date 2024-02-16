import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  providers: [Location], 
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  constructor(private location: Location) {}
  back() {
    this.location.back();
  }
}
