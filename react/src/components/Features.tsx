import { motion } from 'framer-motion';
import { Code2, Phone, MessageCircle, Share2, Image, DollarSign, Eye } from 'lucide-react';
import { Card } from './ui/card';

const features = [
  {
    icon: <Phone className="h-8 w-8 text-purple-500" />,
    title: 'Click to Call',
    description: 'Your customers will reach you by just tapping on the mobile number on Card.',
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-blue-500" />,
    title: 'Click To WhatsApp',
    description: 'Your customers can WhatsApp you without even saving your number through this card!',
  },
  {
    icon: <Share2 className="h-8 w-8 text-green-500" />,
    title: 'Social and Other Links',
    description: 'Customers can visit your social sites with Mini website.',
  },
  {
    icon: <Share2 className="h-8 w-8 text-pink-500" />,
    title: 'Unlimited Share',
    description: 'You can share your Mini website unlimited times to anyone using social media and WhatsApp.',
  },
  {
    icon: <Code2 className="h-8 w-8 text-purple-500" />,
    title: 'Easy To Update',
    description: 'You can update your details as and when you want to change unlimited times.',
  },
  {
    icon: <Image className="h-8 w-8 text-blue-500" />,
    title: 'Photo Gallery',
    description: 'You can show your business-related images and products gallery to your customers.',
  },
  {
    icon: <DollarSign className="h-8 w-8 text-green-500" />,
    title: 'Payment Info',
    description: 'Show your payment details to your customers, like Paytm, PhonePe, Google Pay, Bank Account (Including QR code).',
  },
  {
    icon: <Eye className="h-8 w-8 text-pink-500" />,
    title: 'Visitation',
    description: 'You can see the unique visitor.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Create Your Website with Ease
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to build a professional website without coding knowledge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-black/50 backdrop-blur-sm border-gray-800 hover:border-gray-700 transition-colors">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
