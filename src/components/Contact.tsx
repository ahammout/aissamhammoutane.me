import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Send, Github, Linkedin, Instagram, ArrowUpRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import emailjs from "emailjs-com";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: "aissam.hammoutane@outlook.com",
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }
      );
      toast.success("Message sent! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/ahammout", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/aissam-hammoutane-9968341b8/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/aissam_hammoutane/", label: "Instagram" },
  ];

  const inputClasses = (field: string) =>
    `w-full px-5 py-4 rounded-xl bg-background border-2 transition-all duration-300 outline-none text-foreground placeholder:text-muted-foreground/60 ${
      focused === field
        ? "border-primary/50 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.2)]"
        : "border-border hover:border-primary/20"
    }`;

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 relative overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-56 h-56 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary tracking-wider uppercase">Available for work</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Let's Work <span className="text-gradient">Together</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Have a project in mind? I'd love to hear about it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left side - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl font-bold mb-6">Get in touch</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Whether it's a new project, collaboration, or just saying hi — I'm always open to meaningful conversations.
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-4">
              <motion.a
                href="mailto:aissam.hammoutane@outlook.com"
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                  <p className="text-sm font-medium text-foreground truncate">aissam.hammoutane@outlook.com</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                  <p className="text-sm font-medium text-foreground">Rabat, Morocco</p>
                </div>
              </motion.div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs text-muted-foreground mb-3 tracking-wider uppercase font-medium">Connect</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4.5 h-4.5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground/80">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  required
                  className={inputClasses("name")}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground/80">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  required
                  className={inputClasses("email")}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground/80">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                required
                rows={6}
                className={`${inputClasses("message")} resize-none`}
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-all duration-300 glow-primary flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <Send className="w-4 h-4" />
              {loading ? "Sending..." : "Send Message"}
            </motion.button>

            <p className="text-xs text-center text-muted-foreground/60">
              I typically respond within 24 hours
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
