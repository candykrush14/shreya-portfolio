import { motion } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce platform with microservices architecture, built using React, TypeScript, and advanced state management. Features product catalog, shopping cart, and secure checkout.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
      technologies: ['React', 'TypeScript', 'Zustand', 'Tailwind CSS', 'Framer Motion', 'Microservices'],
      githubUrl: 'https://github.com/candykrush14/shreya-portfolio',
      liveUrl: '/shreya-portfolio/ecommerce-platform/index.html',
      category: 'Full Stack'
    },
    {
      id: 2,
      title: 'Interactive Analytics Dashboard',
      description: 'A comprehensive data visualization dashboard with drag-and-drop widgets, real-time charts, and customizable layouts. Features include responsive design, interactive charts with D3.js, and advanced filtering capabilities.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
      technologies: ['React', 'TypeScript', 'D3.js', 'Tailwind CSS', 'Framer Motion'],
      githubUrl: 'https://github.com/candykrush14/shreya-portfolio',
      liveUrl: 'https://candykrush14.github.io/shreya-portfolio/analytics-dashboard-pages/',
      category: 'Data Visualization'
    },
    {
      id: 3,
      title: 'Social Media Mobile App',
      description: 'Cross-platform mobile application with real-time messaging, media sharing, and social networking features using React Native.',
      image: '/api/placeholder/600/400',
      technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux', 'Socket.io'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.com',
      category: 'Mobile'
    },
    {
      id: 4,
      title: 'Developer Portfolio Template',
      description: 'Open-source portfolio template for developers with modern design, animations, and responsive layout. Highly customizable and well-documented.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'MDX', 'Vercel'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.com',
      category: 'Open Source'
    },
    {
      id: 5,
      title: 'Real-time Collaboration Tool',
      description: 'Collaborative workspace application with real-time editing, video calls, and project management features similar to Figma and Slack.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'WebRTC', 'Socket.io', 'Canvas API', 'WebGL', 'Redis'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.com',
      category: 'Web App'
    },
    {
      id: 6,
      title: 'Blockchain NFT Marketplace',
      description: 'Decentralized NFT marketplace with wallet integration, smart contracts, and modern Web3 features built on Ethereum.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Web3.js', 'Solidity', 'IPFS', 'MetaMask', 'Hardhat'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.com',
      category: 'Blockchain'
    }
  ];

  const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Project Image */}
      <div className="relative h-64 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <Play size={48} className="mx-auto mb-2" />
            <p className="text-lg font-semibold">{project.category}</p>
          </div>
        </div>
        
        {/* Overlay buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <Github size={18} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={project.liveUrl}
            onClick={(e) => {
              // Special handling for analytics dashboard
              if (project.id === 2) {
                e.preventDefault();
                window.open('https://candykrush14.github.io/shreya-portfolio/analytics-dashboard-pages/', '_blank');
                return;
              }
              
              // Handle other non-http URLs
              if (!project.liveUrl.startsWith('http')) {
                e.preventDefault();
                window.open(project.liveUrl, '_blank');
              }
              // Handle localhost URLs
              else if (project.liveUrl.includes('localhost')) {
                e.preventDefault();
                window.open(project.liveUrl, '_blank');
              }
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ExternalLink size={18} />
          </motion.a>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {project.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.liveUrl}
            onClick={(e) => {
              // Special handling for analytics dashboard
              if (project.id === 2) {
                e.preventDefault();
                window.open('https://candykrush14.github.io/shreya-portfolio/analytics-dashboard-pages/', '_blank');
                return;
              }
              
              // Handle other non-http URLs
              if (!project.liveUrl.startsWith('http')) {
                e.preventDefault();
                window.open(project.liveUrl, '_blank');
              }
              // Handle localhost URLs  
              else if (project.liveUrl.includes('localhost')) {
                e.preventDefault();
                window.open(project.liveUrl, '_blank');
              }
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            <ExternalLink size={16} />
            Live Demo
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
          >
            <Github size={16} />
            Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of my recent work, demonstrating expertise in modern frontend technologies, 
            full-stack development, and innovative problem-solving.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 hover:shadow-lg transition-all duration-200"
          >
            View All Projects on GitHub
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
