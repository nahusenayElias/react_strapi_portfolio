import Hero from "../components/Hero";
import {
  FaCode,
  FaGraduationCap,
  FaBriefcase,
  FaTools,
  FaStar,
  FaDownload,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import ResumeContent from "../components/ResumeContent.jsx";
import generateResumePDF from "../utils/PdfGenerator.jsx";


const renderURL = import.meta.env.VITE_RENDER_URL;

const About = () => {
  // Destructure data from ResumeContent
  const {
    personalInfo,
    stats,
    experience,
    education,
    tools,
    featuredSkills: staticFeaturedSkills,
  } = ResumeContent;

  const profileImage = personalInfo.photo;

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  // Fetch skills from API
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${renderURL}/api/skills?populate=*`);

        const skillsData = response.data.data.map((skill) => {
          const iconData = skill.Icon?.[0]; // icon is an array
          const iconUrl = iconData?.formats?.small?.url || iconData?.url;

          return {
            id: skill.id,
            name: skill.Name,
            percentage: Math.round((skill.proficiencyLevel / 10) * 100),
            description: skill.Description,
            category: skill.category || "other",
            icon: iconUrl ? `${renderURL}${iconUrl}` : getIconForSkill(skill.Name),
            featured: skill.featured || false,
          };
        });

        setSkills(skillsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);



  // Helper function to get skill icons
  const getIconForSkill = (skillName) => {
    if (!skillName) return null;
    const iconMap = {
      react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      symfony: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg",
      postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      php: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      strapi: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/strapi/strapi-original.svg",
    };
    return iconMap[skillName.toLowerCase()] || null;
  };

  // Handle PDF download
  const handleDownloadResume = async () => {
    setIsGeneratingPdf(true);
    try {
      const resumeData = {
        personalInfo: {
          ...personalInfo,
          photo: profileImage,
        },
        skills: skills.map((skill) => ({
          ...skill,
          icon: skill.icon || getIconForSkill(skill.name),
        })),
        experience,
        education,
        tools,
        stats,
        featuredSkills: [
          ...staticFeaturedSkills,
          ...skills.filter((skill) => skill.featured),
        ],
      };
      await generateResumePDF(resumeData);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Prepare categories and filtered skills
  const categories = [
    "all",
    ...new Set(skills.map((skill) => skill.category || "other")),
  ];
  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  const allFeaturedSkills = [
    ...staticFeaturedSkills,
    ...skills.filter((skill) => skill.featured),
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col relative overflow-hidden">
      <Hero
        title="About Me"
        subtitle="Full-Stack Developer | Passionate about Web Development"
      />

      {/* Download Resume Button */}
      <div className="container mx-auto px-4 pt-4">
        <motion.button
          onClick={handleDownloadResume}
          disabled={isGeneratingPdf}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isGeneratingPdf ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
              Generating PDF...
            </>
          ) : (
            <>
              <FaDownload className="mr-2" />
              Download Resume
            </>
          )}
        </motion.button>
      </div>

      {isLoading ? (
        <div className="flex-1 flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8 flex-1" id="resume-content">
          {/* Profile Section */}
          <motion.section
            className="flex flex-col md:flex-row items-center gap-12 mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            {/* Profile Image - Larger size */}
            <motion.img
              src={profileImage}
              alt="Profile"
              className="w-64 h-64 md:w-80 md:h-80 rounded-full shadow-xl border-4 border-blue-500 bg-white object-cover"
            />

            <div className="md:max-w-[600px] mt-6 md:mt-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Hi, I'm {personalInfo.name}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {personalInfo.summary}
              </p>
              {/* Stats */}
              <div className="flex flex-wrap gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md text-center min-w-[120px]"
                  >
                    <div className="text-2xl font-bold text-blue-600">
                      {stat.value}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <FaCode className="text-blue-500 text-2xl mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">My Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm capitalize ${
                      activeCategory === category
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Skills */}
            {allFeaturedSkills.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <FaStar className="text-yellow-500 mr-2" /> Featured Skills
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {allFeaturedSkills.map((skill, index) => (
                    <SkillCard
                      key={skill.id || `featured-${index}`}
                      {...skill}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All Skills */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {filteredSkills.map((skill, index) => (
                <SkillCard key={skill.id || index} {...skill} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section
            className="mb-16 bg-white p-8 rounded-xl shadow-md"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-8">
              <FaBriefcase className="text-blue-500 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">
                Professional Experience
              </h2>
            </div>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <ExperienceItem key={index} {...exp} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center mb-8">
              <FaGraduationCap className="text-blue-500 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Education</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <EducationItem key={index} {...edu} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Tools Section */}
          <motion.section
            className="bg-white p-8 rounded-xl shadow-md"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center mb-8">
              <FaTools className="text-blue-500 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">
                Tools & Technologies
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  className="px-4 py-2 bg-blue-50 rounded-full flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  {tool.icon && (
                    <img
                      src={tool.icon}
                      alt={tool.name}
                      className="w-5 h-5 mr-2"
                    />
                  )}
                  <span className="text-gray-700">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      )}
    </div>
  );
};

// Skill Card Component
const SkillCard = ({ icon, name, percentage, description, featured, index }) => (
  <motion.div
    className={`bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center ${
      featured ? "border-2 border-yellow-400" : ""
    }`}
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <div className="w-12 h-12 mb-4 flex items-center justify-center">
      {icon ? (
        <img
          src={icon}
          alt={name}
          className="w-full h-full object-contain p-1"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
          <FaCode className="text-gray-500 text-xl" />
        </div>
      )}
    </div>
    <h3 className="font-semibold text-gray-800">{name}</h3>
    <div className="w-full mt-3">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Proficiency</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
    {description && <p className="text-sm text-gray-600 mt-3">{description}</p>}
    {featured && (
      <div className="mt-2 flex items-center text-yellow-500 text-sm">
        <FaStar className="mr-1" /> Featured
      </div>
    )}
  </motion.div>
);


// Experience Item Component
const ExperienceItem = ({
  position,
  company,
  duration,
  description,
  index,
}) => (
  <motion.div
    className="border-l-4 border-blue-500 pl-6 py-2"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.15 }}
  >
    <h3 className="text-xl font-semibold text-gray-800">{position}</h3>
    <p className="text-blue-600">
      {company} • {duration}
    </p>
    <p className="mt-2 text-gray-600">{description}</p>
  </motion.div>
);


// Education Item Component
const EducationItem = ({ degree, institution, year, index }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <h3 className="text-xl font-semibold text-gray-800">{degree}</h3>
    <p className="text-blue-600 mt-2">{institution}</p>
    <p className="text-gray-500 mt-1">{year}</p>
  </motion.div>
);

export default About;
