import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ContactButtons } from '../ContactButtons';

export function HeroContent() {
  return (
    <div className="relative z-10 text-center px-4">
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Create Your Website
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
          Without Code
        </span>
      </motion.h1>
      <motion.p
        className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        Build professional websites in minutes with our intuitive drag-and-drop builder.
        No coding required.
      </motion.p>
      <motion.button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-2 my-10 px-4 rounded-lg transition duration-300 hover:opacity-80">
        <Link to={'/register'} className='text-white hover:text-gray-200'>
          Make your Mini Website
        </Link>
        <ContactButtons
          phoneNumber={'9475195958'}
          whatsappNumber={'9475195958'}
        />
      </motion.button>
    </div>
  );
}