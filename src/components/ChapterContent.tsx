import React, { useState } from 'react';
import { SUB_CHAPTERS } from '../data/chapter1Data';
import { SubChapter } from '../types/curriculum';
import { BookOpen, Clock, Search, Sparkles, Volume2, VolumeX, CheckCircle, ChevronRight, Bookmark, Award, HelpCircle } from 'lucide-react';

export const ChapterContent: React.FC = () => {
  const [activeSubChapterId, setActiveSubChapterId] = useState<string>('sub-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [savedNotes, setSavedNotes] = useState<{ [key: string]: boolean }>({});

  const currentSub = SUB_CHAPTERS.find(s => s.id === activeSubChapterId) || SUB_CHAPTERS[0];

  // Speech synthesis for accessibility / read-aloud
  const handleToggleSpeech = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Peramban Anda belum mendukung fitur Web Speech Synthesis.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const toggleBookmark = (id: string) => {
    setSavedNotes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter sections by search query
  const filteredSections = currentSub.sections.filter(sec => 
    sec.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sec.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Chapter Overview Hero */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-blue-200 border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Kurikulum Merdeka • Informatika Kelas XII Semester 1</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Bab 1: Perkembangan Informatika, Kecerdasan Artifisial, dan Keamanan Siber
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Perangkat pembelajaran mendalam dan terstruktur yang menguraikan transisi komputasi klasik menuju revolusi Artificial Intelligence, metodologi sains data, pilar keamanan informasi (CIA Triad), serta implikasi etika hukum digital (UU PDP).
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-400" /> 4 Sub-bab Komprehensif
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" /> Estimasi Baca: ~52 Menit
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Fase F Lanjutan SMA
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-chapter Pills */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {SUB_CHAPTERS.map((sub) => (
            <button
              key={sub.id}
              onClick={() => {
                setActiveSubChapterId(sub.id);
                if (isSpeaking) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeSubChapterId === sub.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                activeSubChapterId === sub.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {sub.number}
              </span>
              <span>{sub.title.split('&')[0]}</span>
            </button>
          ))}
        </div>

        {/* Search within sub-chapter */}
        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari konsep materi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Main Reading Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Main Content (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Sub-chapter Title Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono uppercase px-2.5 py-1 rounded-md bg-blue-50 text-blue-700">
                Sub-Bab {currentSub.number}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleSpeech(`${currentSub.title}. ${currentSub.overview}`)}
                  title={isSpeaking ? 'Hentikan Audio' : 'Bacakan Materi Suara AI'}
                  className={`p-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                    isSpeaking 
                      ? 'bg-amber-50 border-amber-300 text-amber-800 animate-pulse'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-600" /> : <Volume2 className="w-4 h-4" />}
                  <span className="text-[11px] font-medium hidden sm:inline">
                    {isSpeaking ? 'Berhenti' : 'Dengarkan'}
                  </span>
                </button>

                <button
                  onClick={() => toggleBookmark(currentSub.id)}
                  title="Simpan Bookmark"
                  className={`p-1.5 rounded-lg border transition-colors ${
                    savedNotes[currentSub.id]
                      ? 'bg-blue-50 border-blue-300 text-blue-600'
                      : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {currentSub.title}
            </h2>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              {currentSub.subtitle}
            </p>

            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-100">
              {currentSub.overview}
            </p>

            {/* Learning Objectives Callout */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Tujuan Pembelajaran Khusus (TPK):
              </h4>
              <ul className="space-y-1.5">
                {currentSub.learningObjectives.map((obj, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sub-chapter Sections */}
          <div className="space-y-5">
            {filteredSections.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-slate-500 border border-slate-200">
                Tidak ada materi yang cocok dengan kata kunci &quot;{searchQuery}&quot;.
              </div>
            ) : (
              filteredSections.map((sec, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span>{sec.heading}</span>
                  </h3>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    {sec.content}
                  </p>

                  {/* Bullet points */}
                  {sec.bulletPoints && (
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 space-y-2">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                        Poin Kunci Konseptual:
                      </span>
                      <ul className="space-y-2">
                        {sec.bulletPoints.map((bp, bIdx) => (
                          <li key={bIdx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Real World Case Study */}
                  {sec.realWorldExample && (
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-amber-900 font-bold">
                        <span className="px-2 py-0.5 bg-amber-200 text-amber-900 rounded font-semibold text-[10px]">
                          STUDI KASUS INDONESIA
                        </span>
                        <span>{sec.realWorldExample.title}</span>
                      </div>
                      <p className="text-amber-900/90 leading-relaxed">
                        {sec.realWorldExample.description}
                      </p>
                      <div className="text-[11px] text-amber-800 font-medium pt-1">
                        <strong>Konteks Nasional:</strong> {sec.realWorldExample.contextInIndonesia}
                      </div>
                    </div>
                  )}

                  {/* Technical Deep Dive */}
                  {sec.technicalDeepDive && (
                    <div className="bg-slate-900 text-slate-200 rounded-xl p-4 space-y-2 text-xs font-mono">
                      <div className="text-blue-400 font-bold flex items-center gap-2">
                        <span>⚡ BEDAH TEKNIS / RUMUS:</span>
                        <span>{sec.technicalDeepDive.title}</span>
                      </div>
                      <p className="text-slate-300 font-sans leading-relaxed text-xs">
                        {sec.technicalDeepDive.description}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Sub-chapter Summary & Reflection */}
          <div className="bg-slate-900 text-white rounded-xl p-6 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Rangkuman Intisari Sub-Bab {currentSub.number}
            </h4>

            <ul className="space-y-2">
              {currentSub.summary.map((item, sIdx) => (
                <li key={sIdx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-slate-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                Pertanyaan Refleksi Siswa:
              </span>
              <div className="space-y-2">
                {currentSub.reflectionQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="p-3 bg-slate-800/80 rounded-lg text-xs text-slate-300 leading-relaxed border border-slate-700">
                    <strong>Refleksi {qIdx + 1}:</strong> {q}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Key Concepts & Fast Links (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Key Concepts Dictionary */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Glosarium Istilah Kunci
            </h4>

            <div className="space-y-3">
              {currentSub.keyConcepts.map((kc, kIdx) => (
                <div key={kIdx} className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-blue-900">{kc.term}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono">
                      {kc.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {kc.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Sub-chapter switcher */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Daftar Sub-Bab Bab 1
            </h4>

            <div className="space-y-1.5">
              {SUB_CHAPTERS.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubChapterId(sub.id)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    activeSubChapterId === sub.id
                      ? 'bg-blue-50 border border-blue-200 text-blue-900 font-semibold'
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="truncate pr-2">
                    <span className="font-mono font-bold mr-1.5 text-slate-400">
                      {sub.number}
                    </span>
                    <span>{sub.title}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
