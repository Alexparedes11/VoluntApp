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

  async generateEventSummary(eventDescription: string, words: number) {
    const response = await this.model.invoke(
      `Genera un resumen del siguiente evento, usando ${words.toString()} palabras. Escribe únicamente el resumen sin nada más. Texto a resumir: ${eventDescription}`
    );
    return response;
  }
}
