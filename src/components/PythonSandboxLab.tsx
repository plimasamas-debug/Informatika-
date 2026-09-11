import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, FileCode, CheckCircle2, BarChart3, AlertCircle } from 'lucide-react';

interface CodeSnippet {
  id: string;
  name: string;
  code: string;
  description: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'outlier',
    name: 'Statistik Deskriptif & Deteksi Outlier Sensor Server',
    description: 'Menghitung rata-rata (mean) vs nilai tengah (median) ketika disisipi suhu anomali 98.0°C.',
    code: `# Eksperimen Lab 3: Eksplorasi Data Numerik & Outlier
data_suhu = [24.5, 23.8, 24.1, 25.0, 24.2, 23.9, 24.6, 98.0, 24.3, 24.7]

# 1. Menghitung Rata-rata (Mean)
mean_val = sum(data_suhu) / len(data_suhu)

# 2. Menghitung Nilai Tengah (Median)
sorted_data = sorted(data_suhu)
n = len(sorted_data)
if n % 2 == 1:
    median_val = sorted_data[n // 2]
else:
    median_val = (sorted_data[n // 2 - 1] + sorted_data[n // 2]) / 2

# 3. Deteksi Outlier (Pencilan)
print(f"Jumlah Sampel Data: {n}")
print(f"Data Terurut: {sorted_data}")
print(f"Rata-rata (Mean)  : {mean_val:.2f} °C")
print(f"Median            : {median_val:.2f} °C")
print("-" * 35)
print("REFLEKSI ANALISIS:")
if abs(mean_val - median_val) > 5.0:
    print("TERDETEKSI OUTLIER EKSTRIM!")
    print("Mean terdistorsi naik drastis oleh angka 98.0°C.")
    print("Median terbukti ROBUST (tahan) terhadap gangguan pencilan.")
`
  },
  {
    id: 'minmax',
    name: 'Normalisasi Min-Max Skala Fitur Machine Learning',
    description: 'Menskalakan variabel nominal (0-100) ke dalam rentang standar [0.0, 1.0].',
    code: `# Transformasi Fitur: Min-Max Normalization
# Rumus: X_scaled = (x - x_min) / (x_max - x_min)

fitur_transaksi = [150000, 320000, 45000, 1200000, 750000, 90000]

min_val = min(fitur_transaksi)
max_val = max(fitur_transaksi)

normalized = []
for x in fitur_transaksi:
    scaled = (x - min_val) / (max_val - min_val)
    normalized.append(round(scaled, 4))

print("DATA ASLI (Rupiah):")
print(fitur_transaksi)
print(f"Nilai Terkecil (Min): {min_val}")
print(f"Nilai Terbesar (Max): {max_val}")
print("-" * 35)
print("DATA HASIL NORMALISASI [0.0 - 1.0]:")
print(normalized)
print("Siap diumpankan ke model jaringan saraf tiruan (Neural Network)!")
`
  }
];

