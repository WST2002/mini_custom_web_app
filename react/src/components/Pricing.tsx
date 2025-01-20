import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Silver',
    price: '0',
    features: [
      '1 Website',
      'Basic Templates',
      'Community Support',
      'Analytics',
    ],
    recommended: false,
  },
  {
    name: 'Gold',
    price: '999',
    features: [
      'Unlimited Websites',
      'Premium Templates',
      'Priority Support',
      'Analytics',
      'Add 5 Products',
      'Add 5 Photos',
      'Remove Branding',
    ],
    recommended: true,
  },
  {
    name: 'Platinum',
    price: '1999',
    features: [
      'Everything in Pro',
      'Premium Templates',
      'Dedicated Support',
      'Analytics',
      'Remove Branding',
      'Unlimited Photo Gallery',
      'Unlimited Add Products'
    ],
    recommended: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-black/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Start for free and upgrade as you grow. All plans come with a 14-day trial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`p-8 bg-black/50 backdrop-blur-sm border-gray-800 hover:border-gray-700 transition-all ${plan.recommended ? 'ring-2 ring-purple-500' : ''
                }`}>
                {plan.recommended && (
                  <span className="bg-purple-500 text-white text-sm font-medium px-3 py-1 rounded-full absolute -top-3 left-1/2 -translate-x-1/2">
                    Recommended
                  </span>
                )}
                <div className="text-center">
                  <h3 className="text-3xl font-semibold text-white mb-2">{plan.name}</h3>
                  <Link to={'/register'} className={`hover:text-gray-200`}>

                  <Button
                    variant={plan.recommended ? "default" : "outline"}
                    className={`w-full my-5 mb-6 ${plan.recommended ? "bg-purple-600 hover:bg-purple-700" : "text-black"
                      }`}
                  >
                      Get Started
                  </Button>
                  </Link>

                  <ul className="text-left space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-purple-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}