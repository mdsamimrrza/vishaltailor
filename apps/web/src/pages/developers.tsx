import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Code, Server, Mail, ExternalLink, Sparkles, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Developers() {
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const developers = [
    {
      name: "MD Suweb Reza",
      role: "AI Systems Engineer & Full Stack Developer",
      icon: Code,
      avatar: "https://avatars.githubusercontent.com/u/45898572?v=4",
      bio: "Building high-performance AI platforms and automated workflows for fast-paced startups. Specialized in architecting scalable, event-driven cloud infrastructure and seamless API integrations.",
      skills: ["Next.js", "Node.js", "AWS", "Python", "GenAI"],
      stats: [
        { label: "Experience", value: "8+ yrs" },
        { label: "Projects", value: "15+" },
        { label: "Clients", value: "5+ Countries" }
      ],
      email: "swebreza@gmail.com",
      github: "https://github.com/swebreza",
      portfolio: "https://mdsuwebreza.vercel.app",
    },
    {
      name: "Md Samim Reza",
      role: "Frontend Architect & Full-Stack Developer",
      icon: Server,
      avatar: "https://avatars.githubusercontent.com/u/147176589?v=4",
      bio: "Crafting highly responsive, premium web applications and knowledge management systems. Expert in turning complex requirements into elegant UI/UX paired with robust Spring Boot backends.",
      skills: ["React", "Tailwind CSS", "Spring Boot", "TypeScript", "PostgreSQL"],
      stats: [
        { label: "Experience", value: "3+ yrs" },
        { label: "Projects", value: "12+" },
        { label: "Focus", value: "Premium UI" }
      ],
      email: "samimrrza1@gmail.com",
      github: "https://github.com/mdsamimrrza",
      portfolio: "https://rezaportfolio.vercel.app",
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 selection:bg-[#C9A84C] selection:text-black pt-10 pb-24 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-rose-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#C9A84C]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#C9A84C]/60 hover:text-[#C9A84C] mb-12 transition-colors uppercase tracking-widest text-xs font-bold"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center gap-2 mb-6">
              <Sparkles size={18} className="text-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-bold uppercase tracking-[0.3em]">The Engineering Team</span>
              <Sparkles size={18} className="text-[#C9A84C]" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#F5E6CA] mb-6 drop-shadow-lg leading-tight">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] via-yellow-200 to-orange-400">Developers</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-light">
              We are the engineering duo behind this digital experience. We specialize in building high-performance web applications, crafting modern UI/UX designs, and architecting scalable backend systems.
            </p>
          </motion.div>
        </div>

        <div className="w-16 h-px bg-[#C9A84C]/30 mx-auto mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {developers.map((dev, idx) => {
            const Icon = dev.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                className="relative bg-[#111111]/50 backdrop-blur-md border border-white/5 p-6 md:p-10 flex flex-col items-center text-center transition-all duration-500 hover:border-[#C9A84C]/30 hover:-translate-y-2 group hover:shadow-[0_20px_60px_rgba(201,168,76,0.05)] overflow-hidden"
              >
                {/* Top gradient highlight */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative mb-6 mt-4">
                  <div className="w-28 h-28 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-[#C9A84C]/40 to-transparent shadow-xl">
                    <img
                      src={dev.avatar}
                      alt={dev.name}
                      className="w-full h-full rounded-full object-cover border-4 border-[#111111]"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#111111] rounded-full flex items-center justify-center text-[#C9A84C] border border-white/10 shadow-lg">
                    <Icon size={20} />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 mb-2">
                  <h3 className="text-3xl font-bold text-[#F5E6CA]">{dev.name}</h3>
                  <div className="relative flex items-center justify-center w-2 h-2" title="Available for work">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                    <span className="relative inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  </div>
                </div>

                <p className="text-xs uppercase tracking-[0.2em] text-[#C9A84C] font-semibold mb-5">{dev.role}</p>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {dev.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="border border-[#C9A84C]/20 text-[#C9A84C] text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-[#C9A84C]/5">
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 flex-grow max-w-sm">
                  {dev.bio}
                </p>

                <div className="grid grid-cols-3 w-full border-t border-[#C9A84C]/10 pt-6 mt-2 mb-8">
                  {dev.stats.map((stat, stIdx) => (
                    <div key={stIdx} className="flex flex-col items-center">
                      <span className="text-xl md:text-2xl font-bold text-[#F5E6CA] mb-1">{stat.value}</span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <div className="w-full space-y-4 mt-auto">
                  <div className="flex gap-3 w-full">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(dev.email);
                        toast({
                          title: "Email Copied!",
                          description: `${dev.email} has been copied to your clipboard.`,
                          duration: 3000,
                        });
                      }}
                      className="flex-grow flex items-center justify-center gap-3 bg-[#C9A84C] text-[#1a0505] py-4 px-6 text-sm font-bold tracking-widest uppercase hover:bg-[#F5E6CA] transition-colors shadow-lg"
                    >
                      <Mail size={18} strokeWidth={2.5} />
                      Copy Email
                    </button>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${dev.email}&su=Web Development Inquiry - via Vishal Tailors&body=Hi,%0A%0AI saw your excellent work on the New Vishal Tailors website and I would like to discuss a potential project with you.%0A%0A`}
                      target="_blank"
                      rel="noreferrer"
                      title="Open in Gmail"
                      className="flex-shrink-0 w-14 flex items-center justify-center bg-transparent border border-[#C9A84C]/50 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1a0505] transition-colors shadow-lg"
                    >
                      <ExternalLink size={20} strokeWidth={2.5} />
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full">
                    <a
                      href={dev.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 bg-transparent border border-[#C9A84C]/20 text-[#C9A84C] py-3 text-xs font-bold uppercase tracking-widest hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all"
                    >
                      <Github size={16} />
                      GitHub
                    </a>
                    <a
                      href={dev.portfolio.startsWith('http') ? dev.portfolio : `https://${dev.portfolio}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 bg-transparent border border-[#C9A84C]/20 text-[#C9A84C] py-3 text-xs font-bold uppercase tracking-widest hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all"
                    >
                      <ExternalLink size={16} />
                      Portfolio
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 border border-[#C9A84C]/20 bg-[#111111]/30 backdrop-blur-sm p-8 md:p-12 text-center relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F5E6CA] mb-3">Open to freelance & consulting</h2>
          <p className="text-zinc-400 text-sm max-w-lg mx-auto mb-8">
            Looking for a dedicated team to build your next digital product? We are actively accepting new clients for custom web applications and AI integrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                navigator.clipboard.writeText(developers[0].email);
                toast({ title: "Email Copied!", description: `${developers[0].email} copied to clipboard.` });
              }}
              className="flex items-center justify-center gap-2 bg-transparent border border-[#C9A84C]/40 text-[#C9A84C] px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#C9A84C] hover:text-[#1a0505] transition-colors"
            >
              <Mail size={16} />
              Email Suweb
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(developers[1].email);
                toast({ title: "Email Copied!", description: `${developers[1].email} copied to clipboard.` });
              }}
              className="flex items-center justify-center gap-2 bg-transparent border border-[#C9A84C]/40 text-[#C9A84C] px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#C9A84C] hover:text-[#1a0505] transition-colors"
            >
              <Mail size={16} />
              Email Samim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
