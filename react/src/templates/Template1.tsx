import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { BusinessData } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { Gallery } from '../components/Gallery';
import { ContactButtons } from '../components/ContactButtons';
import { SocialLinks } from '../components/SocialLinks';
import { CustomLinks } from '@/components/CustomLinks';
import { useImageUrl } from '@/hooks/useImageUrl';
import { generateUPILink } from '@/utils/upiHelpers';
import logo from '../public/logo.png';

interface Props {
  data: BusinessData;
}

export const Template1: React.FC<Props> = ({ data }) => {
  const upiLink = generateUPILink(data.paymentLink);
  const parsedLinks = Array.isArray(data.customLinks) 
  ? data.customLinks 
  : data.customLinks 
    ? JSON.parse(data.customLinks) 
    : [];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-screen"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <img
            src={useImageUrl(data.logo)}
            alt={data.businessName}
            className="w-28 h-24 object-cover"
          />
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl font-bold mb-4"
            >
              {data.businessName}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl"
            >
              {data.aboutUs}
            </motion.p>
          </div>
        </div>
      </motion.header>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl text-black font-bold mb-8">About Us</h2>
            <p className="text-lg text-gray-600">{data.aboutUs}</p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      {data.photoGallery.length > 0 &&
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-black text-center mb-12">Gallery</h2>

            <Gallery images={data.photoGallery} />
          </div>
        </section>}

      {/* Products Section */}
      <section className="py-20 text-black bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={useImageUrl(product.image)}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">₹{product.price}</span>
                    <motion.a href={product.paymentLink} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                      Buy Now
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50 text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                  <span>{data.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <span>contact@{data.businessName.toLowerCase()}.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <span>123 Business Street, City, Country</span>
                </div>
                <div className="space-y-8">
                  <CustomLinks
                    links={parsedLinks}
                    className="flex flex-col items-center gap-4"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <QRCodeSVG value={upiLink} size={200} />
                <p className="mt-4 text-gray-600">Scan to pay via UPI</p>
                <p className="mt-2 text-sm text-gray-500">UPI ID: {data.paymentLink}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">
              {data.businessName}
            </div>
            <SocialLinks
              links={data.socialLinks}
              className="flex justify-center px-16 gap-8"
              iconClassName="w-8 h-8"
            />
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