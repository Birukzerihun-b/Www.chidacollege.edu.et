import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Trash2, 
  Search, 
  Filter, 
  ChevronRight, 
  User, 
  Mail, 
  Phone, 
  BookOpen,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
  address: string;
  previousEducation: string;
}

const AdminDashboard: React.FC = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/');
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    const q = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Registration[];
      setRegistrations(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'registrations', id), { status });
      if (selectedReg?.id === id) {
        setSelectedReg({ ...selectedReg, status });
      }
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  const deleteRegistration = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      try {
        await deleteDoc(doc(db, 'registrations', id));
        setSelectedReg(null);
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         reg.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || reg.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-amber-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const base = "px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1.5";
    switch (status) {
      case 'approved': return `${base} bg-emerald-50 text-emerald-700`;
      case 'rejected': return `${base} bg-red-50 text-red-700`;
      default: return `${base} bg-amber-50 text-amber-700`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500">Manage student registrations and applications.</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none w-64"
            />
          </div>
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-sm font-medium outline-none bg-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredRegistrations.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-100 text-center text-slate-500">
              No registrations found matching your criteria.
            </div>
          ) : (
            filteredRegistrations.map((reg) => (
              <motion.div
                layout
                key={reg.id}
                onClick={() => setSelectedReg(reg)}
                className={`bg-white p-6 rounded-2xl border transition-all cursor-pointer hover:shadow-md flex items-center justify-between ${
                  selectedReg?.id === reg.id ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{reg.fullName}</h3>
                    <div className="text-sm text-slate-500 flex items-center gap-3">
                      <span>{reg.department}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span>{reg.createdAt?.toDate ? format(reg.createdAt.toDate(), 'MMM d, yyyy') : 'Recent'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={getStatusBadge(reg.status)}>
                    {getStatusIcon(reg.status)}
                    {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                  </span>
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Details Sidebar */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selectedReg ? (
              <motion.div
                key={selectedReg.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 sticky top-24"
              >
                <div className="flex justify-between items-start mb-8">
                  <h2 className="text-xl font-bold text-slate-900">Registration Details</h2>
                  <button
                    onClick={() => deleteRegistration(selectedReg.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-indigo-500 mt-0.5" />
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Full Name</div>
                      <div className="text-slate-900 font-medium">{selectedReg.fullName}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-indigo-500 mt-0.5" />
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Email</div>
                      <div className="text-slate-900 font-medium">{selectedReg.email}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-indigo-500 mt-0.5" />
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Phone</div>
                      <div className="text-slate-900 font-medium">{selectedReg.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-indigo-500 mt-0.5" />
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Department</div>
                      <div className="text-slate-900 font-medium">{selectedReg.department}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-indigo-500 mt-0.5" />
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Applied On</div>
                      <div className="text-slate-900 font-medium">
                        {selectedReg.createdAt?.toDate ? format(selectedReg.createdAt.toDate(), 'MMMM d, yyyy HH:mm') : 'Recently'}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-4">Actions</div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => updateStatus(selectedReg.id, 'approved')}
                        disabled={selectedReg.status === 'approved'}
                        className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all disabled:opacity-50"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(selectedReg.id, 'rejected')}
                        disabled={selectedReg.status === 'rejected'}
                        className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-all disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-12 rounded-3xl text-center text-slate-400">
                Select a registration to view details
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
