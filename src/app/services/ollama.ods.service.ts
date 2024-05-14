import { Injectable } from '@angular/core';
import { Ollama } from '@langchain/community/llms/ollama';

@Injectable({
  providedIn: 'root',
})
export class OllamaODSService {
  constructor() {}

  model = new Ollama({
    model: 'mistral',
    baseUrl: 'http://127.0.0.1:11434',
  });

  async generateEventSummary(eventDescription: string, titleDescription: string) {
    const response = await this.model.invoke(
      `A traves de este titulo "${titleDescription}" y esta descripcion "${eventDescription}" (Si el campo titulo y descripcion estan vacios responde rellene los campos ) relaciona el evento con una de las 17 ODS.

      Aqui te muestro informacion de las ODS para que sea mas facil tu eleccion.

      1. Fin de la pobreza: Poner fin a la pobreza en todas sus formas en todo el mundo
      2. Hambre cero: Poner fin al hambre, lograr la seguridad alimentaria y la mejora de la nutricion y promover la agricultura sostenible
      3. Salud y bienestar: Garantizar una vida sana y promover el bienestar para todos en todas las edades
      4. Educacion de calidad: Garantizar una educacion inclusiva, equitativa y de calidad y promover oportunidades de aprendizaje durante toda la vida para todos
      5. Igualdad de genero: Lograr la igualdad entre los generos y empoderar a todas las mujeres y las ninas
      6. Agua limpia y saneamiento: Garantizar la disponibilidad de agua y su gestion sostenible y el saneamiento para todos
      7. Energia asequible y no contaminante: Garantizar el acceso a una energia asequible, fiable, sostenible y moderna para todos
      8. Trabajo decente y crecimiento economico: Promover el crecimiento economico sostenido, inclusivo y sostenible, el empleo pleno y productivo y el trabajo decente para todos
      9. Industria, innovacion e infraestructura: Construir infraestructuras resilientes, promover la industrializacion inclusiva y sostenible y fomentar la innovacion
      10. Reduccion de las desigualdades: Reducir la desigualdad en y entre los paises
      11. Ciudades y comunidades sostenibles: Lograr que las ciudades y los asentamientos humanos sean inclusivos, seguros, resilientes y sostenibles
      12. Produccion y consumo responsables: Garantizar modalidades de consumo y produccion sostenibles
      13. Accion por el clima: Adoptar medidas urgentes para combatir el cambio climatico y sus efectos
      14. Vida submarina: Conservar y utilizar en forma sostenible los oceanos, los mares y los recursos marinos para el desarrollo sostenible
      15. Vida de ecosistemas terrestres: Proteger, restablecer y promover el uso sostenible de los ecosistemas terrestres, gestionar de forma sostenible los bosques, luchar contra la desertificacion, 
          detener e invertir la degradacion de la tierra y detener la perdida de biodiversidad
      16. Paz, justicia e instituciones solidas: Promover sociedades pacificas e inclusivas para el desarrollo sostenible, facilitar el acceso a la justicia para todos y construir a todos los niveles instituciones 
          eficaces e inclusivas que rindan cuentas
      17. Alianzas para lograr los objetivos: Fortalecer los medios de implementacion y revitalizar la alianza mundial para el desarrollo sostenible
      
      Responde siempre aunque hayan dos posibles escoge solo una como esto:
      
      Ejemplo 1: Este evento esta relacionado con la ODS 1 - Fin de la pobreza
      Ejemplo 2: Este evento esta relacionado con la ODS 2 - Hambre cero
      
      Responde siempre solo en castellano y solo una ODS.`
    );
    return response;
  }
}