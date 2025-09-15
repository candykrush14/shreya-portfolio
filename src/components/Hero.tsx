import { motion } from 'framer-motion';
import { ArrowDown, Download, Sparkles } from 'lucide-react';

const Hero = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Greeting */}
          <motion.div
            variants={textVariants}
            className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Available for new opportunities</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={textVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="block text-gray-900 mb-2">Hi, I'm</span>
            <span className="block gradient-text">Shreya Srivastava</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            variants={textVariants}
            className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-600 mb-8 max-w-4xl mx-auto"
          >
            Frontend Engineer crafting{' '}
            <motion.span
              animate={{ color: ['#3B82F6', '#8B5CF6', '#06B6D4', '#3B82F6'] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="font-medium"
            >
              exceptional digital experiences
            </motion.span>
            {' '}with modern React, TypeScript, and cutting-edge web technologies
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={textVariants}
            className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Passionate about creating performant, accessible, and beautiful web applications 
            that solve real-world problems and delight users.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={textVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View My Work
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 font-medium rounded-full hover:bg-white hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <Download size={18} />
              Download Resume
            </motion.button>
          </motion.div>

          {/* Tech Stack Preview */}
          <motion.div
            variants={textVariants}
            className="mt-16 text-center"
          >
            <p className="text-sm text-gray-500 mb-4">Specialized in</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'GraphQL'].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 text-sm font-medium text-gray-700"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={24} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
