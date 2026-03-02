"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const ContactSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Hiba történt az üzenet küldésekor.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Hálózati hiba. Próbáld újra később.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#0a0a0a]" // Fix fekete háttér
    >
      <div 
        id="contact" 
        className="flex flex-col md:flex-row items-center justify-around p-10 md:p-20 min-h-[60vh] text-white"
      >
        {/* Bal oldal: Szöveg */}
        <div className="md:w-1/3 text-center md:text-left mb-10 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight uppercase">
            Get in Touch
          </h2>
          <p className="text-white/60 font-light tracking-[0.1em] uppercase text-sm leading-relaxed">
            If you have any questions about the places, the route, or just want to write a few lines, feel free to contact me!
          </p>
          
          {submitted && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-green-400 font-medium mt-6 tracking-widest uppercase text-xs"
            >
              Thank you! I got your message.
            </motion.p>
          )}
        </div>

        {/* Jobb oldal: Form */}
        <div className="md:w-1/2 w-full max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/150 uppercase text-[10px] tracking-[0.3em] mb-2 ml-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-none text-white focus:border-white/40 focus:outline-none transition-all duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-white/150 uppercase text-[10px] tracking-[0.3em] mb-2 ml-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-none text-white focus:border-white/40 focus:outline-none transition-all duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-white/150 uppercase text-[10px] tracking-[0.3em] mb-2 ml-1">Message</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-none text-white focus:border-white/40 focus:outline-none transition-all duration-300 resize-none"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full border border-white/40 bg-white/10 backdrop-blur-md text-white font-medium py-4 px-8 rounded-full transition-all hover:bg-white hover:text-black uppercase text-xs tracking-[0.2em] disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactSection;