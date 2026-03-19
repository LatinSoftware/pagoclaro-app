"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, PieChart, Clock, ChevronRight, Users, CreditCard, Activity, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-(family-name:--font-inter) text-slate-100 overflow-x-hidden selection:bg-teal-500/30">
      
      {/* Epic Ambient Effects (Aura) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-600/20 blur-[150px] rounded-full mix-blend-screen"></div>
         <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-emerald-600/10 blur-[150px] rounded-full mix-blend-screen"></div>
         <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] bg-[#0f766e]/20 blur-[200px] rounded-full mix-blend-screen"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/60 backdrop-blur-2xl border-b border-teal-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-teal-400 to-teal-700 p-[1px]">
                  <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                    <PieChart className="text-teal-400 w-5 h-5 shadow-teal-400 drop-shadow-md" />
                  </div>
              </div>
              <span className="font-(family-name:--font-outfit) font-bold text-2xl tracking-tight text-white">PagoClaro</span>
            </motion.div>
            <nav className="hidden md:flex gap-8">
              <Link href="#features" className="text-slate-300 hover:text-teal-300 transition-colors font-medium">Core Engine</Link>
              <Link href="#how-it-works" className="text-slate-300 hover:text-teal-300 transition-colors font-medium">Architecture</Link>
            </nav>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex gap-4">
              <Link href="/login" className="hidden sm:flex px-5 py-2.5 text-teal-300 font-semibold hover:bg-teal-950/50 rounded-xl transition-colors items-center">
                Iniciar Sesión
              </Link>
              <button className="px-6 py-2.5 bg-linear-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all hover:-translate-y-0.5 relative group overflow-hidden">
                <span className="absolute inset-0 bg-white/20 blur-md group-hover:opacity-100 opacity-0 transition-opacity"></span>
                <span className="relative z-10">Solicitar Acceso</span>
              </button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-36 md:pb-32 px-4 z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer} 
            className="lg:w-[45%] text-center lg:text-left z-20"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-950/50 border border-teal-500/20 text-teal-300 text-sm font-medium mb-8 backdrop-blur-md">
              <Sparkles className="w-4 h-4" /> La plataforma premium para prestamistas
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-(family-name:--font-outfit) text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-white">
              Sistemas de control que <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 via-emerald-400 to-teal-400 bg-[length:200%_auto] animate-pulse">inspiran confianza.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed font-light">
              Abandona el desorden. PagoClaro proporciona la infraestructura visual y operativa definitiva para gestionar préstamos, proyecciones de cobro y mora con una claridad absoluta.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 text-lg font-bold rounded-2xl hover:bg-slate-100 shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all flex items-center justify-center gap-2 group">
                Explorar Dashboard <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-teal-950/40 text-teal-300 border border-teal-500/30 text-lg font-medium rounded-2xl hover:bg-teal-900/50 backdrop-blur-md transition-all">
                Ver Arquitectura
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="lg:w-[55%] relative perspective-1000 z-10"
          >
            <div className="absolute inset-0 bg-linear-to-tr from-teal-500/20 to-emerald-500/10 rounded-[40px] blur-[100px]"></div>
            
            <motion.div 
              animate={{ y: [-10, 10, -10] }} 
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_80px_rgba(13,148,136,0.3)] bg-slate-900/50 backdrop-blur-sm"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-teal-400 to-transparent opacity-50"></div>
              <Image 
                src="/epic-dashboard.png" 
                alt="PagoClaro Epic Dashboard Component" 
                width={1200}
                height={800}
                priority
                className="w-full h-auto object-cover opacity-90 mix-blend-screen"
                layout="responsive"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Stats HUD */}
      <section className="relative z-20 py-10 border-y border-white/5 bg-slate-950/50 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
             className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { label: "Cartera Visualizada", value: "Control Total" },
              { label: "Seguridad Infraestructura", value: "Módulos SSL" },
              { label: "Tiempo Administrativo", value: "-75% Caos" },
              { label: "Cobros a Tiempo", value: "Máxima Visibilidad" }
            ].map((stat, i) => (
              <motion.div variants={fadeInUp} key={i} className="flex flex-col items-center lg:items-start p-4">
                <span className="text-3xl font-bold font-(family-name:--font-outfit) text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-400">{stat.value}</span>
                <span className="text-sm font-medium text-slate-500 mt-2 tracking-wide uppercase">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Power Features Deck */}
      <section id="features" className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-(family-name:--font-outfit) text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Un ecosistema diseñado para la eficiencia operativa.</h2>
            <p className="text-xl text-slate-400 font-light">Hemos reemplazado la complejidad abrumadora por interfaces intuitivas, rápidas y repletas del aura tecnológica que tu negocio merece.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Base de Datos de Clientes", desc: "Indexa a cada cliente con tarjetas flotantes y búsqueda en tiempo real.", glow: "from-blue-500/20" },
              { icon: Activity, title: "Algoritmo de Préstamos", desc: "Amortizaciones y calendarios generados automáticamente en milisegundos.", glow: "from-teal-500/20" },
              { icon: CreditCard, title: "Reconciliación de Pagos", desc: "Registra cobros y observa cómo los indicadores de progreso se llenan de vida.", glow: "from-emerald-500/20" },
              { icon: Clock, title: "Radar de Riesgo (Mora)", desc: "Módulos de alerta temprana que identifican cuotas retrasadas inmediatamente.", glow: "from-orange-500/20" },
              { icon: ShieldCheck, title: "Seguridad Activa", desc: "Datos encriptados y permisos por niveles para que tu capital siempre esté seguro.", glow: "from-purple-500/20" },
              { icon: PieChart, title: "Analytics Nivel SaaS", desc: "Dashboards de salud del negocio que rivalizan con sistemas financieros corporativos.", glow: "from-cyan-500/20" }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`p-8 rounded-[32px] bg-slate-900/40 border border-white/5 hover:border-teal-500/30 transition-colors group relative overflow-hidden backdrop-blur-xl`}
              >
                <div className={`absolute -top-24 -right-24 w-48 h-48 bg-linear-to-br ${feature.glow} to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all">
                  <feature.icon className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-100 mb-3 font-(family-name:--font-outfit) relative z-10">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed font-light relative z-10">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating UI Presentation Matrix / How it Works */}
      <section id="how-it-works" className="relative z-10 py-32 px-4 border-t border-white/5 bg-slate-950/80">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-teal-500/5 blur-[200px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-24">
             <h2 className="font-(family-name:--font-outfit) text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">Domina el flujo operativo</h2>
             <p className="text-xl text-slate-500 font-light">Interfaces premium convertidas en una experiencia operativa perfecta.</p>
           </motion.div>

           <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Clients Shot */}
              <motion.div 
                 initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                 className="order-2 md:order-1 relative"
              >
                  <motion.div animate={{ y: [-15, 15, -15] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }} className="relative z-10 rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-teal-500/20">
                     <Image src="/epic-clients.png" alt="Clients Interface" width={600} height={400} className="w-full mix-blend-screen opacity-90" />
                  </motion.div>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="order-1 md:order-2">
                 <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-teal-500/30 flex items-center justify-center text-teal-400 text-3xl font-bold font-(family-name:--font-outfit) mb-8 shadow-[0_0_30px_rgba(20,184,166,0.2)]">1</div>
                 <h3 className="text-3xl font-bold mb-4 font-(family-name:--font-outfit) text-white">Central de Clientes</h3>
                 <p className="text-xl text-slate-400 font-light leading-relaxed">Olvídate de buscar datos. Cada cliente vive en una tarjeta inteligente interactiva que muestra su puntaje de riesgo, préstamos activos e historial en un segundo.</p>
              </motion.div>
           </div>

           <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center mt-32">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                 <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-3xl font-bold font-(family-name:--font-outfit) mb-8 shadow-[0_0_30px_rgba(16,185,129,0.2)]">2</div>
                 <h3 className="text-3xl font-bold mb-4 font-(family-name:--font-outfit) text-white">Telemetría de Pagos</h3>
                 <p className="text-xl text-slate-400 font-light leading-relaxed">Monitorea el estatus de las cuotas con marcadores visuales que actúan como indicadores vitales de tu negocio. Si una métrica cambia de arcoíris verde a naranja, es hora de actuar.</p>
              </motion.div>
              
              <motion.div 
                 initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                 className="relative"
              >
                  <motion.div animate={{ y: [15, -15, 15] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="relative z-10 w-[60%] mx-auto rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-emerald-500/20 bg-slate-900">
                     <Image src="/epic-payments.png" alt="Payments Interface" width={400} height={600} className="w-full mix-blend-screen opacity-90" />
                  </motion.div>
                  {/* Decorative Elements */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-white/5 rounded-[40px] transform -rotate-6"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-emerald-500/10 rounded-[50px] transform rotate-3"></div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* Epic Conversion Final CTA */}
      <section className="relative z-20 py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[40px] p-12 md:p-20 text-center overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-3xl"
          >
             {/* Epic Core Glow */}
             <div className="absolute inset-0 bg-linear-to-b from-teal-500/10 to-transparent"></div>
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-linear-to-b from-teal-500/20 to-transparent blur-[80px]"></div>
             
             <div className="relative z-10">
               <ShieldCheck className="w-16 h-16 text-teal-400 mx-auto mb-8 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]" />
               <h2 className="font-(family-name:--font-outfit) text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight">Eleva el status de tu operación.</h2>
               <p className="text-xl text-slate-300 font-light mb-12 max-w-2xl mx-auto">Deja atrás las libretas, los Excels y la fricción. Ingresa a la nueva era del control financiero directo y seguro.</p>
               <button className="px-12 py-5 bg-white text-slate-950 hover:bg-slate-200 text-xl font-bold rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all hover:scale-105">
                 Acceder a la Plataforma Virtual
               </button>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Minimalist Tech Style */}
      <footer className="relative z-10 border-t border-white/5 bg-slate-950 py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
             <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center">
                <PieChart className="text-white w-4 h-4" />
             </div>
             <span className="font-(family-name:--font-outfit) font-bold text-xl text-white tracking-tight">PagoClaro</span>
          </div>
          <div className="flex gap-8 text-slate-500 font-medium text-sm">
            <Link href="#" className="hover:text-teal-400 transition-colors">Termometría Legal</Link>
            <Link href="#" className="hover:text-teal-400 transition-colors">Cifrado de Privacidad</Link>
            <Link href="#" className="hover:text-teal-400 transition-colors">Soporte Técnico</Link>
          </div>
          <div className="text-slate-600 text-sm font-mono">
            SYS.VERSION 2026 // PagoClaro
          </div>
        </div>
      </footer>
    </div>
  );
}
