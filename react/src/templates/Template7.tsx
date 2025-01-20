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

export const Template7: React.FC<Props> = ({ data }) => {
  const upiLink = generateUPILink(data.paymentLink);
  const parsedLinks = Array.isArray(data.customLinks) 
    ? data.customLinks 
    : data.customLinks 
      ? JSON.parse(data.customLinks) 
      : [];

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Hero Section - Dynamic Diagonal Split */}
      <header className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-emerald-900 transform -skew-y-6 origin-top-left" />
        <div className="relative h-full container mx-auto px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white max-w-2xl"
          >
            <img
              src={useImageUrl(data.logo)}
              alt={data.businessName}
              className="w-32 h-32 mb-8"
            />
            <h1 className="text-6xl font-bold mb-6">{data.businessName}</h1>
            <p className="text-xl opacity-90">{data.aboutUs}</p>
          </motion.div>
        </div>
      </header>

      {/* Products Section - Staggered Grid */}
      <section className="py-32">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-20 text-black">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {data.products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-wrap ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } bg-white rounded-xl overflow-hidden shadow-lg`}
              >
                <div className="w-full md:w-1/2">
                  <img
                    src={useImageUrl(product.image)}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center flex-wrap">
                  <h3 className="text-2xl font-bold mb-4">{product.title}</h3>
                  <p className="text-gray-600 mb-6">{product.desc}</p>
                  <div className="mt-auto flex justify-between items-center flex-wrap">
                    <span className="text-3xl font-bold text-emerald-900">₹{product.price}</span>
                    <a
                      href={product.paymentLink}
                      className="bg-emerald-900 text-white px-8 py-3 rounded-full hover:bg-emerald-800 transition-colors"
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

      {/* Gallery Section - Full Width Slider */}
      {data.photoGallery.length > 0 && (
        <section className="py-32 bg-emerald-900">
          <h2 className="text-5xl font-bold text-center mb-20 text-white">Gallery</h2>
          <Gallery images={data.photoGallery} />
        </section>
      )}

      {/* Contact Section - Modern Grid */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8 text-black">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-2">
              <h2 className="text-5xl font-bold mb-16">Contact Us</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-emerald-900" />
                    </div>
                    <span className="text-lg">{data.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-emerald-900" />
                    </div>
                    <span className="text-lg">contact@{data.businessName.toLowerCase()}.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-emerald-900" />
                    </div>
                    <span className="text-lg">123 Business Street, City, Country</span>
                  </div>
                </div>
                <div>
                  <CustomLinks
                    links={parsedLinks}
                    className="flex flex-col gap-4"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-emerald-50 p-12 rounded-2xl">
              <QRCodeSVG value={upiLink} size={200} />
              <p className="mt-6 text-lg font-semibold">Scan to pay via UPI</p>
              <p className="mt-2 text-sm text-gray-500">UPI ID: {data.paymentLink}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-emerald-900 text-white py-12">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-3xl font-bold mb-8 md:mb-0">{data.businessName}</div>
            <SocialLinks
              links={data.socialLinks}
              className="flex gap-8"
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