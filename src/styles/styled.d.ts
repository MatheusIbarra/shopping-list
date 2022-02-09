import "styled-componets/native";

declare module "styled-components/native" {
    export interface DefaultTheme {
        /** nome do tema */ name: string;
        /** Light: Azul */ primary: string;
        /** Verde */ secundary: string;
        /** Vermelho */ tertiary: string;
        /** Cinza */ quartenary: string;
        /** Light: Branco, Dark: Preto */ background: string;
        /** BRANCO */ text: string;
    }
}
