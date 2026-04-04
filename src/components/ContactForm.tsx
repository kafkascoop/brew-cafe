"use client";

import { useState } from "react";
import { User, Mail, Phone, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
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
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-10 transition-all duration-700 ease-out transform translate-y-0 opacity-100">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-foreground">
            Drop Us a Message, We&apos;ll Brew the Rest
          </h2>
          <div className="w-16 h-1.5 bg-cafe-accent mx-auto mt-6 rounded-full opacity-60"></div>
        </div>

        <div className="bg-white dark:bg-[#2d1810]/40 rounded-2xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-none border border-cafe-beige/20 dark:border-white/5 transition-shadow duration-500 relative overflow-hidden max-w-2xl mx-auto">
          
          {/* Success Overlay */}
          <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 dark:bg-[#2d1810]/98 backdrop-blur-sm transition-all duration-500 ease-in-out ${isSuccess ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
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

          <form onSubmit={handleSubmit} className="space-y-6 relative z-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    className={`w-full pl-11 pr-4 py-3.5 bg-background border ${errors.name ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500' : 'border-cafe-beige/40 dark:border-white/10 hover:border-cafe-beige/70 dark:hover:border-white/20 focus:border-cafe-accent focus:ring-cafe-accent/20'} rounded-xl focus:outline-none focus:ring-4 transition-all duration-300`}
                  />
                </div>
                {errors.name && <p className="text-xs text-rose-500 flex items-center mt-1.5 ml-1 font-medium">{errors.name}</p>}
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
                    className={`w-full pl-11 pr-4 py-3.5 bg-background border ${errors.email ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500' : 'border-cafe-beige/40 dark:border-white/10 hover:border-cafe-beige/70 dark:hover:border-white/20 focus:border-cafe-accent focus:ring-cafe-accent/20'} rounded-xl focus:outline-none focus:ring-4 transition-all duration-300`}
                  />
                </div>
                {errors.email && <p className="text-xs text-rose-500 flex items-center mt-1.5 ml-1 font-medium">{errors.email}</p>}
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
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
            <div className="space-y-2">
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
                  className={`w-full pl-11 pr-4 py-3.5 bg-background border ${errors.message ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500' : 'border-cafe-beige/40 dark:border-white/10 hover:border-cafe-beige/70 dark:hover:border-white/20 focus:border-cafe-accent focus:ring-cafe-accent/20'} rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 resize-y min-h-[140px]`}
                ></textarea>
              </div>
              {errors.message && <p className="text-xs text-rose-500 flex items-center mt-1.5 ml-1 font-medium">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 bg-cafe-accent hover:bg-[#c33b13] text-white font-medium rounded-xl shadow-lg shadow-cafe-accent/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg disabled:active:scale-100 outline-none focus:ring-4 focus:ring-cafe-accent/30"
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
    </section>
  );
}
