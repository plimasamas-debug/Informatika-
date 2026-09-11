import { SubChapter, PracticalLab, QuizQuestion, ModulAjarInfo } from '../types/curriculum';

export const MODUL_AJAR_INFO: ModulAjarInfo = {
  schoolLevel: 'SMA / MA (Sekolah Menengah Atas)',
  subject: 'Informatika',
  grade: 'Kelas XII (Dua Belas)',
  semester: 'Semester 1 (Ganjil)',
  phase: 'Fase F Lanjutan (Kurikulum Merdeka)',
  chapter: 'Bab 1',
  chapterTitle: 'Perkembangan Informatika, Kecerdasan Artifisial, dan Keamanan Siber',
  allocatedTime: '4 Pertemuan × 2 Jam Pelajaran (8 JP @ 45 menit)',
  profilPelajarPancasila: [
    'Bernalar Kritis (menganalisis algoritma AI, mengevaluasi validitas data, dan mendeteksi ancaman keamanan digital)',
    'Kreatif (merancang solusi pemecahan masalah berbasis komputasi cerdas dan simulasi)',
    'Mandiri (melakukan eksplorasi praktikum mandiri dan refleksi pemahaman konsep)',
    'Gotong Royong (berkolaborasi dalam investigasi studi kasus dan penyusunan laporan lab)'
  ],
  learningOutcomes: [
    'Peserta didik mampu memahami evolusi teknologi informatika terkini, konsep dasar kecerdasan artifisial (AI), dan machine learning.',
    'Peserta didik mampu menganalisis siklus pengolahan sains data dan mengevaluasi kinerja model pembelajaran mesin menggunakan metrik evaluasi akurasi, presisi, dan recall.',
    'Peserta didik mampu menerapkan prinsip dasar keamanan informasi (CIA Triad), memahami mekanisme kriptografi simetris/asimetris serta integritas data melalui fungsi hash.',
    'Peserta didik mampu mengevaluasi dampak etis penggunaan AI, ancaman kejahatan siber modern, dan mematuhi kepatuhan regulasi UU Perlindungan Data Pribadi (UU PDP No. 27/2022).'
  ],
  pedagogicalModel: 'Problem-Based Learning (PBL) & Project-Based Inquiry dengan Pendekatan TPACK (Technological Pedagogical Content Knowledge)',
  assessmentMethods: [
    'Asesmen Diagnostik (Pre-test pemahaman dasar algoritma dan data)',
    'Asesmen Formatif (Aktivitas modul lab simulasi interaktif & lembar refleksi)',
    'Asesmen Sumatif (Evaluasi 10 Soal Pilihan Ganda HOTS terstandarisasi)'
  ]
};

