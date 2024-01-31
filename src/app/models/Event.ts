import { User } from "./User";

export interface Event {
    id: number;
    image: string;
    title: string;
    startDate: Date;
    endDate: Date;
    location: string;
    volunteers: number;
    createdBy: User;
}