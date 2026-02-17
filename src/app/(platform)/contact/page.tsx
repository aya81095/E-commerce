"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faClock,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function contactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus({
        type: "success",
        message: "Thank you for contacting us! We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info & Form Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Contact Info Cards */}
              <div className="bg-green-50 p-6 rounded-xl text-center">
                <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-white text-xl"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600 text-sm mb-1">+1 (555) 123-4567</p>
                <p className="text-gray-500 text-xs">Mon-Fri 9am-6pm</p>
              </div>

              <div className="bg-green-50 p-6 rounded-xl text-center">
                <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-white text-xl"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600 text-sm mb-1">
                  support@freshcart.com
                </p>
                <p className="text-gray-500 text-xs">24/7 support</p>
              </div>

              <div className="bg-green-50 p-6 rounded-xl text-center">
                <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-white text-xl"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Address
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  123 Fresh Street, Suite 100
                </p>
                <p className="text-gray-500 text-xs">New York, NY 10001</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Send us a Message
              </h2>

              {submitStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-8 py-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Business Hours Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faClock} className="text-white text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Business Hours
            </h2>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="font-medium text-gray-900">
                    Monday - Friday
                  </span>
                  <span className="text-gray-600">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="font-medium text-gray-900">Saturday</span>
                  <span className="text-gray-600">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Sunday</span>
                  <span className="text-gray-600">10:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
