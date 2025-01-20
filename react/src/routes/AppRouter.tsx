import { Features } from '@/components/Features';
import { Hero } from '@/components/hero/Hero';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Pricing } from '@/components/Pricing';
import { Templates } from '@/components/Templates';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { NotFound } from '@/components/NotFound';
import Login from '@/pages/components/Login';
import Register from '@/pages/components/Register';
//@ts-ignore
import Dashboard from '@/pages/dashboard/Dashboard';
//@ts-ignore
import Website from '@/pages/websites/Website';
import Owner from '@/pages/owner/Owner';
import ForgotPassword from '@/pages/components/ForgotPassword';
import ResetPassword from '@/pages/components/ResetPassword';
import { NotFound } from '@/components/NotFound';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<div className="min-h-screen bg-black text-white w-full">
                    <Navbar />
                    <Hero />
                    <Features />
                    <Templates />
                    <Pricing />
                    <Footer />
                </div>} />

                {/* Main App  */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path='/admin' element={<Owner />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/website/:params" element={<Website />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
