"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  PieChart,
  ShieldCheck,
  Sparkles,
  Users,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.16 } },
};

type CardItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
};

const navigation = [
  { label: "Funcionalidades", href: "#features" },
  { label: "Como funciona", href: "#how-it-works" },
  { label: "Beneficios", href: "#benefits" },
  { label: "FAQ", href: "#faq" },
];

const trustHighlights: CardItem[] = [
  {
    icon: Users,
    title: "Clientes organizados",
    description: "Centraliza fichas, contacto e historial en un solo lugar.",
    accent: "from-cyan-500/20",
  },
  {
    icon: CreditCard,
    title: "Pagos registrados",
    description: "Mantiene balances y abonos al dia con mas precision.",
    accent: "from-teal-500/20",
  },
  {
    icon: Clock,
    title: "Cuotas bajo control",
    description: "Consulta rapido lo pendiente, pagado o vencido.",
    accent: "from-emerald-500/20",
  },
  {
    icon: Activity,
    title: "Seguimiento de atrasos",
    description: "Detecta mora y prioriza mejor la cobranza.",
    accent: "from-orange-500/20",
  },
];

const features: CardItem[] = [
  {
    icon: Users,
    title: "Gestion de clientes",
    description: "Registra contacto, ubicacion y documentos por cliente.",
    accent: "from-cyan-500/20",
  },
  {
    icon: Activity,
    title: "Control de prestamos",
    description: "Define monto, interes, frecuencia y calendario de cuotas.",
    accent: "from-teal-500/20",
  },
  {
    icon: CreditCard,
    title: "Registro de pagos",
    description: "Actualiza cada deuda con pagos completos o parciales.",
    accent: "from-emerald-500/20",
  },
  {
    icon: Clock,
    title: "Seguimiento de cuotas",
    description: "Visualiza cuotas pendientes, pagadas y vencidas.",
    accent: "from-orange-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Control de mora",
    description: "Identifica atrasos y cuanto falta por cobrar.",
    accent: "from-sky-500/20",
  },
  {
    icon: PieChart,
    title: "Visibilidad operativa",
    description: "Consulta el estado financiero de la cartera.",
    accent: "from-lime-500/20",
  },
];

const benefits = [
  {
    title: "Mas orden en tu cartera",
    description: "Clientes, prestamos, cuotas y pagos viven en el mismo flujo.",
  },
  {
    title: "Mejor seguimiento",
    description: "Sabes con rapidez que se pago, que falta y que esta vencido.",
  },
  {
    title: "Menos trabajo manual",
    description: "Reduce la dependencia de Excel, notas sueltas y revisiones repetidas.",
  },
  {
    title: "Mas profesionalismo",
    description: "Gestiona tu operacion con una herramienta clara y confiable.",
  },
];

const steps = [
  {
    step: "1",
    title: "Registra tus clientes",
    description: "Guarda la informacion esencial y organiza tu cartera desde el inicio.",
  },
  {
    step: "2",
    title: "Crea los prestamos",
    description: "Define monto, interes, frecuencia y plazo segun tu operacion.",
  },
  {
    step: "3",
    title: "Da seguimiento a los pagos",
    description: "Consulta balances, cuotas vencidas y cobros registrados.",
  },
];

