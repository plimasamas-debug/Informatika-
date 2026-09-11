import React, { useState } from 'react';
import { PRACTICAL_LABS } from '../data/chapter1Data';
import { AILabSimulator } from './AILabSimulator';
import { CryptoSecurityLab } from './CryptoSecurityLab';
import { PythonSandboxLab } from './PythonSandboxLab';
import { Cpu, ShieldCheck, Terminal, CheckCircle2, FileText, ExternalLink, HelpCircle, Layers } from 'lucide-react';

export const SimulationLabView: React.FC = () => {
  const [selectedLabId, setSelectedLabId] = useState<string>('lab-1');
  const [showAnswerGuide, setShowAnswerGuide] = useState<{ [key: string]: boolean }>({});

  const currentLab = PRACTICAL_LABS.find(l => l.id === selectedLabId) || PRACTICAL_LABS[0];

  const toggleAnswerGuide = (id: string) => {
    setShowAnswerGuide(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Modul Praktikum & Lab Simulasi Terpadu</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
            Laboratorium Eksperimen Sains Data, AI & Keamanan Informasi
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Panduan skenario kegiatan bertahap dilengkapi simulator browser interaktif tanpa perlu instalasi perangkat lunak luar.
          </p>
        </div>

        {/* Lab Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {PRACTICAL_LABS.map((lab) => (
            <button
              key={lab.id}
              onClick={() => setSelectedLabId(lab.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                selectedLabId === lab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {lab.number === 1 && <Cpu className="w-3.5 h-3.5" />}
              {lab.number === 2 && <ShieldCheck className="w-3.5 h-3.5" />}
              {lab.number === 3 && <Terminal className="w-3.5 h-3.5" />}
              <span>Lab {lab.number}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lab Details Header */}
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded border border-blue-400/30">
            Fokus: {currentLab.focus}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Alokasi Waktu: {currentLab.duration}
          </span>
        </div>

        <div>
          <h3 className="text-lg md:text-xl font-bold text-white">
            {currentLab.title}
          </h3>
          <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">
            <strong>Tujuan Praktikum:</strong> {currentLab.objective}
          </p>
        </div>

        {/* Tools and platforms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {currentLab.toolsAndPlatforms.map((tool, idx) => (
            <div key={idx} className="bg-slate-800/80 border border-slate-700 rounded-lg p-3 text-xs space-y-1">
              <div className="flex items-center justify-between font-semibold text-blue-300">
                <span>{tool.name}</span>
                {tool.url && (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    Buka <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Live Interactive Simulator Component */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Simulasi Interaktif Langsung (Browser Sandbox)
          </span>
          <span className="text-xs text-slate-500">
            Dapat langsung dicoba oleh siswa di kelas
          </span>
        </div>

        {currentLab.number === 1 && <AILabSimulator />}
        {currentLab.number === 2 && <CryptoSecurityLab />}
        {currentLab.number === 3 && <PythonSandboxLab />}
      </div>

      {/* Step-by-Step Procedure & Reflection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Step-by-Step Steps (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h4 className="font-bold text-sm uppercase tracking-wider text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            <FileText className="w-4 h-4 text-blue-600" />
            Langkah-Langkah Kerja Praktikum Siswa (Step-by-Step)
          </h4>

          <div className="space-y-4">
            {currentLab.steps.map((st) => (
              <div key={st.stepNumber} className="flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {st.stepNumber}
                </span>
                <div className="space-y-1 text-xs">
                  <strong className="text-slate-900 block text-xs">
                    {st.stepTitle}
                  </strong>
                  <p className="text-slate-600 leading-relaxed">
                    {st.instruction}
                  </p>
                  {st.expectedOutput && (
                    <div className="bg-slate-50 p-2 rounded border border-slate-100 text-[11px] text-slate-700 mt-1">
                      <span className="font-semibold text-blue-700">Hasil yang Diharapkan:</span> {st.expectedOutput}
                    </div>
                  )}
                  {st.proTip && (
                    <div className="text-[11px] text-amber-700 italic">
                      💡 <strong>Tips Teknis:</strong> {st.proTip}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reflection Questions & Rubric (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Reflection questions */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              Pertanyaan Analisis & Refleksi Praktikum
            </h4>

            <div className="space-y-3">
              {currentLab.reflectionAndAnalysis.map((ref, rIdx) => (
                <div key={ref.id} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                  <div className="font-semibold text-slate-900 leading-relaxed">
                    <strong>Refleksi #{rIdx + 1}:</strong> {ref.question}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    <em>Fokus Pedagogis:</em> {ref.pedagogicalGoal}
                  </div>

                  <button
                    onClick={() => toggleAnswerGuide(ref.id)}
                    className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold underline block pt-1"
                  >
                    {showAnswerGuide[ref.id] ? 'Sembunyikan Panduan Jawaban' : 'Lihat Panduan Jawaban Guru'}
                  </button>

                  {showAnswerGuide[ref.id] && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded p-2 text-[11px] text-emerald-900 leading-relaxed">
                      <strong>Kunci Jawaban Guru:</strong> {ref.sampleAnswerGuide}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Assessment rubric summary */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Rubrik Penilaian Unjuk Kerja (Kinerja)
            </h4>

            <div className="space-y-2">
              {currentLab.assessmentRubric.map((rub, rubIdx) => (
                <div key={rubIdx} className="text-xs p-2.5 bg-slate-50 rounded border border-slate-100 space-y-1">
                  <span className="font-bold text-slate-800 block">{rub.criteria}</span>
                  <p className="text-[11px] text-slate-600">
                    <strong className="text-emerald-700">Skor 4 (Sangat Baik):</strong> {rub.score4}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
