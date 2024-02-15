import { FooterComponent } from "../../../components/footer/footer.component";
import { NewsService } from '../../../services/news.service';
import { HeaderComponent } from "../../../components/header/header.component";
import { Component } from "@angular/core";
import { NewsDTO } from "../../../models/dto/NewsDTO";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-new-create',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, DatePipe],
  providers: [NewsService],
  templateUrl: './new-create.component.html',
  styleUrl: './new-create.component.scss'
})
export class NewCreateComponent {
  newsForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    contenido: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
  });

  newsMostrar: NewsDTO[] = [];
  news = {} as NewsDTO;

  deleteNewsForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
  });

  editingNews: NewsDTO | null = null;
  isEditing = false;
  selectedImage: File | null = null;


  constructor(private fb: FormBuilder, private newsService: NewsService) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  //Crear noticia
  submitNew() {
    // HAY QUE HACER UN FORM
    const currentDate = new Date();

    this.news.autor = 'Voluntapp';
    this.news.fecha = currentDate;

    this.news.titulo = this.newsForm.get('titulo')?.value ?? '';
    this.news.contenido = this.newsForm.get('contenido')?.value ?? '';
    //this.news.imagen = this.selectedImage;

    this.newsService.createNews(this.news).subscribe(
      (data: any) => {
        console.log('Noticia creada:', data);
        this.updateNewsList();
      },
      (error: any) => {
        console.error('Error al crear noticia:', error);
      }
    );
  }

  //Mostrar lista de noticias:

  ngOnInit(): void {
    this.updateNewsList();
  }

  //Eliminar noticia
  // Función para eliminar una noticia por ID
  deleteNews(id: number): void {
    this.newsService.deleteNews(id).subscribe(
      () => {
        console.log('Noticia eliminada con éxito');
        // Actualiza la lista de noticias después de la eliminación si es necesario
        this.updateNewsList();
      },
      (error: any) => {
        console.error('Error al eliminar noticia:', error);
      }
    );
  }

  // Función para actualizar la lista de noticias después de la eliminación
  updateNewsList(): void {
    this.newsService.getNews().subscribe(
      (data: any) => {
        // Verificar si hay contenido en la respuesta
        if (data && data.content) {
          this.newsMostrar = data.content;
        } else {
          // Si no hay contenido, asigna una lista vacía
          this.newsMostrar = [];
        }
      },
      (error: any) => {
        console.error('Error al obtener noticias:', error);
      }
    );
  }

  //Editar noticia

  editNews(id: number): void {
    this.editingNews = this.newsMostrar.find((news: NewsDTO) => news.id === id) || null;
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.editingNews = null;
    this.isEditing = false;
    this.newsForm.reset();
  }

  submitEdit(): void {
    if (this.editingNews) {
      // Obtiene los valores actuales del formulario
      const editedTitulo = this.newsForm.get('titulo')?.value ?? '';
      const editedContenido = this.newsForm.get('contenido')?.value ?? '';
      const editedImagen = this.newsForm.get('imagen')?.value ?? '';

      // Verifica si el título está editado y no está vacío
      if (editedTitulo.trim() !== '') {
        this.editingNews.titulo = editedTitulo;
      }

      // Asigna los valores del contenido e imagen si se han editado y no están vacíos
      if (editedContenido.trim() !== '') {
        this.editingNews.contenido = editedContenido;
      }

      if (editedImagen.trim() !== '') {
        this.editingNews.imagen = editedImagen;
      }

      // Envía los datos actualizados al servicio
      this.newsService.editNews(this.editingNews.id, this.editingNews).subscribe(
        () => {
          console.log('Noticia editada con éxito');
          // Actualiza la lista de noticias después de la edición si es necesario
          this.updateNewsList();

          // Restaura el estado original y oculta el formulario de edición
          this.editingNews = null;
          this.isEditing = false;
          this.newsForm.reset();
        },
        (error: any) => {
          console.error('Error al editar noticia:', error);
        }
      );
    }
  }
}  