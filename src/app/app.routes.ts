import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TermsComponent } from './pages/terms/terms.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { EventComponent } from './pages/event/event.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EventManagementComponent } from './pages/event-management/event-management.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ValidationsComponent } from './pages/validations/validations.component';
import { CreatenoticeComponent } from './pages/createnotice/createnotice.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'about', component: AboutComponent },
    { path: '', component: HomeComponent },
    { path: 'news', component: NewsComponent },
    { path: 'event/:id', component: EventComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'myevents', component: EventManagementComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'validations', component: ValidationsComponent},
    { path: 'createnotice', component: CreatenoticeComponent}
];
