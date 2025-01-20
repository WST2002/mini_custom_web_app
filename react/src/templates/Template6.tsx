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

export const Template6: React.FC<Props> = ({ data }) => {
  const upiLink = generateUPILink(data.paymentLink);
  const parsedLinks = Array.isArray(data.customLinks) 
    ? data.customLinks 
    : data.customLinks 
      ? JSON.parse(data.customLinks) 
      : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50">
      {/* Hero Section - Minimalist Split Design */}
      <header className="min-h-screen grid md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center p-12"
        >
          <img
            src={useImageUrl(data.logo)}
            alt={data.businessName}
            className="w-24 h-24 mb-8"
          />
          <h1 className="text-5xl font-bold text-indigo-900 mb-6">{data.businessName}</h1>
          <p className="text-xl text-gray-600">{data.aboutUs}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-indigo-900 flex items-center justify-center p-12"
        >
          <SocialLinks
            links={data.socialLinks}
            className="grid grid-cols-2 gap-8"
            iconClassName="w-12 h-12 text-white"
          />
        </motion.div>
      </header>

      {/* Products Grid - Modern Card Layout */}
      <section className="py-24 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 text-indigo-900"
        >
          Featured Products
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {data.products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-xl"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={useImageUrl(product.image)}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-indigo-900">₹{product.price}</span>
                  <a
                    href={product.paymentLink}
                    className="bg-indigo-900 text-white px-6 py-2 rounded-full hover:bg-indigo-800 transition-colors"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Section - Masonry Style */}
      {data.photoGallery.length > 0 && (
        <section className="py-24 bg-white">
          <h2 className="text-4xl font-bold text-center mb-16 text-indigo-900">Our Gallery</h2>
          <Gallery images={data.photoGallery} />
        </section>
      )}

      {/* Contact Section - Clean Split Layout */}
      <section className="py-24 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-12">Get in Touch</h2>
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6" />
                  <span>{data.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6" />
                  <span>contact@{data.businessName.toLowerCase()}.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6" />
                  <span>123 Business Street, City, Country</span>
                </div>
                <CustomLinks
                  links={parsedLinks}
                  className="flex flex-col gap-4 mt-8"
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-white text-indigo-900 p-12 rounded-2xl">
              <QRCodeSVG value={upiLink} size={200} />
              <p className="mt-6 text-lg">Scan to pay via UPI</p>
              <p className="mt-2 text-sm text-gray-500">UPI ID: {data.paymentLink}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-indigo-950 text-white py-8">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">{data.businessName}</div>
            <SocialLinks
              links={data.socialLinks}
              className="flex gap-6"
              iconClassName="w-6 h-6"
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