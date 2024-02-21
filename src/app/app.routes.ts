import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TermsComponent } from './pages/terms/terms.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsListComponent } from './pages/news/news-list/news-list.component';
import { EventDetailsComponent } from './pages/events/event-details/event-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EventManagementComponent } from './pages/events/event-management/event-management.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EventValidationComponent } from './pages/events/event-validation/event-validation.component';
import { NewCreateComponent } from './pages/news/new-create/new-create.component';
import { EventCreateComponent } from './pages/events/event-create/event-create.component';
import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
import { NewpasswordComponent } from './pages/newpassword/newpassword.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'about', component: AboutComponent },
    { path: '', component: HomeComponent },
    { path: 'news', component: NewsListComponent },
    { path: 'event/:id', component: EventDetailsComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'myevents', component: EventManagementComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'validations', component: EventValidationComponent},
    { path: 'create-new', component: NewCreateComponent},
    { path: 'create-event', component: EventCreateComponent },
    { path: 'forgetpassword', component: ForgetpasswordComponent },
    { path: 'newpassword', component: NewpasswordComponent }
];
