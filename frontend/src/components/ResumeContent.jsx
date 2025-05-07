import profileImage from "../assets/images/img.png";
import qrCodeImage from "../assets/images/frame.png";

import emailIcon from "../assets/icons/email.png";
import phoneIcon from "../assets/icons/phone.png";
import locationIcon from "../assets/icons/location1.png";

const ResumeContent = {
  personalInfo: {
    name: "Elias Hagos",
    title: "Full-Stack Developer",
    email: {
      text: "eliasars@yahoo.com",
      icon: emailIcon
    },
    phone: {
      text: "+358449125794",
      icon: phoneIcon
    },
    location: {
      text: "Helsinki, Finland",
      icon: locationIcon
    },
    photo: profileImage,
    qrCode: qrCodeImage,
    summary:
      "Humanities graduate with two years of government and non-governmental work experience, transitioning into web development. Combining strong analytical skills from humanities background with emerging technical expertise in web technologies. Passionate about learning and overcoming new challenges in web development."
  },

  stats: [
    { value: "2+", label: "Years Experience" },
    { value: "30+", label: "Projects" }
  ],

  experience: [
    {
      position: "Intern",
      company: "Tutors Oy",
      period: "03.02.2025 – 30.04.2025",
      description:
        "Part of the team that developed responsive website and e-commerce platform for Kiosco Amanda a Spanish restaurant website using modern frontend and backend frameworks."
    },
    {
      position: "Capacity Building Officer",
      company: "INSA, Ethiopia",
      period: "2010–2012",
      description:
        "Part of the capacity building team in INSA, a governmental organization, and served as a capacity building expert."
    }
  ],

  education: [
    {
      degree: "Full Stack Web Development",
      institution: "Business College Helsinki",
      year: "2025"
    },
    {
      degree:
        "Master of Arts in Adult Education and Developmental Work Research",
      institution: "University of Helsinki",
      year: "2015"
    },
    {
      degree: "Bachelor of Arts in Educational Planning and Management",
      institution: "Addis Ababa University",
      year: "2009"
    }
  ],

  skills: [
    { name: "React", level: 80, featured: true },
    { name: "PHP", level: 75, featured: true },
    { name: "JavaScript", level: 75, featured: true },
    { name: "Symfony", level: 70 },
    { name: "Drupal", level: 80 },
    { name: "Strapi", level: 70 },
    { name: "CSS/SCSS", level: 85 },
    { name: "Postgresql", level: 75 }
  ],

  featuredSkills: [
    {
      name: "React",
      percentage: 80,
      icon:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      featured: true
    },
    {
      name: "Symfony",
      percentage: 70,
      icon:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg",
      featured: true
    },
    {
      name: "JavaScript",
      percentage: 75,
      icon:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      featured: true
    }
  ],

  tools: [
    {
      name: "VS Code",
      icon:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
    },
    {
      name: "Git",
      icon:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
    },
    {
      name: "Docker",
      icon:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
    },
    {
      name: "Jest",
      icon:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg"
    },
    {
      name: "Figma",
      icon:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
    }
  ]
};

export default ResumeContent;