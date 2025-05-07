import Hero from "../components/Hero";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { FaReact, FaNodeJs, FaDatabase, FaSymfony, FaDrupal } from "react-icons/fa";
import { SiStrapi, SiTailwindcss } from "react-icons/si";
import project1 from "../assets/projects/redux.png";
import project2 from "../assets/projects/animage.png";
import project3 from "../assets/projects/countries.png";
import { useState, useEffect } from "react";

const Home = () => {
  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // State for loading
  const [isLoading, setIsLoading] = useState(true);

  // Featured projects data
  const featuredProjects = [
    {
      id: 1,
      title: "Redux online store app",
      description: "Full-featured online store with React & Strapi backend",
      tags: ["React", "Redux", "Bootstrap"],
      image: project1,
      link: "https://github.com/nahusenayElias/online-store-redux-app"
    },
    {
      id: 2,
      title: "Countries App",
      description: "Countries react app, we can add favourite countries, remove favourite and used News API from selected to display top ten news",
      tags: ["React", "Firebase", "Tailwind"],
      image: project2,
      link: "https://github.com/nahusenayElias/Countries_API"
    },
    {
      id: 3,
      title: "Animal app",
      description: "React project with categories of Fishes, Birds, Insects and Animals. This app used advanced react concepts.",
      tags: ["React", "Firebase", "Redux"],
      image: project3,
      link: "https://github.com/nahusenayElias/react_zoo_app"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-50">
        {/* Hero Banner - Consistent with other pages */}
          <Hero
            title="Modern Web Solutions"
            subtitle="I build performant, user-focused applications"
            ctaText="See My Work"
            ctaLink="#projects"
          />

      {/* Show spinner while loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>

          {/* Introduction Section */}
          <section className="container mx-auto px-4 py-16">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Full-Stack Developer Specializing in <span className="text-blue-600">React & Strapi</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                I create seamless digital experiences combining modern frontend technologies
                with robust backend solutions. My focus is on clean code, intuitive design,
                and scalable architecture.
              </p>
              <div className="flex justify-center gap-4">
                <motion.a
                  href="/about"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md"
                >
                  About Me
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium"
                >
                  Get in Touch
                </motion.a>
              </div>
            </motion.div>
          </section>

          {/* Tech Stack Section */}
          <section className="bg-white py-16">
            <div className="container mx-auto px-4">
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ delay: 0.2 }}
              >
                My Core Technologies
              </motion.h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-4xl mx-auto">
                {[
                  { icon: <FaReact className="text-4xl text-blue-500" />, name: "React" },
                  { icon: <FaSymfony className="text-4xl text-dark-500" />, name: "Symfony" },
                  { icon: <FaDrupal className="text-4xl text-blue-600" />, name: "Drupal" },
                  { icon: <SiStrapi className="text-4xl text-blue-500" />, name: "Strapi" },
                  { icon: <SiTailwindcss className="text-4xl text-cyan-500" />, name: "Tailwind" },
                  { icon: <FaDatabase className="text-4xl text-gray-500" />, name: "PostgreSQL" }
                ].map((tech, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 * index }}
                  >
                    {tech.icon}
                    <span className="mt-3 font-medium text-gray-700">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Projects Section */}
          <section id="projects" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ delay: 0.3 }}
              >
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Featured Projects
                  </h2>
                  <a
                    href="/projects"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    View All <FiArrowRight className="ml-1" />
                  </a>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {featuredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.3 + (index * 0.1) }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a
                          href={project.link}
                          className="text-blue-600 font-medium inline-flex items-center hover:underline"
                        >
                          Case Study <FiArrowRight className="ml-1" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-blue-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Ready to Start Your Project?
                </h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto">
                  I'm currently available for freelance work and full-time positions.
                  Let's discuss how I can help bring your ideas to life.
                </p>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold shadow-lg"
                >
                  Get in Touch
                </motion.a>
              </motion.div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;