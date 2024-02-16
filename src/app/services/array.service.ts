// array.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArrayService {
  private arraySubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public array$: Observable<any[]> = this.arraySubject.asObservable();

  private array: any[] = [1, 2, 3, 4, 5]; // Ejemplo de array

  constructor() {
    this.startPeriodicUpdates();
  }

  private startPeriodicUpdates() {
    interval(1000).subscribe(() => {
      // Emitir una copia del array actual
      this.arraySubject.next([...this.array]);
    });
  }
}
