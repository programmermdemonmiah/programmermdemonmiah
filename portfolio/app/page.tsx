"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Smartphone, Code2, Layers3, Radio, Database, Github, Linkedin, Mail, Menu, X } from "lucide-react";
const GITHUB_AVATAR = "https://avatars.githubusercontent.com/u/121760927?v=4";
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
    number: "01", name: "SportsBD", category: "SPORTS PLATFORM",
    summary: "A grassroots sports platform for live scoring, scorecards, tournaments, match insights, live streaming, and community discovery.",
    stack: ["Web Platform", "Sports Tech", "Live Scoring"],
    tone: "red", liveUrl: "https://sportsbd.net/",
    liveLabel: "Visit live website",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/https://sportsbd.net/"
  },
  {
    number: "02", name: "VerseMart", category: "E-COMMERCE",
    summary: "A production ecommerce platform supported by containerized backend services, product browsing, checkout, and order workflows.",
    stack: ["Next.js", "Go", "PostgreSQL", "Docker"],
    tone: "orange", liveUrl: "https://oxewman.com/",
    liveLabel: "Visit live website",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/https://oxewman.com/"
  },
  {
    number: "03", name: "Genters", category: "CUSTOMER SHOPPING APP",
    summary: "A single-vendor shopping app for browsing products, managing a cart, and placing orders without mandatory account registration.",
    stack: ["Flutter", "Riverpod", "E-commerce"],
    tone: "red", liveUrl: "https://play.google.com/store/apps/details?id=com.genters.customer",
    liveLabel: "View on Google Play",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/?url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.genters.customer"
  },
  {
    number: "04", name: "Asmi", category: "ONLINE SUPERMARKET",
    summary: "A grocery shopping app with product discovery, checkout, delivery scheduling, order tracking, and customer support.",
    stack: ["Flutter", "Riverpod", "Mobile Commerce"],
    tone: "orange", liveUrl: "https://apps.apple.com/us/app/asmi-the-online-super-shop/id6762031008",
    liveLabel: "View on App Store",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/https://apps.apple.com/us/app/asmi-the-online-super-shop/id6762031008"
  },
  {
    number: "05", name: "FantasyMart", category: "MULTI-STORE COMMERCE",
    summary: "A multi-store customer shopping app designed to bring multiple store experiences, product discovery, and checkout into one place.",
    stack: ["Flutter", "E-commerce", "Mobile"],
    tone: "red", liveUrl: "https://play.google.com/store/apps/details?id=com.fantasymart.customer",
    liveLabel: "View on Google Play",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/?url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.fantasymart.customer"
  },
  {
    number: "06", name: "Medly", category: "DIGITAL READING",
    summary: "A mobile reading experience for discovering digital books, viewing book details, and reading content chapter by chapter.",
    stack: ["Flutter", "Mobile UI", "Content"],
    tone: "orange", liveUrl: "https://play.google.com/store/apps/details?id=com.medly.app",
    liveLabel: "View on Google Play",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/?url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.medly.app"
  },
  {
    number: "07", name: "Swish", category: "MOBILE APPLICATION",
    summary: "A published mobile product with a dedicated Google Play listing and production release history.",
    stack: ["Flutter", "GetX", "Mobile"],
    tone: "red", liveUrl: "https://play.google.com/store/apps/details?id=com.swish.app",
    liveLabel: "View on Google Play",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/?url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.swish.app"
  },
  {
    number: "08", name: "Ecom Matrix", category: "MULTI-VENDOR COMMERCE",
    summary: "A multi-vendor shopping experience for discovering products across sellers, with a separate seller app for merchant workflows.",
    stack: ["Flutter", "E-commerce", "Customer & Seller Apps"],
    tone: "orange", liveUrl: "https://play.google.com/store/apps/details?id=com.ecommatrix.customer",
    liveLabel: "View on Google Play",
    screenshot: "https://image.thum.io/get/width/1200/crop/650/noanimate/?url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.ecommatrix.customer"
  },
  {
    number: "09", name: "Live Streaming Platform", category: "REALTIME & VIDEO",
    summary: "Realtime streaming workflows with host approval, VIP and moderator access, viewer presence, chat, and device-level account security.",
    stack: ["Flutter", "Go", "LiveKit", "WebSocket"],
    tone: "red", liveUrl: null, liveLabel: null, screenshot: null
  },
  {
    number: "10", name: "ERP & Business Systems", category: "BUSINESS SOFTWARE",
    summary: "Business workflows and ecommerce capabilities built around structured data, API integrations, and maintainable backend features.",
    stack: ["PHP", "Laravel", "MySQL", "REST APIs"],
    tone: "orange", liveUrl: null, liveLabel: null, screenshot: null
  },
  {
    number: "11", name: "Mobile & Backend Products", category: "CLIENT APPLICATIONS",
    summary: "Additional customer, healthcare, finance, and service applications delivered with API-driven interfaces and practical state management.",
    stack: ["Flutter", "Dart", "Go", "Laravel"],
    tone: "red", liveUrl: null, liveLabel: null, screenshot: null
  },
  {
    number: "12", name: "Xovalley", category: "MOBILE APPLICATION",
    summary: "A Flutter application built with Provider for state management and Dio for structured API communication.",
    stack: ["Flutter", "Provider", "Dio", "REST API"],
    tone: "orange"
  },
  {
    number: "13", name: "ARACO Healthcare", category: "HEALTHCARE SOFTWARE",
    summary: "Healthcare application work focused on practical digital workflows, user-facing features, and backend integration.",
    stack: ["Flutter", "API Integration", "Healthcare"],
    tone: "red"
  },
  {
    number: "14", name: "CashMart", category: "FINANCE & BANKING",
    summary: "A finance-focused application project involving customer workflows and integration with backend services.",
    stack: ["Mobile", "Backend APIs", "Fintech"],
    tone: "orange"
  },
  {
    number: "15", name: "Propeta MVC", category: "WEB APPLICATION",
    summary: "An MVC-based application project emphasizing organized application structure and maintainable business logic.",
    stack: ["PHP", "MVC", "Backend Development"],
    tone: "red"
  },
  {
    number: "16", name: "DeepVerse Live", category: "REAL-TIME LIVE STREAMING",
    summary: "A live-streaming platform with host and viewer flows, join approvals, realtime presence, and LiveKit-based streaming.",
    stack: ["Flutter", "Go", "WebSocket", "LiveKit"],
    tone: "orange"
  },
  {
    number: "17", name: "DeepVerse Ecommerce Suite", category: "ECOMMERCE & ADMIN",
    summary: "A multi-part commerce system covering a Next.js storefront, Go backend services, and a separate administration interface.",
    stack: ["Next.js", "Go", "React Admin", "Docker"],
    tone: "red"
  },
  {
    number: "18", name: "Photo Background Remover", category: "IMAGE UTILITY · PYTHON",
    summary: "A Python utility project focused on removing image backgrounds, organized as a standalone tool for experimentation and practical image processing.",
    stack: ["Python","Image Processing"],
    tone: "orange", liveUrl: "https://github.com/programmermdemonmiah/photo_bg_remover",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "19", name: "Passport Photo AI", category: "AI IMAGE TOOL",
    summary: "A Python project exploring AI-assisted passport-photo preparation and image workflows. See the repository for its current implementation and scope.",
    stack: ["Python","AI","Image Processing"],
    tone: "red", liveUrl: "https://github.com/programmermdemonmiah/passport_photo_ai",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "20", name: "Learning Management System", category: "EDUCATION · WEB APP",
    summary: "A Django template-based learning management system project for education-oriented workflows and server-rendered web pages.",
    stack: ["Python","Django","HTML Templates"],
    tone: "orange", liveUrl: "https://github.com/programmermdemonmiah/learning_management_system",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "21", name: "Login UI", category: "MOBILE UI DESIGN",
    summary: "A Flutter UI project covering login and password-recovery screens, with a focus on clear authentication flows.",
    stack: ["Flutter","Dart","UI Design"],
    tone: "red", liveUrl: "https://github.com/programmermdemonmiah/login-ui",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "22", name: "Django Todo API", category: "REST API · PRACTICE",
    summary: "A Django API practice project built to explore backend endpoints and basic task-oriented data operations.",
    stack: ["Python","Django","REST API"],
    tone: "orange", liveUrl: "https://github.com/programmermdemonmiah/django_todo_api_test",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "23", name: "Donation Club", category: "DONATION MANAGEMENT",
    summary: "A PHP-based donation-club project. Review the repository for its specific workflows and current implementation.",
    stack: ["PHP","Web Application"],
    tone: "red", liveUrl: "https://github.com/programmermdemonmiah/donation_club",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "24", name: "Todo App", category: "TASK MANAGEMENT · MOBILE",
    summary: "A Dart/Flutter task-list application project for organizing everyday tasks in a lightweight mobile experience.",
    stack: ["Flutter","Dart","Productivity"],
    tone: "orange", liveUrl: "https://github.com/programmermdemonmiah/todo_app",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "25", name: "Calorie Count", category: "HEALTH · WEB APP",
    summary: "A Django template-based web project focused on calorie-counting and food-related tracking workflows.",
    stack: ["Python","Django","HTML/CSS"],
    tone: "red", liveUrl: "https://github.com/programmermdemonmiah/calorie_count",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "26", name: "Daily Income Expense", category: "PERSONAL FINANCE",
    summary: "A Python project centered on daily income and expense tracking, useful for exploring personal-finance record workflows.",
    stack: ["Python","Finance","Web App"],
    tone: "orange", liveUrl: "https://github.com/programmermdemonmiah/daily_income_expose",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "27", name: "Rajbari Builder", category: "BUSINESS · WEBVIEW APP",
    summary: "A Flutter WebView application project that brings a web experience into a mobile app shell.",
    stack: ["Flutter","Dart","WebView"],
    tone: "red", liveUrl: "https://github.com/programmermdemonmiah/rajbari_builder",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "28", name: "Wempro Company Task", category: "DEVELOPMENT TASK",
    summary: "A company-task repository demonstrating a focused implementation exercise. The source repository contains the exact scope and deliverables.",
    stack: ["Software Development","GitHub"],
    tone: "orange", liveUrl: "https://github.com/programmermdemonmiah/wempro-company-task",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "29", name: "Recipe Project", category: "FOOD · WEB APP",
    summary: "A Django template-based recipe and blog project for presenting recipe content through a server-rendered website.",
    stack: ["Python","Django","Content"],
    tone: "red", liveUrl: "https://github.com/programmermdemonmiah/recipe_project",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "30", name: "Cash Management", category: "FINANCE · WEB APP",
    summary: "A Django template-based cash-management project exploring simple cash-record and financial workflow screens.",
    stack: ["Python","Django","Finance"],
    tone: "orange", liveUrl: "https://github.com/programmermdemonmiah/cash_management",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "31", name: "My Shop WebView", category: "MOBILE COMMERCE",
    summary: "A Flutter WebView wrapper for a shop website, with mobile navigation and a web-based shopping experience.",
    stack: ["Flutter","Dart","WebView"],
    tone: "red", liveUrl: "https://github.com/programmermdemonmiah/my_shop_webview",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "32", name: "WhatsApp WebView", category: "MESSAGING · WEBVIEW",
    summary: "A Flutter WebView project designed around WhatsApp Web access, with multi-tab and multi-account usage as described in the repository.",
    stack: ["Flutter","Dart","WebView"],
    tone: "orange", liveUrl: "https://github.com/programmermdemonmiah/whatsapp_webview",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "33", name: "Library Management System", category: "LIBRARY · WEB APP",
    summary: "A Django-based library-management project built with server-rendered templates and organized web pages.",
    stack: ["Python","Django","HTML"],
    tone: "red", liveUrl: "https://github.com/programmermdemonmiah/libary_management_system",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "34", name: "Wholesale Shop WebView", category: "MOBILE COMMERCE",
    summary: "A Flutter WebView application that wraps a wholesale-shop web experience for mobile access.",
    stack: ["Flutter","Dart","WebView"],
    tone: "orange", liveUrl: "https://github.com/programmermdemonmiah/wholesell_shop_webView",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "35", name: "Django Modules", category: "BACKEND LEARNING",
    summary: "A repository for Django module experiments and reusable learning examples. Check the source for the individual topics covered.",
    stack: ["Python","Django"],
    tone: "red", liveUrl: "https://github.com/programmermdemonmiah/django_module",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "36", name: "Calculator", category: "UTILITY · MOBILE",
    summary: "A compact calculator project focused on a familiar utility workflow and mobile interface fundamentals.",
    stack: ["Flutter","Dart","Utility App"],
    tone: "orange", liveUrl: "https://github.com/programmermdemonmiah/calculator",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "37", name: "Wholesale Shop", category: "E-COMMERCE · MOBILE",
    summary: "A Flutter multi-ecommerce project focused on a wholesale shopping experience.",
    stack: ["Flutter","Dart","E-commerce"],
    tone: "red", liveUrl: "https://github.com/programmermdemonmiah/wholesell_shop",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "38", name: "WhatsApp Clone UI", category: "MESSAGING · UI CONCEPT",
    summary: "A Flutter interface-design project inspired by messaging-app layouts, focused on UI rather than claiming an official WhatsApp integration.",
    stack: ["Flutter","Dart","UI Design"],
    tone: "orange", liveUrl: "https://github.com/programmermdemonmiah/whatsapp-clone",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "39", name: "Quiz Application", category: "QUIZ · WEB APP",
    summary: "A Django template-based quiz application project for interactive question-and-answer workflows.",
    stack: ["Python","Django","Education"],
    tone: "red", liveUrl: "https://github.com/programmermdemonmiah/quiz_application",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "40", name: "Food App", category: "FOOD · MOBILE APP",
    summary: "A Flutter food-app project exploring mobile food-service interface patterns and user flows.",
    stack: ["Flutter","Dart","Mobile UI"],
    tone: "orange", liveUrl: "https://github.com/programmermdemonmiah/Food-App",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "41", name: "Blog Project", category: "CONTENT · WEB APP",
    summary: "A web-based blog project focused on presenting written content through a simple website structure.",
    stack: ["HTML","Web Development"],
    tone: "red", liveUrl: "https://github.com/programmermdemonmiah/blog_project",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "42", name: "Django Portfolio Website", category: "PERSONAL PORTFOLIO",
    summary: "An earlier portfolio website built with Django templates, representing an earlier stage of portfolio development.",
    stack: ["Python","Django","HTML/CSS"],
    tone: "orange", liveUrl: "https://github.com/programmermdemonmiah/portofilo_website_django",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "43", name: "Al Hadith", category: "ISLAMIC CONTENT · MOBILE",
    summary: "A Flutter demo project related to Al Hadith content. The repository documents the current scope of this work.",
    stack: ["Flutter","Dart","Content App"],
    tone: "red", liveUrl: "https://github.com/programmermdemonmiah/al_hadith",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "44", name: "Chats App", category: "MESSAGING · MOBILE",
    summary: "A Flutter chat-app project exploring messaging-oriented screens and mobile interaction flows.",
    stack: ["Flutter","Dart","Chat UI"],
    tone: "orange", liveUrl: "https://github.com/programmermdemonmiah/Chats-App",
    liveLabel: "View source on GitHub", screenshot: null
  },
  {
    number: "45", name: "Betikrom Fashion WebView", category: "FASHION · MOBILE COMMERCE",
    summary: "A Flutter WebView application project for accessing a fashion-shopping website through a mobile app.",
    stack: ["Flutter","Dart","WebView","E-commerce"],
    tone: "red", liveUrl: "https://github.com/programmermdemonmiah/betikromfashion_web_view",
    liveLabel: "View source on GitHub", screenshot: null
  }
];
const marqueeImages = ["https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif","https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif","https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif","https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif","https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif","https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif","https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif","https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif","https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif","https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif","https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif","https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif","https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif","https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif","https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif","https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif","https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif","https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif","https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif","https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif","https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"];
const services = [{number:"01",title:"Mobile Engineering",description:"Cross-platform Flutter applications with polished user experiences, dependable state management, and maintainable architecture.",icon:Smartphone},{number:"02",title:"Backend Systems",description:"Secure, scalable APIs and business logic using Go, Gin, GORM, PHP, and Laravel.",icon:Code2},{number:"03",title:"Full-Stack Products",description:"End-to-end product development across Next.js interfaces, APIs, databases, and admin dashboards.",icon:Layers3},{number:"04",title:"Realtime Experiences",description:"Live streaming, chat, presence, notifications, WebSocket events, and LiveKit integrations.",icon:Radio},{number:"05",title:"Data & Delivery",description:"Practical database design, Dockerized services, Linux hosting, CI/CD workflows, and production deployment.",icon:Database}];
const featured = [{number:"01",name:"SportsBD",type:"SPORTS PLATFORM",description:"A sports platform for live scoring, scorecards, tournaments, match insights, streaming, and community discovery.",tags:["Next.js","Flutter","Go","Realtime"],url:"https://sportsbd.net/",images:[projects[0].screenshot || "https://image.thum.io/get/width/1200/crop/650/noanimate/https://sportsbd.net/","https://image.thum.io/get/width/1200/crop/650/noanimate/https://sportsbd.net/","https://image.thum.io/get/width/1200/crop/900/noanimate/https://sportsbd.net/"]},{number:"02",name:"VerseMart",type:"E-COMMERCE",description:"A production commerce experience backed by Go services, containerized infrastructure, product discovery, and order workflows.",tags:["Next.js","Go","PostgreSQL","Docker"],url:"https://oxewman.com/",images:[projects[1].screenshot || "https://image.thum.io/get/width/1200/crop/650/noanimate/https://oxewman.com/","https://image.thum.io/get/width/1200/crop/650/noanimate/https://oxewman.com/","https://image.thum.io/get/width/1200/crop/900/noanimate/https://oxewman.com/"]},{number:"03",name:"DeepVerse Live",type:"REALTIME STREAMING",description:"A live-streaming platform with host approvals, VIP access, realtime viewer presence, chat, and LiveKit streaming.",tags:["Flutter","Go","LiveKit","WebSocket"],url:"https://github.com/programmermdemonmiah",images:["https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif","https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif","https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif"]}];
function ContactButton({compact=false}:{compact?:boolean}) { return <a className={"contact-button"+(compact?" compact":"")} href="mailto:contact.mdemonmiah@gmail.com">Contact Me <ArrowUpRight size={16}/></a>; }
function FadeIn({children,delay=0,y=25,className=""}:{children:React.ReactNode;delay?:number;y?:number;className?:string}) { return <motion.div className={className} initial={{opacity:0,y:y}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"0px 0px -50px 0px"}} transition={{duration:.7,delay:delay,ease:[.25,.1,.25,1]}}>{children}</motion.div>; }
function MarqueeSection(){const ref=useRef<HTMLElement>(null);const [offset,setOffset]=useState(0);useEffect(()=>{const update=()=>{if(!ref.current)return;const top=ref.current.getBoundingClientRect().top+window.scrollY;setOffset((window.scrollY-top+window.innerHeight)*.3)};update();window.addEventListener("scroll",update,{passive:true});return()=>window.removeEventListener("scroll",update)},[]);const a=marqueeImages.slice(0,11),b=marqueeImages.slice(11);return <section ref={ref} className="marquee-section" id="inspiration"><div className="marquee-row" style={{transform:"translate3d("+(offset-200)+"px,0,0)"}}>{[...a,...a,...a].map((src,i)=><div className="marquee-tile" key={src+i}><img src={src} alt="" loading="lazy"/></div>)}</div><div className="marquee-row marquee-row-second" style={{transform:"translate3d("+(-(offset-200))+"px,0,0)"}}>{[...b,...b,...b].map((src,i)=><div className="marquee-tile" key={src+i}><img src={src} alt="" loading="lazy"/></div>)}</div></section>}
function ProjectStackCard({project,index}:{project:typeof featured[number];index:number}){const ref=useRef<HTMLDivElement>(null);const {scrollYProgress}=useScroll({target:ref,offset:["start end","start start"]});const scale=useTransform(scrollYProgress,[0,1],[1,1-(featured.length-1-index)*.03]);return <div ref={ref} className="project-stack-item" style={{top:96+index*28}}><motion.article className="featured-card" style={{scale}}><div className="featured-card-heading"><span className="featured-number">{project.number}</span><div className="featured-meta"><span>{project.type}</span><h3>{project.name}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div><a className="live-project-button" href={project.url} target="_blank" rel="noreferrer">View Project <ArrowUpRight size={15}/></a></div><div className="featured-image-grid"><div className="featured-image-column"><img src={project.images[0]} alt={project.name+" preview one"} loading="lazy"/><img src={project.images[1]} alt={project.name+" preview two"} loading="lazy"/></div><div className="featured-image-main"><img src={project.images[2]} alt={project.name+" preview"} loading="lazy"/></div></div></motion.article></div>}
const DEVELOPER_MODEL_URL = "https://raw.githubusercontent.com/programmermdemonmiah/programmermdemonmiah/main/assets/web_developer_character.glb";

