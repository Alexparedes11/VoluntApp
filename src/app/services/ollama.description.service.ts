import { Injectable } from '@angular/core';
import { Ollama } from '@langchain/community/llms/ollama';

@Injectable({
  providedIn: 'root',
})
export class OllamaDescriptionService {
  constructor() {}

  model = new Ollama({
    model: 'mistral',
    baseUrl: 'http://127.0.0.1:11434',
  });

  async generateEventSummary(titleDescription: string, ubicacion: string, finicio: string, ffin: string, maxVoluntarios: number) {
    const response = await this.model.invoke(
      `A traves de este titulo "${titleDescription}", esta ubicacion ${ubicacion}, esta fecha de inicio ${finicio}, esta fecha de fin ${ffin} y este maximo de 
      voluntarios ${maxVoluntarios} genera solo la descripcion en Castellano. 
      
      Ejemplo 1: ¡Bienvenidos a participar en este importante proyecto de limpieza de la playa en Alicante! Nuestro objetivo es mantener limpia y hermosa nuestra costa, protegiendo 
      el medio ambiente para que las futuras generaciones puedan disfrutarlo. Todos son bienvenidos a unirse, independientemente de tu edad o habilidades, ya sea individualmente 
      o en grupo. El evento consiste en reunirnos en una fecha determinada en la playa designada para recoger desechos y limpiar el área. ¡Gracias por su apoyo!

      Ejemplo 2: ¡Únete a nosotros en la plantación de árboles en el parque de la ciudad! Nuestro objetivo es aumentar la cantidad de árboles en el parque para mejorar la calidad
      del aire y proporcionar un hábitat para la vida silvestre. Todos son bienvenidos a participar, ya sea que tengas experiencia en jardinería o no. El evento consiste en plantar
      árboles en un área designada del parque. ¡Esperamos verte allí!
      
      Acuerdate response solo en castellano y solo una descripcion.`
    );
    return response;
  }
}