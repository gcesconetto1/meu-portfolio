import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, BriefcaseBusiness, CheckCircle2, ChevronRight, DollarSign, Filter, LineChart, Mail, Menu, PackageSearch, PieChart, ShieldCheck, Sparkles, UsersRound, X, Maximize2 } from "lucide-react";

const dashboards = [
  {
    id: "separadores",
    title: "Acompanhamento de Separadores",
    category: "Operações",
    icon: UsersRound,
    metric: "0,87% de erros",
    description:
      "Dashboard operacional para acompanhar pedidos separados, itens, erros, ranking de desempenho e evolução mensal da produtividade.",
    benefits: [
      "Identifica colaboradores de maior performance",
      "Monitora erros por tipo e por período",
      "Ajuda a reduzir falhas na separação e retrabalho",
    ],
    highlight: "Ideal para logística, expedição e centros de distribuição.",
    embedHtml: '<iframe title="Acompanhamento separadores" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiZmYwNjQ1MGMtMDQ4ZC00MmM0LWIzZDAtY2E4MWVjYmE1OTA0IiwidCI6IjZlYTY3Mjg3LTM4OTQtNDQ1YS1iMmIxLWVmYWI4MTNmMDM1NSJ9" frameborder="0" allowFullScreen="true"></iframe>'
  },
  {
    id: "fornecedores",
    title: "Análise de Fornecedores e Estoque",
    category: "Compras e Estoque",
    icon: PackageSearch,
    metric: "R$ 901 mil de impacto potencial",
    description:
      "Painel para avaliar impacto financeiro da falta de produtos, fornecedores críticos, baixo giro, capital parado e cubagem em estoque.",
    benefits: [
      "Mostra onde há risco de ruptura de estoque",
      "Aponta capital parado em produtos de baixo giro",
      "Apoia negociações e decisões de compra",
    ],
    highlight: "Transforma dados de estoque em decisões financeiras.",
    embedHtml: '<iframe title="Analise Fornecedores" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiZDA2MmQxZDItZTNkNy00MDYzLTliM2QtNGM5NTdmNWYwZWE3IiwidCI6IjZlYTY3Mjg3LTM4OTQtNDQ1YS1iMmIxLWVmYWI4MTNmMDM1NSJ9" frameborder="0" allowFullScreen="true"></iframe>'
  },
  {
    id: "fopag",
    title: "Folha de Pagamento e RH",
    category: "RH",
    icon: BriefcaseBusiness,
    metric: "Visão por filial e departamento",
    description:
      "Dashboard para acompanhar folha de pagamento, quantidade de funcionários, admissões, demissões e salário médio por área.",
    benefits: [
      "Facilita análise de custos por departamento",
      "Acompanha movimentações de pessoal no tempo",
      "Ajuda no planejamento de orçamento de RH",
    ],
    highlight: "Uma visão clara dos custos e movimentos de pessoal.",
    embedHtml: '<iframe title="Fopag" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiZmE1MzgzMzQtNTAxYS00ZWMwLWE2NDktNWU3NWI1Mzc4ODIxIiwidCI6IjZlYTY3Mjg3LTM4OTQtNDQ1YS1iMmIxLWVmYWI4MTNmMDM1NSJ9" frameborder="0" allowFullScreen="true"></iframe>'
  },
  {
    id: "financeiro",
    title: "Acompanhamento Financeiro",
    category: "Financeiro",
    icon: DollarSign,
    metric: "R$ 11,4 milhões analisados",
    description:
      "Painel financeiro para acompanhar despesas do mês, média histórica, variações por conta e distribuição dos gastos por grupo.",
    benefits: [
      "Destaca aumentos e reduções relevantes",
      "Organiza gastos por conta e grupo de despesa",
      "Ajuda a encontrar oportunidades de economia",
    ],
    highlight: "Mais controle para decisões financeiras rápidas.",
    embedHtml: '<iframe title="Teste Financeiro" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiOGY1ZmY4YWYtMTBjNi00ZTdmLWJkOGUtOGM1OWI3ODViZTU0IiwidCI6IjZlYTY3Mjg3LTM4OTQtNDQ1YS1iMmIxLWVmYWI4MTNmMDM1NSJ9" frameborder="0" allowFullScreen="true"></iframe>'
  },
];

const categories = ["Todos", ...Array.from(new Set(dashboards.map((item) => item.category)))];

