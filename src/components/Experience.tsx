import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Download } from 'lucide-react';

const Experience = () => {
  const handleDownloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/shreya-portfolio/resume.pdf'; // Adjust path for GitHub Pages
    link.download = 'Shreya_Srivastava_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const experiences = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Maersk',
      location: 'Bengaluru, India',
      duration: 'Jan 2024 - Present',
      type: 'Full-time',
      description: 'Led frontend development for enterprise apps serving 100K+ users. Built AI-powered, scalable UIs for logistics workflows with real-time analytics, LLM-driven insights, and fraud detection using modern, performance-focused solutions',
      achievements: [
          'Improved app load time by 40% via performance optimizations (code splitting, lazy loading)',
          'Led migration to TypeScript across 15+ components',
          'Built scalable React apps for AI-driven logistics and travel workflows.',
          'Integrated GenAI features and LLM chatbots using OpenAI, LangChain, and FAISS—cut support time by 35%.',
          'Reduced deployment time by 60% by implementing CI/CD.',
          'Designed modular frontends with React Hooks, Context API, and Vite.js.',
          'Delivered accessible, responsive UIs and real-time analytics dashboards.',
          'Collaborated on scalable APIs and caching strategies with backend teams',
          'Enhanced security with OAuth2 and JWT, ensuring compliance with industry standards.',
          'Implemented robust testing with Jest and React Testing Library, achieving 90%+ coverage.',
          'Optimized cloud deployments on Azure, reducing costs by 25%.',
          'Led micro-frontend architecture across cross-functional teams.'

      ],
      technologies: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Azure', 'Docker','Python','Node.js','OpenAI','LangChain','FAISS'],
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Fullstack Software Development Engineer',
      company: 'Accenture',
      location: 'Bengaluru, India',
      duration: 'Aug 2021 - Jan 2024',
      type: 'Full-time',
      description: 'Led development of analytics platforms and enterprise web applications with secure authentication, optimized UI, and data-driven insights across multiple projects.',
      achievements: [
          'Developed 10+ React components used across multiple products',
          'Improved user engagement by 35% through UX optimizations',
          'Integrated payment systems processing $1M+ monthly transactions',
          'Created comprehensive testing suite with 90% code coverage',
          'Built secure enterprise-grade platforms using React with multi-factor authentication, MSAL 1.5.8, and dynamic dashboards',
          'Migrated legacy systems to modern, maintainable frontend stacks using TypeScript, significantly reducing technical debt and bug rate',
          'Implemented frontend performance debugging via Chrome DevTools, reducing Time to Interactive (TTI) and optimizing asset delivery',
          'Practiced test-driven development (TDD) and MVC architecture principles to create scalable, clean codebases',
          'Collaborated cross-functionally with backend, DevOps, and QA teams, contributing to CI/CD pipelines and robust Git workflows',

      ],
      technologies: ['React', 'JavaScript', 'Jest', '.Net core', 'Azure', 'MSAL', '.Net MVC', 'SQL Server', 'GIT', 'CI/CD'],
      color: 'from-green-500 to-teal-600'
    },
    {
     id: 3,
      title: 'Associate Software Developer',
      company: 'Accenture',
      location: 'Bengaluru, India',
      duration: 'Oct 2019 - Aug 2021',
      type: 'Full-time',
      description: 'Designed and optimized responsive web applications, improved system performance, and enhanced scalability via reusable code and robust testing practices.',
      achievements: [
        'Contributed to 5 client projects during internship period',
        'Learned React, Redux, and modern JavaScript best practices',
        'Received outstanding intern performance review by getting rewarded with sparkling star',
        'Created responsive UIs and reusable components using React and TypeScript, ensuring mobile-first accessibility',
        'Integrated APIs, performed SQL operations, and executed automated black-box testing, resolving 30% of known issues',
        'Led frontend optimization initiatives, enhancing page speed and overall UX on desktop and mobile'

      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
      color: 'from-orange-500 to-red-600'
    }
  ];

  const ExperienceCard = ({ experience, index }: { experience: typeof experiences[0], index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}
    >
      {/* Timeline dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 lg:flex hidden">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
          viewport={{ once: true }}
          className={`w-4 h-4 bg-gradient-to-r ${experience.color} rounded-full border-4 border-white shadow-lg`}
        />
      </div>

      {/* Experience Card */}
      <motion.div
        whileHover={{ y: -5 }}
        className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 ${
          index % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'
        } lg:w-96`}
      >
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 bg-gradient-to-r ${experience.color} text-white text-xs font-medium rounded-full`}>
              {experience.type}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar size={14} className="mr-1" />
              {experience.duration}
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {experience.title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-2">
            <span className="font-medium">{experience.company}</span>
            <ExternalLink size={14} className="ml-2 opacity-60" />
          </div>
          
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin size={14} className="mr-1" />
            {experience.location}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {experience.description}
        </p>

        {/* Key Achievements */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Achievements:</h4>
          <ul className="space-y-2">
            {experience.achievements.map((achievement, achievementIndex) => (
              <motion.li
                key={achievementIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + achievementIndex * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start text-sm text-gray-600"
              >
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                {achievement}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Technologies Used:</h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + techIndex * 0.05 }}
                viewport={{ once: true }}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            My journey as a frontend engineer, building innovative solutions and 
            growing from intern to senior engineer at leading tech companies.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500 hidden lg:block" />
          
          {/* Experiences */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={handleDownloadResume}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Download size={20} className="mr-2" />
            Download Full Resume
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
