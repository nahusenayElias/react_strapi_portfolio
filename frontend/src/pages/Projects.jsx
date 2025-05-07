import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFilter, FiX } from 'react-icons/fi';
import { FaReact } from 'react-icons/fa';
import { SiSymfony, SiDrupal, SiTailwindcss, SiStrapi, SiTypescript, SiRedux } from 'react-icons/si';
import Hero from '../components/Hero';




const Projects = () => {
  // State management
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Sample data - replace with your actual projects
  const sampleProjects = [
    {
      id: 1,
      title: "Countries App",
      description: "A React advanced course as part of React24K program, in this app we can add favourite countries and remove from favourites. Also it fetches the top ten news about each country when selected. In this app, we learnt React in depth with variety of React features",
      tags: ["React", "Tailwind", "Firebase", "Full Stack"],
      techStack: ["react", "tailwind"],
      githubUrl: "https://github.com/nahusenayElias/Countries_API",
      imageUrl: "./assets/projects/countries.png"

    },
    {


      id: 2,
      title: "Final Team Project II: Drupal with Mautic",
      description: "We learn Drupal at school and in this project we experienced Mautic marketing automation module for final project with partner company Druid",
      tags: ["React", "Drupal", "Mautic", "Tailwind", "Full Stack"],
      techStack: ["react", "Drupal"],
      githubUrl: "https://github.com/nahusenayElias/Team_4",
      imageUrl: "./assets/projects/team4.png"

    },

    {
      id: 3,
      title: "Symfony Portfolio",
      description: "Symfony project done to refresh symfony skills and continue the learning journey.",
      tags: ["Tailwind", "Symfony", "Postgresql", "Full Stack"],
      techStack: ["react", "Symfony"],
      githubUrl: "https://github.com/nahusenayElias/symfony_portfolio",
      imageUrl: "./assets/projects/symfony_portfolio.png"
    },
    {

      id: 4,
      title: "Symfony Palindrome Project",
      description: "A symfony palindrome project, where when we enter words it checks if the word is a palindrome or not",
      tags: ["Symfony", "React", "Full Stack"],
      techStack: ["react", "symfony"],
      githubUrl: "https://github.com/nahusenayElias/symfony_palindrome",
      imageUrl: "./assets/projects/palindrome.png"
    },
    {
      id: 5,
      title: "Online Store Redux App",
      description: "A Redux online store app, where with fake store api makes the call and add to the cart and remove from the cart. This project was part of React Advanced course to acquaint ourselves with Redux",
      tags: ["React", "Redux", "Full Stack", "Tailwind"],
      techStack: ["react", "redux", "Tailwind"],
      githubUrl: "https://github.com/nahusenayElias/online-store-redux-app",
      imageUrl: "./assets/projects/redux.png"
    },

    {
      id: 6,
      title: "Animals App",
      description: "A TypeScript online store app, where with fake store api makes the call and add to the cart and remove from the cart. This project was part of React Advanced course to acquaint ourselves with TypeScript",
      tags: ["React", "JavaScript", "Full Stack", "Tailwind"],
      techStack: ["react", "Tailwind"],
      githubUrl: "https://github.com/nahusenayElias/react_zoo_app",
      liveUrl: "https://eliashagos.netlify.app/",
      imageUrl: "./assets/projects/animals.png"


    },
    {
      id: 7,
      title: "Online Store TypeScript App",
      description: "A TypeScript online store app, where with fake store api makes the call and add to the cart and remove from the cart. This project was part of React Advanced course to acquaint ourselves with TypeScript",
      tags: ["React", "TypeScript", "Full Stack", "Tailwind"],
      techStack: ["react", "typescript", "Tailwind"],
      githubUrl: "https://github.com/nahusenayElias/online-store-typescript",
      imageUrl: "./assets/projects/redux.png"


    }


  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(sampleProjects);
      setFilteredProjects(sampleProjects);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter categories
  const categories = ['All', 'React', 'Symfony', 'Drupal', 'Tailwind', 'TypeScript', 'Redux', 'Full Stack'];

  // Filter handler
  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project =>
          project.tags.includes(category)
      ));
    }
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <Hero
        title="My Projects"
        subtitle="Explore my development work and case studies"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Filter Controls */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="font-medium text-gray-700 mr-2 flex items-center">
              <FiFilter className="mr-2" /> Filter:
            </span>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
            {activeFilter !== 'All' && (
              <motion.button
                onClick={() => handleFilter('All')}
                className="flex items-center text-sm text-gray-500 ml-2"
                whileHover={{ scale: 1.05 }}
              >
                <FiX className="mr-1" /> Clear
              </motion.button>
            )}
          </div>
        </motion.section>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center py-12"
          >
            <h3 className="text-xl font-medium text-gray-700">
              No projects found in this category
            </h3>
            <button
              onClick={() => handleFilter('All')}
              className="mt-4 text-blue-600 hover:underline flex items-center justify-center mx-auto"
            >
              <FiX className="mr-1" /> Clear filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Tech icon mapping
  const techIcons = {
    react: <FaReact className="text-blue-500" />,
    symfony: <SiSymfony className="text-black-500" />,
    drupal: <SiDrupal className="text-blue-600" />,
    typescript: <SiTypescript className="text-blue-500" />,
    strapi: <SiStrapi className="text-blue-500" />,
    redux: <SiRedux className="text-purple-500" />,
    tailwind: <SiTailwindcss className="text-cyan-500" />
  };


  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { delay: index * 0.1 }
        }
      }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.imageUrl || '/project-placeholder.jpg'}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex space-x-3">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {project.techStack?.map(tech => (
              <span key={tech} className="text-lg" title={tech}>
                {techIcons[tech.toLowerCase()] || tech}
              </span>
            ))}
          </div>

          <div className="flex space-x-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="GitHub repository"
              >
                <FiGithub className="text-xl" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="Live demo"
              >
                <FiExternalLink className="text-xl" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;