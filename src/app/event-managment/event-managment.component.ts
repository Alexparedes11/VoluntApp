import { Component } from '@angular/core';
import { FooterComponent } from "../components/footer/footer.component";
import { HeaderComponent } from "../components/header/header.component";
import { EventCardManagmentComponent } from "../components/event-card-managment/event-card-managment.component";

@Component({
    selector: 'app-event-managment',
    standalone: true,
    templateUrl: './event-managment.component.html',
    styleUrl: './event-managment.component.scss',
    imports: [FooterComponent, HeaderComponent, EventCardManagmentComponent]
})
export class EventManagmentComponent {

}
