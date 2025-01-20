import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { BusinessData } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { Gallery } from '../components/Gallery';
import { ContactButtons } from '../components/ContactButtons';
import { CustomLinks } from '../components/CustomLinks';
import { SocialLinks } from '../components/SocialLinks';
import { useImageUrl } from '@/hooks/useImageUrl';
import { generateUPILink } from '@/utils/upiHelpers';
import logo from '../public/logo.png';

interface Props {
  data: BusinessData;
}

export const Template3: React.FC<Props> = ({ data }) => {
  const upiLink = generateUPILink(data.paymentLink)
  const parsedLinks = Array.isArray(data.customLinks) 
  ? data.customLinks 
  : data.customLinks 
    ? JSON.parse(data.customLinks) 
    : [];
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="min-h-screen relative overflow-hidden">
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)'
          }}
        />
        <div className="relative z-10 h-screen flex-col flex items-center justify-center">
          <img
            src={useImageUrl(data.logo)}
            alt={data.businessName}
            className="w-28 h-24 object-cover"
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <h1 className="text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              {data.businessName}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{data.aboutUs}</p>
          </motion.div>
        </div>
      </div>

      {/* Products Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
          >
            Our Products
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-center px-4 py-8">
            {data.products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group w-fit relative bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                  <img
                    src={useImageUrl(product.image)}
                    alt={product.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
                  <p className="text-gray-500 mb-4">{product.desc}</p>
                  <div className="flex justify-between flex-col items-center">
                    <span className="text-2xl font-semibold text-blue-500">₹{product.price}</span>
                    <motion.a href={product.paymentLink} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 my-3 py-2 rounded-lg font-semibold transform hover:scale-105 transition-transform">
                      Buy Now
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Gallery Section */}
      {data.photoGallery.length > 0 && <section className="py-32 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
          >
            Gallery
          </motion.h2>
          <Gallery images={data.photoGallery} />
        </div>
      </section>}

      {/* Contact Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
          >
            Contact Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div className="space-y-8">
              {[
                { icon: Phone, text: data.phoneNumber },
                { icon: Mail, text: `contact@${data.businessName.toLowerCase()}.com` },
                { icon: MapPin, text: '123 Business Street, City, Country' }
              ].map(({ icon: Icon, text }, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-6 p-6 rounded-xl bg-gray-900"
                >
                  <Icon className="w-8 h-8 text-blue-500" />
                  <span className="text-lg">{text}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center p-12 bg-gray-900 rounded-2xl"
            >
              <div className="flex flex-col items-center justify-center">
                <QRCodeSVG value={upiLink} size={200} />
                <p className="mt-4 text-gray-600">Scan to pay via UPI</p>
                <p className="mt-2 text-sm text-gray-500">UPI ID: {data.paymentLink}</p>
              </div>
            </motion.div>
            <CustomLinks
              links={parsedLinks}
              className="flex flex-col items-center gap-4"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-6 md:mb-0"
            >
              {data.businessName}
            </motion.div>
            <div className="flex gap-8 px-14">
              <SocialLinks
                links={data.socialLinks}
                className="flex justify-center gap-8"
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