import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Crosshair, HelpCircle, CheckCircle2, TrendingUp, ShieldAlert, Cpu } from 'lucide-react';

interface DataPoint {
  x: number;
  y: number;
  label: 0 | 1; // 0 = Negative, 1 = Positive
}

interface DatasetConfig {
  id: string;
  name: string;
  xName: string;
  yName: string;
  posLabel: string;
  negLabel: string;
  points: DataPoint[];
}

const DATASETS: DatasetConfig[] = [
  {
    id: 'fraud',
    name: 'Deteksi Transaksi Keuangan (Normal vs Fraud)',
    xName: 'Frekuensi Transaksi / Jam',
    yName: 'Nominal Transaksi (Juta Rp)',
    posLabel: 'Fraud / Mencurigakan (Positif)',
    negLabel: 'Normal / Valid (Negatif)',
    points: [
      // Normal points (low/mid frequency, low/mid amount)
      { x: 15, y: 20, label: 0 }, { x: 20, y: 25, label: 0 }, { x: 25, y: 15, label: 0 },
      { x: 30, y: 35, label: 0 }, { x: 35, y: 20, label: 0 }, { x: 40, y: 40, label: 0 },
      { x: 18, y: 45, label: 0 }, { x: 28, y: 30, label: 0 }, { x: 22, y: 18, label: 0 },
      { x: 45, y: 30, label: 0 }, { x: 32, y: 22, label: 0 }, { x: 38, y: 15, label: 0 },
      { x: 50, y: 25, label: 0 }, { x: 12, y: 32, label: 0 }, { x: 42, y: 35, label: 0 },
      // Fraud points (high frequency or high amount)
      { x: 65, y: 70, label: 1 }, { x: 75, y: 80, label: 1 }, { x: 80, y: 65, label: 1 },
      { x: 85, y: 90, label: 1 }, { x: 60, y: 85, label: 1 }, { x: 70, y: 75, label: 1 },
      { x: 90, y: 80, label: 1 }, { x: 55, y: 95, label: 1 }, { x: 82, y: 72, label: 1 },
      { x: 78, y: 88, label: 1 }, { x: 68, y: 92, label: 1 }, { x: 88, y: 60, label: 1 },
      // Noise / edge cases
      { x: 48, y: 68, label: 1 }, { x: 58, y: 42, label: 0 }, { x: 52, y: 58, label: 1 }
    ]
  },
  {
    id: 'medical',
    name: 'Diagnosis Sel Tumor Medis (Jinak vs Ganas)',
    xName: 'Kerapatan Sel Inti',
    yName: 'Ketidakteraturan Bentuk',
    posLabel: 'Ganas / Kanker (Positif)',
    negLabel: 'Jinak / Sehat (Negatif)',
    points: [
      // Benign (healthy)
      { x: 10, y: 15, label: 0 }, { x: 18, y: 22, label: 0 }, { x: 25, y: 18, label: 0 },
      { x: 12, y: 30, label: 0 }, { x: 22, y: 35, label: 0 }, { x: 30, y: 20, label: 0 },
      { x: 15, y: 28, label: 0 }, { x: 28, y: 25, label: 0 }, { x: 32, y: 38, label: 0 },
      { x: 20, y: 12, label: 0 }, { x: 35, y: 25, label: 0 }, { x: 26, y: 32, label: 0 },
      // Malignant (cancer)
      { x: 60, y: 65, label: 1 }, { x: 68, y: 75, label: 1 }, { x: 72, y: 80, label: 1 },
      { x: 80, y: 85, label: 1 }, { x: 65, y: 90, label: 1 }, { x: 85, y: 70, label: 1 },
      { x: 75, y: 60, label: 1 }, { x: 90, y: 92, label: 1 }, { x: 70, y: 82, label: 1 },
      { x: 82, y: 78, label: 1 }, { x: 58, y: 80, label: 1 },
      // Ambiguous edge cases
      { x: 48, y: 55, label: 1 }, { x: 45, y: 42, label: 0 }, { x: 52, y: 48, label: 1 }
    ]
  }
];

