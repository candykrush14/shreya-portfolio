import { motion } from 'framer-motion';
import { Code2, Lightbulb, Users, Award } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Code2,
      title: 'Clean Code Advocate',
      description: 'Writing maintainable, scalable, and well-documented code following industry best practices and design patterns.'
    },
    {
      icon: Lightbulb,
      title: 'Problem Solver',
      description: 'Passionate about tackling complex challenges and finding innovative solutions that enhance user experience.'
    },
    {
      icon: Users,
      title: 'Team Collaborator',
      description: 'Excellent at working in cross-functional teams, mentoring junior developers, and contributing to technical decisions.'
    },
    {
      icon: Award,
      title: 'Performance Focused',
      description: 'Committed to building high-performance applications with optimal loading times and exceptional user experience.'
    }
  ];

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '5+', label: 'Years Experience' },
    { number: '20+', label: 'Technologies Mastered' },
    { number: '100%', label: 'Client Satisfaction' }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A passionate frontend engineer with a keen eye for design and a love for creating 
            exceptional digital experiences that make a difference.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Crafting Digital Experiences Since 2019
            </h3>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                I'm a frontend engineer who bridges the gap between design and technology. 
                With over 5 years of experience, I specialize in building modern, responsive, 
                and accessible web applications using React, TypeScript, and the latest web technologies.
              </p>
              <p>
                My journey started with a Computer Science degree, but my passion for creating 
                beautiful and functional user interfaces led me to specialize in frontend development. 
                I'm constantly learning and adapting to new technologies and industry trends.
              </p>
              <p>
                When I'm not coding, you'll find me contributing to open-source projects, 
                writing technical articles, or exploring the latest design trends and tools.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative mx-auto w-80 h-80 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <Code2 size={80} className="mx-auto mb-4" />
                  <p className="text-xl font-semibold">Frontend Engineer</p>
                  <p className="text-lg opacity-90">React • TypeScript • Design</p>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-2xl"
            >
              💡
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 w-20 h-20 bg-green-400 rounded-full flex items-center justify-center text-xl"
            >
              🚀
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full mb-4">
                <feature.icon size={24} />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="text-4xl lg:text-5xl font-bold gradient-text mb-2"
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
