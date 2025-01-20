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

export const Template9: React.FC<Props> = ({ data }) => {
  const upiLink = generateUPILink(data.paymentLink);
  const parsedLinks = Array.isArray(data.customLinks) 
    ? data.customLinks 
    : data.customLinks 
      ? JSON.parse(data.customLinks) 
      : [];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Hero Section - Cyberpunk Style */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 opacity-50" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.05" fill-rule="evenodd"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"/%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        <div className="relative z-10 text-center px-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={useImageUrl(data.logo)}
              alt={data.businessName}
              className="w-48 h-48 mx-auto mb-12 rounded-full border-4 border-pink-500 glow"
            />
          </motion.div>
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
          >
            {data.businessName}
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl max-w-3xl mx-auto text-gray-300"
          >
            {data.aboutUs}
          </motion.p>
        </div>
      </header>

      {/* Products Section - Neon Cards */}
      <section className="py-32">
        <div className="container mx-auto px-8">
          <h2 className="text-6xl font-bold text-center mb-24 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {data.products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-black/50 rounded-xl overflow-hidden border border-pink-500/20 hover:border-pink-500/50 transition-colors"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={useImageUrl(product.image)}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-pink-500">{product.title}</h3>
                  <p className="text-gray-400 mb-6">{product.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-cyan-400">₹{product.price}</span>
                    <a
                      href={product.paymentLink}
                      className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 text-white"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - Cyberpunk Grid */}
      {data.photoGallery.length > 0 && (
        <section className="py-32 bg-black/50">
          <h2 className="text-6xl font-bold text-center mb-24 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
            Gallery
          </h2>
          <Gallery images={data.photoGallery} />
        </section>
      )}

      {/* Contact Section - Futuristic Layout */}
      <section className="py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v <boltAction type="file" filePath="src/templates/Template5.tsx">4h2v-4h4V6h-4V4zm0 36v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V6h-2v4h-4v2h4v4h2v-4h4V8h-4V6zm0 36v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black/50 p-12 rounded-2xl border border-pink-500/20"
            >
              <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                Connect With Us
              </h2>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-pink-500/10 rounded-full flex items-center justify-center border border-pink-500/20">
                    <Phone className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-pink-500">Phone</h3>
                    <p className="text-gray-400">{data.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/20">
                    <Mail className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-purple-500">Email</h3>
                    <p className="text-gray-400">contact@{data.businessName.toLowerCase()}.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-cyan-500/10 rounded-full flex items-center justify-center border border-cyan-500/20">
                    <MapPin className="w-6 h-6 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-cyan-500">Address</h3>
                    <p className="text-gray-400">123 Business Street, City, Country</p>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <CustomLinks
                  links={parsedLinks}
                  className="grid grid-cols-2 gap-4"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black/50 p-12 rounded-2xl border border-cyan-500/20"
            >
              <div className="flex flex-col items-center">
                <QRCodeSVG 
                  value={upiLink} 
                  size={240}
                  className="border-2 border-cyan-500/20 rounded-xl p-4"
                />
                <p className="mt-8 text-xl font-semibold text-cyan-400">Scan to pay via UPI</p>
                <p className="mt-2 text-gray-500">UPI ID: {data.paymentLink}</p>
                <SocialLinks
                  links={data.socialLinks}
                  className="flex gap-6 mt-12"
                  iconClassName="w-8 h-8 text-pink-500 hover:text-cyan-400 transition-colors"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-black/80 py-12 border-t border-pink-500/20">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-3xl font-bold mb-8 md:mb-0 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500">
              {data.businessName}
            </div>
            <SocialLinks
              links={data.socialLinks}
              className="flex gap-8"
              iconClassName="w-6 h-6 text-gray-400 hover:text-pink-500 transition-colors"
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