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

export const Template10: React.FC<Props> = ({ data }) => {
  const upiLink = generateUPILink(data.paymentLink);
  const parsedLinks = Array.isArray(data.customLinks) 
    ? data.customLinks 
    : data.customLinks 
      ? JSON.parse(data.customLinks) 
      : [];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section - Natural & Organic Style */}
      <header className="relative min-h-screen">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506619216599-9d16d0903dfd')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/30 to-transparent" />
        <div className="relative z-10 container mx-auto px-8 h-screen flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <img
              src={useImageUrl(data.logo)}
              alt={data.businessName}
              className="w-32 h-32 mb-8"
            />
            <h1 className="text-6xl font-serif mb-6 text-amber-900">{data.businessName}</h1>
            <p className="text-xl text-amber-800">{data.aboutUs}</p>
            <div className="mt-12">
              <SocialLinks
                links={data.socialLinks}
                className="flex gap-6"
                iconClassName="w-6 h-6 text-amber-700 hover:text-amber-900 transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Products Section - Organic Cards */}
      <section className="py-32">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-serif text-center mb-20 text-amber-900">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {data.products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={useImageUrl(product.image)}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif mb-2 text-amber-900">{product.title}</h3>
                  <p className="text-amber-700 mb-4">{product.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-serif text-amber-900">₹{product.price}</span>
                    <a
                      href={product.paymentLink}
                      className="bg-amber-100 text-amber-900 px-6 py-2 rounded-full hover:bg-amber-200 transition-colors"
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

      {/* Gallery Section - Natural Grid */}
      {data.photoGallery.length > 0 && (
        <section className="py-32 bg-amber-100">
          <h2 className="text-4xl font-serif text-center mb-20 text-amber-900">Gallery</h2>
          <Gallery images={data.photoGallery} />
        </section>
      )}

      {/* Contact Section - Organic Layout */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-serif text-center mb-20 text-amber-900">Get in Touch</h2>
            <div className="grid md:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-amber-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif mb-1 text-amber-900">Phone</h3>
                      <p className="text-amber-700">{data.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-amber-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif mb-1 text-amber-900">Email</h3>
                      <p className="text-amber-700">contact@{data.businessName.toLowerCase()}.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-amber-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif mb-1 text-amber-900">Address</h3>
                      <p className="text-amber-700">123 Business Street, City, Country</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <CustomLinks
                    links={parsedLinks}
                    className="grid gap-4"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center bg-amber-50 p-12 rounded-lg"
              >
                <QRCodeSVG value={upiLink} size={200} />
                <p className="mt-6 text-lg font-serif text-amber-900">Scan to pay via UPI</p>
                <p className="mt-2 text-sm text-amber-700">UPI ID: {data.paymentLink}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-amber-900 text-amber-50 py-12">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-3xl font-serif mb-8 md:mb-0">{data.businessName}</div>
            <SocialLinks
              links={data.socialLinks}
              className="flex gap-8"
              iconClassName="w-6 h-6 text-amber-100 hover:text-white transition-colors"
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