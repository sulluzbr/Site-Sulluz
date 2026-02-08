/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { 
    ArrowRightIcon, 
    ArrowUpIcon, 
    GridIcon,
    CodeIcon,
    SparklesIcon
} from './components/Icons';

// --- Typewriter Effect Hook ---
const useTypewriter = (text: string, speed: number = 50, delay: number = 0) => {
    const [displayText, setDisplayText] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayText(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed, started]);

    return displayText;
};

// --- Intersection Observer Hook for Reveal Animations ---
const useReveal = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        const elements = document.querySelectorAll('.reveal-on-scroll');
        elements.forEach((el) => observer.observe(el));

        return () => elements.forEach((el) => observer.unobserve(el));
    }, []);
};

function App() {
    useReveal();
    const introText = useTypewriter("I'M ELMENCHO, A FREELANCE UI/UX DESIGNER WITH A PASSION FOR CRAFTING SEAMLESS AND ENGAGING DIGITAL EXPERIENCES.", 30, 1000);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className="noise-overlay"></div>
            
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 glass-nav py-5 px-6 md:px-12 flex justify-between items-center animate-fade-in">
                <div className="text-xl font-bold font-mono tracking-tighter hover:text-brand-accent transition-colors cursor-pointer" onClick={() => scrollToSection('hero')}>
                    ELMENCHOOO<span className="text-brand-accent">.</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-brand-gray">
                    {['SOBRE', 'PROCESSO', 'PORTFÓLIO', 'CONTATO'].map((item) => (
                        <button 
                            key={item} 
                            onClick={() => scrollToSection(item.toLowerCase().replace('ó', 'o'))}
                            className="hover:text-brand-white hover-underline-animation transition-colors"
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <button 
                    onClick={() => scrollToSection('contato')}
                    className="md:hidden text-brand-accent font-bold"
                >
                    MENU +
                </button>
            </nav>

            {/* Hero Section */}
            <header id="hero" className="relative min-h-screen flex flex-col pt-24 px-6 md:px-12 pb-12 overflow-hidden">
                {/* Top Meta Data */}
                <div className="flex justify-between items-start mb-8 text-xs md:text-sm font-mono text-brand-gray animate-slide-up" style={{animationDelay: '0.1s'}}>
                    <div>
                        <span className="text-brand-accent mr-2">Nº 004</span>
                        PORTFOLIO 2025
                    </div>
                    <div className="hidden md:block text-right">
                        CRAFTING SEAMLESS &<br />
                        ENGAGING DIGITAL EXPERIENCES <span className="text-brand-accent font-bold">+</span>
                    </div>
                </div>

                {/* Big Typo */}
                <div className="flex-grow flex flex-col justify-center relative z-10">
                    <h1 className="text-giant font-black tracking-tighter leading-none text-brand-white mix-blend-difference">
                        <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>NICE</div>
                        <div className="animate-slide-up flex items-center gap-4 md:gap-12" style={{animationDelay: '0.3s'}}>
                            <span>TO MEET</span>
                            <div className="h-4 w-4 md:h-8 md:w-8 bg-brand-accent rounded-full animate-pulse"></div>
                        </div>
                        <div className="animate-slide-up text-brand-accent" style={{animationDelay: '0.4s'}}>YOU</div>
                    </h1>
                </div>

                {/* Bottom Info */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mt-12 border-t border-white/10 pt-8">
                    <div className="md:col-span-2 text-brand-accent font-mono text-sm reveal-on-scroll">
                        2022 — PRESENT
                    </div>
                    
                    <div className="md:col-span-3 reveal-on-scroll">
                        <div className="w-full aspect-square bg-zinc-800 rounded-sm overflow-hidden relative group cursor-pointer">
                             <img 
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" 
                                alt="Profile" 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100" 
                             />
                             <div className="absolute inset-0 bg-brand-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                             <div className="absolute top-2 right-2 text-xs font-mono bg-black text-white px-2 py-1">EL</div>
                        </div>
                    </div>

                    <div className="md:col-span-4 reveal-on-scroll">
                        <p className="text-lg md:text-xl font-medium leading-relaxed uppercase max-w-md min-h-[120px]">
                            {introText}
                            <span className="typewriter-cursor"></span>
                        </p>
                    </div>

                    <div className="md:col-span-3 text-right font-mono text-xs text-brand-gray reveal-on-scroll">
                        <div className="flex flex-col items-end gap-1">
                            <span>SÃO PAULO, BR</span>
                            <span>34.0522° N</span>
                            <span>118.2437° W</span>
                        </div>
                    </div>
                </div>
                
                {/* Decorative Background Elements */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-1/2 bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none"></div>
            </header>

            {/* Philosophy / About Section */}
            <section id="sobre" className="py-24 md:py-32 px-6 md:px-12 border-t border-white/5 relative">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4">
                        <h2 className="text-sm font-mono text-brand-accent mb-4 reveal-on-scroll">01. MINHA FILOSOFIA</h2>
                        <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 reveal-on-scroll">
                            HUMAN<br/>CENTERED<br/>DESIGN
                        </h3>
                        <div className="w-16 h-1 bg-brand-accent reveal-on-scroll origin-left transition-transform duration-1000 hover:scale-x-150"></div>
                    </div>
                    <div className="md:col-span-8 flex flex-col gap-8 justify-center">
                        <p className="text-xl md:text-3xl font-light text-brand-gray leading-relaxed reveal-on-scroll">
                            Acredito que o design digital deve ser invisível. Não no sentido de não ser visto, mas de não ser um obstáculo. <span className="text-brand-white font-semibold">A interface perfeita é aquela que se dissolve</span>, deixando apenas a interação pura entre o usuário e seu objetivo.
                        </p>
                        <p className="text-lg md:text-xl font-light text-brand-gray reveal-on-scroll">
                            Combinando psicologia cognitiva, tipografia rigorosa e estética brutalista, crio sistemas que não apenas funcionam, mas provocam emoção e convertem visitantes em defensores da marca.
                        </p>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section id="processo" className="py-24 px-6 md:px-12 bg-brand-dark border-t border-white/5">
                <div className="mb-16 flex justify-between items-end reveal-on-scroll">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">O PROCESSO</h2>
                    <span className="font-mono text-brand-gray">WORKFLOW 2025</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { step: "01", title: "PESQUISA", desc: "Imersão total no problema, análise de concorrência e mapeamento de personas.", icon: <CodeIcon /> },
                        { step: "02", title: "IDEAÇÃO", desc: "Wireframes de baixa fidelidade, arquitetura da informação e user flows.", icon: <GridIcon /> },
                        { step: "03", title: "PROTOTIPAGEM", desc: "Design visual de alta fidelidade, sistemas de design e interações.", icon: <SparklesIcon /> },
                        { step: "04", title: "ENTREGA", desc: "Hand-off para desenvolvedores, QA visual e acompanhamento.", icon: <ArrowRightIcon /> },
                    ].map((item, index) => (
                        <div 
                            key={index} 
                            className="group p-8 border border-white/10 hover:border-brand-accent bg-brand-black transition-all duration-300 hover:-translate-y-2 reveal-on-scroll"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="flex justify-between items-start mb-12">
                                <span className="font-mono text-brand-accent text-sm">{item.step}</span>
                                <div className="text-brand-gray group-hover:text-brand-accent transition-colors">
                                    {item.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                            <p className="text-brand-gray text-sm leading-relaxed">{item.desc}</p>
                            <div className="mt-8 w-full h-[1px] bg-white/10 relative overflow-hidden">
                                <div className="absolute inset-0 bg-brand-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Selected Work */}
            <section id="portfolio" className="py-24 px-6 md:px-12 border-t border-white/5">
                <h2 className="text-sm font-mono text-brand-accent mb-12 reveal-on-scroll">02. TRABALHO SELECIONADO</h2>
                
                <div className="grid grid-cols-1 gap-24">
                    {[
                        { 
                            id: 1, 
                            title: "NEOBANK DASHBOARD", 
                            cat: "FINTECH / UI DESIGN", 
                            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
                            year: "2024"
                        },
                        { 
                            id: 2, 
                            title: "AERO E-COMMERCE", 
                            cat: "RETAIL / UX RESEARCH", 
                            image: "https://images.unsplash.com/photo-1481480746802-32b7994ec486?q=80&w=2072&auto=format&fit=crop",
                            year: "2023"
                        },
                        { 
                            id: 3, 
                            title: "CULTURAL ARCHIVE", 
                            cat: "ART / WEB DESIGN", 
                            image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop",
                            year: "2023"
                        }
                    ].map((project, index) => (
                        <div key={project.id} className="group relative reveal-on-scroll">
                            <div className="flex flex-col md:flex-row gap-8 items-end mb-4 md:mb-8 border-b border-white/10 pb-4">
                                <h3 className="text-3xl md:text-5xl font-bold md:w-2/3 group-hover:text-brand-accent transition-colors">{project.title}</h3>
                                <div className="flex justify-between w-full md:w-1/3 font-mono text-sm text-brand-gray">
                                    <span>{project.cat}</span>
                                    <span>{project.year}</span>
                                </div>
                            </div>
                            
                            <div className="project-card w-full h-[40vh] md:h-[70vh] relative cursor-pointer">
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0" 
                                />
                                <div className="overlay absolute inset-0 bg-brand-accent/10 flex items-center justify-center backdrop-blur-[2px]">
                                    <div className="bg-brand-black text-white px-6 py-3 rounded-full font-mono text-sm border border-white/20 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        VER CASE <ArrowRightIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact / Footer */}
            <footer id="contato" className="bg-brand-white text-brand-black pt-24 pb-8 overflow-hidden relative">
                <div className="px-6 md:px-12 mb-24">
                    <h2 className="text-sm font-mono text-brand-accent mb-8 font-bold">03. VAMOS CONVERSAR?</h2>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <div className="max-w-2xl">
                            <h3 className="text-4xl md:text-7xl font-bold tracking-tight mb-8">
                                TEM UM PROJETO<br/>EM MENTE?
                            </h3>
                            <a 
                                href="mailto:hello@elmenchooo.design" 
                                className="text-2xl md:text-4xl border-b-2 border-brand-black hover:border-brand-accent hover:text-brand-accent transition-colors pb-2 inline-flex items-center gap-4"
                            >
                                hello@elmenchooo.design
                                <ArrowRightIcon />
                            </a>
                        </div>

                        <div className="flex flex-col gap-4 font-mono text-lg">
                            {['LINKEDIN', 'BEHANCE', 'INSTAGRAM', 'TWITTER'].map(social => (
                                <a key={social} href="#" className="hover:text-brand-accent hover:translate-x-2 transition-all flex items-center gap-2">
                                    {social} <span className="text-xs">↗</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Marquee Footer */}
                <div className="w-full bg-brand-black text-brand-white py-4 font-mono text-xs md:text-sm uppercase whitespace-nowrap overflow-hidden border-t border-brand-black flex">
                    <div className="animate-marquee flex gap-8 min-w-full">
                        {Array(10).fill("©2025 ELMENCHOOO // DESIGN DRIVEN //").map((text, i) => (
                            <span key={i} className="opacity-70">{text}</span>
                        ))}
                    </div>
                    <div className="animate-marquee flex gap-8 min-w-full absolute top-4 left-full">
                        {Array(10).fill("©2025 ELMENCHOOO // DESIGN DRIVEN //").map((text, i) => (
                            <span key={i} className="opacity-70">{text}</span>
                        ))}
                    </div>
                </div>
            </footer>
        </>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<React.StrictMode><App /></React.StrictMode>);
}
