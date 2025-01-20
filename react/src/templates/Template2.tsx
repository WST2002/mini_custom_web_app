import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowDown } from 'lucide-react';
import { BusinessData } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { Gallery } from '../components/Gallery';
import { ContactButtons } from '../components/ContactButtons';
import { SocialLinks } from '../components/SocialLinks';
import { CustomLinks } from '../components/CustomLinks';
import { useImageUrl } from '@/hooks/useImageUrl';
import { generateUPILink } from '@/utils/upiHelpers';
import logo from '../public/logo.png';

interface Props {
  data: BusinessData;
}

export const Template2: React.FC<Props> = ({ data }) => {
  const upiLink = generateUPILink(data.paymentLink);
  const parsedLinks = Array.isArray(data.customLinks) 
  ? data.customLinks 
  : data.customLinks 
    ? JSON.parse(data.customLinks) 
    : [];
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center relative px-4">
        <img
          src={useImageUrl(data.logo)}
          alt={data.businessName}
          className="w-28 h-24 object-cover"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-7xl font-bold text-indigo-900 mb-6">{data.businessName}</h1>
          <p className="text-xl text-indigo-700 mb-12">{data.aboutUs}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10"
        >
          <ArrowDown className="w-8 h-8 text-indigo-600 animate-bounce" />
        </motion.div>
      </div>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-indigo-900 mb-16">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {data.products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={useImageUrl(product.image)}
                    alt={product.title}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{product.title}</h3>
                      <p className="text-white/90 mb-4">{product.desc}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-white">₹{product.price}</span>
                        <motion.a href={product.paymentLink} className="bg-white text-indigo-900 px-4 py-2 rounded-lg font-semibold">
                          Buy Now
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {data.photoGallery.length > 0 && <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-indigo-900 mb-16">Our Gallery</h2>
          <Gallery images={data.photoGallery} />
        </div>
      </section>}

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 bg-white/10 rounded-lg"
                >
                  <Phone className="w-6 h-6" />
                  <span>{data.phoneNumber}</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 bg-white/10 rounded-lg"
                >
                  <Mail className="w-6 h-6" />
                  <span>contact@{data.businessName.toLowerCase()}.com</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 bg-white/10 rounded-lg"
                >
                  <MapPin className="w-6 h-6" />
                  <span>123 Business Street, City, Country</span>
                </motion.div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <QRCodeSVG value={upiLink} size={200} />
                <p className="mt-4 text-gray-600">Scan to pay via UPI</p>
                <p className="mt-2 text-sm text-gray-500">UPI ID: {data.paymentLink}</p>
              </div>
              <CustomLinks
                links={parsedLinks}
                className="flex flex-col items-center gap-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-950 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">
              {data.businessName}
            </div>
            <div className="flex gap-6">
              <SocialLinks
                links={data.socialLinks}
                className="flex justify-center px-16 gap-8"
                iconClassName="w-8 h-8"
              />
            </div>
          </div>
        </div>
        <img src={logo} alt="EduCreative Logo" className="h-12 w-12" />
      </footer>

      <ContactButtons
        phoneNumber={data.phoneNumber}
        whatsappNumber={data.whatsappNumber}
      />
    </div>
  );
};