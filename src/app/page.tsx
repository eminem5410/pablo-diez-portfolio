"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Globe,
  Database,
  ShoppingCart,
  Layers,
  Rocket,
  MessageSquare,
  Target,
  Headphones,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Menu,
  X,
  Github,
  Linkedin,
  Code2,
  Monitor,
  Server,
  Smartphone,
  ChevronDown,
} from "lucide-react";

/* ── WhatsApp Config ── */
const WA_NUMBER = "5492255576773";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Hola%20Pablo%2C%20me%20interesa%20tu%20servicio%20de%20desarrollo%20web`;
const LINKEDIN = "https://www.linkedin.com/in/pablo-diez-4717a33ba/";

/* ── Intersection Observer Hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/* ── Animated Section Wrapper ── */
function AnimatedSection({
  children,
  className = "",
  animation = "animate-fade-in-up",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  animation?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useInView();
  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animation : "opacity-0"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Tech Badge ── */
function TechBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
      {name}
    </span>
  );
}

/* ════════════════════════════════════════════
   NAVBAR
   ════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Servicios", href: "#servicios" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Sobre mi", href: "#sobre-mi" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050a18]/90 backdrop-blur-xl border-b border-cyan-400/10 shadow-lg shadow-cyan-900/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                Pablo Diez
              </span>
              <span className="hidden sm:block text-[10px] text-slate-400 -mt-1">
                Full Stack Developer
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-slate-300 hover:text-cyan-300 transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 text-[#050a18] text-sm font-semibold hover:bg-cyan-400 transition-all duration-200 shadow-lg shadow-cyan-500/20"
            >
              Contactar
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-6 pt-2 border-t border-slate-800 animate-fade-in">
            <div className="flex flex-col gap-4 mt-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-slate-300 hover:text-cyan-300 transition-colors px-2 py-1"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-cyan-500 text-[#050a18] text-sm font-semibold mt-2"
              >
                Contactar por WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a18]/60 via-[#050a18]/80 to-[#050a18]" />
      </div>

      {/* Floating elements */}
      <div className="absolute top-32 right-20 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl animate-float hidden lg:block" />
      <div
        className="absolute bottom-40 left-10 w-48 h-48 rounded-full bg-violet-500/5 blur-3xl animate-float hidden lg:block"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 text-cyan-300 text-sm border border-cyan-400/15 mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Disponible para nuevos proyectos
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            Soluciones{" "}
            <span className="gradient-text">digitales</span>
            <br />
            a medida para tu negocio
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg text-slate-400 max-w-xl mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Diseño y desarrollo de sitios web profesionales, sistemas de gestión
            y plataformas SaaS que optimizan procesos, mejoran resultados e
            impulsan el crecimiento de tu empresa.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 text-[#050a18] font-bold text-base hover:bg-cyan-400 transition-all duration-200 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 animate-pulse-glow"
            >
              Hablemos de tu proyecto
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#proyectos"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-slate-600 text-slate-300 font-semibold text-base hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-200"
            >
              Ver proyectos
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          {/* Tech stack */}
          <div
            className="flex flex-wrap gap-2 animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Node.js",
              "Tailwind CSS",
              "PostgreSQL",
              "Prisma",
            ].map((t) => (
              <TechBadge key={t} name={t} />
            ))}
          </div>
        </div>

        {/* Hero visual - floating cards */}
        <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col gap-4">
          <div className="glass-card rounded-2xl p-4 w-64 animate-fade-in-up animate-float" style={{ animationDelay: "500ms" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Proyecto entregado</p>
                <p className="text-xs text-slate-400">FG Repuestos de Motos</p>
              </div>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="bg-emerald-400 h-2 rounded-full w-full" />
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4 w-64 animate-fade-in-up animate-float ml-12" style={{ animationDelay: "800ms" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center">
                <Layers className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">SaaS Platform</p>
                <p className="text-xs text-slate-400">ContaFlow en producción</p>
              </div>
            </div>
            <div className="flex gap-2">
              <TechBadge name="Docker" />
              <TechBadge name="React" />
              <TechBadge name="API" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   SERVICES
   ════════════════════════════════════════════ */
const services = [
  {
    icon: Globe,
    title: "Páginas Web Profesionales",
    desc: "Sitios modernos, rápidos y optimizados para todos los dispositivos. Landing pages, sitios corporativos y blogs con diseño a medida.",
    features: ["Diseño a medida", "100% Responsive", "SEO optimizado", "Rendimiento A+"],
  },
  {
    icon: Database,
    title: "Sistemas de Gestión",
    desc: "Desarrollo de sistemas web a medida para controlar y optimizar tu negocio. Inventario, ventas, clientes y reportes en un solo lugar.",
    features: ["Paneles administrativos", "Control de datos", "Reportes y estadísticas", "Usuarios y permisos"],
  },
  {
    icon: ShoppingCart,
    title: "Tiendas Online",
    desc: "E-commerce completos y seguros para vender tus productos en internet. Catálogo, carrito, pagos y gestión de pedidos integrados.",
    features: ["Catálogo de productos", "Carrito de compras", "Pasarelas de pago", "Gestión de pedidos"],
  },
  {
    icon: Layers,
    title: "Plataformas SaaS",
    desc: "Diseño y desarrollo de productos SaaS completos: desde la arquitectura del sistema hasta la interfaz de usuario, con escalabilidad incluida.",
    features: ["Arquitectura escalable", "Multi-tenant", "APIs RESTful", "Despliegue automatizado"],
  },
];

function Services() {
  return (
    <section id="servicios" className="py-20 md:py-28 relative">
      <div className="section-divider mb-20" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-sm font-medium text-cyan-400 uppercase tracking-widest">
            Servicios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            ¿Qué puedo hacer por tu proyecto?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Cada negocio es diferente. Ofrezco soluciones personalizadas
            adaptadas a las necesidades específicas de tu empresa, utilizando
            las mejores tecnologías del mercado.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <AnimatedSection
              key={s.title}
              delay={i * 100}
              animation={i % 2 === 0 ? "animate-slide-left" : "animate-slide-right"}
            >
              <div className="glass-card rounded-2xl p-6 md:p-8 h-full transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 group">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/15 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-400/20 transition-colors">
                    <s.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {s.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400/70 flex-shrink-0" />
                      <span className="text-xs text-slate-300">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   VALUE PROPOSITIONS
   ════════════════════════════════════════════ */
const values = [
  {
    icon: Rocket,
    title: "Entrega en tiempo",
    desc: "Compromiso y cumplimiento en cada entrega.",
  },
  {
    icon: MessageSquare,
    title: "Comunicación constante",
    desc: "Te acompaño en cada etapa del proyecto.",
  },
  {
    icon: Target,
    title: "Enfoque en resultados",
    desc: "Soluciones que generan valor real.",
  },
  {
    icon: Headphones,
    title: "Soporte y mantenimiento",
    desc: "Acompañamiento continuo post-entrega.",
  },
];

function ValueProps() {
  return (
    <section className="py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 100}>
              <div className="text-center p-4 md:p-6">
                <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/15 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{v.title}</h4>
                <p className="text-xs text-slate-400">{v.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   PROJECTS
   ════════════════════════════════════════════ */
const projects = [
  {
    title: "FG Repuestos de Motos",
    subtitle: "Sistema de gestión integral",
    desc: "Plataforma completa de gestión para un local de repuestos de motocicletas. Incluye control de inventario en tiempo real, registro de ventas y compras, base de clientes, dashboard con indicadores clave y reportes estadísticos. Desarrollado con Next.js, Tailwind CSS y Zustand, desplegado en Vercel.",
    image: "/fg-motos-project.png",
    tags: ["Next.js", "Tailwind CSS", "Zustand", "Vercel"],
    liveUrl: "https://fg-repuestos-motos.vercel.app",
    features: [
      "Dashboard con KPIs en tiempo real",
      "Gestión completa de inventario",
      "Sistema de punto de venta",
      "Reportes y estadísticas",
      "Notificaciones en tiempo real",
      "Autenticación segura con JWT",
    ],
  },
  {
    title: "ContaFlow",
    subtitle: "Plataforma SaaS de gestión contable",
    desc: "Sistema contable multi-usuario diseñado como producto SaaS. Arquitectura escalable con Docker, React en el frontend y API REST en Node.js. Gestión de facturación, libros contables, reportes financieros y administración de usuarios con roles y permisos granulares.",
    image: "/contaflow-project.png",
    tags: ["React", "Node.js", "Docker", "PostgreSQL", "SaaS"],
    features: [
      "Arquitectura multi-tenant SaaS",
      "Facturación electrónica",
      "Libros contables automatizados",
      "Roles y permisos por usuario",
      "API RESTful completa",
      "Despliegue Dockerizado",
    ],
  },
];

function Projects() {
  return (
    <section id="proyectos" className="py-20 md:py-28 relative">
      <div className="section-divider mb-20" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-sm font-medium text-cyan-400 uppercase tracking-widest">
            Proyectos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            Casos de éxito reales
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Proyectos en producción que demuestran la calidad y compromiso con
            cada entrega. No son prototipos: son sistemas que se usan todos los
            días.
          </p>
        </AnimatedSection>

        <div className="space-y-16">
          {projects.map((p, i) => (
            <AnimatedSection
              key={p.title}
              animation={i % 2 === 0 ? "animate-slide-left" : "animate-slide-right"}
            >
              <div className="glass-card rounded-2xl overflow-hidden group">
                {/* Project Image */}
                <div className="relative h-56 md:h-72 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1222] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-[#050a18]/80 text-cyan-300 border border-cyan-400/20 backdrop-blur-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-cyan-500/90 text-[#050a18] hover:bg-cyan-400 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Ver en vivo
                    </a>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6 md:p-8">
                  <div className="mb-4">
                    <p className="text-xs font-medium text-cyan-400 uppercase tracking-wider mb-1">
                      {p.subtitle}
                    </p>
                    <h3 className="text-2xl font-bold text-white">{p.title}</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {p.desc}
                  </p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-xs text-slate-300">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   ABOUT
   ════════════════════════════════════════════ */
function About() {
  const skills = [
    { icon: Monitor, label: "Frontend" },
    { icon: Server, label: "Backend" },
    { icon: Database, label: "Bases de datos" },
    { icon: Smartphone, label: "Responsive" },
    { icon: Layers, label: "SaaS" },
    { icon: Globe, label: "Deploy" },
  ];

  return (
    <section id="sobre-mi" className="py-20 md:py-28 relative">
      <div className="section-divider mb-20" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-sm font-medium text-cyan-400 uppercase tracking-widest">
            Sobre mí
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            ¿Quién está detrás del código?
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="glass-card rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-4xl md:text-5xl font-black text-white shadow-xl shadow-cyan-500/20">
                  PD
                </div>
              </div>

              {/* Bio */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-1">
                  Pablo Diez
                </h3>
                <p className="text-cyan-400 font-medium mb-4">
                  Full Stack Developer
                </p>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Desarrollador web especializado en la creación de aplicaciones
                  modernas, sistemas de gestión y plataformas SaaS. Me
                  apasiona transformar ideas en productos digitales funcionales
                  que resuelvan problemas reales y generen valor para los
                  negocios. Cada proyecto lo abordo con compromiso profesional,
                  comunicación constante y foco en los resultados.
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {skills.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-xs text-slate-300"
                    >
                      <s.icon className="w-3.5 h-3.5 text-cyan-400" />
                      {s.label}
                    </div>
                  ))}
                </div>

                {/* Social */}
                <div className="flex gap-3 mt-6 justify-center md:justify-start">
                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 transition-all"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   CONTACT
   ════════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contacto" className="py-20 md:py-28 relative">
      <div className="section-divider mb-20" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="glass-card rounded-2xl p-8 md:p-16 text-center max-w-3xl mx-auto relative overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Hablemos de tu proyecto
              </h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
                Estoy listo para ayudarte a llevar tu idea al siguiente nivel.
                Cuéntame qué necesitas y te presento una propuesta sin
                compromiso.
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-emerald-500 text-white font-bold text-base hover:bg-emerald-400 transition-all duration-200 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp: 2255-576773
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-xs text-slate-500 mt-4">
                Consultas sin compromiso · Respuesta rápida
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="py-8 border-t border-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-slate-400">
              <span className="text-white font-semibold">Pablo Diez</span>{" "}
              · Full Stack Developer
            </span>
          </div>
          <p className="text-xs text-slate-600">
            &lt;/&gt; Tecnología + Diseño + Funcionalidad = Soluciones que
            impulsan tu negocio
          </p>
          <div className="flex items-center gap-4">
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-cyan-400 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-emerald-400 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════
   FLOATING WHATSAPP BUTTON
   ════════════════════════════════════════════ */
function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:bg-emerald-400 hover:scale-110 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      aria-label="Contactar por WhatsApp"
    >
      <svg
        className="w-7 h-7"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

/* ════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════ */
export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#050a18] text-foreground">
      <Navbar />
      <Hero />
      <Services />
      <ValueProps />
      <Projects />
      <About />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
