import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Loader2 } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import Logo from "./Logo";
import NameInput from "./NameInput";
import EmailInput from "./EmailInput"; 
import PhoneInput from "./PhoneInput";
import PasswordInput from "./PasswordInput";
import { Helmet } from "react-helmet-async";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return false;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(number)) {
      setError("Please enter a valid 10-digit phone number.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setError("");
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, number, password }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Registration failed");
        }
        localStorage.setItem("token", result.token);
        navigate("/dashboard", { state: { userId: result.userId, name: name,email:email, number: number } });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const checkLogin = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/get-id`, {
        headers: { "access-key": `Bearer ${token}` }
      });

      if (!response.ok) {
        console.error("Unauthorized access or invalid token");
        return;
      }

      const data = await response.json();
      navigate("/dashboard", { state: { userId: data.userId } });

    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <Helmet>
        <title>Edu Creative Mini - Register</title>
        <meta name="description" content="Register to Edu Creative Mini and access tools to make mini wbesites." />
        <meta name="keywords" content="Edu Creative Mini login, website builder, mini website for business" />
        <meta name="author" content="Edu Creative Mini" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Edu Creative Mini - Register" />
        <meta property="og:description" content="Login to Edu Creative Mini and access personalized tools for building websites." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.educreativemini.com/register" />
        <link rel="canonical" href="/login" />
      </Helmet>
      <Logo />
      <AnimatedBackground />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-11/12 max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center"
          >
            <UserPlus className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-gray-400 mt-2">Join our community today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <NameInput value={name} onChange={(e) => setName(e.target.value)} delay={0.3} />
          <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} delay={0.4} />
          <PhoneInput value={number} onChange={(e) => setNumber(e.target.value)} delay={0.4} />
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} delay={0.5} />

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center text-gray-400 mt-6"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
            >
              Sign In
            </Link>
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
}