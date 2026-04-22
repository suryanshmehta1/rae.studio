import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileText, CheckCircle, Sliders, X, Lock, Unlock, Camera, Download } from 'lucide-react';

interface PresetFile {
  name: string;
  size: string;
  type: string;
}

export default function Presets() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [passcode, setPasscode] = useState('');
  
  // Initialize with localStorage or defaults
  const [files, setFiles] = useState<PresetFile[]>(() => {
    const saved = localStorage.getItem('rae_presets');
    if (saved) return JSON.parse(saved);
    return [
      { name: 'cinematic_shadows.dng', size: '12.4 MB', type: 'DNG' },
      { name: 'vintage_noir.dng', size: '8.2 MB', type: 'DNG' },
      { name: 'golden_hour_vibe.dng', size: '15.1 MB', type: 'DNG' }
    ];
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Persistence effect
  React.useEffect(() => {
    localStorage.setItem('rae_presets', JSON.stringify(files));
  }, [files]);

  const formatTitle = (filename: string) => {
    return filename
      .replace(/\.[^/.]+$/, "") // remove extension
      .replace(/[_-]/g, " ")     // replace dashes/underscores with spaces
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setShowPasscode(true);
    }
  };

  const verifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'rae2026') {
      setIsAdmin(true);
      setShowPasscode(false);
      setPasscode('');
    } else {
      alert('Unauthorized access attempt logged.');
      setPasscode('');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFiles = (uploadedFiles: FileList | null) => {
    if (!uploadedFiles || !isAdmin) return;
    
    setIsUploading(true);
    
    // Process files immediately for UI response
    const newFiles = Array.from(uploadedFiles)
      .filter(file => file.name.toLowerCase().endsWith('.dng'))
      .map(file => ({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        type: 'DNG',
        isNew: true // Added flag for a visual flair
      }));
    
    if (newFiles.length === 0) {
      alert("Please upload DNG files only.");
      setIsUploading(false);
      setIsDragging(false);
      return;
    }

    // Small delay just for the "Developing" animation feel, then update state
    setTimeout(() => {
      setFiles(prev => [...newFiles, ...prev]);
      setIsUploading(false);
      setIsDragging(false);
    }, 800);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    processFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) return;
    processFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    if (!isAdmin) return;
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <section id="presets" className="py-24 md:py-40 bg-brand-black relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-16">
          
          {/* Header Section */}
          <div className="max-w-3xl">
            <span className="text-brand-red text-xs uppercase tracking-[0.4em] font-bold">The Laboratory</span>
            <div className="flex items-center gap-4 mt-4">
              <h2 className="text-5xl md:text-7xl font-black italic">Visual Presets</h2>
              <button 
                onClick={handleAdminToggle}
                className={`p-2 rounded-full transition-colors ${isAdmin ? 'text-brand-red bg-brand-red/10' : 'text-brand-grey/20 hover:text-brand-red'}`}
              >
                {isAdmin ? <Unlock size={20} /> : <Lock size={20} />}
              </button>
            </div>
            <p className="text-brand-grey leading-relaxed text-lg mt-6">
              Our curated collection of professional color-grading templates. These DNG presets are high-quality raw assets tailored for a cinematic look in your own frames.
              {!isAdmin && <span className="block mt-2 text-xs uppercase tracking-widest text-brand-red/60 italic">Admin authorization required for additions.</span>}
            </p>
          </div>

          <AnimatePresence>
            {showPasscode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-md bg-white/5 border border-brand-white/10 p-8 rounded-sm space-y-6"
              >
                <h4 className="text-sm uppercase tracking-widest font-bold text-brand-red flex items-center gap-2">
                  <Lock size={14} /> Security Challenge
                </h4>
                <form onSubmit={verifyPasscode} className="flex flex-col gap-4">
                  <input 
                    type="password"
                    autoFocus
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="ENTER PIN"
                    className="bg-brand-black border border-brand-white/20 py-4 px-6 focus:border-brand-red outline-none transition-colors text-xs uppercase tracking-widest placeholder:text-brand-grey/50"
                  />
                  <div className="flex gap-2">
                    <button 
                      type="submit"
                      className="flex-1 bg-brand-red text-brand-white py-4 text-[10px] uppercase tracking-widest font-black"
                    >
                      Verify
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowPasscode(false)}
                      className="px-6 border border-brand-white/10 text-brand-grey hover:text-brand-white transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Admin Upload Section - Only visible to Admin */}
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative border-2 border-dashed transition-all duration-500 rounded-sm p-12 flex flex-col items-center justify-center text-center overflow-hidden h-64 ${
                isDragging ? 'border-brand-red bg-brand-red/5' : 'border-brand-white/10 hover:border-brand-white/20'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                multiple 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileInput}
                accept=".dng"
              />
              
              <div className="mb-6 p-4 bg-brand-white/5 rounded-full text-brand-red">
                {isUploading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                    <Upload size={32} />
                  </motion.div>
                ) : (
                  <Upload size={32} />
                )}
              </div>
              
              <h3 className="text-xl font-serif italic mb-2">
                {isUploading ? "Developing Presets..." : "Upload New Visual Preset"}
              </h3>
              <p className="text-brand-grey mb-6 uppercase tracking-widest text-[10px]">
                DNG files only • High Dynamic Range raw assets
              </p>
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-8 py-3 bg-brand-red text-brand-white text-[10px] uppercase tracking-[0.2em] font-black hover:bg-brand-white hover:text-brand-black transition-all duration-500"
              >
                Select DNG
              </button>
            </motion.div>
          )}

          {/* Gallery / Downloadable Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {files.map((file, index) => (
                <motion.div
                  key={file.name + index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative bg-white/5 border border-brand-white/5 rounded-sm overflow-hidden hover:border-brand-red/30 transition-all duration-700"
                >
                  <div className="aspect-video bg-neutral-900 overflow-hidden relative">
                    {/* Placeholder for preset preview image */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                      <Camera size={48} className="text-brand-grey" />
                    </div>
                    
                    {/* New Badge */}
                    {file.name.includes('_new') || (file as any).isNew && (
                       <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-brand-red text-[8px] font-black uppercase tracking-widest text-brand-white rounded-full">
                         Recently Added
                       </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
                    
                    {isAdmin && (
                      <button 
                        onClick={() => removeFile(index)}
                        className="absolute top-4 right-4 z-20 w-8 h-8 bg-brand-black/80 text-brand-grey hover:text-brand-red rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="overflow-hidden">
                        <h4 className="text-brand-white font-serif italic text-lg leading-none mb-2 truncate" title={formatTitle(file.name)}>
                          {formatTitle(file.name)}
                        </h4>
                        <p className="text-brand-grey text-[10px] uppercase tracking-[0.2em]">{file.size} • DNG PRESET</p>
                      </div>
                      <CheckCircle size={16} className="text-brand-red/50" />
                    </div>
                    
                    <a 
                      href={`/presets/${file.name}`}
                      download
                      onClick={(e) => {
                        if (file.name.includes('cinematic')) {
                           e.preventDefault();
                           alert("Download initiated. In a live environment, this would fetch the DNG asset.");
                        }
                      }}
                      className="w-full flex items-center justify-center gap-3 py-3 border border-brand-white/10 text-[10px] uppercase tracking-[0.2em] font-black text-brand-white hover:bg-brand-white hover:text-brand-black transition-all duration-500"
                    >
                      <Download size={14} /> Download Asset
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
