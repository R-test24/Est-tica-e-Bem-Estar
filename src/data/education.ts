export const themes = [
  {
    id: "estetica",
    label: "Estética e autoestima",
    icon: "sparkles",
    description:
      "Cuidados com a pele e uma relação mais gentil com a própria imagem.",
  },
  {
    id: "saude-mental",
    label: "Saúde mental",
    icon: "sun",
    description: "Acolhimento, descanso e caminhos para buscar apoio.",
  },
  {
    id: "prevencao",
    label: "Prevenção",
    icon: "heart",
    description:
      "Informação, escolhas possíveis e acompanhamento profissional.",
  },
  {
    id: "envelhecimento",
    label: "Envelhecimento saudável",
    icon: "leaf",
    description: "Autonomia, vínculos e qualidade de vida ao longo dos anos.",
  },
] as const;
export type ThemeId = (typeof themes)[number]["id"];
export const stages = [
  "Todas as fases",
  "Juventude",
  "Vida adulta",
  "Pessoa idosa",
] as const;
export type Stage = (typeof stages)[number];
type Guide = {
  slug: string;
  theme: ThemeId;
  title: string;
  summary: string;
  stages: Stage[];
  sections: { title: string; text: string }[];
  steps: string[];
  sources: { label: string; url: string }[];
};
const mentalSource = {
  label: "OMS — Saúde mental (em inglês)",
  url: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
};
const ageingSource = {
  label: "OMS — Envelhecimento e saúde (em inglês)",
  url: "https://www.who.int/news-room/fact-sheets/detail/ageing-and-health",
};
const movementSource = {
  label: "OMS — Atividade física (em inglês)",
  url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
};
export const guides: Guide[] = [
  {
    slug: "pele-e-autocuidado",
    theme: "estetica",
    title: "Cuidar da pele sem buscar perfeição",
    summary:
      "Uma rotina possível começa com respeito à sua pele, ao seu tempo e à sua individualidade.",
    stages: ["Todas as fases"],
    sections: [
      {
        title: "Aparência não define saúde",
        text: "Texturas, marcas e mudanças fazem parte da diversidade dos corpos. Uma rotina de autocuidado pode trazer conforto, mas não precisa perseguir padrões de beleza ou promessas de transformação.",
      },
      {
        title: "Proteção no cotidiano",
        text: "Sombra, roupas adequadas e proteção solar fazem parte dos cuidados com a exposição ao sol. A escolha de produtos deve considerar as características da pele e orientação profissional, especialmente quando há irritação ou condições já diagnosticadas.",
      },
      {
        title: "Quando procurar orientação",
        text: "Mudanças persistentes, feridas que não cicatrizam ou reações após o uso de produtos merecem avaliação por um profissional de saúde. Evite receitas caseiras agressivas e não use medicamentos por conta própria.",
      },
    ],
    steps: [
      "Observe quais cuidados trazem conforto, sem comparar sua aparência.",
      "Planeje proteção para os momentos de exposição ao sol.",
      "Anote dúvidas para uma consulta; fotos e testes online não substituem avaliação.",
    ],
    sources: [
      {
        label: "INCA — Prevenção do câncer de pele",
        url: "https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/pele-nao-melanoma",
      },
    ],
  },
  {
    slug: "autoestima-na-juventude",
    theme: "estetica",
    title: "Autoestima além dos filtros",
    summary:
      "Comparações nas redes podem tornar a relação com a imagem mais difícil. Você não precisa enfrentar isso sozinho.",
    stages: ["Juventude"],
    sections: [
      {
        title: "Imagens contam apenas uma parte",
        text: "Filtros, iluminação e edição influenciam o que aparece nas redes. Comparar o próprio cotidiano com imagens selecionadas pode aumentar a cobrança por uma aparência ideal.",
      },
      {
        title: "Escolha um ambiente mais acolhedor",
        text: "Perceba como você se sente ao acompanhar determinados perfis. Fazer pausas e escolher conteúdos diversos pode ajudar a diminuir comparações. O valor de uma pessoa não depende da aparência nem da aprovação nas redes.",
      },
      {
        title: "Converse sobre o que incomoda",
        text: "Se preocupações com a imagem estiverem prejudicando alimentação, relações ou atividades diárias, procure um profissional de saúde. Na juventude, uma pessoa adulta de confiança pode ajudar a encontrar esse apoio.",
      },
    ],
    steps: [
      "Faça uma pausa de um perfil que aumenta sua autocrítica.",
      "Reconheça algo que você valoriza em si além da aparência.",
      "Converse com alguém de confiança sobre como se sente.",
    ],
    sources: [mentalSource],
  },
  {
    slug: "pausa-e-saude-mental",
    theme: "saude-mental",
    title: "Uma pausa também é cuidado",
    summary:
      "Reconhecer limites e construir uma rede de apoio são partes do autocuidado emocional.",
    stages: ["Todas as fases"],
    sections: [
      {
        title: "Perceba o seu ritmo",
        text: "Sentimentos difíceis podem surgir em diferentes fases da vida. Observar sono, disposição e relações ajuda a perceber quando algo mudou, sem usar essas observações para fazer um diagnóstico.",
      },
      {
        title: "Pequenos espaços de descanso",
        text: "Uma pausa, uma conversa ou uma atividade prazerosa podem trazer acolhimento. Essas escolhas devem caber na sua realidade e não substituem psicoterapia, acompanhamento médico ou outros cuidados quando necessários.",
      },
      {
        title: "Buscar ajuda é um cuidado",
        text: "Quando o sofrimento é frequente ou interfere na rotina, procure uma UBS ou um profissional de saúde mental. Não é preciso esperar chegar ao limite para pedir apoio. Em situações de risco imediato, procure um serviço de urgência.",
      },
    ],
    steps: [
      "Escolha uma pausa possível no seu dia.",
      "Pense em uma pessoa com quem você pode conversar.",
      "Consulte a página de apoio para conhecer caminhos de atendimento.",
    ],
    sources: [
      mentalSource,
      { label: "CVV — Apoio emocional", url: "https://cvv.org.br/" },
    ],
  },
  {
    slug: "rede-de-apoio",
    theme: "saude-mental",
    title: "Conexões que ajudam a atravessar a rotina",
    summary:
      "Vínculos e escuta respeitosa podem apoiar o bem-estar em momentos de mudança.",
    stages: ["Vida adulta", "Pessoa idosa"],
    sections: [
      {
        title: "Cada rede tem um formato",
        text: "Amigos, familiares, vizinhos, grupos comunitários e profissionais podem fazer parte de uma rede de apoio. O importante é que as relações tenham respeito, escuta e espaço para diferenças.",
      },
      {
        title: "Aproximar-se aos poucos",
        text: "Uma conversa breve ou a participação em uma atividade do bairro pode ser um começo. Nem todo vínculo será próximo; respeite seus limites e evite ambientes em que você se sinta desrespeitado ou inseguro.",
      },
      {
        title: "Apoio não é cobrança",
        text: "Oferecer companhia pode ajudar, mas ninguém precisa resolver o sofrimento do outro sozinho. Se houver sofrimento persistente, busque orientação na rede de saúde. Solidão não é falha pessoal.",
      },
    ],
    steps: [
      "Retome contato com alguém com quem se sente à vontade.",
      "Conheça uma atividade comunitária acessível a você.",
      "Ao escutar alguém, evite julgamentos e promessas de solução.",
    ],
    sources: [mentalSource, ageingSource],
  },
  {
    slug: "prevencao-no-cotidiano",
    theme: "prevencao",
    title: "Prevenção começa com informação",
    summary:
      "Acompanhamento de saúde e escolhas cotidianas podem caminhar juntos, sem excesso de exames ou promessas.",
    stages: ["Todas as fases"],
    sections: [
      {
        title: "Conheça seu acompanhamento",
        text: "A prevenção envolve vacinação, condições de vida e acesso ao cuidado. Na UBS, uma equipe pode orientar quais ações fazem sentido para sua idade, histórico e necessidades.",
      },
      {
        title: "Mais exames nem sempre são melhores",
        text: "Exames e rastreamentos têm indicações, benefícios e limites. Converse com um profissional antes de seguir listas de check-up encontradas na internet. Não há um pacote único adequado para todas as pessoas.",
      },
      {
        title: "Informação merece verificação",
        text: "Desconfie de produtos com garantia de cura e de mensagens que criam urgência para comprar. Prefira instituições de saúde e profissionais habilitados; não interrompa tratamentos por conteúdos online.",
      },
    ],
    steps: [
      "Confira sua caderneta de vacinação com uma unidade de saúde.",
      "Leve dúvidas sobre acompanhamento para a próxima consulta.",
      "Verifique a origem de uma informação antes de compartilhá-la.",
    ],
    sources: [
      {
        label: "Ministério da Saúde — Vacinação",
        url: "https://www.gov.br/saude/pt-br/vacinacao",
      },
    ],
  },
  {
    slug: "movimento-possivel",
    theme: "prevencao",
    title: "Movimento que cabe na sua vida",
    summary:
      "Há diferentes formas de se movimentar. O começo pode ser simples e respeitar suas possibilidades.",
    stages: ["Juventude", "Vida adulta", "Pessoa idosa"],
    sections: [
      {
        title: "Não existe um único jeito",
        text: "Caminhar, dançar, brincar e atividades adaptadas são exemplos de movimento. As possibilidades dependem de acesso, preferências e condições pessoais. Evite comparar seu ritmo com o de outras pessoas.",
      },
      {
        title: "Comece com o que é possível",
        text: "Escolher uma atividade agradável pode tornar a rotina mais sustentável. As recomendações variam por idade e condição de saúde; busque orientação para adaptar a prática, especialmente diante de limitações ou sintomas.",
      },
      {
        title: "Respeite sinais e limites",
        text: "Dor importante, mal-estar ou desconforto durante uma atividade não devem ser ignorados. Interrompa e procure orientação conforme a situação. Este guia não prescreve exercícios, intensidade ou metas clínicas.",
      },
    ],
    steps: [
      "Escolha uma forma de movimento que você aprecie.",
      "Pense em um local acessível e seguro.",
      "Registre na sua área apenas os cuidados que fizeram sentido hoje.",
    ],
    sources: [movementSource],
  },
  {
    slug: "envelhecer-com-autonomia",
    theme: "envelhecimento",
    title: "Envelhecer com autonomia e participação",
    summary:
      "O envelhecimento é diverso. Cuidado, acessibilidade e respeito ajudam a sustentar a qualidade de vida.",
    stages: ["Pessoa idosa", "Vida adulta"],
    sections: [
      {
        title: "Cada trajetória é singular",
        text: "Pessoas da mesma idade podem ter necessidades e desejos diferentes. Envelhecer não elimina projetos, relações ou o direito de participar das decisões sobre a própria vida.",
      },
      {
        title: "Cuidar também é adaptar o ambiente",
        text: "Iluminação, circulação livre e acesso a serviços podem facilitar atividades cotidianas. Converse sobre adaptações com a pessoa envolvida e com profissionais, respeitando suas preferências.",
      },
      {
        title: "Mudanças merecem atenção",
        text: "Dificuldades novas ou persistentes nas atividades diárias merecem avaliação. Não atribua automaticamente sofrimento, dor ou alterações importantes apenas à idade. A UBS pode orientar o acompanhamento.",
      },
    ],
    steps: [
      "Escolha uma atividade que gostaria de continuar ou retomar.",
      "Observe uma barreira de acesso no seu cotidiano.",
      "Converse sobre decisões de cuidado com respeito à autonomia.",
    ],
    sources: [ageingSource],
  },
  {
    slug: "convivencia-entre-geracoes",
    theme: "envelhecimento",
    title: "Aprender e conviver em todas as idades",
    summary:
      "Trocas entre gerações valorizam histórias e ampliam oportunidades de participação.",
    stages: ["Todas as fases"],
    sections: [
      {
        title: "Trocas sem estereótipos",
        text: "Pessoas de diferentes idades têm experiências a compartilhar. Evite supor habilidades, interesses ou limitações apenas pela idade. Escutar preferências é um começo para relações mais respeitosas.",
      },
      {
        title: "Participação com acessibilidade",
        text: "Leitura, arte, tecnologia e atividades comunitárias podem aproximar pessoas. Considere barreiras de mobilidade, comunicação e acesso digital para que a participação seja uma escolha real.",
      },
      {
        title: "Valorize a continuidade",
        text: "Uma atividade compartilhada pode criar oportunidades de vínculo, sem impor obrigações ou substituir serviços de cuidado. Respeite disponibilidade, privacidade e vontade de cada pessoa.",
      },
    ],
    steps: [
      "Convide alguém para trocar uma habilidade ou história.",
      "Pergunte qual formato de atividade é mais confortável.",
      "Inclua pessoas de diferentes idades nas decisões do grupo.",
    ],
    sources: [ageingSource],
  },
];
