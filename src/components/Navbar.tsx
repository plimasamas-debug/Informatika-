import React from 'react';
import { BookOpen, Cpu, Award, FileText, Printer, Sparkles, GraduationCap } from 'lucide-react';

export type TabType = 'materi' | 'simulasi' | 'evaluasi' | 'modul-ajar';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Context */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                  Informatika Kelas XII
                </span>
                <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 hidden sm:inline-block">
                  Kurikulum Merdeka • Fase F
                </span>
              </div>
              <span className="text-xs text-slate-500 block leading-tight">
                Semester 1 — Bab 1: AI, Data Science & Keamanan Siber
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('materi')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'materi'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>1. Rangkuman Materi</span>
            </button>

            <button
              onClick={() => setActiveTab('simulasi')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'simulasi'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-emerald-600" />
              <span>2. Modul Lab Simulasi</span>
            </button>

            <button
              onClick={() => setActiveTab('evaluasi')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'evaluasi'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>3. Evaluasi HOTS & AI</span>
            </button>

            <button
              onClick={() => setActiveTab('modul-ajar')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'modul-ajar'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-purple-600" />
              <span>Modul Ajar / RPP</span>
            </button>
          </nav>

          {/* Print / Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              title="Cetak Dokumen Lengkap"
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Cetak Dokumen</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 overflow-x-auto gap-1">
          <button
            onClick={() => setActiveTab('materi')}
            className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap ${
              activeTab === 'materi' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600'
            }`}
          >
            Materi
          </button>
          <button
            onClick={() => setActiveTab('simulasi')}
            className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap ${
              activeTab === 'simulasi' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600'
            }`}
          >
            Lab Simulasi
          </button>
          <button
            onClick={() => setActiveTab('evaluasi')}
            className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap ${
              activeTab === 'evaluasi' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600'
            }`}
          >
            Soal Evaluasi
          </button>
          <button
            onClick={() => setActiveTab('modul-ajar')}
            className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap ${
              activeTab === 'modul-ajar' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600'
            }`}
          >
            Modul Ajar
          </button>
        </div>
      </div>
    </header>
  );
};
