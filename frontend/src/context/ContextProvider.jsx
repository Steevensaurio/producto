import { createContext, useState } from "react";

export const ProviderContext = createContext();

export const ContextProvider = ({ children }) => {
  const [activeItem, setActiveItem] = useState("Inicio");
  const [soliActived, setSoliActive] = useState(false);
  const menuItems = [
    {
      name: "Inicio",
      icon: "M10 2.5L2 8.5V17a1 1 0 001 1h4a1 1 0 001-1v-4h4v4a1 1 0 001 1h4a1 1 0 001-1V8.5l-8-6z",
    },
    {
      name: "Historial",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    },
    {
      name: "Notificaciones",
      icon: "M12 4v16m8-16H8a2 2 0 00-2 2v12a2 2 0 002 2h12V6a2 2 0 00-2-2z",
    },
    {
      name: "Settings",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    },
  ];

  const peliculas = [
    {
      titulo: "The Godfather",
      sinopsis:
        "The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.",
    },
    {
      titulo: "The Shawshank Redemption",
      sinopsis:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    },
    {
      titulo: "Schindler's List",
      sinopsis:
        "In German-occupied Poland, a businessman saves the lives of over a thousand Jewish refugees during the Holocaust.",
    },
    {
      titulo: "The Dark Knight",
      sinopsis:
        "Batman battles the Joker, a rising criminal mastermind intent on creating chaos in Gotham City.",
    },
    {
      titulo: "Pulp Fiction",
      sinopsis:
        "The lives of two mob hitmen, a boxer, and others intertwine in four tales of violence and redemption.",
    },
    {
      titulo: "The Lord of the Rings: The Return of the King",
      sinopsis:
        "The final battle for Middle-earth begins as Frodo and Sam approach Mount Doom to destroy the One Ring.",
    },
    {
      titulo: "Fight Club",
      sinopsis:
        "A disillusioned man forms an underground fight club with a soap salesman, which evolves into something much more.",
    },
    {
      titulo: "Forrest Gump",
      sinopsis:
        "The story of a man with a low IQ who accidentally becomes involved in several historical events.",
    },
    {
      titulo: "Inception",
      sinopsis:
        "A thief who enters the dreams of others is given a chance to have his criminal history erased as payment for implanting an idea into a target's subconscious.",
    },
    {
      titulo: "The Matrix",
      sinopsis:
        "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    },
    {
      titulo: "Goodfellas",
      sinopsis:
        "The story of Henry Hill and his life in the mob, covering his relationship with his wife and his mob partners.",
    },
    {
      titulo: "The Silence of the Lambs",
      sinopsis:
        "A young FBI cadet seeks the help of a manipulative cannibal killer to catch another serial killer.",
    },
    {
      titulo: "Saving Private Ryan",
      sinopsis:
        "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
    },
    {
      titulo: "Interstellar",
      sinopsis:
        "A team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
    },
    {
      titulo: "The Green Mile",
      sinopsis:
        "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
    },
    {
      titulo: "The Lion King",
      sinopsis:
        "A young lion prince flees his kingdom after the death of his father, only to learn the true meaning of responsibility and bravery.",
    },
    {
      titulo: "Gladiator",
      sinopsis:
        "A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family and sent him into slavery.",
    },
    {
      titulo: "The Departed",
      sinopsis:
        "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in Boston.",
    },
    {
      titulo: "Whiplash",
      sinopsis:
        "A promising young drummer enrolls at a music conservatory where his dreams are mentored by an instructor who pushes him to the limit.",
    },
    {
      titulo: "Parasite",
      sinopsis:
        "Greed and class discrimination threaten the newfound relationship between a wealthy family and a poor household.",
    },
  ];

  const tutorias = [
    {
      titulo: "Introducción a la Filosofía",
      materia: "Filosofía",
      profesor: "Dr. Juan Pérez",
      descripcion:
        "Explora las principales preguntas y corrientes filosóficas desde la antigüedad hasta la actualidad.",
    },
    {
      titulo: "Álgebra Básica",
      materia: "Matemáticas",
      profesor: "Prof. Ana Gómez",
      descripcion:
        "Fundamentos de álgebra, incluyendo ecuaciones lineales, factores y polinomios.",
    },
    {
      titulo: "Literatura Clásica",
      materia: "Lengua y Literatura",
      profesor: "Lic. Mario Rodríguez",
      descripcion:
        "Análisis y discusión de textos literarios clásicos de diversas culturas y épocas.",
    },
    {
      titulo: "Programación en Python",
      materia: "Informática",
      profesor: "Ing. Carla Ruiz",
      descripcion:
        "Introducción a la programación usando Python, cubriendo sintaxis, estructuras de datos y funciones.",
    },
    {
      titulo: "Biología Celular",
      materia: "Biología",
      profesor: "Dra. Laura Sánchez",
      descripcion:
        "Estudio de la estructura y función celular en organismos vivos.",
    },
    {
      titulo: "Química Orgánica",
      materia: "Química",
      profesor: "Dr. Ernesto Jiménez",
      descripcion:
        "Introducción a la química de compuestos orgánicos, incluyendo estructuras y reacciones principales.",
    },
    {
      titulo: "Historia del Arte",
      materia: "Historia",
      profesor: "Lic. Sofía Romero",
      descripcion:
        "Recorrido por las principales etapas y estilos en la historia del arte.",
    },
    {
      titulo: "Cálculo Diferencial",
      materia: "Matemáticas",
      profesor: "Prof. Alberto López",
      descripcion:
        "Conceptos básicos de cálculo diferencial, incluyendo límites, derivadas y aplicaciones.",
    },
    {
      titulo: "Redacción Académica",
      materia: "Lengua y Literatura",
      profesor: "Lic. Verónica Gil",
      descripcion:
        "Técnicas de redacción y estructura de textos académicos y ensayos.",
    },
    {
      titulo: "Física Mecánica",
      materia: "Física",
      profesor: "Ing. Luis Ramírez",
      descripcion:
        "Estudio de la mecánica clásica, centrado en movimiento, fuerzas y energía.",
    },
    {
      titulo: "Estadística Básica",
      materia: "Matemáticas",
      profesor: "Prof. Julia Torres",
      descripcion:
        "Introducción a conceptos estadísticos, distribución de datos y probabilidad.",
    },
    {
      titulo: "Economía Política",
      materia: "Ciencias Sociales",
      profesor: "Dr. Pedro Díaz",
      descripcion:
        "Análisis de las teorías y sistemas económicos y su impacto en la sociedad.",
    },
    {
      titulo: "Geometría Euclidiana",
      materia: "Matemáticas",
      profesor: "Prof. Manuel Cruz",
      descripcion:
        "Estudio de los fundamentos de la geometría, incluyendo ángulos, figuras y teoremas.",
    },
    {
      titulo: "Ética y Moral",
      materia: "Filosofía",
      profesor: "Dra. Carmen León",
      descripcion:
        "Exploración de principios éticos y dilemas morales en diversos contextos.",
    },
    {
      titulo: "Astronomía Básica",
      materia: "Ciencias Naturales",
      profesor: "Lic. Marta Fernández",
      descripcion:
        "Introducción al estudio de los cuerpos celestes y el universo.",
    },
    {
      titulo: "Psicología Social",
      materia: "Psicología",
      profesor: "Dr. Roberto Herrera",
      descripcion:
        "Estudio de cómo los pensamientos, sentimientos y comportamientos son influenciados por la presencia de otros.",
    },
    {
      titulo: "Ecología y Medio Ambiente",
      materia: "Ciencias Naturales",
      profesor: "Lic. Raúl Vargas",
      descripcion:
        "Estudio de los ecosistemas, relaciones bióticas y el impacto humano en el medio ambiente.",
    },
    {
      titulo: "Introducción al Marketing",
      materia: "Economía",
      profesor: "Prof. Daniela Moreno",
      descripcion:
        "Conceptos básicos de marketing, estrategias y análisis de mercado.",
    },
    {
      titulo: "Anatomía Humana",
      materia: "Biología",
      profesor: "Dra. Gabriela Ortiz",
      descripcion:
        "Estudio de la estructura del cuerpo humano y sus sistemas principales.",
    },
    {
      titulo: "Derecho Constitucional",
      materia: "Derecho",
      profesor: "Dr. Fernando Castillo",
      descripcion:
        "Examen de los principios, estructura y funcionamiento del sistema constitucional.",
    },
  ];

  return (
    <ProviderContext.Provider
      value={{
        activeItem,
        setActiveItem,
        menuItems,
        peliculas,
        tutorias,
        soliActived,
        setSoliActive,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};
