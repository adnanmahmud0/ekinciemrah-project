import { Nunito_Sans, Playball } from "next/font/google";

export const nunitoSans = Nunito_Sans({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-nunito-sans",
    display: "swap",
});

export const playball = Playball({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-playball",
    display: "swap",
});
