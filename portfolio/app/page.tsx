"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Smartphone, Code2, Layers3, Radio, Database, Github, Linkedin, Mail, Menu, X, Search } from "lucide-react";
type PortfolioProject = {
  number: string;
  name: string;
  category: string;
  summary: string;
  stack: string[];
  tone: string;
  liveUrl?: string | null;
  liveLabel?: string | null;
  screenshot?: string | null;
};
const projects: PortfolioProject[] = [
  {
    number: "01", name: "Photo Background Remover", category: "IMAGE UTILITY",
    summary: "A Python utility for removing image backgrounds and exploring practical image-processing workflows.",
    stack: ["Python","Image Processing"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/photo_bg_remover",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/photo_bg_remover"
  },
  {
    number: "02", name: "Passport Photo AI", category: "AI IMAGE TOOL",
    summary: "A Python project exploring AI-assisted passport-photo preparation and image workflows.",
    stack: ["Python","AI","Image Processing"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/passport_photo_ai",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/passport_photo_ai"
  },
  {
    number: "03", name: "Learning Management System", category: "EDUCATION · WEB APP",
    summary: "A Django-based learning management system project for education-oriented workflows and server-rendered pages.",
    stack: ["Python","Django","Web"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/learning_management_system",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/learning_management_system"
  },
  {
    number: "04", name: "Login UI", category: "MOBILE UI",
    summary: "A Flutter UI project focused on login and password-recovery screens.",
    stack: ["Flutter","Dart","UI Design"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/login-ui",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/login-ui"
  },
  {
    number: "05", name: "Django Todo API", category: "REST API",
    summary: "A Django API practice project for task-oriented endpoints and data operations.",
    stack: ["Python","Django","REST API"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/django_todo_api_test",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/django_todo_api_test"
  },
  {
    number: "06", name: "Donation Club", category: "DONATION MANAGEMENT",
    summary: "A PHP web application project for donation-club workflows.",
    stack: ["PHP","Web Application"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/donation_club",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/donation_club"
  },
  {
    number: "07", name: "Todo App", category: "TASK MANAGEMENT",
    summary: "A lightweight task-list application for organizing everyday tasks.",
    stack: ["Flutter","Dart","Productivity"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/todo_app",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/todo_app"
  },
  {
    number: "08", name: "Calorie Count", category: "HEALTH · WEB APP",
    summary: "A Django web project focused on calorie-counting and food-tracking workflows.",
    stack: ["Python","Django","Web"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/calorie_count",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/calorie_count"
  },
  {
    number: "09", name: "Ecom Matrix", category: "E-COMMERCE",
    summary: "A commerce project repository for a multi-vendor shopping experience.",
    stack: ["E-commerce","Flutter","Mobile"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/ecom_matrix",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/ecom_matrix"
  },
  {
    number: "10", name: "Daily Income Expense", category: "PERSONAL FINANCE",
    summary: "A project centered on tracking daily income and expenses.",
    stack: ["Python","Finance","Web App"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/daily_income_expose",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/daily_income_expose"
  },
  {
    number: "11", name: "Rajbari Builder", category: "BUSINESS · WEBVIEW",
    summary: "A Flutter WebView application project for bringing a web experience to mobile.",
    stack: ["Flutter","Dart","WebView"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/rajbari_builder",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/rajbari_builder"
  },
  {
    number: "12", name: "Wempro Company Task", category: "DEVELOPMENT TASK",
    summary: "A focused development-task repository; the source contains the implementation and deliverables.",
    stack: ["Software Development","Git"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/wempro-company-task",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/wempro-company-task"
  },
  {
    number: "13", name: "Recipe Project", category: "FOOD · WEB APP",
    summary: "A project for organizing and presenting recipe-related content and workflows.",
    stack: ["Web Development","Recipes"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/recipe_project",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/recipe_project"
  },
  {
    number: "14", name: "Cash Management", category: "FINANCE · SOFTWARE",
    summary: "A cash-management project focused on recording and organizing financial activity.",
    stack: ["Finance","Application"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/cash_management",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/cash_management"
  },
  {
    number: "15", name: "My Shop WebView", category: "MOBILE COMMERCE",
    summary: "A Flutter WebView project that wraps a shop experience for mobile access.",
    stack: ["Flutter","Dart","WebView"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/my_shop_webview",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/my_shop_webview"
  },
  {
    number: "16", name: "WhatsApp WebView", category: "WEBVIEW APP",
    summary: "A WebView-focused mobile repository. Review its source for the exact supported workflow.",
    stack: ["Flutter","WebView","Mobile"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/whatsapp_webview",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/whatsapp_webview"
  },
  {
    number: "17", name: "Library Management System", category: "LIBRARY · WEB APP",
    summary: "A Django-based library-management project built with server-rendered templates.",
    stack: ["Python","Django","HTML"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/libary_management_system",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/libary_management_system"
  },
  {
    number: "18", name: "Wholesale Shop WebView", category: "MOBILE COMMERCE",
    summary: "A Flutter WebView project for accessing a wholesale-shop experience on mobile.",
    stack: ["Flutter","Dart","WebView"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/wholesell_shop_webView",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/wholesell_shop_webView"
  },
  {
    number: "19", name: "Django Modules", category: "BACKEND LEARNING",
    summary: "Django module experiments and reusable learning examples.",
    stack: ["Python","Django"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/django_module",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/django_module"
  },
  {
    number: "20", name: "Calculator", category: "UTILITY APP",
    summary: "A compact calculator project focused on a familiar everyday utility workflow.",
    stack: ["Flutter","Dart","Utility"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/calculator",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/calculator"
  },
  {
    number: "21", name: "Wholesale Shop", category: "E-COMMERCE · MOBILE",
    summary: "A Flutter shopping project focused on a wholesale-commerce experience.",
    stack: ["Flutter","Dart","E-commerce"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/wholesell_shop",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/wholesell_shop"
  },
  {
    number: "22", name: "WhatsApp Clone UI", category: "MESSAGING · UI CONCEPT",
    summary: "A Flutter messaging-interface concept focused on UI patterns, not an official WhatsApp integration.",
    stack: ["Flutter","Dart","UI Design"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/whatsapp-clone",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/whatsapp-clone"
  },
  {
    number: "23", name: "Quiz Application", category: "QUIZ · WEB APP",
    summary: "A Django project for interactive question-and-answer workflows.",
    stack: ["Python","Django","Education"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/quiz_application",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/quiz_application"
  },
  {
    number: "24", name: "Food App", category: "FOOD · MOBILE APP",
    summary: "A Flutter project exploring food-service interface patterns and mobile user flows.",
    stack: ["Flutter","Dart","Mobile UI"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/Food-App",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/Food-App"
  },
  {
    number: "25", name: "Blog Project", category: "CONTENT · WEB APP",
    summary: "A web project for presenting written content through a simple website structure.",
    stack: ["HTML","Web Development"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/blog_project",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/blog_project"
  },
  {
    number: "26", name: "Django Portfolio Website", category: "PERSONAL PORTFOLIO",
    summary: "An earlier portfolio website built with Django templates.",
    stack: ["Python","Django","HTML/CSS"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/portofilo_website_django",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/portofilo_website_django"
  },
  {
    number: "27", name: "Al Hadith", category: "CONTENT · MOBILE",
    summary: "A Flutter project related to Al Hadith content and mobile presentation.",
    stack: ["Flutter","Dart","Content App"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/al_hadith",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/al_hadith"
  },
  {
    number: "28", name: "Samir Imperia Real Estate & Interior", category: "REAL ESTATE · WEB",
    summary: "A real-estate and interior-design website project.",
    stack: ["Web Development","Real Estate","Interior"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/samirimperia-realstate-interior",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/samirimperia-realstate-interior"
  },
  {
    number: "29", name: "DeepVerse Lab", category: "SOFTWARE & PRODUCTS",
    summary: "A repository under the DeepVerse Lab name. Open the source to explore its actual implementation.",
    stack: ["Software Development","GitHub"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/deepverselab",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/deepverselab"
  },
  {
    number: "30", name: "Chats App", category: "MESSAGING · MOBILE",
    summary: "A Flutter chat-app project exploring messaging-oriented screens and mobile interaction flows.",
    stack: ["Flutter","Dart","Chat UI"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/Chats-App",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/Chats-App"
  },
  {
    number: "31", name: "Betikrom Fashion WebView", category: "FASHION · MOBILE COMMERCE",
    summary: "A Flutter WebView project for accessing a fashion-shopping website through a mobile app.",
    stack: ["Flutter","Dart","WebView","E-commerce"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/betikromfashion_web_view",
    liveLabel: "View repository",
    screenshot: "https://opengraph.githubassets.com/1/programmermdemonmiah/betikromfashion_web_view"
  }
];
const services = [{number:"01",title:"Mobile Engineering",description:"Cross-platform Flutter applications with polished user experiences, dependable state management, and maintainable architecture.",icon:Smartphone},{number:"02",title:"Backend Systems",description:"Secure, scalable APIs and business logic using Go, Gin, GORM, PHP, and Laravel.",icon:Code2},{number:"03",title:"Full-Stack Products",description:"End-to-end product development across Next.js interfaces, APIs, databases, and admin dashboards.",icon:Layers3},{number:"04",title:"Realtime Experiences",description:"Live streaming, chat, presence, notifications, WebSocket events, and LiveKit integrations.",icon:Radio},{number:"05",title:"Data & Delivery",description:"Practical database design, Dockerized services, Linux hosting, CI/CD workflows, and production deployment.",icon:Database}];
const featured = [
  {number:"01",name:"DeepVerse Lab",type:"SOFTWARE & PRODUCTS",description:"Explore my own GitHub repository and the projects I maintain under the DeepVerse Lab name.",tags:["Software Engineering","GitHub","Product Development"],url:"https://github.com/programmermdemonmiah/deepverselab",images:["https://opengraph.githubassets.com/1/programmermdemonmiah/deepverselab","https://image.thum.io/get/width/1200/crop/650/noanimate/https://github.com/programmermdemonmiah/deepverselab","https://image.thum.io/get/width/1200/crop/900/noanimate/https://github.com/programmermdemonmiah/deepverselab"]},
  {number:"02",name:"Ecom Matrix",type:"E-COMMERCE",description:"A commerce project repository for a multi-vendor shopping experience.",tags:["E-commerce","Flutter","Mobile"],url:"https://github.com/programmermdemonmiah/ecom_matrix",images:["https://opengraph.githubassets.com/1/programmermdemonmiah/ecom_matrix","https://image.thum.io/get/width/1200/crop/650/noanimate/https://github.com/programmermdemonmiah/ecom_matrix","https://image.thum.io/get/width/1200/crop/900/noanimate/https://github.com/programmermdemonmiah/ecom_matrix"]},
  {number:"03",name:"Photo Background Remover",type:"PYTHON · IMAGE UTILITY",description:"A practical Python utility for removing image backgrounds and exploring image-processing workflows.",tags:["Python","Image Processing","Utility"],url:"https://github.com/programmermdemonmiah/photo_bg_remover",images:["https://opengraph.githubassets.com/1/programmermdemonmiah/photo_bg_remover","https://image.thum.io/get/width/1200/crop/650/noanimate/https://github.com/programmermdemonmiah/photo_bg_remover","https://image.thum.io/get/width/1200/crop/900/noanimate/https://github.com/programmermdemonmiah/photo_bg_remover"]}
];
function ContactButton({compact=false}:{compact?:boolean}) { return <a className={"contact-button"+(compact?" compact":"")} href="mailto:contact.mdemonmiah@gmail.com">Contact Me <ArrowUpRight size={16}/></a>; }
function FadeIn({children,delay=0,y=25,className=""}:{children:React.ReactNode;delay?:number;y?:number;className?:string}) { return <motion.div className={className} initial={{opacity:0,y:y}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"0px 0px -50px 0px"}} transition={{duration:.7,delay:delay,ease:[.25,.1,.25,1]}}>{children}</motion.div>; }
function ProjectStackCard({project,index}:{project:typeof featured[number];index:number}){const ref=useRef<HTMLDivElement>(null);const {scrollYProgress}=useScroll({target:ref,offset:["start end","start start"]});const scale=useTransform(scrollYProgress,[0,1],[1,1-(featured.length-1-index)*.03]);return <div ref={ref} className="project-stack-item" style={{top:96+index*28}}><motion.article className="featured-card" style={{scale}}><div className="featured-card-heading"><span className="featured-number">{project.number}</span><div className="featured-meta"><span>{project.type}</span><h3>{project.name}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div><a className="live-project-button" href={project.url} target="_blank" rel="noreferrer">View Project <ArrowUpRight size={15}/></a></div><div className="featured-image-grid"><div className="featured-image-column"><img src={project.images[0]} alt={project.name+" preview one"} loading="lazy"/><img src={project.images[1]} alt={project.name+" preview two"} loading="lazy"/></div><div className="featured-image-main"><img src={project.images[2]} alt={project.name+" preview"} loading="lazy"/></div></div></motion.article></div>}
const DEVELOPER_MODEL_URL = "https://raw.githubusercontent.com/programmermdemonmiah/programmermdemonmiah/main/assets/web_developer_character.glb";

function DeveloperModel() {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let cancelled = false;
    let objectUrl: string | null = null;
    let viewer: HTMLElement | null = null;
    const attachViewer = () => {
      if (cancelled || !mount.isConnected || !objectUrl || viewer) return;
      viewer = document.createElement("model-viewer");
      viewer.setAttribute("src", objectUrl);
      viewer.setAttribute("alt", "Interactive 3D web developer character");
      viewer.setAttribute("camera-controls", "");
      viewer.setAttribute("orientation", "90deg 0deg 0deg");
      viewer.setAttribute("interaction-prompt", "none");
      viewer.setAttribute("shadow-intensity", "1");
      viewer.setAttribute("exposure", "1.05");
      viewer.setAttribute("environment-image", "neutral");
      viewer.setAttribute("camera-orbit", "0deg 75deg auto");
      viewer.setAttribute("field-of-view", "30deg");
      viewer.setAttribute("loading", "eager");
      viewer.style.width = "100%";
      viewer.style.height = "100%";
      viewer.style.background = "transparent";
      viewer.style.setProperty("--poster-color", "transparent");
      viewer.style.pointerEvents = "auto";
      mount.replaceChildren(viewer);
    };
    const loadLocalModel = async () => {
      try {
        const response = await fetch("/models/web_developer_character.glb.b64");
        if (!response.ok) throw new Error("Local model asset unavailable");
        const encoded = (await response.text()).trim();
        const binary = atob(encoded);
        const bytes = new Uint8Array(binary.length);
        for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
        objectUrl = URL.createObjectURL(new Blob([bytes], { type: "model/gltf-binary" }));
        await import("@google/model-viewer");
        attachViewer();
      } catch {
        if (!cancelled) mount.innerHTML = '<div class="model-local-fallback"><span>EM</span><small>SOFTWARE ENGINEER</small></div>';
      }
    };
    void loadLocalModel();
    return () => {
      cancelled = true;
      mount.replaceChildren();
      viewer = null;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);
  return <div ref={mountRef} aria-label="Interactive 3D developer character" style={{ position: "relative", zIndex: 2, width: "100%", height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", pointerEvents: "auto" }} />;
}
export default function Home(){
const [menuOpen,setMenuOpen]=useState(false);const [portraitTilt,setPortraitTilt]=useState({x:0,y:0});const [projectFilter,setProjectFilter]=useState("All");const [projectSearch,setProjectSearch]=useState("");const projectFilters=["All","Mobile","Web","Commerce","AI & Tools","Realtime"];
const filteredProjects=projects.filter(project=>{const searchable=(project.name+" "+project.category+" "+project.summary+" "+project.stack.join(" ")).toLowerCase();if(projectSearch.trim()&&!searchable.includes(projectSearch.trim().toLowerCase()))return false;if(projectFilter==="All")return true;if(projectFilter==="Mobile")return /flutter|mobile|dart|webview|customer app/.test(searchable);if(projectFilter==="Web")return /web app|django|next\.js|react|html|css|php|website|web development|portfolio|real estate/.test(searchable);if(projectFilter==="Commerce")return /commerce|e-commerce|shop|shopping|store|ecom|wholesale|fashion/.test(searchable);if(projectFilter==="AI & Tools")return /ai|image|photo|utility|calculator|calorie|python/.test(searchable);if(projectFilter==="Realtime")return /realtime|real-time|livekit|websocket|streaming|chat|messaging|socket/.test(searchable);return true});
return <main className="portfolio-redesign"><section className="creator-hero" id="top"><nav className="creator-nav"><a href="#top" className="creator-wordmark"><span className="creator-mark creator-mark-initials" aria-hidden="true">EM</span><span>MD. EMON MIAH<small>SOFTWARE ENGINEER</small></span></a><div className="creator-nav-links"><a href="#about">About</a><a href="#services">Expertise</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div><ContactButton compact/><button className="creator-menu-toggle" aria-label="Toggle navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button></nav>{menuOpen&&<nav className="creator-mobile-menu"><a onClick={()=>setMenuOpen(false)} href="#about">About</a><a onClick={()=>setMenuOpen(false)} href="#services">Expertise</a><a onClick={()=>setMenuOpen(false)} href="#projects">Projects</a><a onClick={()=>setMenuOpen(false)} href="#contact">Contact</a></nav>}<div className="creator-hero-main"><FadeIn className="creator-hero-kicker"><span className="creator-live-dot"/> AVAILABLE FOR SELECT PROJECTS <span>— 2026</span></FadeIn><div className="creator-heading-wrap"><FadeIn delay={.15} y={40}><h1 className="hero-heading">BUILD<br className="hero-mobile-break"/> WITH <span>INTENT.</span></h1></FadeIn></div><div className="creator-portrait" style={{transform:"translateX(-50%) perspective(1100px) rotateX("+portraitTilt.x+"deg) rotateY("+portraitTilt.y+"deg)"}} onPointerMove={event=>{if(event.pointerType==="touch")return;const rect=event.currentTarget.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width-.5;const y=(event.clientY-rect.top)/rect.height-.5;setPortraitTilt({x:-(y*8),y:x*10})}} onPointerLeave={()=>setPortraitTilt({x:0,y:0})}><div className="portrait-orbit portrait-orbit-one"/><div className="portrait-orbit portrait-orbit-two"/><div className="portrait-glow"/><div className="portrait-depth-ring portrait-depth-ring-one"/><div className="portrait-depth-ring portrait-depth-ring-two"/><DeveloperModel /></div><div className="creator-hero-bottom"><FadeIn delay={.35} className="creator-intro-copy">A SOFTWARE ENGINEER DRIVEN BY CRAFTING USEFUL, RELIABLE AND UNFORGETTABLE DIGITAL PRODUCTS.</FadeIn><FadeIn delay={.5}><ContactButton/></FadeIn></div><div className="creator-hero-index"><span>FLUTTER / GO / NEXT.JS / LARAVEL</span><a href="#inspiration">SCROLL TO EXPLORE ↓</a></div></div><div className="hero-background-grid"/></section>

<section className="creator-about" id="about"><div className="creator-about-content"><FadeIn><p className="creator-section-eyebrow">A LITTLE ABOUT THE ENGINEER</p><h2 className="hero-heading">ABOUT ME</h2></FadeIn><FadeIn delay={.15}><p className="animated-text">I build mobile applications, robust backend systems, full-stack products, and real-time experiences. I enjoy working with teams that care about thoughtful architecture, practical problem-solving, and products that make a real difference. Let’s build something meaningful together!</p></FadeIn><FadeIn delay={.25}><div className="about-socials"><a href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ArrowUpRight size={15}/></a><a href="https://www.linkedin.com/in/mdemonmiah" target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ArrowUpRight size={15}/></a></div></FadeIn></div></section>
<section className="creator-services" id="services"><FadeIn><p className="services-eyebrow">WHAT I DO / END-TO-END ENGINEERING</p><h2>SERVICES<span>.</span></h2></FadeIn><div className="services-list">{services.map((service,i)=>{const Icon=service.icon;return <FadeIn key={service.number} delay={i*.08} className="service-row"><span className="service-number">{service.number}</span><div className="service-copy"><h3>{service.title}</h3><p>{service.description}</p></div><Icon className="service-icon" strokeWidth={1.5}/></FadeIn>})}</div></section>
<section className="creator-projects" id="projects"><div className="featured-projects-heading"><FadeIn><p className="creator-section-eyebrow">SELECTED WORK / BUILT WITH PURPOSE</p><h2 className="hero-heading">PROJECTS<span>.</span></h2></FadeIn><p>A closer look at a few products across mobile, web, commerce, and realtime engineering.</p></div><div className="project-stack">{featured.map((project,index)=><ProjectStackCard key={project.number} project={project} index={index}/>)}</div>
<div className="all-projects-wrap"><div className="all-projects-heading"><div><p className="creator-section-eyebrow">MORE WORK / OPEN SOURCE</p><h3>THE FULL COLLECTION<span>.</span></h3></div><p>Every card links to a repository owned by my GitHub account.</p></div><div className="project-tools" aria-label="Filter projects"><div className="project-filter-list">{projectFilters.map(filter=><button type="button" key={filter} className={"project-filter"+(projectFilter===filter?" is-active":"")} onClick={()=>setProjectFilter(filter)} aria-pressed={projectFilter===filter}>{filter}</button>)}</div><label className="project-search"><Search size={16} strokeWidth={1.8} aria-hidden="true"/><span className="sr-only">Search projects</span><input type="search" value={projectSearch} onChange={event=>setProjectSearch(event.target.value)} placeholder="Search project or technology…"/></label><p className="project-results-count">Showing <strong>{filteredProjects.length}</strong> of {projects.length} projects</p></div><div className="projects-grid">{filteredProjects.map(project=><article className="project-card" key={project.number}><a className={"project-art art-"+project.tone} href={project.liveUrl||"#contact"} target={project.liveUrl?"_blank":undefined} rel={project.liveUrl?"noreferrer":undefined} aria-label={project.liveUrl?"Open "+project.name:project.name+" — private project"}>{project.screenshot?<img className="project-screenshot" src={project.screenshot} alt={project.name+" preview"} loading="lazy"/>:<div className="project-art-fallback"><span>{project.number}</span><small>PROJECT PREVIEW</small></div>}<span className="project-number">{project.number} / {String(projects.length).padStart(2,"0")}</span><span className="project-art-label">{project.category}</span><span className="art-arrow"><ArrowUpRight size={18} strokeWidth={1.8}/></span></a><div className="project-details"><div className="project-title-row"><h4>{project.name}</h4><span>{project.number}</span></div><p>{project.summary}</p><div className="tag-list">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div><div className="project-links">{project.liveUrl?<a href={project.liveUrl} target="_blank" rel="noreferrer">{project.liveLabel||"View project"} <ArrowUpRight size={14}/></a>:<span className="private-project-label">Private / no public demo</span>}</div></div></article>)}</div>{filteredProjects.length===0&&<p className="no-project-results">No projects match that search. Try another name or technology.</p>}</div></section>
<footer className="creator-footer" id="contact"><div className="footer-glow"/><div className="creator-footer-inner"><FadeIn><p className="creator-section-eyebrow">HAVE A PRODUCT IN MIND?</p><h2>LET’S BUILD<br/><span>SOMETHING USEFUL.</span></h2><p className="footer-description">From the first screen to production, let’s make the engineering count.</p><ContactButton/></FadeIn><div className="footer-bottom"><a href="#top" className="creator-wordmark"><span className="creator-mark"><img src={GITHUB_AVATAR} alt=""/></span><span>MD. EMON MIAH<small>SOFTWARE ENGINEER</small></span></a><span>© 2026 MD. EMON MIAH</span><div><a href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer"><Github size={18}/></a><a href="https://www.linkedin.com/in/mdemonmiah" target="_blank" rel="noreferrer"><Linkedin size={18}/></a><a href="mailto:contact.mdemonmiah@gmail.com"><Mail size={18}/></a></div></div></div></footer></main>;
}