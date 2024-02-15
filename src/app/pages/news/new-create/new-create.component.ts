import { FooterComponent } from "../../../components/footer/footer.component";
import { NewsService } from '../../../services/news.service';
import { HeaderComponent } from "../../../components/header/header.component";
import { Component } from "@angular/core";
import { NewsDTO } from "../../../models/dto/NewsDTO";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { UserService } from "../../../services/user.service";
import { UserDTO } from "../../../models/dto/UserDTO";

@Component({
  selector: 'app-new-create',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, DatePipe],
  providers: [NewsService, UserService],
  templateUrl: './new-create.component.html',
  styleUrl: './new-create.component.scss'
})
export class NewCreateComponent {

  constructor(private fb: FormBuilder, private newsService: NewsService, private userService: UserService) { }

  newsForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    contenido: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    fecha: new FormControl(new Date()),
    autor: new FormControl('')
  });

  newsMostrar: NewsDTO[] = [];

  editingNews: NewsDTO | null = null;
  isEditing = false;
  selectedImage: string | null = null;



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
    const userId = this.userService.getUserIdFromToken();
    this.userService.getUserById(userId).subscribe(
      (data: UserDTO) => {
        console.log(data);
        this.newsForm.value.autor = data.nombre + ' ' + data.apellidos;
        this.newsForm.value.imagen = this.selectedImage;
        this.newsService.createNews(this.newsForm.value as NewsDTO).subscribe(
          (data: NewsDTO) => {
            console.log('Noticia creada:', data);
            this.updateNewsList();
          },
          (error: any) => {
            console.error('Error al crear noticia:', error);
          }
        );
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