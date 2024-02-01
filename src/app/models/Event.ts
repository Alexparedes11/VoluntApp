import { User } from "./User";

export interface Event {
    id: number;
    startDate: Date;
    endDate: Date;
    title: string;
    image: string;
    location: string;
    volunteers: number;
    maxVolunteers: number;
    volunteersList: User[];
    createdBy: User;
}