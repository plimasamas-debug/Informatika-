import React, { useState, useEffect } from 'react';
import { Lock, Key, ShieldCheck, Hash, Zap, AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react';

export const CryptoSecurityLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hash' | 'caesar' | 'password'>('hash');

  // SHA-256 Avalanche Lab States
  const [text1, setText1] = useState<string>('Saya siswa berintegritas SMA Indonesia');
  const [text2, setText2] = useState<string>('Saya siswa berintegritas SMA IndonesiA');
  const [hash1, setHash1] = useState<string>('');
  const [hash2, setHash2] = useState<string>('');
  const [diffBits, setDiffBits] = useState<{ total: number; percentage: number }>({ total: 0, percentage: 0 });

  // Caesar / Symmetric cipher states
  const [plainText, setPlainText] = useState<string>('UJIAN INFORMATIKA KELAS XII');
  const [shiftKey, setShiftKey] = useState<number>(7);
  const [cipherText, setCipherText] = useState<string>('');

  // Password Entropy States
  const [testPassword, setTestPassword] = useState<string>('K3l@s12#Informatika!');

  // Compute SHA-256 using Browser SubtleCrypto
  const computeSha256 = async (str: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  useEffect(() => {
    let isMounted = true;
    Promise.all([computeSha256(text1), computeSha256(text2)]).then(([h1, h2]) => {
      if (!isMounted) return;
      setHash1(h1);
      setHash2(h2);

      // Compute bit difference between h1 and h2
      let changedBits = 0;
      for (let i = 0; i < h1.length; i += 2) {
        const b1 = parseInt(h1.substr(i, 2), 16);
        const b2 = parseInt(h2.substr(i, 2), 16);
        let xor = b1 ^ b2;
        while (xor > 0) {
          if (xor & 1) changedBits++;
          xor >>= 1;
        }
      }
      setDiffBits({
        total: changedBits,
        percentage: (changedBits / 256) * 100
      });
    });

    return () => { isMounted = false; };
  }, [text1, text2]);

  // Caesar Cipher transformation
  useEffect(() => {
    const result = plainText
      .split('')
      .map(char => {
        const code = char.charCodeAt(0);
        // Uppercase
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + shiftKey) % 26) + 65);
        }
        // Lowercase
        if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 + shiftKey) % 26) + 97);
        }
        return char;
      })
      .join('');
    setCipherText(result);
  }, [plainText, shiftKey]);

  // Password Entropy Calculator
  const passwordStats = React.useMemo(() => {
    const len = testPassword.length;
    let poolSize = 0;
    const hasLower = /[a-z]/.test(testPassword);
    const hasUpper = /[A-Z]/.test(testPassword);
    const hasDigit = /[0-9]/.test(testPassword);
    const hasSpecial = /[^a-zA-Z0-9]/.test(testPassword);

    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasDigit) poolSize += 10;
    if (hasSpecial) poolSize += 33;

    if (len === 0 || poolSize === 0) {
      return { entropy: 0, crackTime: '0 detik', strength: 'Kosong', scoreColor: 'text-slate-400' };
    }

    // Entropy E = L * log2(poolSize)
    const entropy = Math.round(len * (Math.log(poolSize) / Math.log(2)));

    // Total combinations: poolSize ^ len
    // Rate of brute-force: 10 billion guesses/sec = 10^10 / sec
    // Seconds = (poolSize ^ len) / 10^10 / 2 (average)
    const combinationsLog10 = len * Math.log10(poolSize);
    let crackTime = '';

    if (combinationsLog10 < 10) {
      crackTime = '< 0.001 Detik (Sangat Rentan)';
    } else if (combinationsLog10 < 12) {
      crackTime = `${Math.round(Math.pow(10, combinationsLog10 - 10))} Detik`;
    } else if (combinationsLog10 < 15) {
      crackTime = `${Math.round(Math.pow(10, combinationsLog10 - 10) / 60)} Menit`;
    } else if (combinationsLog10 < 17) {
      crackTime = `${Math.round(Math.pow(10, combinationsLog10 - 10) / 86400)} Hari`;
    } else if (combinationsLog10 < 20) {
      crackTime = `${Math.round(Math.pow(10, combinationsLog10 - 10) / (86400 * 365))} Tahun`;
    } else {
      crackTime = `> ${Math.round(Math.pow(10, combinationsLog10 - 10) / (86400 * 365 * 1000))} Ribu Tahun (Sangat Aman)`;
    }

    let strength = 'Sangat Lemah';
    let scoreColor = 'text-red-600 bg-red-50 border-red-200';
    if (entropy >= 75) {
      strength = 'Sangat Kuat (Standar Enterprise)';
      scoreColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    } else if (entropy >= 50) {
      strength = 'Kuat (Aman)';
      scoreColor = 'text-blue-700 bg-blue-50 border-blue-200';
    } else if (entropy >= 35) {
      strength = 'Sedang (Cukup)';
      scoreColor = 'text-amber-700 bg-amber-50 border-amber-200';
    }

    return { entropy, crackTime, strength, scoreColor, hasLower, hasUpper, hasDigit, hasSpecial, len };
  }, [testPassword]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-6">
      {/* Header with Sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h3 className="font-semibold text-lg text-slate-900">
              Simulator Keamanan Siber & Kriptografi Modern
            </h3>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Eksperimen pembuktian CIA Triad, Avalanche Effect fungsi hash SHA-256, dan kekuatan kunci kata sandi.
          </p>
        </div>

        {/* Lab feature selector pills */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('hash')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'hash'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            SHA-256 Avalanche
          </button>
          <button
            onClick={() => setActiveTab('caesar')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'caesar'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Enkripsi Simetris
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'password'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Entropi Password
          </button>
        </div>
      </div>

      {/* TAB 1: SHA-256 AVALANCHE EFFECT */}
      {activeTab === 'hash' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800 flex items-start gap-2">
            <Hash className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong>Uji Coba Avalanche Effect:</strong> Ubah satu huruf saja pada teks masukan di bawah ini (misal huruf kecil &apos;a&apos; menjadi kapital &apos;A&apos;). Perhatikan bagaimana nilai heksadesimal SHA-256 (64 karakter) berubah drastis lebih dari 50%!
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input 1 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                <span>Teks Masukan 1 (Asli):</span>
                <span className="text-[11px] font-mono text-slate-400">{text1.length} Karakter</span>
              </div>
              <textarea
                rows={2}
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="bg-slate-900 text-slate-200 rounded-lg p-3 space-y-1 font-mono text-xs">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">SHA-256 Digest 1:</div>
                <div className="break-all text-blue-400 select-all font-bold">
                  {hash1 || 'Menghitung...'}
                </div>
              </div>
            </div>

            {/* Input 2 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                <span>Teks Masukan 2 (Sedikit Dimodifikasi):</span>
                <span className="text-[11px] font-mono text-slate-400">{text2.length} Karakter</span>
              </div>
              <textarea
                rows={2}
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="bg-slate-900 text-slate-200 rounded-lg p-3 space-y-1 font-mono text-xs">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">SHA-256 Digest 2:</div>
                <div className="break-all text-emerald-400 select-all font-bold">
                  {hash2 || 'Menghitung...'}
                </div>
              </div>
            </div>
          </div>

          {/* Differential Bit Comparison */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Analisis Perbedaan Bit Kriptografi (Avalanche Ratio)
              </span>
              <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full">
                {diffBits.total} / 256 Bit Berubah ({diffBits.percentage.toFixed(1)}%)
              </span>
            </div>

            {/* Visual byte stream diff display */}
            <div className="space-y-2">
              <div className="text-xs text-slate-600">
                Peta Perbandingan Karakter Heksadesimal (Warna Merah = Karakter Berubah Total):
              </div>
              <div className="font-mono text-xs p-3 bg-white border border-slate-200 rounded-lg flex flex-wrap gap-1 leading-relaxed">
                {hash1.split('').map((char1, idx) => {
                  const char2 = hash2[idx];
                  const isChanged = char1 !== char2;
                  return (
                    <span
                      key={idx}
                      title={`Posisi ${idx}: '${char1}' vs '${char2}'`}
                      className={`px-1 py-0.5 rounded text-[11px] font-bold ${
                        isChanged
                          ? 'bg-red-500 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {char2}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Kesimpulan Ilmiah Siswa:</strong> Pengujian membuktikan bahwa perubahan sekecil satu bit pada pesan masukan menyebabkan perubahan drastis (~50%) pada seluruh bit output hash. Hal inilah yang menjamin <em>pilar Integritas (Integrity)</em> pada CIA Triad: mustahil ada berkas yang diubah tanpa terdeteksi oleh sistem!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ENKRIPSI SIMETRIS */}
      {activeTab === 'caesar' && (
        <div className="space-y-5">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-blue-600" />
              Simulasi Enkripsi Kunci Simetris (Caesar Shift Cipher)
            </h4>
            <p className="text-xs text-slate-600">
              Dalam kriptografi simetris, pengirim dan penerima harus menyepakati satu kunci rahasia yang sama persis untuk mengaburkan plaintext menjadi ciphertext.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs text-slate-600 font-medium">Teks Asli (Plaintext):</label>
                <input
                  type="text"
                  value={plainText}
                  onChange={(e) => setPlainText(e.target.value.toUpperCase())}
                  className="w-full text-xs font-mono bg-white border border-slate-300 rounded px-2.5 py-1.5"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-600 font-medium flex justify-between">
                  <span>Kunci Pergeseran (Shift Key):</span>
                  <span className="font-mono font-bold text-blue-600">+{shiftKey}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={shiftKey}
                  onChange={(e) => setShiftKey(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded appearance-none cursor-pointer accent-blue-600 mt-2"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-600 font-medium">Teks Sandi (Ciphertext):</label>
                <input
                  type="text"
                  readOnly
                  value={cipherText}
                  className="w-full text-xs font-mono bg-blue-50 border border-blue-200 rounded px-2.5 py-1.5 text-blue-800 font-bold"
                />
              </div>
            </div>
          </div>

          {/* Visual Alphabet Mapping */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-2">
            <span className="text-xs font-semibold text-slate-700 block">Peta Pergeseran Huruf:</span>
            <div className="overflow-x-auto">
              <div className="font-mono text-xs flex gap-1 min-w-[600px] text-center">
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((char, i) => {
                  const shifted = String.fromCharCode(((i + shiftKey) % 26) + 65);
                  return (
                    <div key={char} className="flex-1 bg-slate-50 border border-slate-200 rounded p-1">
                      <div className="text-slate-400 text-[10px]">{char}</div>
                      <div className="text-blue-600 font-bold text-[11px] mt-0.5">↓ {shifted}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              *Meskipun Caesar Cipher mudah dipecahkan oleh analisis frekuensi (frequency analysis), prinsip substitusinya menjadi fondasi awal bagi algoritma simetris modern seperti AES-256 yang menggunakan matriks substitusi S-box berlapis ganda.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: PASSWORD ENTROPY & BRUTE FORCE */}
      {activeTab === 'password' && (
        <div className="space-y-5">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-purple-600" />
              Kalkulator Entropi Kata Sandi & Uji Ketahanan Brute-Force
            </h4>
            <p className="text-xs text-slate-600">
              Kekuatan kata sandi diukur dari <em>Entropi (bit)</em> = L × log₂(N), di mana L adalah panjang karakter dan N adalah variasi karakter yang digunakan.
            </p>

            <div className="space-y-2 pt-1">
              <label className="text-xs text-slate-700 font-medium">Ketikkan Contoh Kata Sandi untuk Diuji:</label>
              <input
                type="text"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="w-full text-sm font-mono bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Checklist of characteristics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
              <span className={`p-1.5 rounded flex items-center gap-1.5 ${passwordStats.hasLower ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>
                <CheckCircle2 className="w-3.5 h-3.5" /> Huruf Kecil (a-z)
              </span>
              <span className={`p-1.5 rounded flex items-center gap-1.5 ${passwordStats.hasUpper ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>
                <CheckCircle2 className="w-3.5 h-3.5" /> Huruf Besar (A-Z)
              </span>
              <span className={`p-1.5 rounded flex items-center gap-1.5 ${passwordStats.hasDigit ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>
                <CheckCircle2 className="w-3.5 h-3.5" /> Angka (0-9)
              </span>
              <span className={`p-1.5 rounded flex items-center gap-1.5 ${passwordStats.hasSpecial ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>
                <CheckCircle2 className="w-3.5 h-3.5" /> Simbol Khusus (!@#)
              </span>
            </div>
          </div>

          {/* Results Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg border ${passwordStats.scoreColor}`}>
              <span className="text-xs block font-medium">Status Kekuatan:</span>
              <span className="font-bold text-base block mt-1">{passwordStats.strength}</span>
              <span className="text-[11px] block mt-0.5 opacity-80">Berdasarkan standar NIST</span>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-white">
              <span className="text-xs text-slate-500 block font-medium">Nilai Entropi Matematis:</span>
              <span className="font-mono font-bold text-lg text-slate-900 block mt-1">
                {passwordStats.entropy} bits
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Minimal aman: ≥ 64 bits</span>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-white">
              <span className="text-xs text-slate-500 block font-medium">Estimasi Bobol Brute-Force:</span>
              <span className="font-mono font-bold text-sm text-slate-900 block mt-1">
                {passwordStats.crackTime}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Asumsi 10 miliar tebakan/detik</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
