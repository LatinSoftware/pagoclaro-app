import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, PieChart, Clock, ChevronRight, Users, CreditCard, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAF9] font-(family-name:--font-inter)">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-teal-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0D9488] flex items-center justify-center">
                <PieChart className="text-white w-5 h-5" />
              </div>
              <span className="font-(family-name:--font-outfit) font-bold text-2xl text-slate-900 tracking-tight">PagoClaro</span>
            </div>
            <nav className="hidden md:flex gap-8">
              <Link href="#features" className="text-slate-600 hover:text-[#0D9488] transition-colors font-medium">Funcionalidades</Link>
              <Link href="#how-it-works" className="text-slate-600 hover:text-[#0D9488] transition-colors font-medium">Cómo funciona</Link>
            </nav>
            <div className="flex gap-4">
              <button className="hidden sm:block px-5 py-2.5 text-[#0D9488] font-semibold hover:bg-teal-50 rounded-xl transition-colors">
                Iniciar Sesión
              </button>
              <button className="px-5 py-2.5 bg-[#0D9488] text-white font-semibold rounded-xl hover:bg-[#0f766e] shadow-sm shadow-teal-600/20 transition-all hover:-translate-y-0.5">
                Solicitar demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-center lg:text-left z-10">
            <h1 className="font-(family-name:--font-outfit) text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15] mb-6">
              Gestiona tus préstamos <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0D9488] to-[#10B981]">sin hojas de cálculo</span> ni caos.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              PagoClaro te permite registrar clientes, crear préstamos, controlar cuotas y dar seguimiento a la mora desde una plataforma moderna diseñada exclusivamente para prestamistas.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button className="w-full sm:w-auto px-8 py-4 bg-[#0D9488] text-white text-lg font-semibold rounded-2xl hover:bg-[#0f766e] shadow-lg shadow-teal-600/25 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                Empezar ahora <ChevronRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 text-lg font-semibold rounded-2xl hover:bg-slate-50 border border-slate-200 transition-all hover:-translate-y-1">
                Ver cómo funciona
              </button>
            </div>
            <p className="mt-6 text-sm text-slate-500 font-medium flex items-center justify-center lg:justify-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Hecho para prestamistas y cobradores que necesitan control real.
            </p>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-linear-to-tr from-teal-100 to-emerald-50 rounded-[40px] blur-3xl opacity-60"></div>
            <Image 
              src="/dashboard-mockup.png" 
              alt="Dashboard PagoClaro" 
              width={800}
              height={500}
              priority
              className="relative rounded-2xl border border-white/40 shadow-2xl shadow-teal-900/10 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Trust Blocks */}
      <section className="py-10 border-y border-teal-100 bg-white/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, text: "Clientes organizados" },
              { icon: CheckCircle2, text: "Pagos registrados con precisión" },
              { icon: ShieldCheck, text: "Cuotas bajo control total" },
              { icon: Clock, text: "Seguimiento de mora real" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4">
                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-[#0D9488]" />
                </div>
                <span className="font-semibold text-slate-700 leading-snug">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-(family-name:--font-outfit) text-4xl font-bold tracking-tight text-slate-900 mb-6">Todo lo que necesitas para gestionar préstamos</h2>
            <p className="text-xl text-slate-600">Deja atrás el desorden. Tienes todas las herramientas operativas en un solo lugar.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Gestión de clientes", desc: "Registra información clave de cada cliente, incluyendo contacto, dirección y foto de documentos." },
              { icon: Activity, title: "Creación de préstamos", desc: "Crea préstamos con sus condiciones, frecuencia, intereses y calendario automático de cuotas." },
              { icon: CreditCard, title: "Registro de pagos", desc: "Registra pagos fácilmente y mantén actualizado el balance pendiente sin volver a usar una calculadora." },
              { icon: Clock, title: "Seguimiento de cuotas", desc: "Visualiza cuotas pendientes, parciales o pagadas de un solo vistazo para actuar a tiempo." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#F8FAF9] border border-teal-50 hover:border-teal-200 transition-colors group">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-[#10B981]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-(family-name:--font-outfit)">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-24 px-4 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0D9488] rounded-full blur-[128px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-(family-name:--font-outfit) text-4xl font-bold tracking-tight mb-4">Empieza a usar PagoClaro en pocos pasos</h2>
            <p className="text-xl text-slate-400">Es tan simple que en 10 minutos tendrás tu cartera estructurada.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 text-center mt-12">
            {[
              { step: "1", title: "Registra tus clientes", desc: "Guarda la información esencial y organiza tu cartera operativa desde un solo lugar." },
              { step: "2", title: "Crea los préstamos", desc: "Define monto, interés, frecuencia y plazo en un formulario simple de menos de 1 minuto." },
              { step: "3", title: "Da seguimiento", desc: "Registra abonos, revisa cuotas vencidas y toma control total de tu cobranza diaria." }
            ].map((item, i) => (
               <div key={i} className="relative">
                 {i !== 2 && <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-linear-to-r from-[#10B981] to-transparent opacity-30"></div>}
                 <div className="w-16 h-16 rounded-full bg-[#0D9488] border-4 border-slate-900 mx-auto flex items-center justify-center text-2xl font-bold mb-6 relative z-10">
                   {item.step}
                 </div>
                 <h3 className="text-2xl font-bold mb-3 font-(family-name:--font-outfit)">{item.title}</h3>
                 <p className="text-slate-400">{item.desc}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-linear-to-br from-[#0D9488] to-[#10B981] rounded-[40px] p-12 text-center text-white shadow-2xl shadow-teal-900/20 relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNSkiLz48L3N2Zz4=')] opacity-50"></div>
           <div className="relative z-10">
             <h2 className="font-(family-name:--font-outfit) text-4xl md:text-5xl font-bold mb-6">Deja atrás el desorden operativo hoy</h2>
             <p className="text-xl text-teal-50 mb-10 max-w-2xl mx-auto">Únete a los prestamistas que ya están profesionalizando sus operaciones, evitando errores y cobrando mejor con PagoClaro.</p>
             <button className="px-10 py-5 bg-white text-[#0D9488] hover:bg-slate-50 text-xl font-bold rounded-2xl shadow-xl transition-transform hover:-translate-y-1">
               Solicitar tu demo gratis
             </button>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 rounded bg-[#0D9488] flex items-center justify-center">
                <PieChart className="text-white w-4 h-4" />
             </div>
             <span className="font-['Outfit'] font-bold text-xl text-slate-800 tracking-tight">PagoClaro</span>
          </div>
          <div className="flex gap-6 text-slate-500 font-medium text-sm">
            <Link href="#" className="hover:text-[#0D9488]">Términos Legales</Link>
            <Link href="#" className="hover:text-[#0D9488]">Privacidad</Link>
            <Link href="#" className="hover:text-[#0D9488]">Soporte</Link>
          </div>
          <div className="text-slate-400 text-sm">
            © {new Date().getFullYear()} PagoClaro. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