export const SUB_CHAPTERS: SubChapter[] = [
  {
    id: 'sub-1',
    number: '1.1',
    title: 'Evolusi Informatika & Ekosistem Kecerdasan Artifisial (AI)',
    subtitle: 'Dari Komputasi Prosedural Klasik Menuju Era Artificial Intelligence & LLM',
    readingTimeMinutes: 12,
    overview: 'Sub-bab ini mengeksplorasi pergeseran paradigma komputasi dari logika terprogram kaku (hard-coded logic) menuju sistem adaptif berbasis data (AI). Siswa mempelajari taksonomi AI, arsitektur deep learning, Large Language Models (LLM), serta infrastruktur pendukung seperti komputasi awan (Cloud) dan Edge Computing.',
    learningObjectives: [
      'Menjelaskan perbedaan mendasar komputasi prosedural klasik dengan paradigma sistem kecerdasan artifisial.',
      'Mengklasifikasikan taksonomi AI (ANI, AGI, ASI) dan hierarki AI vs Machine Learning vs Deep Learning.',
      'Memahami mekanisme dasar Large Language Models (LLM) seperti transformer, tokenisasi, dan prompt engineering.',
      'Membandingkan arsitektur komputasi awan (Cloud Computing) dengan Edge Computing dalam penerapan sistem cerdas.'
    ],
    keyConcepts: [
      {
        term: 'Artificial Narrow Intelligence (ANI)',
        definition: 'Kecerdasan artifisial spesifik yang dirancang dan dilatih hanya untuk menjalankan satu tugas tertentu secara superior (contoh: deteksi wajah, AlphaGo, asisten suara).',
        category: 'Taksonomi AI'
      },
      {
        term: 'Large Language Model (LLM)',
        definition: 'Model pembelajaran mendalam berbasis arsitektur Transformer yang dilatih pada miliaran token teks untuk memahami dan menghasilkan bahasa alami manusia secara kontekstual.',
        category: 'Generative AI'
      },
      {
        term: 'Edge Computing',
        definition: 'Paradigma komputasi yang memproses data sedekat mungkin dengan sumber data (perangkat lokal/sensor) untuk meminimalkan latensi jaringan dan menghemat bandwidth.',
        category: 'Infrastruktur'
      },
      {
        term: 'Inference',
        definition: 'Proses di mana model AI yang sudah selesai dilatih menggunakan pengetahuannya untuk memprediksi atau mengklasifikasikan data masukan baru yang belum pernah dilihat sebelumnya.',
        category: 'Mekanisme AI'
      }
    ],
    sections: [
      {
        heading: 'Pergeseran Paradigma Komputasi: Logika vs Data',
        content: 'Dalam komputasi konvensional, manusia menuliskan algoritma berupa instruksi eksplisit langkah demi langkah (Rules) dan memberikan data input, lalu komputer menghasilkan output. Sebaliknya, dalam Machine Learning (sub-bidang AI), komputer diberikan ribuan data input beserta contoh output yang diharapkan, lalu komputer secara mandiri mencari pola matematis tersembunyi untuk menghasilkan suatu model aturan (Model). Pergeseran ini memungkinkan penyelesaian masalah kompleks seperti pengenalan suara, visi komputer, dan prediksi cuaca yang mustahil diatur dengan aturan if-else manual.',
        bulletPoints: [
          'Komputasi Klasik: Data Masukan + Aturan Logika Manusia (Rules) → Hasil Komputasi (Answers).',
          'Pembelajaran Mesin: Data Masukan + Contoh Hasil (Answers) → Pola Aturan Tersembunyi (Trained Model).',
          'Skalabilitas Solusi: Model dapat beradaptasi ketika diumpankan data baru tanpa harus menulis ulang baris kode dari nol.'
        ],
        technicalDeepDive: {
          title: 'Komparasi Matematis: Algoritma vs Machine Learning',
          description: 'Dalam algoritma klasik, pencarian bilangan prima menggunakan pengujian deterministik O(sqrt(n)). Dalam computer vision, deteksi objek menggunakan perkalian matriks bobot (weights) dan bias melalui fungsi aktivasi non-linear seperti ReLU f(x) = max(0, x) serta optimasi gradien (Gradient Descent).'
        }
      },
      {
        heading: 'Hierarki Kecerdasan Artifisial: AI, ML, DL, dan Generative AI',
        content: 'Secara konseptual, Artificial Intelligence adalah payung payung besar (umbrella term) dari semua teknologi yang meniru kecerdasan manusia. Di dalamnya terdapat Machine Learning (ML), di dalam ML terdapat Deep Learning (DL) yang menggunakan jaringan saraf tiruan berlapis banyak (Multi-layer Neural Networks), dan di lapisan terdepan kini terdapat Generative AI (GenAI) yang mampu memproduksi konten baru orisinal berupa teks, gambar, audio, maupun kode program.',
        bulletPoints: [
          'Artificial Intelligence (AI): Konsep umum mesin pintar yang mampu meniru penalaran atau persepsi manusia.',
          'Machine Learning (ML): Metode statistik yang memungkinkan mesin belajar dari data tanpa diprogram secara eksplisit.',
          'Deep Learning (DL): Subset ML menggunakan arsitektur Artificial Neural Network (ANN) dengan lapisan tersembunyi (hidden layers) yang dalam.',
          'Generative AI & LLM: Model seperti Gemini, GPT, dan Claude yang mengonstruksi respons probabilistik berbasis perhatian kontekstual (Attention Mechanism).'
        ],
        realWorldExample: {
          title: 'Implementasi Nyata di Indonesia: Sistem Tilang Elektronik (ETLE)',
          description: 'Polda Metro Jaya dan Korlantas Polri menerapkan kamera ETLE yang menggunakan Deep Learning (Convolutional Neural Network) untuk mendeteksi plat nomor kendaraan, pengendara tanpa sabuk pengaman, atau penggunaan ponsel saat berkendara secara otomatis 24/7.',
          contextInIndonesia: 'Penerapan Computer Vision pada sistem transportasi cerdas perkotaan (Smart City DKI Jakarta, Surabaya, dan Bandung).'
        }
      },
      {
        heading: 'Infrastruktur Komputasi: Komputasi Awan (Cloud) vs Komputasi Tepi (Edge)',
        content: 'Pelatihan model AI skala besar membutuhkan daya komputasi GPU/TPU masif yang disuplai oleh penyedia Cloud Computing (seperti Google Cloud Platform, AWS, Azure). Namun, untuk aplikasi kritis yang menuntut respons instan seketika (ultra-low latency) dan privasi tinggi, pemrosesan dialihkan ke Edge Computing—yaitu komputasi langsung pada chipset perangkat (misalnya NPU pada smartphone atau prosesor onboard mobil otonom).',
        bulletPoints: [
          'Cloud Computing: Terpusat, kapasitas komputasi tak terbatas, cocok untuk fase Training model dan agregasi big data.',
          'Edge Computing: Terdistribusi, latensi di bawah 10 milidetik, hemat bandwidth, tahan kegagalan koneksi internet, sangat vital untuk kendaraan otonom dan instrumen medis ICU.',
          'Hybrid Architecture: Model dilatih di Cloud, kemudian dioptimasi (quantization) untuk dijalankan secara inference di Edge devices.'
        ]
      }
    ],
    summary: [
      'Informatika modern telah bertransformasi dari pemrograman terstruktur berbasis aturan eksplisit menjadi paradigma berbasis data dan kecerdasan artifisial.',
      'Hierarki AI mencakup Machine Learning, Deep Learning, hingga model mutakhir Generative AI berbasis Transformer.',
      'Implementasi AI di dunia nyata mengombinasikan Cloud Computing untuk pelatihan komputasi intensif dan Edge Computing untuk inferensi cepat tanpa latensi.'
    ],
    reflectionQuestions: [
      'Mengapa aturan if-else konvensional tidak akan pernah mampu menyelesaikan masalah pengenalan wajah manusia dengan akurat di berbagai kondisi pencahayaan?',
      'Jika sebuah rumah sakit di daerah 3T (tertinggal, terdepan, terluar) ingin menggunakan AI pendeteksi penyakit jantung dari citra X-Ray, apakah arsitektur Cloud atau Edge yang lebih cocok? Berikan alasan teknis!'
    ]
  },
  {
    id: 'sub-2',
    number: '1.2',
    title: 'Sains Data & Fondasi Algoritma Machine Learning',
    subtitle: 'Siklus Hidup Data, Paradigma Pembelajaran, dan Metrik Evaluasi Model',
    readingTimeMinutes: 14,
    overview: 'Sains Data (Data Science) adalah motor penggerak kecerdasan artifisial. Sub-bab ini menguraikan tahapan pengolahan data mentah, perbedaan fundamental supervised vs unsupervised learning, fenomena bias/variansi (overfitting), serta cara membaca dan menghitung metrik evaluasi model seperti Confusion Matrix, Precision, Recall, dan F1-Score.',
    learningObjectives: [
      'Menguraikan tahapan siklus sains data: Data Collection, Cleaning, Exploratory Data Analysis (EDA), Modeling, dan Evaluation.',
      'Membedakan skenario penggunaan Supervised Learning (Klasifikasi & Regresi) dengan Unsupervised Learning (Clustering).',
      'Mendeteksi fenomena Overfitting dan Underfitting serta teknik mitigasinya (regularization, cross-validation).',
      'Menghitung dan menginterpretasikan metrik Confusion Matrix (Accuracy, Precision, Recall, F1-Score) untuk skenario kritis.'
    ],
    keyConcepts: [
      {
        term: 'Supervised Learning',
        definition: 'Algoritma pembelajaran mesin yang dilatih menggunakan dataset yang memiliki label jawaban benar (ground truth), terdiri atas tugas Klasifikasi (label kategori) atau Regresi (nilai kontinu).',
        category: 'Paradigma ML'
      },
      {
        term: 'Unsupervised Learning',
        definition: 'Pembelajaran mesin pada data tanpa label, di mana algoritma bertugas mengelompokkan data berdasarkan kemiripan pola (Clustering) atau menemukan asosiasi tersembunyi.',
        category: 'Paradigma ML'
      },
      {
        term: 'Confusion Matrix',
        definition: 'Tabel evaluasi 2x2 yang membandingkan prediksi model terhadap kenyataan sebenarnya: True Positive (TP), False Positive (FP), True Negative (TN), dan False Negative (FN).',
        category: 'Metrik Evaluasi'
      },
      {
        term: 'Overfitting',
        definition: 'Kondisi di mana model menghafal data latihan terlalu detail beserta noise-nya, sehingga memiliki performa sempurna pada data training namun gagal menggeneralisasi pada data uji baru.',
        category: 'Diagnosa Model'
      }
    ],
    sections: [
      {
        heading: 'Siklus Pengolahan Sains Data (Data Science Pipeline)',
        content: 'Data mentah di alam bebas jarang sekali siap pakai; sering kali mengandung nilai yang hilang (missing values), duplikasi data, outlier, atau format yang tidak konsisten. Oleh karena itu, seorang praktisi sains data menghabiskan hingga 80% waktunya pada tahapan pra-pemrosesan (Data Preprocessing) sebelum dapat melatih model cerdas.',
        bulletPoints: [
          '1. Data Ingestion: Mengumpulkan data dari berbagai sumber (API, basis data SQL/NoSQL, web scraping, sensor IoT).',
          '2. Data Cleaning & Wrangling: Menangani data hilang (imputasi mean/median), menghapus duplikat, dan mengonversi tipe data.',
          '3. Exploratory Data Analysis (EDA): Visualisasi korelasi variabel, deteksi outlier, dan ekstraksi fitur (Feature Engineering).',
          '4. Model Training: Membagi data menjadi Training Set (70-80%) dan Testing/Validation Set (20-30%).',
          '5. Evaluation & Deployment: Menguji model pada data yang belum pernah dilihat dan merilisnya ke sistem produksi.'
        ]
      },
      {
        heading: 'Klasifikasi Metrik: Memilih Antara Akurasi, Presisi, atau Recall',
        content: 'Akurasi sering kali menjadi metrik yang menyesatkan (Accuracy Paradox) pada dataset yang tidak seimbang (imbalanced data). Misalnya pada pendeteksian penyakit langka yang hanya diderita oleh 1 dari 1.000 orang, model bodoh yang selalu memprediksi "Negatif" akan mendapatkan akurasi 99.9%, padahal ia gagal total menyelamatkan pasien yang sakit!',
        bulletPoints: [
          'Accuracy = (TP + TN) / (TP + TN + FP + FN) → Mengukur ketepatan total, hanya relevan jika proporsi kelas seimbang.',
          'Precision = TP / (TP + FP) → Fokus pada seberapa akurat prediksi positif kita. Kritis saat biaya False Positive sangat mahal (contoh: deteksi spam email atau filter transaksi fraud agar nasabah tidak diblokir keliru).',
          'Recall (Sensitivity) = TP / (TP + FN) → Fokus menangkap seluruh kejadian positif nyata. Sangat kritis saat False Negative berakibat fatal (contoh: diagnosis kanker, deteksi bom, deteksi kebocoran gas nuklir).',
          'F1-Score = 2 × (Precision × Recall) / (Precision + Recall) → Rata-rata harmonik antara presisi dan recall.'
        ],
        technicalDeepDive: {
          title: 'Perhitungan Kasus Nyata: Diagnosis Kanker Payudara',
          description: 'Dari 100 sampel mammografi: 10 sampel Positif Kanker dan 90 sampel Jinak. Model memprediksi 8 Positif (7 benar kanker [TP], 1 salah vonis [FP]). Model memprediksi 92 Negatif (89 benar jinak [TN], 3 pasien kanker lolos tanpa diobati [FN]). Akurasi = (7+89)/100 = 96%. Namun Recall = 7/(7+3) = 70%! Sebanyak 30% pasien kanker terancam terlambat ditangani.'
        }
      }
    ],
    summary: [
      'Data berkualitas adalah prasyarat utama keberhasilan model kecerdasan artifisial ("Garbage In, Garbage Out").',
      'Pemilihan paradigma pembelajaran mesin ditentukan oleh ada atau tidaknya label target dalam dataset (Supervised vs Unsupervised).',
      'Pada skenario medis dan keamanan berisiko tinggi, metrik Recall jauh lebih diprioritaskan daripada sekadar skor Akurasi keseluruhan.'
    ],
    reflectionQuestions: [
      'Pada aplikasi pendeteksi spam email di Gmail, apakah tim engineering lebih mengutamakan nilai Precision tinggi atau Recall tinggi? Jelaskan akibat fatal jika metrik yang keliru dioptimalkan!',
      'Bagaimana cara membuktikan secara empiris bahwa model yang Anda latih mengalami overfitting?'
    ]
  },
  {
    id: 'sub-3',
    number: '1.3',
    title: 'Keamanan Informasi, Kriptografi Modern & Integritas Data',
    subtitle: 'Prinsip CIA Triad, Kriptografi Simetris/Asimetris, dan Fungsi Hash Kuantitatif',
    readingTimeMinutes: 15,
    overview: 'Di era digital yang serba terhubung, keamanan informasi (cybersecurity) adalah pilar ketahanan bangsa. Sub-bab ini membedah fondasi keamanan melalui CIA Triad, membedah algoritma enkripsi simetris (AES) dan asimetris (RSA/ECC), menganalisis sifat matematis fungsi hash satu arah (SHA-256) serta fenomena efek longsoran (avalanche effect).',
    learningObjectives: [
      'Menganalisis skenario keamanan sistem berdasarkan tiga pilar CIA Triad (Confidentiality, Integrity, Availability).',
      'Menjelaskan cara kerja dan perbedaan kriptografi kunci simetris vs kriptografi kunci asimetris (Public-Private Key pair).',
      'Membuktikan sifat satu arah (one-way) dan Avalanche Effect pada algoritma hashing SHA-256.',
      'Mengidentifikasi vektor ancaman siber kontemporer (Social Engineering, Phishing, Ransomware, Man-in-the-Middle).'
    ],
    keyConcepts: [
      {
        term: 'CIA Triad',
        definition: 'Model dasar keamanan informasi yang terdiri dari Kerahasiaan (Confidentiality), Keutuhan/Integritas data (Integrity), dan Ketersediaan sistem saat dibutuhkan (Availability).',
        category: 'Prinsip Keamanan'
      },
      {
        term: 'Kriptografi Asimetris (Public Key)',
        definition: 'Sistem enkripsi yang menggunakan sepasang kunci matematis berbeda: Kunci Publik (disebar bebas untuk mengenkripsi pesan) dan Kunci Privat (dirahasiakan pemilik untuk mendekripsi).',
        category: 'Kriptografi'
      },
      {
        term: 'Fungsi Hash Kriptografi',
        definition: 'Fungsi matematis deterministik yang mengubah data berukuran sembarang menjadi string heksadesimal berukuran tetap (misal 256-bit pada SHA-256) dengan sifat satu arah.',
        category: 'Integritas Data'
      },
      {
        term: 'Avalanche Effect',
        definition: 'Sifat algoritma kriptografi di mana perubahan sekecil satu bit saja pada input akan mengakibatkan perubahan drastis (minimal 50% bit) pada output hash atau ciphertext.',
        category: 'Kriptografi'
      }
    ],
    sections: [
      {
        heading: 'Pilar Utama Keamanan: Mengurai CIA Triad dalam Kasus Nyata',
        content: 'Setiap insiden siber dapat dipetakan dampaknya ke dalam salah satu atau kombinasi pilar CIA Triad: Confidentiality (apakah data rahasia bocor?), Integrity (apakah data diubah tanpa izin?), dan Availability (apakah layanan lumpuh?).',
        bulletPoints: [
          'Confidentiality: Melindungi kerahasiaan data dari akses tidak sah melalui enkripsi, kontrol akses role-based (RBAC), dan MFA.',
          'Integrity: Memastikan keaslian data tidak dimanipulasi atau rusak selama transmisi melalui tanda tangan digital (Digital Signature) dan checksum hash.',
          'Availability: Menjamin sistem dan data dapat diakses oleh pihak berwenang kapan pun dibutuhkan melalui server redundan, backup berkala, dan mitigasi DDoS.'
        ],
        realWorldExample: {
          title: 'Studi Kasus Nasional: Serangan Ransomware Pusat Data Nasional (PDN)',
          description: 'Pada Juni 2024, serangan Ransomware Brain Cipher menyerang Pusat Data Nasional Sementara (PDNS) Indonesia. Serangan ini merusak pilar Integrity (data terenkripsi secara ilegal) dan melumpuhkan pilar Availability (layanan imigrasi di bandara dan ratusan instansi pemerintah tidak dapat diakses selama berhari-hari).',
          contextInIndonesia: 'Pelajaran krusial mengenai wajibnya backup data terisolasi (air-gapped backup) dan segmentasi jaringan zero-trust di instansi publik.'
        }
      },
      {
        heading: 'Kriptografi: Simetris vs Asimetris',
        content: 'Enkripsi adalah proses mengubah teks terbaca (plaintext) menjadi teks sandi (ciphertext) menggunakan kunci tertentu.',
        bulletPoints: [
          'Kriptografi Simetris (contoh: AES-256, ChaCha20): Menggunakan satu kunci yang sama persis untuk enkripsi dan dekripsi. Sangat cepat, hemat komputasi, cocok untuk mengenkripsi hard drive atau file besar. Masalah utama: Bagaimana mendistribusikan kunci rahasia tersebut ke pihak lain secara aman?',
          'Kriptografi Asimetris (contoh: RSA, Elliptic Curve Cryptography / ECC): Menggunakan sepasang kunci: Public Key untuk enkripsi dan Private Key untuk dekripsi. Sangat aman untuk pertukaran kunci di internet publik (protokol HTTPS/TLS), namun lambat secara komputasi.',
          'Solusi Modern (Hybrid Cryptography): HTTPS menggunakan kriptografi asimetris saat awal koneksi (handshake) untuk menyepakati kunci simetris, lalu mentransmisikan data web menggunakan kriptografi simetris yang cepat.'
        ]
      },
      {
        heading: 'Integritas Data Kuantitatif: Mengapa SHA-256 Tak Tergantikan?',
        content: 'Fungsi Hash bukanlah enkripsi! Enkripsi bersifat dua arah (bisa didekripsi kembali jika memiliki kunci), sedangkan Hash bersifat satu arah murni (One-way Function). Anda tidak dapat mengubah string hash SHA-256 kembali menjadi teks aslinya, sama seperti Anda tidak bisa mengubah kue tart kembali menjadi telur dan tepung mentah.',
        bulletPoints: [
          'Deterministik: Input yang sama persis akan selalu menghasilkan nilai hash yang sama persis 64 karakter heksadesimal.',
          'Tahan Benturan (Collision Resistant): Sangat mustahil menemukan dua input berbeda yang menghasilkan nilai hash yang identik.',
          'Penyimpanan Kata Sandi Aman: Sistem yang baik tidak pernah menyimpan password asli di database, melainkan menyimpan hash(password + salt). Saat login, sistem membandingkan nilai hash-nya.'
        ]
      }
    ],
    summary: [
      'Keamanan informasi bertumpu pada keseimbangan tiga pilar: Confidentiality, Integrity, dan Availability.',
      'Kriptografi hibrida menggabungkan keunggulan keamanan pertukaran kunci asimetris dengan kecepatan transmisi simetris pada protokol web modern (HTTPS).',
      'Fungsi hash kriptografi seperti SHA-256 adalah instrumen utama verifikasi integritas data dan otentikasi kata sandi berkat sifat one-way dan efek avalanche.'
    ],
    reflectionQuestions: [
      'Mengapa perusahaan teknologi yang menyimpan kata sandi pengguna dalam bentuk plaintext dianggap melakukan pelanggaran keamanan fatal?',
      'Seorang peretas berhasil mengubah 1 angka pada nilai transfer rekening bank dari Rp1.000.000 menjadi Rp9.000.000 dalam file transaksi yang dilindungi SHA-256. Apakah modifikasi ini dapat terdeteksi oleh sistem penerima? Jelaskan mekanismenya!'
    ]
  },
  {
    id: 'sub-4',
    number: '1.4',
    title: 'Dampak Sosial Informatika, Etika AI & Regulasi Digital',
    subtitle: 'Bias Algoritma, Deepfake, Kepatuhan UU PDP No. 27/2022, dan Karier Masa Depan',
    readingTimeMinutes: 11,
    overview: 'Kemajuan informatika membawa disrupsi sosial luar biasa. Sub-bab penutup ini mengkaji etika kecerdasan artifisial, bahaya bias algoritmik, manipulasi konten digital (deepfake), ketentuan yuridis Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27/2022) di Indonesia, serta pemetaan profil karier masa depan di bidang komputasi.',
    learningObjectives: [
      'Menganalisis fenomena bias algoritma (Algorithmic Bias) dan dampaknya terhadap diskriminasi sosial.',
      'Mengidentifikasi teknik deteksi manipulasi media sintetis (Deepfake) dan langkah mitigasi disinformasi.',
      'Memahami hak-hak pemilik data pribadi dan kewajiban pengendali data berdasarkan UU PDP No. 27 Tahun 2022.',
      'Mengeksplorasi peta okupasi dan kompetensi karier masa depan di bidang Informatika (AI Engineer, Data Scientist, Cybersecurity Analyst).'
    ],
    keyConcepts: [
      {
        term: 'Algorithmic Bias',
        definition: 'Penyimpangan sistematis dan tidak adil dalam output model AI yang diakibatkan oleh data pelatihan yang tidak representatif atau prasangka historis manusia.',
        category: 'Etika AI'
      },
      {
        term: 'Deepfake',
        definition: 'Teknologi manipulasi audio, gambar, atau video sintetis menggunakan arsitektur Generative Adversarial Networks (GAN) yang membuat seseorang tampak mengatakan atau melakukan hal yang sebenarnya tidak pernah dilakukannya.',
        category: 'Media Sintetis'
      },
      {
        term: 'UU PDP (UU No. 27 Tahun 2022)',
        definition: 'Undang-Undang Republik Indonesia yang mengatur perlindungan data pribadi, hak pemilik data, sanksi bagi pengendali data yang lalai, serta pembentukan lembaga pengawas data pribadi.',
        category: 'Regulasi Hukum'
      },
      {
        term: 'Explainable AI (XAI)',
        definition: 'Pendekatan dalam pengembangan AI yang memastikan keputusan yang diambil oleh model kecerdasan buatan dapat dipahami dan dipertanggungjawabkan secara logis oleh manusia.',
        category: 'Transparansi Sistem'
      }
    ],
    sections: [
      {
        heading: 'Etika AI: Menghadapi Bias Algoritma dan Transparansi Keputusan',
        content: 'Model AI tidak memiliki moral; ia hanyalah cerminan dari data yang diumpankan kepadanya. Jika sebuah sistem AI rekrutmen pegawai dilatih menggunakan data karyawan 10 tahun terakhir di perusahaan teknologi yang mayoritas pekerjanya pria, AI dapat secara otomatis menurunkan skor penilaian calon pelamar wanita hanya karena korelasi historis gender.',
        bulletPoints: [
          'Sumber Bias: Data latihan tidak representatif, pemilihan label subjektif, atau ketiadaan fitur proteksi privasi.',
          'Dampak Sosial: Ketidakadilan akses perbankan (credit scoring), diskriminasi rasial pada pengenalan wajah kepolisian, atau pemfilteran pelamar kerja.',
          'Upaya Mitigasi: Melakukan audit dataset reguler, de-biasing algorithms, dan menerapkan prinsip Explainable AI (XAI) agar model tidak beroperasi sebagai "kotak hitam" (black box).'
        ]
      },
      {
        heading: 'Kedaulatan Data & Regulasi: UU Perlindungan Data Pribadi (UU PDP)',
        content: 'Indonesia resmi mengesahkan UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi yang menjadi tonggak sejarah hukum digital nasional, mirip dengan General Data Protection Regulation (GDPR) di Uni Eropa.',
        bulletPoints: [
          'Klasifikasi Data Pribadi: Data Umum (nama lengkap, jenis kelamin, kewarganegaraan) dan Data Spesifik (data kesehatan, data biometrik, rekam jejak kriminal, data keuangan anak).',
          'Hak Pemilik Data: Hak untuk menarik persetujuan, hak untuk menghapus data pribadi (Right to be Forgotten), dan hak menuntut ganti rugi atas kebocoran.',
          'Kewajiban Pengendali Data: Wajib menerapkan enkripsi kuat, memiliki Data Protection Officer (DPO), dan wajib memberitahukan pemilik data maksimal 3 × 24 jam saat terjadi insiden kebocoran data.'
        ]
      },
      {
        heading: 'Peta Karier & Profesi Masa Depan Bidang Informatika',
        content: 'Pesatnya digitalisasi menciptakan kebutuhan luar biasa terhadap talenta komputasi berketerampilan tinggi dengan portofolio teruji.',
        bulletPoints: [
          'AI / Machine Learning Engineer: Mengembangkan dan mengoptimasi model jaringan saraf tiruan serta deployment ke cloud.',
          'Data Scientist & Analyst: Mengolah big data untuk mengekstraksi wawasan strategis keputusan bisnis.',
          'Cybersecurity Analyst & Penetration Tester: Menguji ketahanan infrastruktur jaringan dari penetrasi peretas dan merancang protokol pertahanan.',
          'Cloud Solutions Architect: Merancang infrastruktur komputasi awan yang terukur, hemat biaya, dan memiliki ketersediaan tinggi 99.99%.'
        ]
      }
    ],
    summary: [
      'Inovasi teknologi tanpa diiringi kesadaran etis dapat memperkuat diskriminasi dan kesenjangan sosial melalui bias algoritmik.',
      'UU PDP No. 27 Tahun 2022 memberikan landasan hukum kuat yang mewajibkan institusi menjaga kerahasiaan dan keamanan data digital warga negara.',
      'Karier di bidang teknologi tidak hanya membutuhkan kemampuan coding mekanis, tetapi kemampuan bernalar kritis, pemecahan masalah multidisiplin, dan etika profesi.'
    ],
    reflectionQuestions: [
      'Sebagai calon pengembang perangkat lunak, langkah preventif apa yang akan Anda terapkan agar aplikasi e-commerce yang Anda bangun taat penuh pada UU PDP No. 27/2022?',
      'Bagaimana cara memverifikasi keaslian sebuah video pidato tokoh publik sebelum menyebarkannya di media sosial demi mencegah korban manipulasi Deepfake?'
    ]
  }
];