function Badge({ children }) {
  return <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">{children}</span>;
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-7 text-slate-600">{subtitle}</p>}
    </div>
  );
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState(dashboards[0]);
  const [activeDashboardModal, setActiveDashboardModal] = useState(null);

  const filteredDashboards = useMemo(() => {
    if (selectedCategory === "Todos") return dashboards;
    return dashboards.filter((dashboard) => dashboard.category === selectedCategory);
  }, [selectedCategory]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <button onClick={() => scrollTo("inicio")} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-300">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold leading-none">Gustavo Cesconetto</p>
              <p className="text-xs text-slate-500">Power BI • Dados • Dashboards</p>
            </div>
          </button>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <button onClick={() => scrollTo("projetos")} className="hover:text-slate-950">Projetos</button>
            <button onClick={() => scrollTo("beneficios")} className="hover:text-slate-950">Benefícios</button>
            <button onClick={() => scrollTo("processo")} className="hover:text-slate-950">Processo</button>
            <button onClick={() => scrollTo("contato")} className="rounded-full bg-slate-950 px-5 py-2.5 text-white shadow-lg shadow-slate-200 hover:bg-slate-800 transition-colors">Solicitar orçamento</button>
          </nav>

          <button className="md:hidden p-2 text-slate-600" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
            <div className="grid gap-3 text-sm font-medium text-slate-700">
              <button onClick={() => scrollTo("projetos")} className="text-left py-2">Projetos</button>
              <button onClick={() => scrollTo("beneficios")} className="text-left py-2">Benefícios</button>
              <button onClick={() => scrollTo("processo")} className="text-left py-2">Processo</button>
              <button onClick={() => scrollTo("contato")} className="text-left py-2 font-bold text-sky-600">Contato</button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="inicio" className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_35%),radial-gradient(circle_at_top_right,#e0f2fe,transparent_30%)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge>Portfólio interativo de Power BI</Badge>
              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                Dashboards que transformam dados em decisões de negócio.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Desenvolvo painéis em Power BI para empresas que precisam acompanhar indicadores, reduzir custos, enxergar gargalos e tomar decisões com mais segurança.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => scrollTo("projetos")} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-6 py-4 font-semibold text-white shadow-xl shadow-sky-200 transition hover:bg-sky-700 hover:shadow-sky-300">
                  Ver dashboards <ChevronRight className="h-5 w-5" />
                </button>
                <button onClick={() => scrollTo("contato")} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 hover:border-slate-300">
                  Falar sobre meu projeto
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-[2rem] border border-white bg-white/80 p-4 shadow-2xl shadow-slate-200/50 backdrop-blur">
              <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white shadow-inner">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 font-medium tracking-wide">Visão executiva</p>
                    <p className="text-xl font-bold tracking-tight">Resumo de indicadores</p>
                  </div>
                  <Sparkles className="h-6 w-6 text-sky-400" />
                </div>
                <div className="grid gap-4">
                  {dashboards.map((dashboard) => {
                    const Icon = dashboard.icon;
                    return (
                      <button key={dashboard.id} onClick={() => setSelectedDashboard(dashboard)} className={`rounded-2xl p-4 text-left transition-all ${selectedDashboard.id === dashboard.id ? "bg-sky-500 shadow-md scale-[1.02]" : "bg-white/5 hover:bg-white/10"}`}>
                        <div className="flex items-center gap-4">
                          <div className={`rounded-xl p-3 ${selectedDashboard.id === dashboard.id ? "bg-white/20 text-white" : "bg-white/10 text-slate-300"}`}><Icon className="h-5 w-5" /></div>
                          <div>
                            <p className="font-bold text-white">{dashboard.title}</p>
                            <p className={`text-sm ${selectedDashboard.id === dashboard.id ? "text-sky-100 font-medium" : "text-slate-400"}`}>{dashboard.metric}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="projetos" className="mx-auto max-w-7xl px-5 py-20 bg-slate-50">
          <SectionTitle eyebrow="Projetos" title="Dashboards interativos" subtitle="Explore os painéis abaixo. Cada projeto foi estruturado para responder perguntas de negócio específicas e facilitar a análise de gestores." />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 mr-2">
              <Filter className="h-4 w-4" /> Filtrar:
            </span>
            {categories.map((category) => (
              <button 
                key={category} 
                onClick={() => setSelectedCategory(category)} 
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${selectedCategory === category ? "bg-slate-950 text-white shadow-md" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300"}`}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 flex justify-center"
          >
            <div className="inline-flex items-center gap-3 rounded-2xl bg-amber-50 border border-amber-200/60 px-5 py-3 text-sm text-amber-800 shadow-sm max-w-2xl">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <p>
                <strong>Aviso de Privacidade:</strong> Todos os dados apresentados nestes painéis são estritamente <strong>fictícios</strong>, elaborados exclusivamente para fins de demonstração.
              </p>
            </div>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
            {filteredDashboards.map((dashboard, index) => {
              const Icon = dashboard.icon;
              return (
                <motion.article 
                  key={dashboard.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }} 
                  transition={{ duration: 0.5, delay: index * 0.1 }} 
                  className="group flex flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl bg-sky-50 p-4 text-sky-600 ring-1 ring-sky-100 group-hover:bg-sky-100 transition-colors">
                      <Icon className="h-7 w-7" />
                    </div>
                    <Badge>{dashboard.category}</Badge>
                  </div>
                  <h3 className="mt-6 text-2xl font-black text-slate-950 tracking-tight">{dashboard.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600 flex-grow">{dashboard.description}</p>
                  
                  <div className="mt-6 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Indicador em destaque</p>
                    <p className="mt-1 text-xl font-black text-slate-950">{dashboard.metric}</p>
                  </div>
                  
                  <ul className="mt-6 grid gap-3.5">
                    {dashboard.benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-3 text-sm leading-6 text-slate-600">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" /> 
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <p className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/50 p-4 text-sm font-semibold text-sky-800 leading-relaxed">
                    {dashboard.highlight}
                  </p>

                  {dashboard.embedHtml && (
                    <button 
                      onClick={() => setActiveDashboardModal(dashboard)}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 font-semibold text-white shadow-md transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                    >
                      <Maximize2 className="h-4 w-4" />
                      Ver Dashboard Interativo
                    </button>
                  )}
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="beneficios" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-5">
            <SectionTitle eyebrow="Por que contratar" title="Mais do que gráficos: clareza para decidir" subtitle="Um bom dashboard reduz o tempo procurando informações e aumenta a velocidade das decisões da sua equipe." />
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                { icon: LineChart, title: "Indicadores sob controle", text: "Acompanhe metas, tendências, variações e gargalos em uma única visão centralizada." },
                { icon: PieChart, title: "Gestão visual e intuitiva", text: "Transforme planilhas complexas em painéis simples, organizados e fáceis de entender por qualquer gestor." },
                { icon: ShieldCheck, title: "Decisão com segurança", text: "Use dados reais para priorizar ações estratégicas, reduzir desperdícios e encontrar novas oportunidades." },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-[2rem] border border-slate-100 bg-slate-50 p-8 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 transition-all">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-md"><Icon className="h-6 w-6" /></div>
                    <h3 className="text-xl font-black text-slate-950 tracking-tight">{item.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="processo" className="mx-auto max-w-7xl px-5 py-24">
          <SectionTitle eyebrow="Como funciona" title="Processo simples para tirar seu BI do papel" subtitle="Do primeiro contato até o painel funcionando na sua empresa." />
          <div className="mt-16 grid gap-6 md:grid-cols-4">
            {[
              ["01", "Entendimento", "Mapeio suas necessidades, indicadores chaves (KPIs) e fontes de dados."],
              ["02", "Organização", "Estruturo e limpo os dados para análises confiáveis e consistentes no Power Query/SQL."],
              ["03", "Construção", "Crio o dashboard com DAX avançado, layout claro, filtros interativos e indicadores precisos."],
              ["04", "Entrega", "Apresento o painel finalizado e realizo ajustes finos conforme o uso da sua equipe."],
            ].map(([number, title, text], i) => (
              <motion.div key={number} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform translate-x-4 -translate-y-4">
                  <span className="text-8xl font-black">{number}</span>
                </div>
                <p className="text-sm font-bold text-sky-400 tracking-wider">Passo {number}</p>
                <h3 className="mt-4 text-2xl font-black tracking-tight">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300 relative z-10">{text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contato" className="px-5 pb-24 pt-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-slate-950 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] shadow-2xl md:p-4">
            <div className="grid items-center gap-12 rounded-[2.5rem] bg-gradient-to-br from-slate-950 to-sky-950 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-16">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-sky-400">Vamos conversar?</p>
                <h2 className="mt-5 text-3xl font-black tracking-tight md:text-5xl md:leading-[1.1] text-white">
                  Sua empresa pode tomar decisões melhores com Power BI.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                  Solicite um diagnóstico dos seus dados e veja como um dashboard customizado pode transformar sua operação, financeiro, estoque ou RH.
                </p>
              </div>
              <div className="rounded-[2rem] bg-white p-8 text-slate-950 shadow-xl">
                <h3 className="text-xl font-black tracking-tight">Contato</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">Pronto para dar o próximo passo? Me chame no WhatsApp ou copie o e-mail abaixo.</p>
                <div className="mt-6 grid gap-3">
                  <a href="https://wa.me/5527996523930?text=Olá%2C%20Gustavo!%20Vim%20pelo%20seu%20portfólio%20e%20gostaria%20de%20conversar." target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-6 py-4 font-semibold text-white transition hover:bg-sky-700 hover:shadow-md">
                    Chamar no WhatsApp
                  </a>
                  <div className="flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-100 bg-slate-50 px-6 py-4 text-slate-700">
                    <Mail className="h-5 w-5 text-slate-400" />
                    <span className="font-semibold text-sm sm:text-base select-all">gustavo.cesconetto@hotmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <AnimatePresence>
        {activeDashboardModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setActiveDashboardModal(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[1200px] rounded-[2rem] bg-white shadow-2xl overflow-hidden flex flex-col h-[90vh] md:h-[85vh]"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50 z-10 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-sky-100 p-2.5 text-sky-600 shadow-sm border border-sky-200/50">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-950 text-lg leading-tight">{activeDashboardModal.title}</h3>
                      <span className="hidden sm:inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 uppercase tracking-wider border border-amber-200/50">
                        Dados Fictícios
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-0.5">Modo de visualização interativa</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveDashboardModal(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors hover:text-slate-900 shrink-0"
                  aria-label="Fechar painel"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 w-full bg-slate-200 p-0 sm:p-4 md:p-6 overflow-hidden">
                <div className="w-full h-full sm:rounded-xl overflow-hidden shadow-sm border-0 sm:border border-slate-300 bg-white relative">
                  <div 
                    className="absolute inset-0 [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                    dangerouslySetInnerHTML={{ __html: activeDashboardModal.embedHtml }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}