export const AILabSimulator: React.FC = () => {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('fraud');
  const [learningRate, setLearningRate] = useState<number>(0.05);
  const [targetEpochs, setTargetEpochs] = useState<number>(40);
  const [threshold, setThreshold] = useState<number>(0.5);

  // Model weights: w1*x + w2*y + b = 0
  const [weights, setWeights] = useState<{ w1: number; w2: number; b: number }>({
    w1: 0.1,
    w2: 0.1,
    b: -5
  });

  const [currentEpoch, setCurrentEpoch] = useState<number>(0);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  
  // Custom test point
  const [testPoint, setTestPoint] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [testResult, setTestResult] = useState<{ label: number; prob: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentDataset = DATASETS.find(d => d.id === selectedDatasetId) || DATASETS[0];

  // Sigmoid activation
  const sigmoid = (z: number) => 1 / (1 + Math.exp(-Math.max(-15, Math.min(15, z))));

  // Prediction for a point
  const predict = (x: number, y: number, w = weights) => {
    // Normalize coordinates 0..100 to 0..1
    const nx = x / 100;
    const ny = y / 100;
    const z = w.w1 * nx + w.w2 * ny + w.b;
    const prob = sigmoid(z);
    return { prob, predictedLabel: prob >= threshold ? 1 : 0 };
  };

  // Reset Model
  const handleReset = () => {
    setIsTraining(false);
    setCurrentEpoch(0);
    setWeights({
      w1: 0.2 * (Math.random() - 0.5),
      w2: 0.2 * (Math.random() - 0.5),
      b: -0.1
    });
    setLossHistory([]);
    setTestResult(null);
  };

  useEffect(() => {
    handleReset();
  }, [selectedDatasetId]);

  // Run Training Loop step by step
  useEffect(() => {
    if (!isTraining) return;

    if (currentEpoch >= targetEpochs) {
      setIsTraining(false);
      return;
    }

    const timer = setTimeout(() => {
      // One epoch of Gradient Descent
      let gradW1 = 0;
      let gradW2 = 0;
      let gradB = 0;
      let totalLoss = 0;

      const n = currentDataset.points.length;

      for (const pt of currentDataset.points) {
        const nx = pt.x / 100;
        const ny = pt.y / 100;
        const yTrue = pt.label;
        const z = weights.w1 * nx + weights.w2 * ny + weights.b;
        const yPred = sigmoid(z);

        const error = yPred - yTrue;
        gradW1 += error * nx;
        gradW2 += error * ny;
        gradB += error;

        // Binary Cross Entropy Loss
        const clippedPred = Math.max(1e-7, Math.min(1 - 1e-7, yPred));
        totalLoss += -(yTrue * Math.log(clippedPred) + (1 - yTrue) * Math.log(1 - clippedPred));
      }

      const updatedWeights = {
        w1: weights.w1 - (learningRate * gradW1) / n * 8,
        w2: weights.w2 - (learningRate * gradW2) / n * 8,
        b: weights.b - (learningRate * gradB) / n * 8
      };

      setWeights(updatedWeights);
      setCurrentEpoch(prev => prev + 1);
      setLossHistory(prev => [...prev, totalLoss / n]);
    }, 40);

    return () => clearTimeout(timer);
  }, [isTraining, currentEpoch, targetEpochs, weights, learningRate, currentDataset]);

  // Compute Confusion Matrix
  const confusionMatrix = React.useMemo(() => {
    let tp = 0;
    let fp = 0;
    let tn = 0;
    let fn = 0;

    for (const pt of currentDataset.points) {
      const pred = predict(pt.x, pt.y);
      if (pt.label === 1 && pred.predictedLabel === 1) tp++;
      else if (pt.label === 0 && pred.predictedLabel === 1) fp++;
      else if (pt.label === 0 && pred.predictedLabel === 0) tn++;
      else if (pt.label === 1 && pred.predictedLabel === 0) fn++;
    }

    const total = tp + fp + tn + fn;
    const accuracy = total > 0 ? (tp + tn) / total : 0;
    const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
    const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
    const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;

    return { tp, fp, tn, fn, accuracy, precision, recall, f1, total };
  }, [currentDataset, weights, threshold]);

  // Canvas Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw background heatmap / decision boundary
    const step = 8;
    for (let px = 0; px < width; px += step) {
      for (let py = 0; py < height; py += step) {
        // canvas coordinates to 0..100 domain
        const dataX = (px / width) * 100;
        const dataY = ((height - py) / height) * 100;
        const { prob } = predict(dataX, dataY);

        if (prob >= threshold) {
          // Blueish tint for positive class
          ctx.fillStyle = `rgba(59, 130, 246, ${Math.min(0.22, (prob - threshold) * 0.45)})`;
        } else {
          // Reddish/amber tint for negative class
          ctx.fillStyle = `rgba(239, 68, 68, ${Math.min(0.22, (threshold - prob) * 0.45)})`;
        }
        ctx.fillRect(px, py, step, step);
      }
    }

    // Draw Decision Line: w1*(x/100) + w2*(y/100) + b = logit(threshold)
    // logit(p) = ln(p/(1-p))
    const logit = Math.log(threshold / (1 - threshold));
    // w1*(x/100) + w2*(y/100) + b = logit
    // y = 100 * (logit - b - w1*(x/100)) / w2
    if (Math.abs(weights.w2) > 0.001) {
      ctx.beginPath();
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 4]);

      const yAtX0 = 100 * (logit - weights.b) / weights.w2;
      const yAtX100 = 100 * (logit - weights.b - weights.w1) / weights.w2;

      const p1y = height - (yAtX0 / 100) * height;
      const p2y = height - (yAtX100 / 100) * height;

      ctx.moveTo(0, p1y);
      ctx.lineTo(width, p2y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Grid lines & Axes
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 20; i < 100; i += 20) {
      // vertical
      ctx.beginPath();
      ctx.moveTo((i / 100) * width, 0);
      ctx.lineTo((i / 100) * width, height);
      ctx.stroke();
      // horizontal
      ctx.beginPath();
      ctx.moveTo(0, (i / 100) * height);
      ctx.lineTo(width, (i / 100) * height);
      ctx.stroke();
    }

    // Draw Dataset Points
    for (const pt of currentDataset.points) {
      const cx = (pt.x / 100) * width;
      const cy = height - (pt.y / 100) * height;

      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      if (pt.label === 1) {
        ctx.fillStyle = '#3b82f6'; // Blue
        ctx.strokeStyle = '#1d4ed8';
      } else {
        ctx.fillStyle = '#ef4444'; // Red
        ctx.strokeStyle = '#b91c1c';
      }
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();
    }

    // Draw Tested Custom Point if any
    if (testPoint) {
      const tx = (testPoint.x / 100) * width;
      const ty = height - (testPoint.y / 100) * height;

      ctx.beginPath();
      ctx.arc(tx, ty, 9, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981'; // Green target
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.fill();
      ctx.stroke();

      // Outer ring
      ctx.beginPath();
      ctx.arc(tx, ty, 15, 0, Math.PI * 2);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }, [currentDataset, weights, threshold, testPoint]);

  // Click on canvas to place test point
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const dataX = Math.round((clickX / rect.width) * 100);
    const dataY = Math.round(((rect.height - clickY) / rect.height) * 100);

    const boundedX = Math.max(0, Math.min(100, dataX));
    const boundedY = Math.max(0, Math.min(100, dataY));

    setTestPoint({ x: boundedX, y: boundedY });
    const pred = predict(boundedX, boundedY);
    setTestResult({ label: pred.predictedLabel, prob: pred.prob });
  };

  const handleTestSpecificPoint = () => {
    const pred = predict(testPoint.x, testPoint.y);
    setTestResult({ label: pred.predictedLabel, prob: pred.prob });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-6">
      {/* Header & Dataset selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Cpu className="w-5 h-5" />
            </span>
            <h3 className="font-semibold text-lg text-slate-900">
              Simulator Interaktif: Pembelajaran Mesin & Decision Boundary
            </h3>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Praktikum visual penentuan parameter bobot, laju belajar, dan evaluasi Confusion Matrix secara langsung.
          </p>
        </div>

        {/* Dataset Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Dataset:</label>
          <select
            value={selectedDatasetId}
            onChange={(e) => setSelectedDatasetId(e.target.value)}
            className="text-sm font-medium bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {DATASETS.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Controls + Visual Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Canvas Stage */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs text-slate-500 mb-2 px-1">
            <span>Sumbu Y: <strong>{currentDataset.yName}</strong></span>
            <span className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
                <span>{currentDataset.posLabel.split(' ')[0]}</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span>{currentDataset.negLabel.split(' ')[0]}</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                <span>Uji Baru</span>
              </span>
            </span>
          </div>

          {/* Interactive Canvas */}
          <div className="relative border-2 border-slate-200 rounded-lg overflow-hidden cursor-crosshair bg-slate-50 shadow-inner w-full flex justify-center">
            <canvas
              ref={canvasRef}
              width={480}
              height={360}
              onClick={handleCanvasClick}
              className="max-w-full h-auto"
            />
            {/* Guide overlay */}
            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-[11px] px-2 py-1 rounded border border-slate-200 text-slate-600">
              Klik kanvas untuk menguji titik data baru
            </div>
          </div>
          <div className="w-full text-center text-xs text-slate-500 mt-2">
            Sumbu X: <strong>{currentDataset.xName}</strong>
          </div>
        </div>

        {/* Right Column: Parameters & Training Dashboard */}
        <div className="lg:col-span-5 space-y-4">
          {/* Hyperparameters Card */}
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-700">
                Konfigurasi Parameter
              </h4>
              <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                Epoch: {currentEpoch} / {targetEpochs}
              </span>
            </div>

            {/* Learning rate */}
            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Laju Pembelajaran (Learning Rate):</span>
                <span className="font-mono font-bold text-slate-800">{learningRate}</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.2"
                step="0.01"
                value={learningRate}
                disabled={isTraining}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Target Epochs */}
            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Target Epochs:</span>
                <span className="font-mono font-bold text-slate-800">{targetEpochs}</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={targetEpochs}
                disabled={isTraining}
                onChange={(e) => setTargetEpochs(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Decision Threshold */}
            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Ambang Batas Keputusan (Threshold):</span>
                <span className="font-mono font-bold text-slate-800">{threshold.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setIsTraining(!isTraining)}
                disabled={currentEpoch >= targetEpochs}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium text-xs transition-colors shadow-xs ${
                  isTraining
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : currentEpoch >= targetEpochs
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <Play className="w-4 h-4" />
                {isTraining ? 'Jeda Latihan' : currentEpoch >= targetEpochs ? 'Pelatihan Selesai' : 'Mulai Latih Model (Train)'}
              </button>

              <button
                onClick={handleReset}
                title="Reset Model"
                className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Test Inference Point Card */}
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Crosshair className="w-4 h-4 text-emerald-600" />
              Uji Titik Baru (Inference Testing)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-slate-500 block mb-1">Nilai X (0-100):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={testPoint.x}
                  onChange={(e) => setTestPoint(prev => ({ ...prev, x: Math.max(0, Math.min(100, Number(e.target.value))) }))}
                  className="w-full bg-white border border-slate-200 rounded px-2 py-1 font-mono"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">Nilai Y (0-100):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={testPoint.y}
                  onChange={(e) => setTestPoint(prev => ({ ...prev, y: Math.max(0, Math.min(100, Number(e.target.value))) }))}
                  className="w-full bg-white border border-slate-200 rounded px-2 py-1 font-mono"
                />
              </div>
            </div>

            <button
              onClick={handleTestSpecificPoint}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs py-1.5 rounded transition-colors"
            >
              Prediksi Kelas Titik Ini
            </button>

            {testResult && (
              <div className={`p-2.5 rounded border text-xs flex items-center justify-between ${
                testResult.label === 1
                  ? 'bg-blue-50 border-blue-200 text-blue-900'
                  : 'bg-red-50 border-red-200 text-red-900'
              }`}>
                <div>
                  <span className="font-semibold block">
                    Hasil: {testResult.label === 1 ? currentDataset.posLabel : currentDataset.negLabel}
                  </span>
                  <span className="text-[11px] opacity-80">
                    Probabilitas Positif: {(testResult.prob * 100).toFixed(1)}%
                  </span>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-white font-bold">
                  {testResult.label === 1 ? 'CLASS 1' : 'CLASS 0'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metrics & Confusion Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-5">
        {/* Confusion Matrix Table */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            Confusion Matrix (Evaluasi Kinerja)
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr>
                  <th className="p-1 text-slate-400 font-normal"></th>
                  <th className="p-1.5 bg-blue-100 text-blue-900 font-semibold rounded-tl">Prediksi Positif</th>
                  <th className="p-1.5 bg-slate-200 text-slate-800 font-semibold rounded-tr">Prediksi Negatif</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-1.5 bg-blue-100 text-blue-900 font-semibold text-left">Aktual Positif</td>
                  <td className="p-2 bg-blue-50 border border-blue-200 font-mono font-bold text-blue-700">
                    TP: {confusionMatrix.tp}
                  </td>
                  <td className="p-2 bg-red-50 border border-red-200 font-mono font-bold text-red-700">
                    FN: {confusionMatrix.fn}
                  </td>
                </tr>
                <tr>
                  <td className="p-1.5 bg-slate-200 text-slate-800 font-semibold text-left">Aktual Negatif</td>
                  <td className="p-2 bg-red-50 border border-red-200 font-mono font-bold text-red-700">
                    FP: {confusionMatrix.fp}
                  </td>
                  <td className="p-2 bg-emerald-50 border border-emerald-200 font-mono font-bold text-emerald-700">
                    TN: {confusionMatrix.tn}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            *TP (True Positive), FP (False Positive), TN (True Negative), FN (False Negative)
          </div>
        </div>

        {/* Calculated Metrics Summary */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex flex-col justify-between">
          <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-700 mb-2">
            Ringkasan Metrik Statistik
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-2.5 rounded border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Akurasi (Accuracy)</span>
              <span className="font-mono font-bold text-base text-slate-900">
                {(confusionMatrix.accuracy * 100).toFixed(1)}%
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">(TP + TN) / Total</span>
            </div>

            <div className="bg-white p-2.5 rounded border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Presisi (Precision)</span>
              <span className="font-mono font-bold text-base text-blue-700">
                {(confusionMatrix.precision * 100).toFixed(1)}%
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">TP / (TP + FP)</span>
            </div>

            <div className="bg-white p-2.5 rounded border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Sensitivitas (Recall)</span>
              <span className="font-mono font-bold text-base text-emerald-700">
                {(confusionMatrix.recall * 100).toFixed(1)}%
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">TP / (TP + FN)</span>
            </div>

            <div className="bg-white p-2.5 rounded border border-slate-200">
              <span className="text-[11px] text-slate-500 block">F1-Score</span>
              <span className="font-mono font-bold text-base text-purple-700">
                {(confusionMatrix.f1 * 100).toFixed(1)}%
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Harmonic Mean</span>
            </div>
          </div>

          <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-800 flex items-start gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
            <span>
              <strong>Peringatan Pedagogis:</strong> Geser slider <em>Ambang Batas (Threshold)</em> ke kiri (misal 0.3) untuk menurunkan angka False Negative (menaikkan Recall) pada kasus kritis seperti diagnosis tumor!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
