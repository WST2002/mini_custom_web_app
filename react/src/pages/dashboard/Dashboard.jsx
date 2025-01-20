import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import AnimatedBackground from '../components/AnimatedBackground';
import WebsiteList from './WebsiteList';
import LoadingSpinner from '../common/LoadingSpinner';
import { useUserDetails } from '../../hooks/useUserDetails';
import CreateWebsiteButton from './CreateWebsiteButton';
import PlansButton from './components/PlansButton';
import CreateWebsiteModal from './modals/CreateWebsiteModal';
import PlansModal from './components/PlansModal';
import { Reminder } from './components/Reminder';
import { Warning } from './components/Warning';
import { Toast } from './components/Toast';
import { useToast } from '../../hooks/useToast';
import EditWebsiteModal from './modals/editWebsiteModal/EditWebsiteModal'
import { Helmet } from 'react-helmet-async';
import EditLinksModal from './modals/editLinksModal/EditLinksModal';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { userDetails, loading, error, updateUserDetails, removeWebsite, userid } = useUserDetails();
  const websites = userDetails?.websites;
  const userId = userDetails?.userId;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState(null);
  const { toast, showToast, hideToast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditLinksModalOpen, setIsEditLinksModalOpen] = useState(false);
  const [editingLinksWebsite, setEditingLinksWebsite] = useState(null);
  const navigate = useNavigate()

  const showErrorToast = (message) => {
    showToast(message, 'error');
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
  };

  const handleEdit = (website) => {
    setEditingWebsite(website);
    setIsEditModalOpen(true);
  };

  const handleEditLinks = (website) => {
    setEditingLinksWebsite(website);
    setIsEditLinksModalOpen(true);
  };


  const handlePlanSelection = async (plan, price) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/create-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-key': `bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          plan,
          price,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment initialization failed');
      }

      const resRazor = await fetch(`${import.meta.env.VITE_BASE_URL}/razor-pay-key`, {
        headers: { "access-key": `bearer ${token}` }
      })
      const razorData = await resRazor.json();

      const options = {
        key: razorData.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: 'Mini Website Builder',
        description: `Upgrade to ${plan} Plan`,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'access-key': `bearer ${token}`,
              },
              body: JSON.stringify({
                userId,
                plan,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok) {
              throw new Error(verifyData.error || 'Payment verification failed');
            }

            showToast('Payment successful! Your plan has been upgraded.', 'success');
            updateUserDetails();
            setIsPlansModalOpen(false);
          } catch (error) {
            showErrorToast(error.message || 'Payment verification failed');
          }
        },
        prefill: {
          name: userDetails.name,
        },
        theme: {
          color: '#3B82F6',
        },
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      showErrorToast(error.message || 'Failed to initialize payment');
    }
  };

  if (localStorage.getItem("adminToken")) {
    navigate("/admin");
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Logo />
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !userDetails) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <Logo />
        <p className="text-red-400">{error || 'User not found'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Helmet>
        <title>Edu Creative - Dashboard</title>
      </Helmet>
      <Logo />
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-20 relative z-10">
        {userDetails.plan === "free" && <Reminder message='Your free plan will expire soon!' />}
        {userDetails.plan === "no" && <Warning message='Your plan has expired! Please choose a plan to continue your website!' />}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 my-5"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Welcome, {userDetails.name}!
          </h1>
          <p className="text-gray-400">Manage your websites and create new ones</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center items-center"
        >
          <CreateWebsiteButton
            onClick={() => {
              if (userDetails.plan === "no") {
                showErrorToast("Please choose any plan to make websites!");
              } else if (userDetails.plan === "free") {
                if (userDetails.websites.length === 1) {
                  showErrorToast("Please choose any plan to make more websites!");
                } else {
                  setIsCreateModalOpen(true);
                }
              } else if (userDetails.plan === "silver") {
                if (userDetails.websites.length > 1) {
                  showErrorToast("Please choose any plan to make more websites!");
                } else {
                  setIsCreateModalOpen(true);
                }
              } else if (userDetails.plan === "gold") {
                if (userDetails.websites.length > 4) {
                  showErrorToast("Please choose any plan to make more websites!");
                } else {
                  setIsCreateModalOpen(true);
                }
              } else {
                setIsCreateModalOpen(true);
              }
            }}
          />
        </motion.div>
        <motion.div className='flex justify-center my-5'>
          <PlansButton onClick={() => setIsPlansModalOpen(true)} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-semibold mb-6">Your Websites</h2>
          <WebsiteList
            websites={websites}
            onCopy={handleCopyLink}
            onEdit={handleEdit}
            onDelete={removeWebsite}
            onEditLinks={handleEditLinks}
          />
        </motion.div>
      </div>

      <CreateWebsiteModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        userId={userId}
        plan={userDetails.plan}
        onWebsiteCreated={updateUserDetails}
      />

      <EditWebsiteModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        website={editingWebsite}
        onWebsiteUpdated={updateUserDetails}
        plan={userDetails.plan}
      />

      <EditLinksModal
        isOpen={isEditLinksModalOpen}
        onClose={() => setIsEditLinksModalOpen(false)}
        website={editingLinksWebsite}
        onWebsiteUpdated={updateUserDetails}
      />

      <PlansModal
        isOpen={isPlansModalOpen}
        onClose={() => setIsPlansModalOpen(false)}
        currentPlan={userDetails.plan}
        onSelectPlan={handlePlanSelection}
      />

      {toast?.show && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={hideToast}
        />
      )}
      <div className='absolute right-0 bottom-0'>
        <div
          role="button"
          onClick={() => {
            localStorage.removeItem("token");
            navigate('/login');
          }}
          className="text-sm relative left-52 bottom-4 w-fit rounded-lg p-4 bg-red-500 flex items-center space-x-2 cursor-pointer pointer-events-auto"
        >LogOut</div></div>

    </div>
  );
}