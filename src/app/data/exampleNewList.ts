import { New } from "../models/New";

// noticias.ts

export const exampleNews: New[] = [
    {
        id: 1,
        title: "Nuevo descubrimiento científico",
        content: "Científicos de todo el mundo se han unido para llevar a cabo una expedición submarina sin precedentes, y los resultados son asombrosos. En las profundidades del océano, a una profundidad que rara vez ha sido explorada, se ha descubierto una nueva especie de criaturas marinas. Estas criaturas, desconocidas hasta ahora para la ciencia, presentan características únicas y fascinantes que desafían nuestras concepciones actuales sobre la vida marina. El hallazgo ha sido catalogado como un hito en la investigación oceanográfica, y los científicos están emocionados por los nuevos conocimientos que esto podría aportar a nuestro entendimiento del ecosistema marino.",
        date: new Date("2024-02-01"),
        author: "Dr. Investigador",
        image: "/assets/images/rio.jpg"
    },
    {
        id: 2,
        title: "Lanzamiento de nuevo producto tecnológico",
        content: "La anticipación ha llegado a su punto álgido con el lanzamiento del último invento de la empresa XYZ. Después de años de investigación y desarrollo, la compañía ha presentado un dispositivo revolucionario que promete cambiar por completo el panorama tecnológico. Este nuevo producto no solo incorpora las últimas innovaciones tecnológicas, sino que también aborda de manera creativa las necesidades cambiantes de los consumidores. Desde su diseño elegante hasta su funcionalidad avanzada, el nuevo dispositivo ha generado un gran entusiasmo entre los expertos de la industria y los consumidores por igual. La empresa espera que este lanzamiento marque el comienzo de una nueva era en la tecnología moderna.",
        date: new Date("2024-02-02"),
        author: "Elena Innovadora",
        image: "/assets/images/cascada.jpg"
    },
    {
        id: 3,
        title: "Evento cultural en la ciudad",
        content: "La vibrante ciudad se prepara para recibir un fin de semana lleno de arte y cultura con la llegada de un gran festival. Artistas locales e internacionales se unirán para mostrar sus talentos en una variedad de disciplinas, que incluyen pintura, música, danza y teatro. El centro de la ciudad se transformará en un epicentro cultural, con escenarios y exposiciones distribuidos estratégicamente para brindar a los asistentes una experiencia inmersiva. Además de las presentaciones artísticas, habrá puestos de comida, talleres interactivos y oportunidades para que la comunidad participe y celebre la diversidad cultural. Este evento promete ser una celebración inolvidable de la riqueza cultural que define a nuestra ciudad.",
        date: new Date("2024-02-03"),
        author: "Ana Cultural",
        image: "/assets/images/montana.jpg"
    }
];
