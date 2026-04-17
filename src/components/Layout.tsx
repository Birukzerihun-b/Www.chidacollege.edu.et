import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { GraduationCap, LogOut, Menu, X, LayoutDashboard, FileText, Home } from 'lucide-react';

const Layout: React.FC = () => {
  const { user, profile, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
                <GraduationCap className="w-8 h-8" />
                <span className="hidden sm:block">CHIDA COLLEGE</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Home</Link>
              <Link to="/register" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Apply Now</Link>
              {isAdmin && (
                <Link to="/admin" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors flex items-center gap-1">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              )}
              {user ? (
                <div className="flex items-center gap-4 border-l pl-6 border-slate-200">
                  <span className="text-sm text-slate-500">{profile?.displayName}</span>
                  <button
                    onClick={handleSignOut}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 flex flex-col gap-4 shadow-lg">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-slate-600 font-medium py-2">Home</Link>
            <Link to="/register" onClick={() => setIsMenuOpen(false)} className="text-slate-600 font-medium py-2">Apply Now</Link>
            {isAdmin && (
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-slate-600 font-medium py-2">Admin Dashboard</Link>
            )}
            {user ? (
              <button
                onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                className="text-red-500 font-medium py-2 text-left"
              >
                Sign Out
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-indigo-600 font-medium py-2">Login</Link>
            )}
          </div>
        )}
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
                <GraduationCap className="w-6 h-6" />
                CHIDA COLLEGE
              </div>
              <p className="text-sm leading-relaxed">
                Empowering the next generation of construction and industrial professionals through excellence in technical education and hands-on training.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Admissions</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Programs</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm">
                <li>Email: info@chidacollege.edu</li>
                <li>Phone: +251 911 234 567</li>
                <li>Location: Chida, Ethiopia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs">
            &copy; {new Date().getFullYear()} Chida Construction and Industrial College. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
