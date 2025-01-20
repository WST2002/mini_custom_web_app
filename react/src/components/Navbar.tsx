import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import logo from '../public/logo.png';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToSection = useScrollToSection();

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 flex items-center gap-2"
          >
            <img src={logo} alt="EduCreative Logo" className="h-12 w-12" />
            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => handleNavClick('hero')}>
              <span className="text-purple-500">Edu</span>
              <span className="text-blue-500">Creative</span>
            </h1>
          </motion.div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink onClick={() => handleNavClick('features')}>Features</NavLink>
              <NavLink onClick={() => handleNavClick('templates')}>Templates</NavLink>
              <NavLink onClick={() => handleNavClick('pricing')}>Pricing</NavLink>
              <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
                <Link to={'/register'} className='text-white hover:text-gray-200'>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> :
                <div className="flex flex-col space-y-1">
                  <div className="h-1 w-6 bg-black"></div>
                  <div className="h-1 w-6 bg-black"></div>
                  <div className="h-1 w-6 bg-black"></div>
                </div>
              }
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-black/90 backdrop-blur-md"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink onClick={() => handleNavClick('features')}>Features</MobileNavLink>
            <MobileNavLink onClick={() => handleNavClick('templates')}>Templates</MobileNavLink>
            <MobileNavLink onClick={() => handleNavClick('pricing')}>Pricing</MobileNavLink>
            <Button variant="default" className="w-full bg-purple-600 hover:bg-purple-700 mt-4">
              <Link to={'/register'} className='text-white hover:text-gray-200'>
                Get Started
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function NavLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors bg-white/5 hover:bg-white/10"
    >
      {children}
    </button>
  );
}

function MobileNavLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="text-white hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left bg-white/5 hover:bg-white/10"
    >
      {children}
    </button>
  );
}