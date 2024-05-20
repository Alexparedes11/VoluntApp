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
      `Genera un resumen de este evento en ${wordCount} palabras. Solo escribe el resumen, sin información adicional. Texto del evento: ${eventDescription}`
    );
    return response;
  }
}
