import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Estética e Bem-Estar | Seu tempo de cuidar",
    template: "%s | Estética e Bem-Estar",
  },
  description:
    "Um espaço para o seu autocuidado: estética, bem-estar e informação para uma vida mais equilibrada.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
