import React from 'react';
import { MODUL_AJAR_INFO } from '../data/chapter1Data';
import { FileText, Sparkles, Printer, Copy, Check, BookOpen, Layers, CheckCircle } from 'lucide-react';

export const ModulAjarView: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const markdown = `# PERANGKAT PEMBELAJARAN (MODUL AJAR) KURIKULUM MERDEKA
Mata Pelajaran: ${MODUL_AJAR_INFO.subject}
Jenjang / Satuan: ${MODUL_AJAR_INFO.schoolLevel}
Kelas / Fase: ${MODUL_AJAR_INFO.grade} (${MODUL_AJAR_INFO.phase})
Semester: ${MODUL_AJAR_INFO.semester}
Alokasi Waktu: ${MODUL_AJAR_INFO.allocatedTime}
Bab / Topik: ${MODUL_AJAR_INFO.chapter} - ${MODUL_AJAR_INFO.chapterTitle}

## PROFIL PELAJAR PANCASILA
${MODUL_AJAR_INFO.profilPelajarPancasila.map(p => `- ${p}`).join('\n')}

## CAPAIAN & ALUR TUJUAN PEMBELAJARAN
${MODUL_AJAR_INFO.learningOutcomes.map((lo, i) => `${i + 1}. ${lo}`).join('\n')}

## MODEL & METODE PEMBELAJARAN
Model: ${MODUL_AJAR_INFO.pedagogicalModel}

## METODE ASESMEN
${MODUL_AJAR_INFO.assessmentMethods.map(am => `- ${am}`).join('\n')}
`;
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-8 print:p-0 print:border-none print:shadow-none">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Dokumen Administrasi Guru • Kurikulum Merdeka</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
            Modul Ajar / Rencana Pelaksanaan Pembelajaran (RPP)
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Disusun sesuai panduan BSKAP Kemendikbudristek untuk Fase F Lanjutan Jenjang SMA/MA.
          </p>
        </div>

        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={handleCopyText}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin' : 'Salin Dokumen'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* Identitas Umum Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 border-l-4 border-blue-600 pl-3">
          I. Informasi Umum
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[11px] text-slate-500 block">Mata Pelajaran</span>
            <span className="text-xs font-bold text-slate-900 block mt-0.5">
              {MODUL_AJAR_INFO.subject}
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[11px] text-slate-500 block">Jenjang & Tingkat</span>
            <span className="text-xs font-bold text-slate-900 block mt-0.5">
              {MODUL_AJAR_INFO.grade} ({MODUL_AJAR_INFO.phase})
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[11px] text-slate-500 block">Semester</span>
            <span className="text-xs font-bold text-slate-900 block mt-0.5">
              {MODUL_AJAR_INFO.semester}
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[11px] text-slate-500 block">Alokasi Waktu</span>
            <span className="text-xs font-bold text-slate-900 block mt-0.5">
              {MODUL_AJAR_INFO.allocatedTime}
            </span>
          </div>
        </div>

        {/* Profil Pelajar Pancasila */}
        <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-xl space-y-2">
          <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Dimensi Profil Pelajar Pancasila:
          </span>
          <div className="flex flex-wrap gap-2 pt-1">
            {MODUL_AJAR_INFO.profilPelajarPancasila.map((prof, i) => (
              <span key={i} className="px-2.5 py-1 bg-white border border-blue-200 text-blue-800 rounded-lg text-xs font-medium shadow-2xs">
                {prof}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Komponen Inti */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 border-l-4 border-blue-600 pl-3">
          II. Capaian Pembelajaran & Indikator Kompetensi
        </h3>

        <div className="space-y-4 text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
            <span className="font-bold text-slate-800 block uppercase tracking-wider text-[11px]">
              Alur Capaian Pembelajaran Elemen Fase F:
            </span>
            <ul className="space-y-2">
              {MODUL_AJAR_INFO.learningOutcomes.map((lo, i) => (
                <li key={i} className="text-slate-700 flex items-start gap-2 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{lo}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Model & Metode Pembelajaran */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 border-l-4 border-blue-600 pl-3">
          III. Model dan Pendekatan Pedagogis
        </h3>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs space-y-3">
          <div>
            <span className="text-slate-500 block text-[11px]">Model Pembelajaran:</span>
            <span className="font-bold text-slate-800 text-xs mt-0.5 block">
              {MODUL_AJAR_INFO.pedagogicalModel}
            </span>
          </div>

          <div className="pt-3 border-t border-slate-200">
            <span className="font-semibold text-slate-700 block mb-2">Sintaks Pembelajaran Berbasis Masalah (PBL):</span>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-[11px]">
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <strong>Tahap 1:</strong><br />Orientasi Masalah Nyata
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <strong>Tahap 2:</strong><br />Organisasi Belajar Siswa
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <strong>Tahap 3:</strong><br />Penyelidikan Mandiri & Lab
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <strong>Tahap 4:</strong><br />Pengembangan Karya Data
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <strong>Tahap 5:</strong><br />Evaluasi & Refleksi Kritis
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rancangan Asesmen */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 border-l-4 border-blue-600 pl-3">
          IV. Rancangan Asesmen Diagnostik, Formatif, dan Sumatif
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {MODUL_AJAR_INFO.assessmentMethods.map((method, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
              <span className="font-bold text-blue-900 block text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                Asesmen #{idx + 1}
              </span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {method}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