function DeveloperModel() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let viewer: HTMLElement | null = null;
    const attachViewer = () => {
      if (!mount.isConnected || viewer) return;
      viewer = document.createElement("model-viewer");
      viewer.setAttribute("src", DEVELOPER_MODEL_URL);
      viewer.setAttribute("alt", "Interactive 3D web developer character");
      viewer.setAttribute("camera-controls", "");
      viewer.setAttribute("orientation", "0deg 0deg 0deg");
      viewer.setAttribute("interaction-prompt", "none");
      viewer.setAttribute("shadow-intensity", "1");
      viewer.setAttribute("exposure", "1.05");
      viewer.setAttribute("environment-image", "neutral");
      viewer.setAttribute("camera-orbit", "0deg 78deg 2.4m");
      viewer.setAttribute("camera-target", "0m 1.05m 0m");
      viewer.setAttribute("field-of-view", "26deg");
      viewer.setAttribute("loading", "eager");
      viewer.style.width = "100%";
      viewer.style.height = "100%";
      viewer.style.background = "transparent";
      viewer.style.setProperty("--poster-color", "transparent");
      viewer.style.pointerEvents = "auto";
      mount.replaceChildren(viewer);
    };

    if (customElements.get("model-viewer")) {
      attachViewer();
    } else {
      let script = document.querySelector<HTMLScriptElement>("script[data-developer-model-viewer]");
      if (!script) {
        script = document.createElement("script");
        script.type = "module";
        script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
        script.dataset.developerModelViewer = "true";
        document.head.appendChild(script);
      }
      if (customElements.get("model-viewer")) attachViewer();
      else script.addEventListener("load", attachViewer, { once: true });
    }

    return () => {
      mount.replaceChildren();
      viewer = null;
    };
  }, []);

  return <div ref={mountRef} aria-label="Interactive 3D developer character" style={{ position: "relative", zIndex: 2, width: "100%", height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", pointerEvents: "auto" }} />;
}

export default function Home(){
const [menuOpen,setMenuOpen]=useState(false);const [portraitTilt,setPortraitTilt]=useState({x:0,y:0});const [projectFilter,setProjectFilter]=useState("All");const [projectSearch,setProjectSearch]=useState("");const projectFilters=["All","Mobile","Web","Commerce","AI & Tools","Realtime"];
const filteredProjects=projects.filter(project=>{const searchable=(project.name+" "+project.category+" "+project.summary+" "+project.stack.join(" ")).toLowerCase();if(projectSearch.trim()&&!searchable.includes(projectSearch.trim().toLowerCase()))return false;if(projectFilter==="All")return true;if(projectFilter==="Mobile")return /flutter|mobile|dart|webview|customer app/.test(searchable);if(projectFilter==="Web")return /web app|django|next\\.js|react|html|css|php|website|web development|portfolio/.test(searchable);if(projectFilter==="Commerce")return /commerce|e-commerce|shop|shopping|store|ecom|wholesale|fashion/.test(searchable);if(projectFilter==="AI & Tools")return /ai|image|photo|utility|calculator|calorie|python/.test(searchable);if(projectFilter==="Realtime")return /realtime|real-time|livekit|websocket|streaming|chat|messaging|socket/.test(searchable);return true});
return <main className="portfolio-redesign"><section className="creator-hero" id="top"><nav className="creator-nav"><a href="#top" className="creator-wordmark"><span className="creator-mark"><img src={GITHUB_AVATAR} alt=""/></span><span>MD. EMON MIAH<small>SOFTWARE ENGINEER</small></span></a><div className="creator-nav-links"><a href="#about">About</a><a href="#services">Expertise</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div><ContactButton compact/><button className="creator-menu-toggle" aria-label="Toggle navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button></nav>{menuOpen&&<nav className="creator-mobile-menu"><a onClick={()=>setMenuOpen(false)} href="#about">About</a><a onClick={()=>setMenuOpen(false)} href="#services">Expertise</a><a onClick={()=>setMenuOpen(false)} href="#projects">Projects</a><a onClick={()=>setMenuOpen(false)} href="#contact">Contact</a></nav>}<div className="creator-hero-main"><FadeIn className="creator-hero-kicker"><span className="creator-live-dot"/> AVAILABLE FOR SELECT PROJECTS <span>— 2026</span></FadeIn><div className="creator-heading-wrap"><FadeIn delay={.15} y={40}><h1 className="hero-heading">BUILD<br className="hero-mobile-break"/> WITH <span>INTENT.</span></h1></FadeIn></div><div className="creator-portrait" style={{transform:"translateX(-50%) perspective(1100px) rotateX("+portraitTilt.x+"deg) rotateY("+portraitTilt.y+"deg)"}} onPointerMove={event=>{if(event.pointerType==="touch")return;const rect=event.currentTarget.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width-.5;const y=(event.clientY-rect.top)/rect.height-.5;setPortraitTilt({x:-(y*8),y:x*10})}} onPointerLeave={()=>setPortraitTilt({x:0,y:0})}><div className="portrait-orbit portrait-orbit-one"/><div className="portrait-orbit portrait-orbit-two"/><div className="portrait-glow"/><div className="portrait-depth-ring portrait-depth-ring-one"/><div className="portrait-depth-ring portrait-depth-ring-two"/><DeveloperModel /></div><div className="creator-hero-bottom"><FadeIn delay={.35} className="creator-intro-copy">A SOFTWARE ENGINEER DRIVEN BY CRAFTING USEFUL, RELIABLE AND UNFORGETTABLE DIGITAL PRODUCTS.</FadeIn><FadeIn delay={.5}><ContactButton/></FadeIn></div><div className="creator-hero-index"><span>FLUTTER / GO / NEXT.JS / LARAVEL</span><a href="#inspiration">SCROLL TO EXPLORE ↓</a></div></div><div className="hero-background-grid"/></section>
<MarqueeSection/>
<section className="creator-about" id="about"><img className="about-deco about-moon" src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="" loading="lazy"/><img className="about-deco about-object-left" src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="" loading="lazy"/><img className="about-deco about-lego" src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="" loading="lazy"/><img className="about-deco about-object-right" src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="" loading="lazy"/><div className="creator-about-content"><FadeIn><p className="creator-section-eyebrow">A LITTLE ABOUT THE ENGINEER</p><h2 className="hero-heading">ABOUT ME</h2></FadeIn><FadeIn delay={.15}><p className="animated-text">I build mobile applications, robust backend systems, full-stack products, and real-time experiences. I enjoy working with teams that care about thoughtful architecture, practical problem-solving, and products that make a real difference. Let’s build something meaningful together!</p></FadeIn><FadeIn delay={.25}><div className="about-socials"><a href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ArrowUpRight size={15}/></a><a href="https://www.linkedin.com/in/mdemonmiah" target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ArrowUpRight size={15}/></a></div></FadeIn></div></section>
<section className="creator-services" id="services"><FadeIn><p className="services-eyebrow">WHAT I DO / END-TO-END ENGINEERING</p><h2>SERVICES<span>.</span></h2></FadeIn><div className="services-list">{services.map((service,i)=>{const Icon=service.icon;return <FadeIn key={service.number} delay={i*.08} className="service-row"><span className="service-number">{service.number}</span><div className="service-copy"><h3>{service.title}</h3><p>{service.description}</p></div><Icon className="service-icon" strokeWidth={1.5}/></FadeIn>})}</div></section>
<section className="creator-projects" id="projects"><div className="featured-projects-heading"><FadeIn><p className="creator-section-eyebrow">SELECTED WORK / BUILT WITH PURPOSE</p><h2 className="hero-heading">PROJECTS<span>.</span></h2></FadeIn><p>A closer look at a few products across mobile, web, commerce, and realtime engineering.</p></div><div className="project-stack">{featured.map((project,index)=><ProjectStackCard key={project.number} project={project} index={index}/>)}</div>
<div className="all-projects-wrap"><div className="all-projects-heading"><div><p className="creator-section-eyebrow">MORE WORK / OPEN SOURCE</p><h3>THE FULL COLLECTION<span>.</span></h3></div><p>Browse projects, prototypes, published apps, and engineering experiments.</p></div><div className="project-tools" aria-label="Filter projects"><div className="project-filter-list">{projectFilters.map(filter=><button type="button" key={filter} className={"project-filter"+(projectFilter===filter?" is-active":"")} onClick={()=>setProjectFilter(filter)} aria-pressed={projectFilter===filter}>{filter}</button>)}</div><label className="project-search"><span aria-hidden="true">⌕</span><span className="sr-only">Search projects</span><input type="search" value={projectSearch} onChange={event=>setProjectSearch(event.target.value)} placeholder="Search project or technology…"/></label><p className="project-results-count">Showing <strong>{filteredProjects.length}</strong> of {projects.length} projects</p></div><div className="projects-grid">{filteredProjects.map(project=><article className="project-card" key={project.number}><a className={"project-art art-"+project.tone} href={project.liveUrl||"#contact"} target={project.liveUrl?"_blank":undefined} rel={project.liveUrl?"noreferrer":undefined} aria-label={project.liveUrl?"Open "+project.name:project.name+" — private project"}>{project.screenshot?<img className="project-screenshot" src={project.screenshot} alt={project.name+" preview"} loading="lazy"/>:<div className="project-art-fallback"><span>{project.number}</span><small>PROJECT PREVIEW</small></div>}<span className="project-number">{project.number} / {String(projects.length).padStart(2,"0")}</span><span className="project-art-label">{project.category}</span><span className="art-arrow">↗</span></a><div className="project-details"><div className="project-title-row"><h4>{project.name}</h4><span>{project.number}</span></div><p>{project.summary}</p><div className="tag-list">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div><div className="project-links">{project.liveUrl?<a href={project.liveUrl} target="_blank" rel="noreferrer">{project.liveLabel||"View project"} <ArrowUpRight size={14}/></a>:<span className="private-project-label">Private / no public demo</span>}</div></div></article>)}</div>{filteredProjects.length===0&&<p className="no-project-results">No projects match that search. Try another name or technology.</p>}<div className="project-catalog-links"><a href="https://play.google.com/store/apps/dev?id=6275384212045783558" target="_blank" rel="noreferrer">More DeepVerse Lab apps <ArrowUpRight size={15}/></a><a href="https://play.google.com/store/apps/developer?id=NIBIZ+SOFT" target="_blank" rel="noreferrer">NIBIZ SOFT apps <ArrowUpRight size={15}/></a></div></div></section>
<footer className="creator-footer" id="contact"><div className="footer-glow"/><div className="creator-footer-inner"><FadeIn><p className="creator-section-eyebrow">HAVE A PRODUCT IN MIND?</p><h2>LET’S BUILD<br/><span>SOMETHING USEFUL.</span></h2><p className="footer-description">From the first screen to production, let’s make the engineering count.</p><ContactButton/></FadeIn><div className="footer-bottom"><a href="#top" className="creator-wordmark"><span className="creator-mark"><img src={GITHUB_AVATAR} alt=""/></span><span>MD. EMON MIAH<small>SOFTWARE ENGINEER</small></span></a><span>© 2026 MD. EMON MIAH</span><div><a href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer"><Github size={18}/></a><a href="https://www.linkedin.com/in/mdemonmiah" target="_blank" rel="noreferrer"><Linkedin size={18}/></a><a href="mailto:contact.mdemonmiah@gmail.com"><Mail size={18}/></a></div></div></div></footer></main>;
}