export const PRACTICAL_LABS: PracticalLab[] = [
  {
    id: 'lab-1',
    number: 1,
    title: 'Lab Simulasi AI: Pelatihan Model Klasifikasi Data & Analisis Decision Boundary',
    focus: 'Eksperimen Pembelajaran Mesin (Supervised Learning - Klasifikasi Biner)',
    objective: 'Peserta didik mampu menganalisis pengaruh parameter bobot fitur (weights), laju pembelajaran (learning rate), dan jumlah epoch terhadap akurasi model serta memetakan garis batas keputusan (decision boundary) pada dataset non-linear.',
    toolsAndPlatforms: [
      {
        name: 'Simulator Browser Built-in (Interactive AI Playground)',
        type: 'online-browser',
        description: 'Simulator grafis interaktif langsung di dalam aplikasi untuk memvisualisasikan scatter data, decision boundary, confusion matrix, dan kurva loss secara real-time.'
      },
      {
        name: 'Google Colaboratory (Python Scikit-Learn)',
        type: 'google-colab',
        url: 'https://colab.research.google.com',
        description: 'Notebook Python online berbasis cloud untuk eksperimen lanjutan menggunakan pustaka pandas, numpy, scikit-learn (LogisticRegression & DecisionTree), dan matplotlib.'
      }
    ],
    duration: '2 Jam Pelajaran (90 Menit)',
    targetCompetency: 'Menganalisis proses training model AI, menghitung confusion matrix, dan mendeteksi overfitting secara visual.',
    prerequisites: [
      'Memahami konsep dasar variabel independen (fitur) dan variabel dependen (label target).',
      'Memahami sistem koordinat Kartesius 2 dimensi (sumbu X dan Y).'
    ],
    materialsNeeded: [
      'Komputer / Laptop / Tablet dengan peramban web modern (Chrome/Firefox/Edge).',
      'Akses ke Interactive Simulator Tab aplikasi ini atau akun Google untuk membuka Colab.'
    ],
    steps: [
      {
        stepNumber: 1,
        stepTitle: 'Memilih Skenario Dataset Praktikum',
        instruction: 'Buka alat simulasi AI di tab lab. Pilih salah satu dataset yang tersedia: "Deteksi Transaksi Fraud vs Normal", "Diagnosis Sel Tumor Medis", atau "Klasifikasi Calon Nasabah Kredit". Perhatikan sebaran titik data kelas Positif (Biru) dan kelas Negatif (Merah).',
        expectedOutput: 'Grafik scatter plot menampilkan 80 titik data dengan koordinat Fitur 1 (sumbu X) dan Fitur 2 (sumbu Y) dengan pemisahan pola tertentu.',
        proTip: 'Dataset riil jarang terpisah sempurna oleh garis lurus (non-linearly separable).'
      },
      {
        stepNumber: 2,
        stepTitle: 'Konfigurasi Hiperparameter (Hyperparameter Tuning)',
        instruction: 'Atur nilai Laju Pembelajaran (Learning Rate) ke angka 0.05, pilih fungsi aktivasi Sigmoid, dan tentukan target iterasi pelatihan (Epoch) sebanyak 50 iterasi.',
        expectedOutput: 'Slider kontrol berada pada parameter yang ditentukan, model siap diinisialisasi dengan bobot acak (random weights).',
        proTip: 'Learning rate yang terlalu besar dapat menyebabkan proses pembelajaran melompat-lompat dan tidak konvergen (divergent).'
      },
      {
        stepNumber: 3,
        stepTitle: 'Menjalankan Siklus Pelatihan Model (Training Loop)',
        instruction: 'Klik tombol "Mulai Latih Model (Train)". Amati pergerakan garis batas keputusan (Decision Boundary) yang bergeser membelah kedua kelas data, serta perhatikan penurunan nilai Loss Function pada grafik pelatihan.',
        expectedOutput: 'Nilai Loss turun mendekati 0.15 dan Akurasi meningkat bertahap hingga mencapai 90%+. Garis keputusan berhasil memisahkan kedua kelompok data.',
      },
      {
        stepNumber: 4,
        stepTitle: 'Analisis Confusion Matrix & Metrik Evaluasi',
        instruction: 'Setelah pelatihan selesai, periksa tabel Confusion Matrix yang dihasilkan secara otomatis: catat nilai True Positive (TP), False Positive (FP), True Negative (TN), dan False Negative (FN). Hitung rasio Precision dan Recall.',
        expectedOutput: 'Tabel 2x2 menampilkan kalkulasi metrik secara transparan beserta perbandingan skor F1.',
      },
      {
        stepNumber: 5,
        stepTitle: 'Uji Prediksi Titik Data Baru (Inference Testing)',
        instruction: 'Masukkan nilai Fitur X dan Fitur Y sembarang pada panel "Uji Titik Baru", lalu klik "Prediksi". Amati kelas mana yang diputuskan oleh model beserta tingkat probabilitas keyakinannya (confidence score).',
        expectedOutput: 'Sistem menampilkan prediksi kelas secara seketika (misal: "Kelas: Fraud, Keyakinan: 94.2%").'
      }
    ],
    reflectionAndAnalysis: [
      {
        id: 'ref-1-1',
        question: 'Ketika Anda meningkatkan jumlah Epoch dari 20 ke 200 pada dataset dengan banyak noise data, apa yang terjadi pada bentuk Decision Boundary dan nilai akurasi data uji? Jelaskan apakah fenomena tersebut mengindikasikan Overfitting!',
        pedagogicalGoal: 'Menganalisis fenomena overfitting dan trade-off kompleksitas model.',
        sampleAnswerGuide: 'Garis batas keputusan menjadi terlalu berkelok-kelok dan rumit karena berusaha melingkupi setiap titik pencilan (outlier). Meskipun akurasi data latihan bisa 100%, model kehilangan kemampuan generalisasi saat diuji dengan data baru.'
      },
      {
        id: 'ref-1-2',
        question: 'Pada dataset diagnosis sel tumor medis, jika model menghasilkan 3 False Negatives (pasien kanker divonis sehat) dan 5 False Positives (pasien sehat divonis kanker), kesalahan manakah yang memiliki dampak etis dan medis paling fatal? Metrik evaluasi apa yang harus diprioritaskan untuk meminimalkannya?',
        pedagogicalGoal: 'Mengevaluasi konsekuensi praktis dari metrik Precision vs Recall.',
        sampleAnswerGuide: 'Kesalahan False Negative jauh lebih fatal karena pasien kanker tidak menerima pengobatan medis segera dan dapat mengancam keselamatan nyawa. Oleh karena itu, metrik Recall (Sensitivity) harus dimaksimalkan mendekati 100%.'
      }
    ],
    assessmentRubric: [
      {
        criteria: 'Konfigurasi Parameter & Eksperimen',
        score4: 'Siswa mandiri mengonfigurasi learning rate dan epoch dengan variasi logis serta mencatat data secara terstruktur.',
        score3: 'Siswa mengikuti instruksi panduan dengan benar namun kurang melakukan variasi pengujian mandiri.',
        score2: 'Siswa memerlukan bimbingan penuh dari guru untuk menjalankan simulasi.'
      },
      {
        criteria: 'Analisis Confusion Matrix',
        score4: 'Siswa mampu menghitung dan menginterpretasikan TP, FP, TN, FN serta menjelaskan korelasi Precision vs Recall secara mendalam.',
        score3: 'Siswa mampu membaca nilai Confusion Matrix namun belum tuntas menjelaskan dampak praktis False Negative.',
        score2: 'Siswa keliru membedakan konsep False Positive dan False Negative.'
      }
    ]
  },
  {
    id: 'lab-2',
    number: 2,
    title: 'Lab Kriptografi & Keamanan Siber: Eksperimen CIA Triad, Enkripsi, dan SHA-256 Avalanche Effect',
    focus: 'Integritas Data, Kriptografi Simetris/Asimetris, dan Ketahanan Password',
    objective: 'Peserta didik mampu membuktikan sifat deterministik dan fenomena Avalanche Effect pada fungsi hash kriptografi SHA-256 serta menganalisis dampak manipulasi bit data terhadap pilar integritas CIA Triad.',
    toolsAndPlatforms: [
      {
        name: 'Simulator Kriptografi & Hash Built-in',
        type: 'online-browser',
        description: 'Modul interaktif di dalam aplikasi untuk eksperimen enkripsi teks (Caesar/Vigenere/AES) dan inspeksi bit heksadesimal hash SHA-256 secara langsung.'
      },
      {
        name: 'Terminal Linux / Windows PowerShell / Google Colab (hashlib)',
        type: 'python',
        description: 'Perintah terminal menggunakan openssl dgst -sha256 atau pustaka hashlib Python untuk verifikasi checksum file ISO / data biner.'
      }
    ],
    duration: '2 Jam Pelajaran (90 Menit)',
    targetCompetency: 'Menerapkan enkripsi data, memverifikasi checksum integritas berkas, dan menghitung entropi keamanan kata sandi.',
    prerequisites: [
      'Mengetahui representasi bilangan biner (0 dan 1) dan heksadesimal (0-9, a-f).',
      'Memahami konsep dasar CIA Triad pada keamanan informasi.'
    ],
    materialsNeeded: [
      'Perangkat komputer atau smartphone dengan browser internet.',
      'Modul lab interaktif kriptografi aplikasi ini.'
    ],
    steps: [
      {
        stepNumber: 1,
        stepTitle: 'Eksperimen Enkripsi Simetris Sederhana',
        instruction: 'Buka modul Kriptografi pada simulator. Masukkan pesan rahasia: "UJIAN INFORMATIKA KELAS XII". Atur pergeseran kunci (key shift) ke angka 7. Klik "Enkripsi" dan amati perubahan plaintext menjadi ciphertext.',
        expectedOutput: 'Teks sandi acak terenkripsi yang tidak dapat dibaca tanpa mengetahui kunci pergeseran.',
      },
      {
        stepNumber: 2,
        stepTitle: 'Pengujian Fungsi Hash Kriptografi SHA-256',
        instruction: 'Ketikkan kalimat: "Saya siswa berintegritas SMA Indonesia" pada kolom input hash SHA-256. Amati output digest heksadesimal sepanjang 64 karakter (256-bit).',
        expectedOutput: 'String heksadesimal 64 karakter yang unik dan tetap ukurannya.',
        proTip: 'Ukuran output SHA-256 selalu tetap 256-bit terlepas dari apakah input berupa 1 huruf maupun 1 novel lengkap!'
      },
      {
        stepNumber: 3,
        stepTitle: 'Membuktikan Fenomena Efek Longsoran (Avalanche Effect)',
        instruction: 'Ubah HANYA SATU KARAKTER dari input sebelumnya: ganti huruf kecil "a" pada kata "Indonesia" menjadi huruf besar "A" ("IndonesiA"). Klik "Hitung Ulang Hash" dan bandingkan kedua kode hash menggunakan fitur visual pembanding bit.',
        expectedOutput: 'Simulator menandai lebih dari 50% digit heksadesimal yang berubah secara dramatis dan acak.',
      },
      {
        stepNumber: 4,
        stepTitle: 'Kalkulasi Entropi Kata Sandi & Waktu Retas Brute-Force',
        instruction: 'Uji kekuatan tiga jenis kata sandi: (1) "rahasia123", (2) "K3l@s12#Informatika!", (3) "p@ssword". Amati estimasi waktu yang dibutuhkan superkomputer peretas (dengan kecepatan 10 miliar tebakan/detik) untuk memecahkannya.',
        expectedOutput: 'Kata sandi pendek terbongkar dalam hitungan milidetik, sementara passphrase kombinasi simbol memerlukan jutaan tahun.',
      }
    ],
    reflectionAndAnalysis: [
      {
        id: 'ref-2-1',
        question: 'Berdasarkan pengujian Avalanche Effect, mengapa fungsi hash kriptografi yang baik HARUS menghasilkan perubahan output yang drastis meskipun input hanya diubah 1 bit? Apa bahayanya jika perubahan 1 huruf hanya mengubah 1 huruf pada hash?',
        pedagogicalGoal: 'Memahami prinsip ketahanan terhadap analisis kripto (cryptanalysis resistance).',
        sampleAnswerGuide: 'Jika perubahan input proporsional terhadap output, penyerang dapat menggunakan metode gradien atau deduksi linear untuk menebak pesan asli langkah demi langkah. Efek avalanche menjamin sifat ketidakteraturan matematis yang membuat tebakan parsial mustahil dilakukan.'
      },
      {
        id: 'ref-2-2',
        question: 'Jelaskan skenario serangan Man-in-the-Middle (MitM) jika transaksi perbankan online tidak dilindungi oleh enkripsi asimetris dan sertifikat SSL/TLS digital!',
        pedagogicalGoal: 'Menganalisis ancaman integritas dan kerahasiaan pada transmisi data publik.',
        sampleAnswerGuide: 'Peretas yang berada di jaringan yang sama (misal Wi-Fi publik) dapat mencegat paket data plaintext, membaca nomor rekening dan PIN nasabah (merusak Confidentiality), atau mengubah nomor rekening tujuan transfer sebelum paket diteruskan ke server bank (merusak Integrity).'
      }
    ],
    assessmentRubric: [
      {
        criteria: 'Pemahaman Sifat Hash',
        score4: 'Siswa mampu mendemonstrasikan dan menjelaskan sifat deterministik, satu arah, dan avalanche effect dengan terminologi teknis akurat.',
        score3: 'Siswa mengerti bahwa hash berubah drastis namun belum tuntas menjelaskan sifat one-way function.',
        score2: 'Siswa salah mengira fungsi hash sama dengan enkripsi dua arah.'
      },
      {
        criteria: 'Analisis Keamanan Password',
        score4: 'Siswa mampu menganalisis konsep ruang kunci (keyspace) dan entropi matematis dalam pencegahan serangan brute-force.',
        score3: 'Siswa memahami kata sandi kuat harus panjang namun belum memahami perhitungan kombinasi karakter.',
        score2: 'Siswa hanya menilai kekuatan kata sandi secara intuitif tanpa data durasi retas.'
      }
    ]
  },
  {
    id: 'lab-3',
    number: 3,
    title: 'Lab Pemrograman Python: Eksplorasi Data Numerik & Deteksi Anomali (Outlier)',
    focus: 'Analisis Data Eksploratif (EDA) & Ekstraksi Statistik Deskriptif',
    objective: 'Peserta didik mampu menulis dan mengeksekusi algoritma pembersihan data sederhana untuk menghitung Mean, Median, Standar Deviasi, serta menerapkan normalisasi Min-Max pada array data mentah.',
    toolsAndPlatforms: [
      {
        name: 'Browser Python Code Runner (Interactive Sandbox)',
        type: 'online-browser',
        description: 'Editor kode interaktif di peramban web yang mampu mengeksekusi script analisis data secara instan tanpa instalasi perangkat lunak tambahan.'
      },
      {
        name: 'Python IDLE / Jupyter Notebook lokal',
        type: 'python',
        description: 'Lingkungan eksekusi Python 3.10+ untuk pembelajaran di laboratorium komputer sekolah.'
      }
    ],
    duration: '2 Jam Pelajaran (90 Menit)',
    targetCompetency: 'Menulis script kalkulasi statistik dan memvisualisasikan sebaran data numerik.',
    prerequisites: [
      'Dasar struktur data list/array dalam pemrograman.',
      'Operasi aritmatika dan perulangan (loops).'
    ],
    materialsNeeded: [
      'Komputer sekolah atau laptop siswa.',
      'Peramban web dengan sandbox Python aktif.'
    ],
    steps: [
      {
        stepNumber: 1,
        stepTitle: 'Memuat Dataset Nilai Uji Sensor IoT',
        instruction: 'Jalankan skrip dasar yang memuat array 15 data pembacaan sensor suhu ruangan server (dalam derajat Celcius).',
        expectedOutput: 'Array data termuat di memori dan dicetak pada jendela konsol.',
      },
      {
        stepNumber: 2,
        stepTitle: 'Kalkulasi Nilai Statistik Dasar',
        instruction: 'Eksekusi fungsi perhitungan rata-rata (mean), nilai tengah (median), serta rentang nilai (min-max). Amati output numerik pada panel konsol.',
        expectedOutput: 'Konsol menampilkan: Mean, Median, dan Range nilai data.',
      },
      {
        stepNumber: 3,
        stepTitle: 'Deteksi Anomali Data (Outlier Detection)',
        instruction: 'Sisipkan satu nilai ekstrim anomali akibat error sensor (misal angka 95.0°C ke dalam array suhu ruangan 24°C). Jalankan kembali script dan amati pergeseran drastis antara nilai Mean dan Median!',
        expectedOutput: 'Nilai Mean melonjak drastis, sedangkan nilai Median tetap stabil dan resisten terhadap outlier.',
      },
      {
        stepNumber: 4,
        stepTitle: 'Normalisasi Data Fitur (Min-Max Scaling)',
        instruction: 'Terapkan rumus normalisasi (x - min) / (max - min) agar semua data terdistribusi dalam rentang standar [0.0 s.d. 1.0].',
        expectedOutput: 'Array baru dengan seluruh elemen bernilai desimal antara 0 dan 1.',
        proTip: 'Normalisasi sangat penting dalam Machine Learning agar fitur bernilai besar tidak mendominasi fitur bernilai kecil.'
      }
    ],
    reflectionAndAnalysis: [
      {
        id: 'ref-3-1',
        question: 'Mengapa dalam analisis data riil (seperti data pendapatan warga negara atau harga properti rumah), nilai Median sering kali lebih representatif dibandingkan nilai Mean? Kaitkan dengan eksperimen outlier yang baru saja Anda lakukan!',
        pedagogicalGoal: 'Menilai pemahaman tentang ketahanan ukuran pemusatan data (robustness of central tendency).',
        sampleAnswerGuide: 'Mean sangat rentan terdistorsi oleh satu atau dua nilai ekstrim (pencilan/outlier) yang sangat tinggi atau rendah. Sedangkan Median bersifat resisten (robust) karena hanya melihat posisi urutan tengah data, sehingga mencerminkan kondisi mayoritas populasi sesungguhnya.'
      }
    ],
    assessmentRubric: [
      {
        criteria: 'Eksekusi Kode & Modifikasi Logika',
        score4: 'Siswa berhasil memodifikasi script untuk menghitung metrik statistik tambahan secara mandiri.',
        score3: 'Siswa menjalankan kode sesuai instruksi tanpa error.',
        score2: 'Siswa mengalami kendala sintaksis dasar dan membutuhkan pendampingan teknis.'
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    number: 1,
    stimulus: 'Sebuah perusahaan rintisan (startup) logistik nasional di Jakarta ingin mengembangkan sistem cerdas otomatis untuk mendeteksi apakah suatu email pesanan pelanggan terindikasi sebagai pesanan fiktif (penipuan) atau pesanan valid. Tim pengembang telah mengumpulkan 50.000 riwayat transaksi email masa lalu lengkap dengan verifikasi kurir yang menyatakan status "Penipuan" atau "Valid".',
    question: 'Berdasarkan karakteristik data yang dimiliki oleh perusahaan tersebut, paradigma pembelajaran mesin (Machine Learning) manakah yang paling tepat dan efisien untuk diterapkan?',
    options: [
      { key: 'A', text: 'Unsupervised Learning dengan algoritma K-Means Clustering untuk mengelompokkan pelanggan tanpa label' },
      { key: 'B', text: 'Supervised Learning dengan algoritma Klasifikasi biner karena dataset memiliki atribut fitur dan label target yang terverifikasi' },
      { key: 'C', text: 'Reinforcement Learning dengan sistem reward dan punishment berbasis simulasi lingkungan agen otonom' },
      { key: 'D', text: 'Semi-supervised Learning murni karena jumlah data 50.000 dianggap terlalu sedikit untuk pelatihan model cerdas' },
      { key: 'E', text: 'Supervised Learning dengan algoritma Regresi Linear untuk memprediksi angka nominal kerugian finansial perusahaan' }
    ],
    correctAnswer: 'B',
    bloomLevel: 'C4 (Analisis)',
    competencyIndicator: 'Menganalisis karakteristik data untuk menentukan paradigma pembelajaran mesin yang tepat.',
    subChapterRef: 'Sub-bab 1.2: Sains Data & Fondasi Algoritma Machine Learning',
    technicalRationale: 'Dataset yang dimiliki perusahaan telah memiliki label target jawaban yang jelas dan terverifikasi ("Penipuan" vs "Valid"), serta tujuan akhirnya adalah mengelompokkan masukan baru ke dalam salah satu dari dua kategori diskrit tersebut (Klasifikasi Biner). Oleh karena itu, paradigma yang tepat secara teori dan komputasi adalah Supervised Learning tipe Klasifikasi.',
    distractorExplanation: {
      A: 'Salah karena K-Means Clustering digunakan untuk data tanpa label awal (Unsupervised Learning).',
      C: 'Salah karena Reinforcement Learning berbasis interaksi agen dan reward di lingkungan dinamis, bukan dataset historis statis berlabel.',
      D: 'Salah karena 50.000 data historis berlabel sudah sangat memadai untuk supervised learning dan tidak memerlukan pendekatan semi-supervised.',
      E: 'Salah karena target yang dicari adalah kategori biner status pesanan, bukan prediksi nilai numerik kontinu (regresi).'
    }
  },
  {
    id: 2,
    number: 2,
    stimulus: 'Sebuah laboratorium bioteknologi melatih model Deep Learning untuk mendeteksi penyakit karsinoma ganas yang langka pada 1.000 pasien. Dari hasil pengujian validasi diperoleh Confusion Matrix: True Positive (TP) = 18, False Negative (FN) = 2, True Negative (TN) = 970, dan False Positive (FP) = 10. Pasien yang mengalami False Negative berisiko meninggal dunia karena tidak mendapatkan intervensi kemoterapi darurat.',
    question: 'Berdasarkan evaluasi kritis terhadap implikasi medis di atas, pernyataan teknis manakah yang paling tepat menggambarkan performa model dan tindakan optimalisasi yang harus diambil oleh tim data scientist?',
    options: [
      { key: 'A', text: 'Model sudah sempurna karena memiliki skor Akurasi keseluruhan sebesar 98.8%, sehingga tidak memerlukan penyesuaian apa pun' },
      { key: 'B', text: 'Tim harus mengoptimalkan nilai Precision dengan menaikkan ambang batas keputusan (threshold) agar False Positive berkurang' },
      { key: 'C', text: 'Tim harus memprioritaskan metrik Recall (Sensitivity) dan menurunkan threshold klasifikasi untuk menekan False Negative hingga mendekati nol' },
      { key: 'D', text: 'Model mengalami underfitting parah karena jumlah True Negative jauh melebihi jumlah True Positive' },
      { key: 'E', text: 'Nilai F1-Score model tidak dapat dihitung karena proporsi data antara pasien sehat dan sakit tidak seimbang' }
    ],
    correctAnswer: 'C',
    bloomLevel: 'C5 (Evaluasi)',
    competencyIndicator: 'Mengevaluasi trade-off metrik evaluasi model AI (Akurasi vs Presisi vs Recall) pada kasus kritis.',
    subChapterRef: 'Sub-bab 1.2: Sains Data & Fondasi Algoritma Machine Learning',
    technicalRationale: 'Pada skenario medis berisiko tinggi di mana pasien yang lolos dari deteksi (False Negative = 2) dapat kehilangan nyawa, metrik yang wajib dimaksimalkan adalah Recall (Sensitivity = TP / [TP + FN] = 18 / 20 = 90%). Skor akurasi 98.8% adalah ilusi (Accuracy Paradox) akibat dataset yang sangat timpang. Menurunkan decision threshold akan membuat model lebih sensitif menangkap seluruh kasus positif nyata.',
    distractorExplanation: {
      A: 'Salah karena mengabaikan Accuracy Paradox pada dataset medis imbalanced; 2 pasien kanker yang lolos adalah kegagalan fatal.',
      B: 'Salah karena menaikkan threshold justru akan meningkatkan risiko False Negative.',
      D: 'Salah karena ketimpangan TN dan TP merupakan sifat alami penyakit langka pada populasi, bukan indikasi underfitting.',
      E: 'Salah karena F1-Score tetap dapat dihitung secara matematis menggunakan rata-rata harmonik Precision dan Recall.'
    }
  },
  {
    id: 3,
    number: 3,
    stimulus: 'Dua kantor cabang bank terpisah di kota Surabaya dan Denpasar hendak melakukan sinkronisasi data transaksi harian rahasia melalui jaringan internet publik. Mereka memerlukan metode pengamanan transmisi yang mampu menjamin kerahasiaan tinggi namun memiliki kecepatan enkripsi data bervolume gigabyte tanpa membebani prosesor server secara berlebihan.',
    question: 'Strategi arsitektur kriptografi hibrida manakah yang paling efektif dan efisien sesuai standar protokol keamanan modern?',
    options: [
      { key: 'A', text: 'Mengenkripsi seluruh data transaksi bervolume besar secara langsung menggunakan algoritma asimetris RSA-4096' },
      { key: 'B', text: 'Menggunakan Kriptografi Asimetris untuk menyepakati kunci sesi rahasia, lalu mengenkripsi data massal menggunakan Kriptografi Simetris AES-256' },
      { key: 'C', text: 'Mengonversi seluruh berkas transaksi ke format Hash SHA-256 dan mengirimkannya tanpa enkripsi tambahan' },
      { key: 'D', text: 'Menggunakan sandi subtitusi Caesar Cipher dengan pergeseran kunci 25 karakter dienkripsi berulang' },
      { key: 'E', text: 'Menyimpan kunci privat di server publik agar kedua kantor cabang dapat mengakses kunci dekripsi secara bersamaan' }
    ],
    correctAnswer: 'B',
    bloomLevel: 'C4 (Analisis)',
    competencyIndicator: 'Menganalisis keunggulan komparatif kriptografi simetris dan asimetris dalam arsitektur sistem.',
    subChapterRef: 'Sub-bab 1.3: Keamanan Informasi, Kriptografi Modern & Integritas Data',
    technicalRationale: 'Kriptografi asimetris (seperti RSA atau ECDH) sangat aman untuk pertukaran kunci di saluran publik tetapi memiliki beban komputasi lambat hingga 1.000 kali dibanding simetris. Sementara kriptografi simetris (AES-256) sangat cepat dan hemat daya untuk data besar. Arsitektur hibrida (seperti pada TLS/HTTPS) menggunakan kunci asimetris hanya untuk bertukar kunci rahasia (session key), lalu pertukaran data massal dienkripsi dengan AES-256.',
    distractorExplanation: {
      A: 'Salah karena mengenkripsi berkas gigabyte dengan RSA murni akan menghabiskan memori dan memakan waktu komputasi sangat lama.',
      C: 'Salah karena fungsi hash adalah satu arah murni dan tidak dapat didekripsi kembali menjadi data transaksi asli oleh cabang penerima.',
      D: 'Salah karena Caesar Cipher adalah kriptografi klasik yang sangat rentan dipecahkan dalam milidetik dengan frequency analysis.',
      E: 'Salah fatal karena kunci privat tidak boleh dibagikan atau disimpan di server publik.'
    }
  },
  {
    id: 4,
    number: 4,
    stimulus: 'Seorang administrator sistem mengunduh file image sistem operasi server sebesar 4.5 GB dari repository resmi. Di situs penyedia tertera nilai checksum resmi: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855". Saat diuji dengan perintah terminal `sha256sum`, output yang muncul berbeda satu karakter heksadesimal di digit paling akhir.',
    question: 'Berdasarkan prinsip integritas informasi dan sifat matematis fungsi hash kriptografi, kesimpulan teknis apa yang harus diambil oleh administrator tersebut?',
    options: [
      { key: 'A', text: 'File tetap aman dipasang karena selisih hanya satu karakter heksadesimal (toleransi perbedaan di bawah 1%)' },
      { key: 'B', text: 'File dipastikan telah mengalami kerusakan bit data (corrupted) atau telah disisipi kode berbahaya karena efek avalanche' },
      { key: 'C', text: 'Perbedaan karakter akhir disebabkan oleh perbedaan kecepatan koneksi internet saat mengunduh' },
      { key: 'D', text: 'Administrator cukup mengedit karakter akhir hash di file konfigurasi agar nilainya cocok kembali' },
      { key: 'E', text: 'Algoritma SHA-256 tidak konsisten sehingga pengujian harus diulang 10 kali untuk mengambil suara terbanyak' }
    ],
    correctAnswer: 'B',
    bloomLevel: 'C4 (Analisis)',
    competencyIndicator: 'Menganalisis integritas data berdasarkan output fungsi hash kriptografi dan prinsip CIA Triad.',
    subChapterRef: 'Sub-bab 1.3: Keamanan Informasi, Kriptografi Modern & Integritas Data',
    technicalRationale: 'Fungsi hash kriptografi bersifat deterministik dan memiliki efek avalanche. Perbedaan sekecil 1 karakter pada nilai hash menunjukkan bahwa berkas yang diunduh TIDAK IDENTIK dengan berkas sumber di server, baik akibat packet loss transmisi yang merusak biner file ataupun manipulasi injeksi malware oleh pihak ketiga (pelanggaran pilar Integrity pada CIA Triad). Berkas tidak boleh dijalankan.',
    distractorExplanation: {
      A: 'Salah fatal karena dalam kriptografi tidak ada istilah "toleransi persentase perbedaan hash"; 1 bit beda berarti data tidak utuh.',
      C: 'Salah karena kecepatan internet tidak memengaruhi nilai biner file utuh.',
      D: 'Salah karena mengubah string hash tidak memperbaiki kerusakan data berkas asli.',
      E: 'Salah karena SHA-256 adalah algoritma deterministik matematis yang selalu menghasilkan output yang sama untuk file yang sama.'
    }
  },
  {
    id: 5,
    number: 5,
    stimulus: 'Sebuah perusahaan perbankan multinasional menerapkan sistem Artificial Intelligence berbasis Machine Learning untuk menilai kelayakan kredit (credit scoring) calon debitur secara otomatis. Setelah berjalan selama satu tahun, audit independen menemukan bahwa calon nasabah dari kelompok etnis atau wilayah pedesaan tertentu secara persisten menerima skor kelayakan 40% lebih rendah dibanding calon nasabah perkotaan dengan tingkat pendapatan riil dan jaminan yang setara.',
    question: 'Faktor teknis manakah yang paling mungkin menjadi akar penyebab (root cause) dari fenomena diskriminasi sistematis tersebut, dan langkah perbaikan etis apa yang paling tepat?',
    options: [
      { key: 'A', text: 'Model mengalami hardware malfunction pada unit GPU dan solusinya adalah mengganti server komputasi' },
      { key: 'B', text: 'Dataset pelatihan memuat bias historis di mana populasi nasabah pedesaan minim terwakili; solusinya melakukan re-sampling dan audit de-biasing data' },
      { key: 'C', text: 'Sistem AI telah mencapai kesadaran buatan (AGI) dan memiliki preferensi pribadi; solusinya mematikan sistem secara permanen' },
      { key: 'D', text: 'Perusahaan harus menambahkan fitur suku dan ras ke dalam variabel input model agar AI dapat mengidentifikasi latar belakang nasabah lebih jelas' },
      { key: 'E', text: 'Kesalahan berada pada peminjam pedesaan yang tidak memiliki gawai mutakhir sehingga model menolaknya' }
    ],
    correctAnswer: 'B',
    bloomLevel: 'C5 (Evaluasi)',
    competencyIndicator: 'Mengevaluasi fenomena bias algoritma (algorithmic bias) dan merumuskan langkah mitigasi etika AI.',
    subChapterRef: 'Sub-bab 1.4: Dampak Sosial, Etika AI & Regulasi Digital',
    technicalRationale: 'Fenomena tersebut adalah representasi nyata dari Algorithmic Bias yang berakar dari data historis yang timpang (unrepresentative or biased training data). Model AI hanyalah pengenal pola statistik; jika data historis masa lalu minim mencatat nasabah pedesaan, model memprediksi probabilitas risiko tinggi secara keliru. Solusinya adalah melakukan audit dataset, penyeimbangan sampel (re-sampling), dan penerapan teknik de-biasing.',
    distractorExplanation: {
      A: 'Salah karena bias algoritmik berakar pada data dan formulasi matematika model, bukan kerusakan fisik GPU.',
      C: 'Salah karena AI saat ini masih pada level ANI (narrow intelligence) tanpa kesadaran atau sentimen personal.',
      D: 'Salah fatal karena menambahkan atribut sensitif (SARA) justru akan memperparah diskriminasi algoritmik (disparate impact).',
      E: 'Salah karena menyalahkan korban tanpa dasar analisis teknis komputasi.'
    }
  },
  {
    id: 6,
    number: 6,
    stimulus: 'Sebuah konsorsium otomotif merancang armada mobil otonom (Self-Driving Car) tingkat otonomi level 4. Sistem harus mampu mendeteksi pejalan kaki yang tiba-tiba menyeberang jalan dan melakukan pengereman darurat dalam waktu kurang dari 10 milidetik (ultra-low latency) bahkan saat kendaraan melintasi terowongan bawah tanah tanpa sinyal seluler.',
    question: 'Arsitektur komputasi manakah yang wajib diterapkan untuk modul pengambilan keputusan pengereman darurat tersebut?',
    options: [
      { key: 'A', text: 'Centralized Cloud Computing dengan mengirimkan rekaman video 4K sensor kamera ke data center pusat melalui jaringan satelit' },
      { key: 'B', text: 'Edge Computing pada unit pemroses mikro (NPU/GPU embedded) onboard kendaraan untuk inferensi lokal seketika' },
      { key: 'C', text: 'Sistem komputasi sukarela (Volunteer Computing) memanfaatkan ponsel pintar penumpang di dalam kabin mobil' },
      { key: 'D', text: 'Menghapus model AI dan menggantikannya dengan sistem manual transmisi mekanik kabel tanpa sensor' },
      { key: 'E', text: 'Off-grid Blockchain Computing di mana setiap keputusan pengereman harus divalidasi oleh konsensus node di jaringan' }
    ],
    correctAnswer: 'B',
    bloomLevel: 'C4 (Analisis)',
    competencyIndicator: 'Menganalisis kesesuaian arsitektur Cloud Computing vs Edge Computing untuk aplikasi mission-critical.',
    subChapterRef: 'Sub-bab 1.1: Evolusi Informatika & Ekosistem Kecerdasan Artifisial (AI)',
    technicalRationale: 'Aplikasi kritis yang menyangkut keselamatan jiwa (mission-critical) dengan toleransi latensi sangat rendah (< 10 ms) dan keharusan bekerja dalam kondisi terputus dari internet (offline resilience) mutlak membutuhkan Edge Computing. Pemrosesan inferensi AI dilakukan langsung pada chip lokal di dalam kendaraan tanpa menunggu round-trip time koneksi ke Cloud server.',
    distractorExplanation: {
      A: 'Salah karena transmisi video ke cloud membutuhkan latensi 50-200 ms dan akan gagal total saat kendaraan berada di terowongan tanpa sinyal.',
      C: 'Salah karena perangkat penumpang tidak memiliki keandalan, sertifikasi keselamatan, maupun konektivitas real-time bus CAN mobil.',
      D: 'Salah karena tidak menjawab kebutuhan desain mobil otonom level 4.',
      E: 'Salah karena konsensus blockchain memiliki latensi tinggi (dalam hitungan detik/menit) yang membahayakan nyawa.'
    }
  },
  {
    id: 7,
    number: 7,
    stimulus: 'Seorang staf bagian keuangan di instansi pemerintah menerima pesan email dengan alamat pengirim "kepala.dinas@kemendagri-go-id.com" (perhatikan tanda hubung menggantikan titik). Email tersebut melampirkan file PDF berjudul "Instruksi_Pencairan_Anggaran_Mendesak.pdf.exe" dan mendesak staf segera mentransfer dana hibah dalam waktu 2 jam agar tidak terkena sanksi administratif.',
    question: 'Berdasarkan taksonomi ancaman siber, jenis serangan apa yang sedang dialami oleh staf tersebut dan indikator teknis apa yang paling mencolok?',
    options: [
      { key: 'A', text: 'DDoS Attack karena server email instansi mengalami kelebihan beban trafik data' },
      { key: 'B', text: 'SQL Injection karena penyerang menyisipkan perintah kueri basis data pada lampiran dokumen' },
      { key: 'C', text: 'Spear Phishing dan Social Engineering dengan teknik domain spoofing / typosquatting serta penyamaran ekstensi ganda executable' },
      { key: 'D', text: 'Zero-day vulnerability pada protokol routing BGP penyedia jasa internet' },
      { key: 'E', text: 'Man-in-the-Middle Attack murni yang memodifikasi isi paket TCP/IP secara fisik pada kabel serat optik' }
    ],
    correctAnswer: 'C',
    bloomLevel: 'C4 (Analisis)',
    competencyIndicator: 'Mengidentifikasi vektor serangan siber (Social Engineering, Phishing) dan indikator ancaman digital.',
    subChapterRef: 'Sub-bab 1.3: Keamanan Informasi, Kriptografi Modern & Integritas Data',
    technicalRationale: 'Kasus ini merupakan contoh klasik Spear Phishing (phishing tertarget ke individu spesifik) yang memanfaatkan rekayasa sosial (Social Engineering) berupa manipulasi psikologis urgensi waktu dan ketakutan akan sanksi. Indikator teknis mencolok terlihat pada typosquatting domain (domain palsu yang menyerupai domain resmi) dan ekstensi ganda berbahaya (".pdf.exe" yang merupakan file program eksekusi malware yang menyamar sebagai dokumen PDF).',
    distractorExplanation: {
      A: 'Salah karena DDoS bertujuan melumpuhkan ketersediaan server melalui banjir paket trafik, bukan penipuan email terarah.',
      B: 'Salah karena SQL Injection menargetkan form input aplikasi web yang terhubung ke database SQL, bukan lampiran email.',
      D: 'Salah karena kasus ini tidak melibatkan eksploitasi celah keamanan zero-day pada router internet.',
      E: 'Salah karena serangan terjadi pada lapisan aplikasi melalui rekayasa sosial pengirim, bukan manipulasi fisik kabel jaringan.'
    }
  },
  {
    id: 8,
    number: 8,
    stimulus: 'Sebuah rumah sakit rujukan provinsi berencana mendigitalisasi 500.000 data rekam medis pasien ke dalam sistem rekam medis elektronik berbasis web. Sesuai amanat Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27/2022), data kesehatan dikategorikan sebagai Data Pribadi Spesifik yang wajib dilindungi dengan standar keamanan tingkat tinggi.',
    question: 'Kombinasi kebijakan teknologi keamanan manakah yang paling komprehensif untuk menjamin kepatuhan (compliance) terhadap regulasi tersebut?',
    options: [
      { key: 'A', text: 'Menonaktifkan password dan mempublikasikan data di jaringan lokal agar dokter mudah membuka rekam medis' },
      { key: 'B', text: 'Penerapan Enkripsi AES-256 pada data at-rest & TLS 1.3 in-transit, Multi-Factor Authentication (MFA), kontrol akses RBAC, dan pencatatan audit log immutable' },
      { key: 'C', text: 'Hanya mengandalkan antivirus gratis pada komputer resepsionis rumah sakit' },
      { key: 'D', text: 'Menyimpan seluruh data pasien di flashdisk berkapasitas besar yang dibawa pulang oleh kepala perawat' },
      { key: 'E', text: 'Membuat persetujuan lisan dari pasien tanpa pencatatan digital untuk menghemat kapasitas hard drive server' }
    ],
    correctAnswer: 'B',
    bloomLevel: 'C6 (Kreasi)',
    competencyIndicator: 'Merancang arsitektur perlindungan data pribadi spesifik sesuai ketentuan regulasi UU PDP.',
    subChapterRef: 'Sub-bab 1.4: Dampak Sosial, Etika AI & Regulasi Digital',
    technicalRationale: 'Sesuai UU PDP No. 27/2022 pasal 35-39, pengendali data pribadi spesifik wajib menerapkan standar teknis yang memadai untuk melindungi data dari akses ilegal. Kombinasi enkripsi kuat saat tersimpan (AES-256) dan saat ditransmisikan (TLS 1.3), pembatasan akses berbasis peran (RBAC), autentikasi ganda (MFA), serta log audit yang tidak dapat diubah (immutable) menjamin kerahasiaan, integritas, dan akuntabilitas sistem hukum.',
    distractorExplanation: {
      A: 'Salah fatal karena melanggar pilar kerahasiaan dan privasi pasien secara terang-terangan.',
      C: 'Salah karena antivirus lokal tidak melindungi database dari eksfiltrasi jaringan, pencurian kredensial, atau pelanggaran transmisi data.',
      D: 'Salah karena penyimpanan portabel tanpa enkripsi berisiko tinggi hilang atau disalahgunakan (insider threat).',
      E: 'Salah karena UU PDP mewajibkan persetujuan pemrosesan data (consent) yang eksplisit dan terekam secara sah.'
    }
  },
  {
    id: 9,
    number: 9,
    stimulus: 'Pada saat melatih model jaringan saraf tiruan (Neural Network) untuk klasifikasi gambar serangga hama tanaman pertanian, seorang siswa mengamati grafik hasil pelatihan selama 100 epoch: kurva Training Loss terus menurun dari 0.8 hingga mencapai 0.02 (akurasi training 99.5%), namun kurva Validation Loss setelah epoch ke-30 justru berbalik naik tajam dari 0.25 menjadi 0.78 (akurasi validasi anjlok ke 68%).',
    question: 'Berdasarkan fenomena kurva pembelajaran tersebut, diagnosa teknis apa yang terjadi pada model dan teknik mitigasi apa yang paling efektif diterapkan?',
    options: [
      { key: 'A', text: 'Model mengalami Underfitting; solusinya menambah jumlah neuron dan lapisan hidden layer sebanyak mungkin' },
      { key: 'B', text: 'Model mengalami Overfitting; solusinya menerapkan teknik Dropout, Data Augmentation, atau Early Stopping pada epoch ke-30' },
      { key: 'C', text: 'Model kekurangan daya listrik saat proses pelatihan sehingga memori cache terhapus tiba-tiba' },
      { key: 'D', text: 'Dataset validasi harus dihapus agar grafik menunjukkan akurasi sempurna 99.5%' },
      { key: 'E', text: 'Siswa harus mengganti bahasa pemrograman Python dengan HTML agar kurva validasi kembali turun' }
    ],
    correctAnswer: 'B',
    bloomLevel: 'C4 (Analisis)',
    competencyIndicator: 'Mendiagnosis kurva pelatihan model pembelajaran mesin dan menerapkan teknik regularisasi.',
    subChapterRef: 'Sub-bab 1.2: Sains Data & Fondasi Algoritma Machine Learning',
    technicalRationale: 'Pola di mana Training Loss terus turun mendekati nol sementara Validation Loss berbalik naik tajam adalah karakteristik definitif dari Overfitting (model menghafal detail dan noise data training). Solusi teknis standar industri untuk mengatasi overfitting adalah: (1) Early Stopping (menghentikan training saat validation loss mulai naik di sekitar epoch 30), (2) Dropout (mematikan sebagian neuron secara acak selama training), dan (3) Data Augmentation (memperbanyak variasi gambar dengan rotasi/flip).',
    distractorExplanation: {
      A: 'Salah karena menambah lapisan dan neuron justru akan meningkatkan kapasitas model dan memperparah overfitting.',
      C: 'Salah karena fenomena matematis ini tidak berkaitan dengan fluktuasi pasokan listrik GPU.',
      D: 'Salah fatal karena menghapus data validasi adalah tindakan kecurangan data yang menyembunyikan kegagalan model.',
      E: 'Salah karena HTML adalah bahasa markah tampilan web, bukan bahasa komputasi ilmiah AI.'
    }
  },
  {
    id: 10,
    number: 10,
    stimulus: 'Beredar sebuah video viral di platform media sosial yang memperlihatkan seorang tokoh menteri mengumumkan pembagian dana tunai bantuan sosial instan dengan syarat warga harus mengklik tautan web dan memasukkan nomor NIK serta foto selfie memegang KTP. Analisis forensik digital menemukan adanya sinkronisasi gerak bibir (lip-sync) yang tidak natural, bayangan leher yang bergetar (glitch artifact), dan pola spektrum audio yang monoton.',
    question: 'Berdasarkan analisis ancaman teknologi dan kerangka hukum digital, pernyataan manakah yang paling akurat merumuskan fenomena tersebut beserta tindakan warga yang berlandaskan literasi digital kritis?',
    options: [
      { key: 'A', text: 'Video tersebut asli karena dipublikasikan di akun dengan centang biru dan memiliki puluhan ribu komentar positif' },
      { key: 'B', text: 'Video tersebut merupakan produk manipulasi Generative AI (Deepfake) untuk aksi Phishing & pencurian identitas; warga wajib memverifikasi di portal resmi pemerintah dan tidak menyerahkan data sensitif' },
      { key: 'C', text: 'Video merupakan karya seni fiksi yang dilindungi undang-undang hak cipta sehingga warga bebas membagikannya' },
      { key: 'D', text: 'Warga sebaiknya langsung mentransfer biaya administrasi kecil demi membuktikan keaslian bantuan' },
      { key: 'E', text: 'Artefak glitch pada video terjadi karena resolusi layar ponsel penerima terlalu tinggi dibanding format video' }
    ],
    correctAnswer: 'B',
    bloomLevel: 'C5 (Evaluasi)',
    competencyIndicator: 'Mengevaluasi ancaman manipulasi media sintetis (Deepfake) dan mempraktikkan verifikasi literasi digital.',
    subChapterRef: 'Sub-bab 1.4: Dampak Sosial, Etika AI & Regulasi Digital',
    technicalRationale: 'Artefak visual (gerak bibir tidak sinkron, glitch pada batas wajah/leher) dan audio artifisial merupakan ciri kuat konten sintetis Deepfake yang dihasilkan oleh Generative Adversarial Networks (GAN). Tujuan utamanya dalam skenario ini adalah pencurian data pribadi identitas (NIK dan foto KTP) untuk pinjaman online ilegal atau pemalsuan rekening (Identity Theft). Sikap kritis literasi digital adalah melakukan cek fakta di kanal resmi pemerintah (.go.id) dan menolak membagikan data identitas pribadi.',
    distractorExplanation: {
      A: 'Salah karena akun media sosial bajakan atau bot farm sering dimanfaatkan peretas untuk membangun legitimasi palsu.',
      C: 'Salah karena penyalahgunaan citra tokoh publik untuk penipuan finansial adalah delik pidana penipuan dan pelanggaran UU ITE / UU PDP.',
      D: 'Salah fatal karena akan menjadi korban penipuan finansial langsung.',
      E: 'Salah karena artefak distorsi berasal dari sintesis model GAN pada frame video, bukan spesifikasi layar ponsel.'
    }
  }
];
