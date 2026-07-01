import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Eye, EyeOff, Calendar, User, Mail, MessageSquare, LogIn } from 'lucide-react';
import { collection, query, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { db, auth, signInWithGoogle, handleFirestoreError, OperationType } from '../lib/firebase';

interface Inquiry {
  name: string;
  email: string;
  message: string;
  date: string;
}

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setUser(fbUser);
      if (fbUser) {
        // Check if user is in admins collection or is the hardcoded developer UID
        if (fbUser.uid === 'W8BVvXnZiYQ7l2GFm24AycZRcn22') {
          setIsAuthenticated(true);
          fetchInquiries();
        } else {
          try {
            const adminDoc = await getDoc(doc(db, 'admins', fbUser.uid));
            if (adminDoc.exists()) {
              setIsAuthenticated(true);
              fetchInquiries();
            }
          } catch (e) {
            console.warn('Admin check failed', e);
          }
        }
      }
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch from Firestore
      const q = query(collection(db, 'inquiries'), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      const fbInquiries = querySnapshot.docs.map(doc => doc.data() as Inquiry);

      // 2. Merge with Local Storage (optional, helps show immediate messages)
      const localInquiries = JSON.parse(localStorage.getItem('rae_local_inquiries') || '[]');
      
      // Combine and filter duplicates
      const uniqueInquiries = [...fbInquiries];
      localInquiries.forEach((local: Inquiry) => {
        if (!uniqueInquiries.some(fb => fb.date === local.date)) {
          uniqueInquiries.unshift(local);
        }
      });

      setInquiries(uniqueInquiries);
    } catch (err) {
      console.warn("Firestore fetch failed, relying on local backup:", err);
      const localInquiries = JSON.parse(localStorage.getItem('rae_local_inquiries') || '[]');
      setInquiries(localInquiries);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const masterKey = "rashisabsesunder@1";
    const passcodeKey = "rae2026";
    const inputKey = password.trim().toLowerCase();

    if (inputKey === masterKey || inputKey === passcodeKey) {
      setIsAuthenticated(true);
      fetchInquiries();
    } else {
      setError('Incorrect password. Access denied.');
    }
    
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      // Auth state listener handles the rest
    } catch (err) {
      setError('Failed to sign in with Google');
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    setIsAuthenticated(false);
    setInquiries([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="py-20 flex items-center justify-center bg-brand-black">
        <div className="w-full max-w-md p-8 bg-white/5 border border-brand-white/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-8">
            <Lock className="text-brand-red" size={24} />
            <h2 className="text-2xl font-serif italic">Admin Access</h2>
          </div>
          
          <div className="space-y-6">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 border border-brand-white/10 py-4 rounded-full text-xs font-black uppercase tracking-[0.3em] hover:bg-brand-white hover:text-brand-black transition-all disabled:opacity-50"
            >
              <LogIn size={16} />
              {user ? `Signed in as ${user.email?.split('@')[0]}` : 'Continue with Google'}
            </button>

            {user && !isAuthenticated && (
              <div className="p-4 bg-brand-red/5 border border-brand-red/20 rounded-xl space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-brand-red font-bold">Access Required</p>
                <p className="text-[10px] text-brand-grey lowercase leading-tight">
                  Your account is not whitelisted. Copy your ID and add it to the 'admins' collection in Firebase:
                </p>
                <div className="flex items-center gap-2 bg-brand-black/50 p-2 rounded border border-white/5">
                  <code className="text-[9px] text-brand-white break-all flex-1">{user.uid}</code>
                  <button 
                    onClick={() => navigator.clipboard.writeText(user.uid)}
                    className="text-[9px] text-brand-red uppercase font-black hover:text-brand-white"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-brand-white/10"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest">
                <span className="bg-brand-black px-4 text-brand-grey/50">or use passcode</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="ENTER ACCESS KEY"
                  className="w-full bg-transparent border-b border-brand-white/20 py-4 focus:border-brand-red outline-none transition-colors text-xs uppercase tracking-widest placeholder:text-brand-grey/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-grey/50 hover:text-brand-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {error && <p className="text-brand-red text-[10px] uppercase tracking-widest">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-white text-brand-black py-4 rounded-full text-xs font-black uppercase tracking-[0.3em] hover:bg-brand-red hover:text-brand-white transition-all disabled:opacity-50"
              >
                {isLoading ? 'VERIFYING...' : 'UNLOCK VAULT'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-brand-black min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-serif italic mb-2">Inquiry Vault</h2>
            <div className="flex items-center gap-2">
              <p className="text-brand-grey text-[10px] uppercase tracking-[0.4em]">Proprietary Data - Rae Studio</p>
              {user && <span className="text-[10px] text-brand-red px-2 py-1 bg-brand-red/10 rounded uppercase font-bold tracking-widest">Verified</span>}
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="text-brand-red text-[10px] bg-white px-6 py-2 rounded-full uppercase tracking-widest font-bold hover:bg-brand-red hover:text-white transition-all"
          >
            Lock
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {inquiries.length === 0 ? (
            <div className="p-12 border border-brand-white/5 bg-white/[0.02] rounded-2xl text-center">
              <p className="text-brand-grey/50 uppercase tracking-widest text-xs">No inquiries recorded yet.</p>
            </div>
          ) : (
            inquiries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((inquiry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-8 bg-white/5 border border-brand-white/10 rounded-2xl hover:border-brand-red/30 transition-all group"
              >
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-brand-white">
                      <User size={14} className="text-brand-red" />
                      <span className="font-serif italic text-lg">{inquiry.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-grey text-xs">
                      <Mail size={14} />
                      <a href={`mailto:${inquiry.email}`} className="hover:text-brand-red transition-colors">{inquiry.email}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-brand-grey/50 text-[10px] uppercase tracking-widest">
                    <Calendar size={12} />
                    {new Date(inquiry.date).toLocaleString()}
                  </div>
                </div>

                <div className="relative p-6 bg-brand-black/50 rounded-xl border border-brand-white/5 group-hover:border-brand-red/10 transition-colors">
                  <MessageSquare className="absolute -top-3 -left-3 text-brand-red/20" size={32} />
                  <p className="text-brand-grey text-sm leading-relaxed whitespace-pre-wrap italic">
                    "{inquiry.message}"
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
