import { Component, OnInit } from '@angular/core';
import { InstitucionDTO } from '../../models/dto/InstitucionDTO';
import { InstitutionService } from '../../services/institution.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-institution-validation',
  templateUrl: './instituciones-validation.component.html',
  standalone: true,
  providers: [InstitutionService],
  styleUrls: ['./instituciones-validation.component.scss'],
  imports: [HeaderComponent, FooterComponent, NgIf, NgFor]
})export class InstitucionesValidationComponent implements OnInit {
  institutions: InstitucionDTO[] = [];

  constructor(private institutionService: InstitutionService) {}

  handleChange(e: any) {
    const searchStatus = e.target.value;
    this.actualizarInstituciones(searchStatus);
  }

  actualizarInstituciones(estado: string) {
    this.institutionService.getInstitutionsByState(estado).subscribe(
      (data: any) => {
        this.institutions = data.content;
      },
      (error) => {
        console.error('Error fetching institutions:', error);
      }
    );
  }

  updateState(id: number, newState: string) {

    this.institutionService.updateInstitucionState(id, newState).subscribe(
      () => {
        this.actualizarInstituciones('revision');
      },
      (error) => {
        console.error('Error updating institution state:', error);
      }
    );
  }

  ngOnInit(): void {
    this.actualizarInstituciones('revision');
  }
}