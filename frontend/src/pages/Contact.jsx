import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const socialLinkVariants = {
  hover: {
    y: -3,
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 300
    }
  }
};

const formFieldVariants = {
  focus: {
    scale: 1.01,
    boxShadow: "0px 0px 8px rgba(99, 102, 241, 0.3)"
  }
};

const buttonVariants = {
  initial: { scale: 1 },
  tap: { scale: 0.98 },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300
    }
  }
};

const successVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const renderURL = import.meta.env.VITE_RENDER_URL;


const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  const formik = useFormik({
    initialValues: { name: '', email: '', subject: '', message: '' },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting, setStatus }) => {
      try {
        await axios.post(`${renderURL}/api/contact-submissions`, { data: values });
        resetForm();
        setStatus({ success: true });
      } catch (error) {
        setStatus({ error: 'Failed to send message. Please try again.' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/nahusenayElias', name: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/elias-nahusenay/', name: 'LinkedIn' },
    { icon: <FaTwitter />, url: 'https://twitter.com/yourhandle', name: 'Twitter' },
    { icon: <FaInstagram />, url: 'https://instagram.com/yourprofile', name: 'Instagram' },
    { icon: <FaEnvelope />, url: 'mailto:eliasars@yahoo.com', name: 'Email' },
  ];

  return (
    <div className="relative min-h-screen">
      <Hero title="Contact Me" />

      {/* Show spinner while loading */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
            <p className="text-xl text-gray-600">Feel free to reach out for collaborations or just a friendly hello</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Connect With Me</h2>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
                    variants={socialLinkVariants}
                    whileHover="hover"
                  >
                    <span className="text-2xl mr-4 text-indigo-600">{social.icon}</span>
                    <span className="text-lg font-medium text-gray-700">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send Me a Message</h2>

              {formik.status?.success && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={successVariants}
                  className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg"
                >
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}

              {formik.status?.error && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={successVariants}
                  className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg"
                >
                  {formik.status.error}
                </motion.div>
              )}

              <form onSubmit={formik.handleSubmit}>
                <motion.div
                  variants={itemVariants}
                  className="mb-6"
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <motion.input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    whileFocus="focus"
                    variants={formFieldVariants}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {formik.errors.name}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="mb-6"
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <motion.input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    whileFocus="focus"
                    variants={formFieldVariants}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {formik.errors.email}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="mb-6"
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <motion.input
                    id="subject"
                    name="subject"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.subject}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    whileFocus="focus"
                    variants={formFieldVariants}
                  />
                  {formik.touched.subject && formik.errors.subject && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {formik.errors.subject}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="mb-6"
                >
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <motion.textarea
                    id="message"
                    name="message"
                    rows="5"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    whileFocus="focus"
                    variants={formFieldVariants}
                  />
                  {formik.touched.message && formik.errors.message && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {formik.errors.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {formik.isSubmitting ? 'Sending...' : <><FaPaperPlane className="mr-2" /> Send Message</>}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ContactPage;