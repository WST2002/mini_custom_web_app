import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from '../../public/logo.png';

export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-5 left-8 z-20"
    >
      <Link 
        to="/" 
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <img 
          src={logo} 
          alt="EduCreative Logo" 
          className="h-10 w-10" 
        />
        <h1 className="text-2xl font-bold">
          <span className="text-purple-500">Edu</span>
          <span className="text-blue-500">Creative</span>
        </h1>
      </Link>
    </motion.div>
  );
}