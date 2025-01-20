import { motion, AnimatePresence } from 'framer-motion';
import { Eye, MoveHorizontal } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { templates } from './template-data';
import Modal from './Modal'; // Import the Modal component

export function TemplateCarousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal visibility

  // Variants for sliding animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

  // Function to paginate templates (i.e., change the currentIndex)
  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex >= templates.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = templates.length - 1;
      return nextIndex;
    });
  };

  // Function to open the modal
  const handlePreview = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto h-[600px]">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 400, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.3 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            console.log(e)
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full"
        >
          <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden">
            <motion.img
              src={templates[currentIndex].image}
              alt={templates[currentIndex].title}
              className="w-full my-3 h-[400px] object-contain"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="p-6">
              <span className="text-sm text-purple-500">{templates[currentIndex].category}</span>
              <h3 className="text-xl font-semibold text-white mt-2">
                {templates[currentIndex].title}
              </h3>
              <p className="text-gray-400 mt-2">{templates[currentIndex].description}</p>
              <Button 
                variant="outline" 
                className="mt-4 w-full bg-purple-600/10 hover:bg-purple-600/20 border-purple-500/50"
                onClick={handlePreview} // Open modal on click
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview Template
              </Button>
            </div>
          </div>
          <motion.div 
            className="flex items-center justify-center gap-2 mt-4 text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{
                x: [-5, 5, -5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <MoveHorizontal className="w-5 h-5" />
            </motion.div>
            <motion.span
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Slide to see other templates
            </motion.span>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Modal component */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        currentIndex={currentIndex} // Pass the current template to the modal
      />
    </div>
  );
}
