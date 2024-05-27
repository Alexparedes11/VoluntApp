import { Injectable } from '@angular/core';
import { Ollama } from '@langchain/community/llms/ollama';

@Injectable({
  providedIn: 'root',
})
export class OllamaService {
  constructor() {}

  model = new Ollama({
    model: 'gemma',
    baseUrl: 'http://127.0.0.1:11434',
  });

  async generateEventSummary(eventDescription: string, wordCount: number) {
    const response = await this.model.invoke(
      `Genera un resumen de este evento en ${wordCount} palabras. Asegúrate de que el resumen no incluya un título ni encabezado, solo escribe el resumen del evento. Texto del evento: ${eventDescription}`
    );
    console.log(response)
    return response;
  }
}