const faqItems = [
  {
    question: "¿PagoClaro otorga prestamos?",
    answer:
      "No. PagoClaro es una plataforma para gestionar operaciones de prestamos, pagos y cobranzas.",
  },
  {
    question: "¿Para quien esta hecho?",
    answer:
      "Para prestamistas y equipos de cobranza que necesitan mas orden y visibilidad operativa.",
  },
  {
    question: "¿Puedo controlar pagos parciales y cuotas vencidas?",
    answer:
      "Si. La propuesta del producto contempla pagos parciales, balances, cuotas y seguimiento de mora.",
  },
  {
    question: "¿Necesito conocimientos tecnicos para usarlo?",
    answer:
      "No. La experiencia esta pensada para una operacion real, con lenguaje claro y flujos simples.",
  },
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 font-(family-name:--font-inter) text-slate-100 selection:bg-teal-500/30">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-teal-600/20 blur-[150px] mix-blend-screen" />
        <div className="absolute right-[-10%] top-[20%] h-[60%] w-[40%] rounded-full bg-emerald-600/10 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[20%] h-[50%] w-[60%] rounded-full bg-[#0f766e]/20 blur-[200px] mix-blend-screen" />
      </div>

      <header className="sticky top-0 z-50 border-b border-teal-900/40 bg-slate-950/60 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="#top" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-linear-to-br from-teal-400 to-teal-700 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950">
                  <PieChart className="h-5 w-5 text-teal-400 drop-shadow-md" />
                </div>
              </div>
              <span className="font-(family-name:--font-outfit) text-2xl font-bold tracking-tight text-white">
                PagoClaro
              </span>
            </Link>
          </motion.div>

          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-teal-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <Link
              href="/login"
              className="hidden items-center rounded-xl px-4 py-2 font-semibold text-teal-300 transition-colors hover:bg-teal-950/50 md:flex sm:px-5 sm:py-2.5"
            >
              Iniciar sesion
            </Link>
            <Link
              href="#contact"
              className="hidden items-center rounded-xl bg-linear-to-r from-teal-500 to-emerald-500 px-4 py-2 text-sm font-bold text-slate-950 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] md:flex sm:px-5 sm:py-2.5 sm:text-base"
            >
              Solicitar demo
            </Link>
            <button 
              className="flex p-2 text-slate-300 hover:text-white md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-0 top-full w-full border-b border-teal-900/40 bg-slate-950/95 p-4 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-300 transition-colors hover:text-teal-300"
                >
                  {item.label}
                </Link>
              ))}
              <div className="my-2 h-px w-full bg-white/10" />
              <Link
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl bg-linear-to-r from-teal-500 to-emerald-500 px-4 py-3 text-center text-base font-bold text-slate-950 transition-all"
              >
                Solicitar demo
              </Link>
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl border border-teal-500/20 bg-teal-950/30 px-4 py-3 text-center text-base font-semibold text-teal-300 transition-colors hover:text-teal-400"
              >
                Iniciar sesion
              </Link>
            </nav>
          </motion.div>
        )}
      </header>

      <main id="top" className="relative z-10">
        <section className="px-4 pb-16 pt-24 md:pb-24 md:pt-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_1.08fr] lg:gap-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center lg:text-left"
            >
              <motion.div
                variants={fadeInUp}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-950/50 px-4 py-2 text-sm font-medium text-teal-300 backdrop-blur-md"
              >
                <Sparkles className="h-4 w-4" />
                Hecho para prestamistas y equipos de cobranza
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="mb-8 font-(family-name:--font-outfit) text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl"
              >
                Gestiona tus prestamos sin{" "}
                <span className="bg-linear-to-r from-teal-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  hojas de calculo ni caos.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mb-10 text-lg leading-relaxed text-slate-400 md:text-xl"
              >
                PagoClaro te ayuda a registrar clientes, crear prestamos,
                controlar cuotas, registrar pagos y dar seguimiento a la mora
                desde una plataforma simple y moderna.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col items-stretch gap-4 sm:flex-row sm:justify-center lg:justify-start"
              >
                <Link
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-slate-950 shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all hover:bg-slate-100"
                >
                  Solicitar demo
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-2xl border border-teal-500/30 bg-teal-950/40 px-8 py-4 text-lg font-medium text-teal-300 transition-all hover:bg-teal-900/50"
                >
                  Ver como funciona
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500 lg:justify-start"
              >
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                Acceso coordinado con el equipo.
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-[40px] bg-linear-to-tr from-teal-500/20 to-emerald-500/10 blur-[100px]" />
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/55 shadow-[0_24px_90px_rgba(13,148,136,0.28)] backdrop-blur-sm"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-400 to-transparent opacity-60" />
                <Image
                  src="/epic-dashboard.png"
                  alt="Dashboard principal de PagoClaro"
                  width={1200}
                  height={800}
                  priority
                  className="h-auto w-full object-cover opacity-90 mix-blend-screen"
                />
              </motion.div>

              <div className="absolute -left-4 bottom-8 max-w-[220px] rounded-3xl border border-white/10 bg-slate-900/80 p-4 shadow-[0_20px_50px_rgba(2,6,23,0.55)] backdrop-blur-xl md:-left-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
                  Operacion clara
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Cartera, pagos recientes y proximas cuotas en una sola vista.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-slate-950/55 py-10 backdrop-blur-3xl">
          <div className="mx-auto max-w-7xl px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
            >
              {trustHighlights.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/35 p-6 backdrop-blur-xl"
                >
                  <div
                    className={`absolute -right-12 -top-12 h-28 w-28 rounded-full bg-linear-to-br ${item.accent} to-transparent blur-3xl`}
                  />
                  <div className="relative z-10">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/70">
                      <item.icon className="h-5 w-5 text-teal-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="features" className="px-4 py-28 md:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="mx-auto mb-16 max-w-3xl text-center md:mb-20"
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-teal-300">
                Funcionalidades
              </p>
              <h2 className="font-(family-name:--font-outfit) text-4xl font-bold tracking-tight text-white md:text-5xl">
                Todo lo que necesitas para gestionar prestamos con claridad.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-400 md:text-xl">
                Conoce las herramientas disenadas especificamente para darte el
                control total de tu operacion.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer}
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  className="group relative overflow-hidden rounded-[30px] border border-white/5 bg-slate-900/40 p-8 backdrop-blur-xl transition-colors hover:border-teal-500/25"
                >
                  <div
                    className={`absolute -right-20 -top-20 h-44 w-44 rounded-full bg-linear-to-br ${feature.accent} to-transparent opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100`}
                  />
                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-slate-800/80 transition-all group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(20,184,166,0.25)]">
                      <feature.icon className="h-6 w-6 text-teal-400" />
                    </div>
                    <h3 className="font-(family-name:--font-outfit) text-2xl font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section
          id="benefits"
          className="relative overflow-hidden border-t border-white/5 bg-slate-950/75 px-4 py-28 md:py-32"
        >
          <div className="absolute left-1/2 top-1/2 h-96 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/5 blur-[180px]" />

          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.p
                variants={fadeInUp}
                className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-teal-300"
              >
                Beneficios y enfoque
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-(family-name:--font-outfit) text-4xl font-bold tracking-tight text-white md:text-5xl"
              >
                Pensado para la operacion real de un prestamista.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400"
              >
                Una plataforma seria, moderna y practica para administrar tu
                cartera, registrar pagos y realizar cobranzas con absoluto
                orden.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                className="mt-10 grid gap-4 sm:grid-cols-2"
              >
                {benefits.map((benefit) => (
                  <motion.div
                    key={benefit.title}
                    variants={fadeInUp}
                    className="rounded-3xl border border-white/5 bg-slate-900/45 p-6 backdrop-blur-xl"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/70">
                      <CheckCircle2 className="h-5 w-5 text-teal-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/50 shadow-[0_20px_70px_rgba(2,6,23,0.45)] backdrop-blur-xl">
                <Image
                  src="/epic-clients.png"
                  alt="Vista de clientes en PagoClaro"
                  width={900}
                  height={640}
                  className="h-auto w-full object-cover opacity-90 mix-blend-screen"
                />
              </div>

              <div className="rounded-[32px] border border-white/10 bg-slate-900/55 p-8 backdrop-blur-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
                  Diferenciadores
                </p>
                <h3 className="mt-4 font-(family-name:--font-outfit) text-2xl font-bold text-white">
                  Menos improvisacion, mas control del dia a dia.
                </h3>
                <div className="mt-6 space-y-4">
                  {[
                    "Manejo claro de cuotas y vencimientos.",
                    "Registro de pagos parciales sin perder el balance.",
                    "Seguimiento de atrasos por cliente.",
                    "Menos dependencia de Excel y notas manuales.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" />
                      <p className="text-sm leading-relaxed text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="how-it-works" className="px-4 py-28 md:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="mx-auto mb-16 max-w-3xl text-center"
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-teal-300">
                Como funciona
              </p>
              <h2 className="font-(family-name:--font-outfit) text-4xl font-bold tracking-tight text-white md:text-5xl">
                Empieza a usar PagoClaro en pocos pasos.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-400">
                Organiza a tus clientes, crea prestamos y da seguimiento a los
                pagos sin friccion ni curvas de aprendizaje complejas.
              </p>
            </motion.div>

            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="space-y-5"
              >
                {steps.map((step) => (
                  <motion.div
                    key={step.step}
                    variants={fadeInUp}
                    className="rounded-[30px] border border-white/5 bg-slate-900/45 p-6 backdrop-blur-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-500/30 bg-slate-900 text-2xl font-bold text-teal-400 shadow-[0_0_25px_rgba(20,184,166,0.18)]">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-(family-name:--font-outfit) text-2xl font-bold text-white">
                          {step.title}
                        </h3>
                        <p className="mt-3 leading-relaxed text-slate-400">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="relative"
              >
                <div className="absolute inset-0 rounded-[40px] bg-linear-to-tr from-emerald-500/15 to-teal-500/5 blur-[80px]" />
                <motion.div
                  animate={{ y: [12, -12, 12] }}
                  transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
                  className="relative mx-auto max-w-md overflow-hidden rounded-[34px] border border-emerald-500/20 bg-slate-900 shadow-[0_30px_90px_rgba(0,0,0,0.65)]"
                >
                  <Image
                    src="/epic-payments.png"
                    alt="Vista de pagos y cuotas en PagoClaro"
                    width={500}
                    height={760}
                    className="h-auto w-full opacity-90 mix-blend-screen"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-slate-950/70 px-4 py-28 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="absolute inset-0 rounded-[40px] bg-linear-to-tr from-teal-500/15 to-emerald-500/10 blur-[90px]" />
              <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-slate-900/55 shadow-[0_24px_80px_rgba(2,6,23,0.5)] backdrop-blur-xl">
                <Image
                  src="/dashboard-mockup.png"
                  alt="Mockup operativo de PagoClaro"
                  width={1400}
                  height={900}
                  className="h-auto w-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.p
                variants={fadeInUp}
                className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-teal-300"
              >
                Visibilidad operativa
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-(family-name:--font-outfit) text-4xl font-bold tracking-tight text-white md:text-5xl"
              >
                Visualiza tu operacion de forma clara.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mt-6 text-lg leading-relaxed text-slate-400"
              >
                Obten visibilidad instantanea sobre tu cartera, revisa pagos
                recientes y anticipa tus proximos cobros desde un unico panel.
              </motion.p>

              <motion.div variants={staggerContainer} className="mt-8 space-y-4">
                {[
                  "Vista general de prestamos y balances.",
                  "Pagos recientes con lectura inmediata.",
                  "Proximos vencimientos para anticipar la cobranza.",
                  "Clientes con atraso y actividad operativa reciente.",
                ].map((item) => (
                  <motion.div
                    key={item}
                    variants={fadeInUp}
                    className="flex items-start gap-3 rounded-2xl border border-white/5 bg-slate-900/45 px-4 py-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" />
                    <p className="text-sm leading-relaxed text-slate-300">{item}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="faq" className="px-4 py-28 md:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="mx-auto mb-16 max-w-3xl text-center"
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-teal-300">
                FAQ
              </p>
              <h2 className="font-(family-name:--font-outfit) text-4xl font-bold tracking-tight text-white md:text-5xl">
                Preguntas frecuentes
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-400">
                Resolvemos tus dudas principales para que des el paso hacia una
                gestion mas profesional de tus prestamos.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="grid gap-6 md:grid-cols-2"
            >
              {faqItems.map((item) => (
                <motion.div
                  key={item.question}
                  variants={fadeInUp}
                  className="rounded-[30px] border border-white/5 bg-slate-900/45 p-8 backdrop-blur-xl"
                >
                  <p className="text-lg font-semibold text-white">{item.question}</p>
                  <p className="mt-3 leading-relaxed text-slate-400">{item.answer}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="contact" className="px-4 pb-24 pt-6 md:pb-32">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-[40px] border border-white/10 bg-slate-900/45 p-10 text-center backdrop-blur-3xl md:p-16"
            >
              <div className="absolute inset-0 bg-linear-to-b from-teal-500/12 to-transparent" />
              <div className="absolute left-1/2 top-0 h-72 w-full -translate-x-1/2 bg-linear-to-b from-teal-500/18 to-transparent blur-[80px]" />

              <div className="relative z-10">
                <ShieldCheck className="mx-auto mb-8 h-16 w-16 text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]" />
                <h2 className="font-(family-name:--font-outfit) text-4xl font-bold tracking-tight text-white md:text-6xl">
                  ¿Te interesa conocer PagoClaro?
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
                  Controla tu operacion de prestamos con mas claridad y menos
                  trabajo manual. Da el siguiente paso hacia la
                  profesionalizacion de tu negocio hoy mismo.
                </p>

                <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row">
                  <button
                    type="button"
                    className="rounded-2xl bg-white px-10 py-4 text-lg font-bold text-slate-950 shadow-[0_0_40px_rgba(255,255,255,0.18)] transition-all hover:scale-[1.02] hover:bg-slate-100"
                  >
                    Solicitar demo
                  </button>
                  <Link
                    href="/login"
                    className="rounded-2xl border border-teal-500/30 bg-teal-950/40 px-10 py-4 text-lg font-medium text-teal-300 transition-all hover:bg-teal-900/50"
                  >
                    Iniciar sesion
                  </Link>
                </div>

                <p className="mt-5 text-sm text-slate-500">
                  Acceso coordinado con el equipo. Si ya tienes cuenta, puedes
                  entrar directamente.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 bg-slate-950 px-4 py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-slate-800">
                <PieChart className="h-4 w-4 text-white" />
              </div>
              <span className="font-(family-name:--font-outfit) text-xl font-bold tracking-tight text-white">
                PagoClaro
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              PagoClaro es una plataforma tecnologica para la gestion de
              prestamos y cobranzas. No otorga creditos directamente.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-500">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-teal-400"
              >
                {item.label}
              </Link>
            ))}
            <Link href="#contact" className="transition-colors hover:text-teal-400">
              Contacto
            </Link>
          </div>

          <div className="text-sm font-mono text-slate-600">
            SYS.VERSION 2026 // PagoClaro
          </div>
        </div>
      </footer>
    </div>
  );
}
