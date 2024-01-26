import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TermsComponent } from './terms/terms.component';
<<<<<<< HEAD
import { AboutComponent } from './about/about.component';
=======
import { HomeComponent } from './home/home.component';
>>>>>>> f6ee0c26360b8f9589e6da94e3df6c2c093d480c

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'terms', component: TermsComponent },
<<<<<<< HEAD
    { path: 'about', component: AboutComponent },
=======
    { path: 'home', component: HomeComponent}
>>>>>>> f6ee0c26360b8f9589e6da94e3df6c2c093d480c
];
