import Link from "next/link";
import { Leaf } from "lucide-react";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <Link className="brand" href="/">
              <Leaf aria-hidden="true" />
              <span>
                Estética <i>&</i> Bem-Estar
              </span>
            </Link>
            <p>Mais equilíbrio. Mais cuidado. Mais você.</p>
          </div>
          <nav aria-label="Navegação do rodapé">
            <Link href="/conteudos">Conteúdos</Link>
            <Link href="/apoio">Onde encontrar apoio</Link>
            <Link href="/cadastro">Criar conta</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Estética e Bem-Estar.</p>
          <p>Conteúdo educativo. Não substitui orientação profissional.</p>
        </div>
        <p className="support-note">
          Precisa de apoio emocional? CVV: <a href="tel:188">188</a>, gratuito,
          24 horas. Em uma emergência, procure atendimento de urgência ou ligue{" "}
          <a href="tel:192">192</a>.
        </p>
      </div>
    </footer>
  );
}
