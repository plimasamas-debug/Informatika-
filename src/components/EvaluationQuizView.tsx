import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../data/chapter1Data';
import { QuizQuestion } from '../types/curriculum';
import { 
  CheckCircle2, XCircle, Clock, Award, RotateCcw, 
  HelpCircle, Sparkles, BookOpen, AlertCircle, FileCheck, Filter, Send
} from 'lucide-react';

export const EvaluationQuizView: React.FC = () => {
  // Mode: 'student-exam' (interactive test) | 'teacher-key' (all questions + rationales) | 'ai-generator'
  const [viewMode, setViewMode] = useState<'student-exam' | 'teacher-key' | 'ai-generator'>('student-exam');

  // Exam state
  const [questions, setQuestions] = useState<QuizQuestion[]>(QUIZ_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: number]: 'A' | 'B' | 'C' | 'D' | 'E' }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(1800); // 30 mins
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Filter for teacher view
  const [filterBloom, setFilterBloom] = useState<string>('all');

  // AI Generator state
  const [aiTopic, setAiTopic] = useState<string>('Large Language Models & Keamanan Siber Lanjut');
  const [aiDifficulty, setAiDifficulty] = useState<string>('HOTS (C4-C6)');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiGeneratedText, setAiGeneratedText] = useState<string>('');
  const [aiError, setAiError] = useState<string>('');

  // Countdown timer
  useEffect(() => {
    if (!isTimerRunning || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, isSubmitted]);

  const currentQ = questions[currentQuestionIndex] || questions[0];

  const handleSelectOption = (optionKey: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionKey
    }));
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    setIsTimerRunning(false);
  };

  const handleResetExam = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setTimeRemainingSeconds(1800);
    setIsTimerRunning(true);
  };

  // Calculate scores
  const scoreResult = React.useMemo(() => {
    let correctCount = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / questions.length) * 100);
    return {
      correctCount,
      wrongCount: questions.length - correctCount,
      finalScore,
      totalQuestions: questions.length
    };
  }, [questions, userAnswers]);

  // AI Generator Call
  const handleGenerateQuestionsWithAI = async () => {
    setIsGenerating(true);
    setAiError('');
    setAiGeneratedText('');

    const promptText = `Sebagai Ahli Kurikulum Informatika SMA Kelas XII, buatkan 10 Soal Pilihan Ganda (A, B, C, D, E) baru dengan spesifikasi berikut:
Mata Pelajaran: Informatika Kelas XII Semester 1 Bab 1
Topik Khusus: ${aiTopic}
Tingkat Kesulitan: ${aiDifficulty}
Ketentuan:
1. Memiliki stimulus/skenario kasus kontekstual nyata di Indonesia.
2. Memiliki 5 pilihan jawaban (A, B, C, D, E) dengan distraktor logis.
3. Cantumkan Kunci Jawaban Resmi dan Pembahasan Rasional Teknis mendalam di setiap soal.
4. Cantumkan indikator pencapaian kompetensi dan level kognitif Bloom (C4/C5/C6).
Format teks rapi dan terstruktur dalam Bahasa Indonesia.`;

    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          systemInstruction: 'Anda adalah Pengembang Media Pembelajaran & Ahli Evaluasi Pendidikan Informatika SMA Kelas XII.'
        })
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Gagal menghubungi server Gemini AI.');
      }

      setAiGeneratedText(data.text);
    } catch (err: any) {
      setAiError(err.message || 'Terjadi kesalahan saat memproses permintaan AI.');
    } finally {
      setIsGenerating(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredTeacherQuestions = questions.filter(q => {
    if (filterBloom === 'all') return true;
    return q.bloomLevel.startsWith(filterBloom);
  });

  return (
    <div className="space-y-6">
      {/* Top Header with Mode Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Evaluasi & Generator Soal Terstandar</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
            Paket 10 Soal Pilihan Ganda Berbasis HOTS (A-E)
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Lengkap dengan kisi-kisi, kunci jawaban resmi, pembahasan rasional teknis, serta generator soal baru berbasis AI.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('student-exam')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'student-exam'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mode Kuis Interaktif
          </button>
          <button
            onClick={() => setViewMode('teacher-key')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'teacher-key'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kunci & Pembahasan Guru
          </button>
          <button
            onClick={() => setViewMode('ai-generator')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1 ${
              viewMode === 'ai-generator'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>AI Generator Soal</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: STUDENT INTERACTIVE EXAM MODE */}
      {viewMode === 'student-exam' && (
        <div className="space-y-6">
          {/* Status bar: timer & question palette */}
          <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-slate-400 font-medium">Sisa Waktu:</span>
                <span className="font-mono font-bold text-base text-blue-300">
                  {formatTimer(timeRemainingSeconds)}
                </span>
              </div>

              <div className="h-4 w-px bg-slate-700"></div>

              <div className="text-xs text-slate-300">
                Terjawab: <strong className="text-emerald-400">{Object.keys(userAnswers).length}</strong> dari <strong>{questions.length}</strong>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmitExam}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-xs"
                >
                  Selesai & Kumpulkan Ujian
                </button>
              ) : (
                <button
                  onClick={handleResetExam}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Ulangi Ujian
                </button>
              )}
            </div>
          </div>

          {/* Exam Result Banner if submitted */}
          {isSubmitted && (
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  Hasil Evaluasi Ujian Siswa
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Skor Akhir: {scoreResult.finalScore} / 100
                </h3>
                <p className="text-xs text-slate-300">
                  Benar: <strong>{scoreResult.correctCount}</strong> soal • Salah: <strong>{scoreResult.wrongCount}</strong> soal
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-lg text-center min-w-[90px]">
                  <span className="text-xs text-slate-300 block">Status:</span>
                  <span className={`font-bold text-sm ${scoreResult.finalScore >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {scoreResult.finalScore >= 75 ? 'TUNTAS (KKM)' : 'PERLU REMEDIAL'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Question Navigation Numbers */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs flex items-center gap-1.5 overflow-x-auto">
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isCurrent = idx === currentQuestionIndex;
              const isCorrect = isSubmitted && userAnswers[q.id] === q.correctAnswer;
              const isWrong = isSubmitted && isAnswered && userAnswers[q.id] !== q.correctAnswer;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-9 h-9 rounded-lg font-mono text-xs font-bold transition-all shrink-0 flex items-center justify-center ${
                    isCurrent
                      ? 'ring-2 ring-blue-600 ring-offset-2'
                      : ''
                  } ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-600 text-white'
                        : isWrong
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-200 text-slate-500'
                      : isAnswered
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Active Question Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded">
                Soal Nomor {currentQuestionIndex + 1} dari {questions.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-mono">
                  {currentQ.bloomLevel}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {currentQ.subChapterRef.split(':')[0]}
                </span>
              </div>
            </div>

            {/* Stimulus case study */}
            {currentQ.stimulus && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs md:text-sm text-slate-800 leading-relaxed italic">
                <strong>Skenario Kasus / Stimulus:</strong> &quot;{currentQ.stimulus}&quot;
              </div>
            )}

            {/* Question prompt */}
            <div className="text-sm md:text-base font-semibold text-slate-900 leading-relaxed">
              {currentQ.question}
            </div>

            {/* 5 Options (A, B, C, D, E) */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentQ.id] === opt.key;
                const isCorrect = isSubmitted && opt.key === currentQ.correctAnswer;
                const isWrongSelection = isSubmitted && isSelected && !isCorrect;

                return (
                  <button
                    key={opt.key}
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm transition-all flex items-start gap-3 ${
                      isSubmitted
                        ? isCorrect
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-1 ring-emerald-400'
                          : isWrongSelection
                          ? 'bg-red-50 border-red-300 text-red-950 ring-1 ring-red-300'
                          : 'bg-white border-slate-200 text-slate-600 opacity-70'
                        : isSelected
                        ? 'bg-blue-50 border-blue-500 text-blue-900 font-semibold ring-1 ring-blue-500'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isSubmitted
                        ? isCorrect
                          ? 'bg-emerald-600 text-white'
                          : isWrongSelection
                          ? 'bg-red-500 text-white'
                          : 'bg-slate-100 text-slate-500'
                        : isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {opt.key}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Post-submission Rationale for active question */}
            {isSubmitted && (
              <div className="mt-6 pt-5 border-t border-slate-200 space-y-3 bg-slate-50 p-4 rounded-xl border">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Kunci Jawaban Resmi: Pilihan {currentQ.correctAnswer}
                  </span>
                  <span className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                    userAnswers[currentQ.id] === currentQ.correctAnswer
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {userAnswers[currentQ.id] === currentQ.correctAnswer ? 'Jawaban Anda Benar' : 'Jawaban Anda Keliru'}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Pembahasan Rasional Teknis:</strong> {currentQ.technicalRationale}
                </p>

                {currentQ.distractorExplanation && currentQ.distractorExplanation[userAnswers[currentQ.id]] && userAnswers[currentQ.id] !== currentQ.correctAnswer && (
                  <div className="text-[11px] text-red-800 bg-red-50 p-2.5 rounded border border-red-200">
                    <strong>Mengapa Pilihan {userAnswers[currentQ.id]} Kurang Tepat?</strong> {currentQ.distractorExplanation[userAnswers[currentQ.id]]}
                  </div>
                )}
              </div>
            )}

            {/* Bottom Nav between questions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 font-medium"
              >
                ← Soal Sebelumnya
              </button>

              <button
                disabled={currentQuestionIndex === questions.length - 1}
                onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 font-medium"
              >
                Soal Berikutnya →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: TEACHER MASTER KEY & RATIONALES */}
      {viewMode === 'teacher-key' && (
        <div className="space-y-6">
          {/* Teacher Controls & Filter */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="font-semibold text-slate-700">Filter Tingkat Bloom:</span>
              <select
                value={filterBloom}
                onChange={(e) => setFilterBloom(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Semua Level (C4, C5, C6)</option>
                <option value="C4">Hanya C4 (Analisis)</option>
                <option value="C5">Hanya C5 (Evaluasi)</option>
                <option value="C6">Hanya C6 (Kreasi)</option>
              </select>
            </div>

            <div className="text-xs text-slate-500">
              Menampilkan <strong>{filteredTeacherQuestions.length}</strong> dari <strong>{questions.length}</strong> butir soal
            </div>
          </div>

          {/* List of All Questions with Full Keys and Rationales */}
          <div className="space-y-6">
            {filteredTeacherQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                      {q.number}
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      Indikator: {q.competencyIndicator}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                    {q.bloomLevel}
                  </span>
                </div>

                {/* Stimulus */}
                {q.stimulus && (
                  <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-700 italic border border-slate-200">
                    {q.stimulus}
                  </div>
                )}

                {/* Question */}
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                  {q.question}
                </p>

                {/* Options list */}
                <div className="space-y-2 pt-1">
                  {q.options.map((opt) => (
                    <div
                      key={opt.key}
                      className={`p-2.5 rounded-lg text-xs flex items-start gap-2.5 border ${
                        opt.key === q.correctAnswer
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded flex items-center justify-center font-mono font-bold text-[11px] shrink-0 ${
                        opt.key === q.correctAnswer
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {opt.key}
                      </span>
                      <span className="leading-relaxed">{opt.text}</span>
                    </div>
                  ))}
                </div>

                {/* Answer Key & Rationale */}
                <div className="bg-slate-900 text-slate-200 rounded-xl p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-blue-400 font-bold border-b border-slate-800 pb-2">
                    <span>KUNCI JAWABAN: {q.correctAnswer}</span>
                    <span className="text-[11px] font-mono text-slate-400">{q.subChapterRef}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>Rasional Teknis:</strong> {q.technicalRationale}
                  </p>

                  {/* Distractor review */}
                  {q.distractorExplanation && (
                    <div className="pt-2 border-t border-slate-800 space-y-1 text-[11px] text-slate-400">
                      <span className="font-semibold text-slate-300 block">Analisis Pengecoh (Distractor):</span>
                      {Object.entries(q.distractorExplanation).map(([key, reason]) => (
                        <div key={key}>
                          <strong className="text-amber-400">{key}:</strong> {reason}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: AI QUESTION GENERATOR */}
      {viewMode === 'ai-generator' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <span className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                AI Soal Evaluasi Generator (Powered by Gemini AI)
              </h3>
              <p className="text-xs text-slate-500">
                Hasilkan paket variasi 10 soal baru secara otomatis berdasarkan topik spesifik Kurikulum Merdeka Fase F.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Fokus Topik Spesifik:</label>
              <input
                type="text"
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                placeholder="Contoh: Arsitektur Transformer, Deepfake, UU PDP..."
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Tingkat Kesulitan / Ranah Kognitif:</label>
              <select
                value={aiDifficulty}
                onChange={(e) => setAiDifficulty(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="HOTS (C4-C6)">HOTS Campuran (C4 Analisis, C5 Evaluasi, C6 Kreasi)</option>
                <option value="HOTS C5 murni (Evaluasi Studi Kasus)">Hanya Kasus Evaluasi Kritis (C5)</option>
                <option value="Sedang (C3-C4)">Kombinasi Pemahaman Konseptual & Analisis (C3-C4)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerateQuestionsWithAI}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs py-3 rounded-lg transition-colors shadow-xs"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Menyusun Paket 10 Soal Berbasis AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate 10 Soal Pilihan Ganda Baru Sekarang</span>
              </>
            )}
          </button>

          {aiError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{aiError}</span>
            </div>
          )}

          {aiGeneratedText && (
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-purple-600" />
                  Paket Soal Baru Hasil AI:
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(aiGeneratedText)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline"
                >
                  Salin Teks ke Clipboard
                </button>
              </div>

              <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-sans text-xs whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto border border-slate-800">
                {aiGeneratedText}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
