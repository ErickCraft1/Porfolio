import arrowLeft from "../../public/svg/arrowLeft.svg";

export interface NavItem {
    title: string;
    label: string;
    url: string;
    icon?: astroHTML.JSX.Element;
}

export const navItemsIndex: NavItem[] = [
    {
        title: "Experiencia",
        label: "experiencia",
        url: "/#experiencia",
    },
    {
        title: "Proyectos",
        label: "proyectos",
        url: "/#proyectos",
    },
    {
        title: "Sobre mí",
        label: "sobre-mi",
        url: "/#sobre-mi",
    },
    {
        title: "Ejercicios",
        label: "ejercicios",
        url: "/#ejercicios",
    },
    {
        title: "Contacto",
        label: "contacto",
        url: "mailto:hola@erickdev.com",
    },
];

export const navItemsExercise: NavItem[] = [
    {
        title: "Inicio",
        label: "inicio",
        url: "/",
        icon: arrowLeft,
    }, {
        title: "Java",
        label: "java",
        url: "/#java",
    }, {
        title: "SQLite",
        label: "sqlite",
        url: "/#sqlite",
    }
]