export const PythonSandboxLab: React.FC = () => {
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>('outlier');
  const [code, setCode] = useState<string>(SNIPPETS[0].code);
  const [consoleOutput, setConsoleOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [chartData, setChartData] = useState<{ labels: string[]; values: number[]; mean?: number; median?: number } | null>(null);

  const currentSnippet = SNIPPETS.find(s => s.id === selectedSnippetId) || SNIPPETS[0];

  const handleSelectSnippet = (id: string) => {
    setSelectedSnippetId(id);
    const snip = SNIPPETS.find(s => s.id === id);
    if (snip) {
      setCode(snip.code);
      setConsoleOutput('');
      setChartData(null);
    }
  };

  // Safe client-side Python interpreter logic simulator
  const executeCode = () => {
    setIsRunning(true);
    setConsoleOutput('Menjalankan skrip Python di lingkungan sandbox...\n');

    setTimeout(() => {
      try {
        let output = '';
        if (selectedSnippetId === 'outlier') {
          // Extract array from code if user modified it
          const match = code.match(/data_suhu\s*=\s*\[([^\]]+)\]/);
          let values = [24.5, 23.8, 24.1, 25.0, 24.2, 23.9, 24.6, 98.0, 24.3, 24.7];
          if (match && match[1]) {
            const parsed = match[1].split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
            if (parsed.length > 0) values = parsed;
          }

          const sum = values.reduce((a, b) => a + b, 0);
          const mean = sum / values.length;
          const sorted = [...values].sort((a, b) => a - b);
          const n = sorted.length;
          const median = n % 2 === 1 ? sorted[Math.floor(n / 2)] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;

          output = `Jumlah Sampel Data: ${n}\nData Terurut: [${sorted.map(v => v.toFixed(1)).join(', ')}]\nRata-rata (Mean)  : ${mean.toFixed(2)} °C\nMedian            : ${median.toFixed(2)} °C\n-----------------------------------\nREFLEKSI ANALISIS:\n`;
          if (Math.abs(mean - median) > 5.0) {
            output += `TERDETEKSI OUTLIER EKSTRIM!\nMean terdistorsi naik menjadi ${mean.toFixed(2)} °C.\nMedian (${median.toFixed(2)} °C) terbukti ROBUST (tahan) terhadap pencilan!`;
          } else {
            output += `Distribusi relatif simetris. Nilai Mean (${mean.toFixed(2)} °C) mendekati Median (${median.toFixed(2)} °C).`;
          }

          setChartData({
            labels: values.map((_, i) => `S${i + 1}`),
            values,
            mean,
            median
          });
        } else {
          // Min-max normalization
          const match = code.match(/fitur_transaksi\s*=\s*\[([^\]]+)\]/);
          let values = [150000, 320000, 45000, 1200000, 750000, 90000];
          if (match && match[1]) {
            const parsed = match[1].split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
            if (parsed.length > 0) values = parsed;
          }

          const min = Math.min(...values);
          const max = Math.max(...values);
          const scaled = values.map(x => Number(((x - min) / (max - min)).toFixed(4)));

          output = `DATA ASLI (Rupiah):\n[${values.join(', ')}]\nNilai Terkecil (Min): ${min}\nNilai Terbesar (Max): ${max}\n-----------------------------------\nDATA HASIL NORMALISASI [0.0 - 1.0]:\n[${scaled.join(', ')}]\nSiap diumpankan ke model jaringan saraf tiruan (Neural Network)!`;

          setChartData({
            labels: values.map((_, i) => `T${i + 1}`),
            values: scaled
          });
        }

        setConsoleOutput(output);
      } catch (err: any) {
        setConsoleOutput(`Sintaksis Error: ${err.message}`);
      } finally {
        setIsRunning(false);
      }
    }, 400);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <Terminal className="w-5 h-5" />
            </span>
            <h3 className="font-semibold text-lg text-slate-900">
              Lab Pemrograman Python: Eksplorasi Data & Algoritma
            </h3>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Editor kode Python interaktif berbasis browser untuk eksplorasi statistik data, normalisasi, dan deteksi outlier.
          </p>
        </div>

        {/* Snippet selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pilih Modul:</label>
          <select
            value={selectedSnippetId}
            onChange={(e) => handleSelectSnippet(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {SNIPPETS.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Editor & Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Code Editor */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <FileCode className="w-4 h-4 text-indigo-600" />
              Editor Skrip Python (Anda dapat mengubah nilai array):
            </span>
            <button
              onClick={() => setCode(currentSnippet.code)}
              className="text-slate-400 hover:text-slate-700 flex items-center gap-1 text-[11px]"
            >
              <RotateCcw className="w-3 h-3" /> Reset Kode
            </button>
          </div>

          <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs shadow-inner">
            <div className="bg-slate-900 px-3 py-1.5 text-slate-400 text-[11px] flex items-center justify-between border-b border-slate-800">
              <span>main.py</span>
              <span className="text-[10px] text-emerald-400">Python 3.10 Runtime</span>
            </div>
            <textarea
              rows={14}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-slate-950 text-emerald-300 p-3 leading-relaxed font-mono focus:outline-none resize-y"
              spellCheck={false}
            />
          </div>

          <button
            onClick={executeCode}
            disabled={isRunning}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2.5 rounded-lg transition-colors shadow-xs"
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Mengeksekusi Kode...' : 'Jalankan Skrip (Run Python Code)'}
          </button>
        </div>

        {/* Right: Console Output & Mini Visualizer */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-700 block">Output Konsol Terminal:</span>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-200 min-h-[140px] whitespace-pre-wrap leading-relaxed">
              {consoleOutput || '// Klik tombol "Jalankan Skrip" untuk melihat output eksekusi.'}
            </div>
          </div>

          {/* Visual Distribution Chart */}
          {chartData && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                Visualisasi Distribusi Nilai Data
              </h4>

              <div className="space-y-1.5">
                {chartData.values.map((val, idx) => {
                  const max = Math.max(...chartData.values);
                  const pct = max > 0 ? (val / max) * 100 : 0;
                  const isOutlier = chartData.mean && Math.abs(val - (chartData.median || 0)) > 20;

                  return (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <span className="w-6 font-mono text-slate-400 text-[11px]">#{idx + 1}</span>
                      <div className="flex-1 bg-slate-200 rounded h-4 overflow-hidden relative">
                        <div
                          className={`h-full rounded transition-all duration-500 ${
                            isOutlier ? 'bg-red-500' : 'bg-indigo-500'
                          }`}
                          style={{ width: `${Math.max(4, pct)}%` }}
                        />
                      </div>
                      <span className={`w-14 text-right font-mono text-[11px] font-bold ${
                        isOutlier ? 'text-red-600' : 'text-slate-700'
                      }`}>
                        {val}
                      </span>
                    </div>
                  );
                })}
              </div>

              {chartData.mean !== undefined && chartData.median !== undefined && (
                <div className="pt-2 border-t border-slate-200 flex justify-between text-xs">
                  <span className="text-slate-600">
                    Mean: <strong className="text-red-600">{chartData.mean.toFixed(1)}°C</strong>
                  </span>
                  <span className="text-slate-600">
                    Median: <strong className="text-emerald-700">{chartData.median.toFixed(1)}°C</strong>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
