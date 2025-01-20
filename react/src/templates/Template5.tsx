import React from 'react';
import { motion } from 'framer-motion';
import { BusinessData } from '../types';
import { Gallery } from '../components/Gallery';
import { ContactButtons } from '../components/ContactButtons';
import { SocialLinks } from '../components/SocialLinks';
import { CustomLinks } from '../components/CustomLinks';
import { CenteredProductGrid } from '../components/templates/CenteredProductGrid';
import { QRCodeSVG } from 'qrcode.react';
import { useImageUrl } from '@/hooks/useImageUrl';
import { generateUPILink } from '@/utils/upiHelpers';
import logo from '../public/logo.png';

interface Props {
  data: BusinessData;
}

export const Template5: React.FC<Props> = ({ data }) => {
  const upiLink = generateUPILink(data.paymentLink);
  const parsedLinks = Array.isArray(data.customLinks) 
  ? data.customLinks 
  : data.customLinks 
    ? JSON.parse(data.customLinks) 
    : [];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 to-emerald-600 text-white px-4"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </div>
        <div className="relative flex flex-col items-center z-10 max-w-4xl mx-auto text-center">
          <img
            src={useImageUrl(data.logo)}
            alt={data.businessName}
            className="w-28 h-24 object-cover"
          />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold mb-8"
          >
            {data.businessName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-emerald-50 max-w-2xl mx-auto"
          >
            {data.aboutUs}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <SocialLinks
              links={data.socialLinks}
              className="flex justify-center gap-8"
              iconClassName="w-8 h-8 hover:text-emerald-300 transition-colors"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Products Section */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-emerald-900 text-center mb-16"
          >
            Featured Products
          </motion.h2>
          <CenteredProductGrid products={data.products} />
        </motion.div>
      </section>

      {/* Gallery Section */}
      {data.photoGallery.length > 0 && <section className="py-24 px-4 bg-emerald-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl text-black font-bold text-center mb-16"
          >
            Our Gallery
          </motion.h2>
          <Gallery images={data.photoGallery} />
        </div>
      </section>}

      {/* Contact Section */}
      <section className="py-24 px-4 bg-emerald-900 text-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Get in Touch
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <CustomLinks
                links={parsedLinks}
                className="flex flex-col gap-4"
              />
              <div className="p-6 bg-white/10 rounded-xl">
                <div className="flex flex-col items-center justify-center">
                  <QRCodeSVG value={upiLink} size={200} />
                  <p className="mt-4 text-gray-600">Scan to pay via UPI</p>
                  <p className="mt-2 text-sm text-gray-500">UPI ID: {data.paymentLink}</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-white/10 rounded-xl"
              >
                <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                <SocialLinks
                  links={data.socialLinks}
                  className="flex gap-6"
                  iconClassName="w-6 h-6 hover:text-emerald-300 transition-colors"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 bg-emerald-950 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold">{data.businessName}</div>
          <SocialLinks links={data.socialLinks} />
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