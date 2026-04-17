import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Building2, HardHat, Hammer, Users, Award, BookOpen } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2070"
            alt="Construction site"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Build Your Future in <span className="text-indigo-400">Construction</span> & Industry
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              Join Ethiopia's leading technical college. Master the skills needed for the modern industrial landscape with our expert-led programs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                Apply Now <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">
                Explore Programs
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Students', value: '1,200+', icon: Users },
              { label: 'Programs', value: '15+', icon: BookOpen },
              { label: 'Success Rate', value: '94%', icon: Award },
              { label: 'Partners', value: '50+', icon: Building2 },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Departments</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Choose from a wide range of specialized technical programs designed to meet current industry demands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Civil Construction',
                desc: 'Master structural engineering, surveying, and project management.',
                icon: Building2,
                color: 'bg-blue-500'
              },
              {
                title: 'Industrial Mechanics',
                desc: 'Learn maintenance, repair, and operation of industrial machinery.',
                icon: Hammer,
                color: 'bg-emerald-500'
              },
              {
                title: 'Electrical Engineering',
                desc: 'Specialize in industrial wiring, power systems, and automation.',
                icon: HardHat,
                color: 'bg-amber-500'
              }
            ].map((dept, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
              >
                <div className={`${dept.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                  <dept.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{dept.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{dept.desc}</p>
                <Link to="/register" className="text-indigo-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Ready to start your professional journey?</h2>
          <p className="text-indigo-100 mb-12 max-w-2xl mx-auto text-lg">
            Applications for the 2026 academic year are now open. Secure your spot in Ethiopia's premier technical institution.
          </p>
          <Link
            to="/register"
            className="bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-xl inline-block"
          >
            Start Your Application
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
