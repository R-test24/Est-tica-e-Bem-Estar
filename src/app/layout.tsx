import { SessionProvider } from "@/components/session-provider";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Estética e Bem-Estar | Autocuidado em todas as fases",
    template: "%s | Estética e Bem-Estar",
  },
  description:
    "Informações educativas sobre estética, saúde mental, prevenção e envelhecimento saudável para cultivar o autocuidado em todas as fases da vida.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <SessionProvider>
          <Header />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
