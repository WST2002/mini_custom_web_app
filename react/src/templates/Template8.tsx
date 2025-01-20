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

export const Template8: React.FC<Props> = ({ data }) => {
  const upiLink = generateUPILink(data.paymentLink);
  const parsedLinks = Array.isArray(data.customLinks) 
    ? data.customLinks 
    : data.customLinks 
      ? JSON.parse(data.customLinks) 
      : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Parallax Effect */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
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
        <div className="relative text-center text-white z-10">
          <motion.img
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            src={useImageUrl(data.logo)}
            alt={data.businessName}
            className="w-40 h-40 mx-auto mb-8"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-7xl font-bold mb-6"
          >
            {data.businessName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl max-w-2xl mx-auto"
          >
            {data.aboutUs}
          </motion.p>
        </div>
      </header>

      {/* Products Section - Carousel Style */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-20">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-gray-50 rounded-2xl overflow-hidden"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={useImageUrl(product.image)}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                    <p className="text-gray-200 mb-4">{product.desc}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold">₹{product.price}</span>
                      <a
                        href={product.paymentLink}
                        className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - Mosaic Grid */}
      {data.photoGallery.length > 0 && (
        <section className="py-32 bg-gray-900">
          <h2 className="text-5xl font-bold text-center mb-20 text-white">Our Gallery</h2>
          <Gallery images={data.photoGallery} />
        </section>
      )}

      {/* Contact Section - Floating Cards */}
      <section className="relative py-32 overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-2xl text-gray-700 shadow-xl"
            >
              <h2 className="text-4xl font-bold mb-12">Get in Touch</h2>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                    <p>{data.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <p>contact@{data.businessName.toLowerCase()}.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Address</h3>
                    <p>123 Business Street, City, Country</p>
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
              className="bg-black text-white p-12 rounded-2xl shadow-xl"
            >
              <div className="flex flex-col items-center">
                <QRCodeSVG value={upiLink} size={240} />
                <p className="mt-8 text-xl font-semibold">Scan to pay via UPI</p>
                <p className="mt-2 text-gray-400">UPI ID: {data.paymentLink}</p>
                <SocialLinks
                  links={data.socialLinks}
                  className="flex gap-6 mt-12"
                  iconClassName="w-8 h-8"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-3xl font-bold mb-8 md:mb-0">{data.businessName}</div>
            <SocialLinks
              links={data.socialLinks}
              className="flex gap-8"
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