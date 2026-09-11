/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { ChapterContent } from './components/ChapterContent';
import { SimulationLabView } from './components/SimulationLabView';
import { EvaluationQuizView } from './components/EvaluationQuizView';
import { ModulAjarView } from './components/ModulAjarView';
import { 
  BookOpen, Cpu, Award, FileText, ArrowRight, ShieldCheck, 
  Terminal, Sparkles, CheckCircle2, Heart 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('materi');

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Sticky Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Quick Context Switcher / Highlights Bar */}
        <div className="mb-6 bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-slate-700">Akses Cepat Pembelajaran:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('materi')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                activeTab === 'materi'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>4 Sub-Bab Teori</span>
            </button>

            <button
              onClick={() => setActiveTab('simulasi')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                activeTab === 'simulasi'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-emerald-600" />
              <span>3 Lab Interaktif</span>
            </button>

            <button
              onClick={() => setActiveTab('evaluasi')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                activeTab === 'evaluasi'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>10 Soal HOTS & Pembahasan</span>
            </button>

            <button
              onClick={() => setActiveTab('modul-ajar')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                activeTab === 'modul-ajar'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-purple-600" />
              <span>RPP / Modul Ajar</span>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="transition-all duration-200">
          {activeTab === 'materi' && <ChapterContent />}
          {activeTab === 'simulasi' && <SimulationLabView />}
          {activeTab === 'evaluasi' && <EvaluationQuizView />}
          {activeTab === 'modul-ajar' && <ModulAjarView />}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-8 text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-semibold text-slate-800 flex items-center justify-center md:justify-start gap-2">
              <span>Perangkat Pembelajaran Informatika SMA Fase F (Kelas XII)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="text-blue-600 font-bold">Kurikulum Merdeka</span>
            </div>
            <p className="text-slate-500">
              Dikembangkan secara sistematis sesuai Capaian Pembelajaran BSKAP Kemendikbudristek RI dan standar etika AI.
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Berbasis Google AI Studio & Gemini API</span>
            <span>•</span>
            <span className="text-slate-600 font-medium">Semester Ganjil Bab 1</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
