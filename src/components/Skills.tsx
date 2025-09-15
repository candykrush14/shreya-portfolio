import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Technologies',
      skills: [
        { name: 'React', level: 95, color: 'from-blue-500 to-cyan-500' },
        { name: 'TypeScript', level: 90, color: 'from-blue-600 to-blue-700' },
        { name: 'Next.js', level: 88, color: 'from-gray-800 to-gray-900' },
        { name: 'Vue.js', level: 75, color: 'from-green-500 to-green-600' },
        { name: 'JavaScript (ES6+)', level: 95, color: 'from-yellow-500 to-orange-500' },
        { name: 'HTML5 & CSS3', level: 98, color: 'from-orange-500 to-red-500' }
      ]
    },
    {
      title: 'Styling & Design',
      skills: [
        { name: 'Tailwind CSS', level: 92, color: 'from-teal-500 to-cyan-500' },
        { name: 'Styled Components', level: 85, color: 'from-pink-500 to-purple-500' },
        { name: 'SASS/SCSS', level: 88, color: 'from-pink-600 to-pink-700' },
        { name: 'CSS-in-JS', level: 80, color: 'from-indigo-500 to-purple-500' },
        { name: 'Responsive Design', level: 95, color: 'from-green-600 to-teal-600' },
        { name: 'Figma', level: 85, color: 'from-purple-600 to-pink-600' }
      ]
    },
    {
      title: 'Backend & Database',
      skills: [
        { name: 'Node.js', level: 82, color: 'from-green-600 to-green-700' },
        { name: 'Express.js', level: 80, color: 'from-gray-700 to-gray-800' },
        { name: 'MongoDB', level: 75, color: 'from-green-700 to-green-800' },
        { name: 'PostgreSQL', level: 70, color: 'from-blue-700 to-blue-800' },
        { name: 'GraphQL', level: 78, color: 'from-pink-600 to-purple-600' },
        { name: 'REST APIs', level: 88, color: 'from-indigo-600 to-blue-600' }
      ]
    },
    {
      title: 'Tools & Workflow',
      skills: [
        { name: 'Git & GitHub', level: 92, color: 'from-gray-800 to-black' },
        { name: 'Webpack', level: 75, color: 'from-blue-600 to-indigo-600' },
        { name: 'Vite', level: 85, color: 'from-purple-600 to-indigo-600' },
        { name: 'Docker', level: 70, color: 'from-blue-500 to-blue-600' },
        { name: 'AWS', level: 68, color: 'from-orange-500 to-yellow-500' },
        { name: 'Testing (Jest, RTL)', level: 80, color: 'from-red-600 to-red-700' }
      ]
    }
  ];

  const certifications = [
    { name: 'AWS Certified Developer', issuer: 'Amazon Web Services', year: '2024' },
    { name: 'Meta Front-End Developer', issuer: 'Meta', year: '2023' },
    { name: 'Google UX Design', issuer: 'Google', year: '2023' },
    { name: 'React Developer Certification', issuer: 'React Training', year: '2022' }
  ];

  const SkillBar = ({ skill, index }: { skill: any, index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
        <span className="text-sm text-gray-500">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
          viewport={{ once: true }}
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
        >
          <div className="absolute inset-0 bg-white/20 rounded-full"></div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills, tools, and technologies 
            I use to build exceptional digital experiences.
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar key={skill.name} skill={skill} index={skillIndex} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Tech Stack I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'React', 'TypeScript', 'Next.js', 'Tailwind', 'Node.js', 'MongoDB',
              'GraphQL', 'AWS', 'Docker', 'Git', 'Figma', 'Jest'
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-6 py-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all cursor-default"
              >
                <span className="text-sm font-medium text-gray-700">{tech}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Certifications & Learning
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 text-center hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{cert.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{cert.issuer}</p>
                <p className="text-xs text-gray-500">{cert.year}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
