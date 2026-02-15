import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3.8/5] rounded-2xl overflow-hidden gradient-border">
              <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                {/* <span className="text-6xl">👨‍💻</span> */}
                <img src="aissam.jpeg" alt="Aissam Hammoutane" />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              About Me
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Passionate about creating{" "}
              <span className="text-gradient">impactful</span> digital solutions
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a creative developer with a keen eye for creativity and a passion for 
                building seamless user experiences. With years of experience in web 
                development, I specialize in turning complex ideas into elegant, 
                functional applications.
              </p>
              <p>
                My approach combines technical expertise with creative thinking, 
                ensuring every project not only works flawlessly but also tells a 
                compelling story.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-10">
              {[
                { number: "3+", label: "Years Experience" },
                { number: "40+", label: "Projects Completed" },
                { number: "15+", label: "Happy Clients" },
              ].map((stat, index) => (
                <div key={index}>
                  <p className="font-display text-3xl md:text-4xl font-bold text-gradient">
                    {stat.number}
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;