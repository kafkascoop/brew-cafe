"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, MessageSquare, Send, CheckCircle2, MapPin as MapPinIcon, Clock } from "lucide-react";

interface ContactSectionProps {
  data: {
    address: string;
    phone: string;
    openingHours: { open: string; close: string };
    mapEmbedUrl: string;
  };
}

export default function ContactSection({ data }: ContactSectionProps) {
  // --------- Form Logic ---------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{name?: string, email?: string, message?: string}>({});

  const validate = () => {
    const newErrors: {name?: string, email?: string, message?: string} = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // --------- Location Logic ---------
  const [isOpen, setIsOpen] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState("");

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      const openHour = parseInt(data.openingHours.open.split(":")[0]);
      const closeHour = parseInt(data.openingHours.close.split(":")[0]);

      const isCurrentlyOpen =
        currentHour > openHour || (currentHour === openHour && currentMinute >= 0)
          ? currentHour < closeHour
          : false;

      setIsOpen(isCurrentlyOpen);

      setCurrentTimeStr(
        `${openHour > 12 ? openHour - 12 : openHour}:00 AM - ${closeHour > 12 ? closeHour - 12 : closeHour}:00 PM`
      );
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, [data.openingHours]);

  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden border-t border-cafe-beige/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* --- LEFT COLUMN: CONTACT FORM --- */}
          <div className="flex flex-col h-full">
            <div className="mb-10 text-left">
              <h2 className="text-3xl md:text-4xl font-outfit font-bold text-foreground">
                Drop Us a Message
              </h2>
              <div className="w-12 h-1.5 bg-cafe-accent mt-4 rounded-full opacity-60"></div>
              <p className="text-foreground/70 mt-4 leading-relaxed max-w-xl">
                Have a question, feedback, or want to host an event? We&apos;ll brew the rest.
              </p>
            </div>

            <div className="bg-white dark:bg-[#2d1810]/40 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-none border border-cafe-beige/20 dark:border-white/5 transition-shadow duration-500 relative flex flex-col flex-grow">
              
              {/* Success Overlay */}
              <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 dark:bg-[#1a1210]/98 backdrop-blur-sm transition-all duration-500 ease-in-out ${isSuccess ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                <div className={`transform transition-all duration-500 delay-100 ${isSuccess ? 'scale-100 translate-y-0' : 'scale-50 translate-y-8'}`}>
                  <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm shadow-emerald-500/20">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-outfit text-foreground mb-3 text-center">Message Sent!</h3>
                  <p className="text-foreground/70 text-center max-w-xs px-4">
                    Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative flex flex-col flex-grow justify-between">
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground/80 block ml-1">Name *</label>
                      <div className="relative group">
                        <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-300 ${errors.name ? 'text-rose-500' : 'text-foreground/40 group-focus-within:text-cafe-accent'}`}>
                          <User className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={`w-full pl-11 pr-4 py-3.5 bg-background border ${errors.name ? 'border-rose-500 focus:ring-rose-500/20' : 'border-cafe-beige/40 dark:border-white/10 hover:border-cafe-beige/70 dark:hover:border-white/20 focus:border-cafe-accent focus:ring-cafe-accent/20'} rounded-xl focus:outline-none focus:ring-4 transition-all duration-300`}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground/80 block ml-1">Email *</label>
                      <div className="relative group">
                        <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-300 ${errors.email ? 'text-rose-500' : 'text-foreground/40 group-focus-within:text-cafe-accent'}`}>
                          <Mail className="w-5 h-5" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={`w-full pl-11 pr-4 py-3.5 bg-background border ${errors.email ? 'border-rose-500 focus:ring-rose-500/20' : 'border-cafe-beige/40 dark:border-white/10 hover:border-cafe-beige/70 dark:hover:border-white/20 focus:border-cafe-accent focus:ring-cafe-accent/20'} rounded-xl focus:outline-none focus:ring-4 transition-all duration-300`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2 mb-6">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground/80 block ml-1">Phone (Optional)</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 transition-colors duration-300 group-focus-within:text-cafe-accent">
                        <Phone className="w-5 h-5" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full pl-11 pr-4 py-3.5 bg-background border border-cafe-beige/40 dark:border-white/10 hover:border-cafe-beige/70 dark:hover:border-white/20 focus:border-cafe-accent focus:ring-cafe-accent/20 focus:ring-4 rounded-xl focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2 mb-6">
                    <label htmlFor="message" className="text-sm font-medium text-foreground/80 block ml-1">Message *</label>
                    <div className="relative group">
                      <div className={`absolute top-4 left-3.5 pointer-events-none transition-colors duration-300 ${errors.message ? 'text-rose-500' : 'text-foreground/40 group-focus-within:text-cafe-accent'}`}>
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message..."
                        className={`w-full pl-11 pr-4 py-3.5 bg-background border ${errors.message ? 'border-rose-500 focus:ring-rose-500/20' : 'border-cafe-beige/40 dark:border-white/10 hover:border-cafe-beige/70 dark:hover:border-white/20 focus:border-cafe-accent focus:ring-cafe-accent/20'} rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 resize-y min-h-[140px]`}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-cafe-accent hover:bg-[#c33b13] text-white font-medium rounded-xl shadow-lg shadow-cafe-accent/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100 focus:ring-4 focus:ring-cafe-accent/30"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* --- RIGHT COLUMN: VISIT US --- */}
          <div className="flex flex-col h-full">
            <div className="mb-10 text-left">
              <h2 className="text-3xl md:text-4xl font-outfit font-bold text-foreground">
                Visit Us
              </h2>
              <div className="w-12 h-1.5 bg-cafe-accent mt-4 rounded-full opacity-60"></div>
              <p className="text-foreground/70 mt-4 leading-relaxed max-w-xl">
                We are located in the heart of Rampurhat. Drop by for a perfect brew.
              </p>
            </div>

            <div className="flex flex-col flex-grow bg-cafe-cream/30 dark:bg-cafe-brown/5 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-none border border-cafe-beige/20 dark:border-white/5 space-y-8 relative overflow-hidden">
              
              {/* Contact Information Blocks */}
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white dark:bg-cafe-brown rounded-2xl shadow-sm rounded-tl-sm flex-shrink-0">
                    <MapPinIcon className="w-6 h-6 text-cafe-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg font-outfit text-foreground mb-1">Address</h4>
                    <p className="text-foreground/70 text-sm md:text-base leading-relaxed">{data.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white dark:bg-cafe-brown rounded-2xl shadow-sm rounded-tl-sm flex-shrink-0">
                    <Phone className="w-6 h-6 text-cafe-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg font-outfit text-foreground mb-1">Phone</h4>
                    <p className="text-foreground/70 text-sm md:text-base">{data.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white dark:bg-cafe-brown rounded-2xl shadow-sm rounded-tl-sm flex-shrink-0">
                    <Clock className="w-6 h-6 text-cafe-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg font-outfit text-foreground mb-1">Opening Hours</h4>
                    <p className="text-foreground/70 mb-2 text-sm md:text-base">Today: {currentTimeStr}</p>
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold tracking-wide ${
                        isOpen
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                      }`}
                    >
                      <span className="relative flex h-2 w-2">
                        {isOpen && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        )}
                        <span
                          className={`relative inline-flex rounded-full h-2 w-2 ${
                            isOpen ? "bg-emerald-500" : "bg-rose-500"
                          }`}
                        ></span>
                      </span>
                      {isOpen ? "Open Now" : "Closed"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Iframe */}
              <div className="flex-grow w-full rounded-2xl overflow-hidden shadow-sm dark:shadow-none border-2 border-white dark:border-cafe-brown relative mt-4 min-h-[250px]">
                <iframe
                  src={data.mapEmbedUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cafe Location"
                ></iframe>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
