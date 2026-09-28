/**
 * WhatsApp Link Rotator Logic
 * Mendistribusikan chat pelanggan ke beberapa nomor admin (Tim 1 - Tim 5)
 * Menggunakan sistem random non-repeating (setiap klik mengarahkan ke nomor yang berbeda)
 * serta mendukung mode round-robin berurutan.
 */

// Helper normalisasi nomor telepon ke format internasional 62...
export function normalizePhoneNumber(phone) {
  if (!phone) return '';
  // Hapus karakter selain angka
  let cleaned = phone.toString().replace(/\D/g, '');
  
  // Jika diawali 08..., ganti 0 dengan 62
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  } else if (cleaned.startsWith('8')) {
    cleaned = '62' + cleaned;
  }
  return cleaned;
}

// Daftar nomor WhatsApp Admin yang disediakan
export const WA_ADMIN_POOL = [
  {
    id: 1,
    team: 'Tim 1',
    label: 'Admin Tim 1',
    displayNumber: '0878-3272-4588',
    rawNumber: '087832724588',
    cleanNumber: normalizePhoneNumber('087832724588'),
    status: 'online'
  },
  {
    id: 2,
    team: 'Tim 2',
    label: 'Admin Tim 2',
    displayNumber: '0857-8466-1543',
    rawNumber: '857-8466-1543',
    cleanNumber: normalizePhoneNumber('857-8466-1543'),
    status: 'online'
  },
  {
    id: 3,
    team: 'Tim 3',
    label: 'Admin Tim 3',
    displayNumber: '0878-5393-1763',
    rawNumber: '878-5393-1763',
    cleanNumber: normalizePhoneNumber('878-5393-1763'),
    status: 'online'
  },
  {
    id: 4,
    team: 'Tim 4',
    label: 'Admin Tim 4',
    displayNumber: '0831-7632-6063',
    rawNumber: '831-7632-6063',
    cleanNumber: normalizePhoneNumber('831-7632-6063'),
    status: 'online'
  },
  {
    id: 5,
    team: 'Tim 5',
    label: 'Admin Tim 5',
    displayNumber: '0838-6107-0987',
    rawNumber: '083861070987',
    cleanNumber: normalizePhoneNumber('083861070987'),
    status: 'online'
  }
];

const STORAGE_LAST_ADMIN_KEY = 'jokitugas_last_wa_admin_id';
const STORAGE_ROTATION_INDEX_KEY = 'jokitugas_wa_rotation_index';

/**
 * Mendapatkan admin berikutnya dengan algoritma Rotator:
 * - 'random-no-repeat': Acak tetapi tidak akan memilih nomor yang sama dua kali berturut-turut.
 * - 'round-robin': Bergantian secara merata 1 -> 2 -> 3 -> 4 -> 1...
 * 
 * @param {'random-no-repeat' | 'round-robin'} strategy
 * @returns {object} Objek data admin terpilih
 */
export function getRotatedAdmin(strategy = 'random-no-repeat') {
  const pool = WA_ADMIN_POOL;
  if (!pool || pool.length === 0) return null;
  if (pool.length === 1) return pool[0];

  if (strategy === 'round-robin') {
    let lastIndex = -1;
    try {
      const stored = localStorage.getItem(STORAGE_ROTATION_INDEX_KEY);
      if (stored !== null) lastIndex = parseInt(stored, 10);
    } catch {
      // localStorage mungkin dinonaktifkan
    }

    const nextIndex = (isNaN(lastIndex) || lastIndex >= pool.length - 1) ? 0 : lastIndex + 1;
    try {
      localStorage.setItem(STORAGE_ROTATION_INDEX_KEY, nextIndex.toString());
      localStorage.setItem(STORAGE_LAST_ADMIN_KEY, pool[nextIndex].id.toString());
    } catch {
      // ignore
    }
    return pool[nextIndex];
  }

  // Default: 'random-no-repeat'
  let lastId = null;
  try {
    const storedId = localStorage.getItem(STORAGE_LAST_ADMIN_KEY);
    if (storedId) lastId = parseInt(storedId, 10);
  } catch {
    // ignore
  }

  // Saring admin agar tidak sama dengan admin yang baru saja dihubungi
  const availablePool = pool.filter((admin) => admin.id !== lastId);
  const candidatePool = availablePool.length > 0 ? availablePool : pool;

  // Pilih secara acak dari calon admin
  const randomIndex = Math.floor(Math.random() * candidatePool.length);
  const selectedAdmin = candidatePool[randomIndex];

  // Simpan ID yang baru dipilih ke localStorage
  try {
    localStorage.setItem(STORAGE_LAST_ADMIN_KEY, selectedAdmin.id.toString());
  } catch {
    // ignore
  }

  return selectedAdmin;
}

/**
 * Membuat link WhatsApp dengan nomor hasil rotasi dan pesan otomatis
 * 
 * @param {string} customMessage
 * @param {'random-no-repeat' | 'round-robin'} strategy
 * @returns {{ url: string, admin: object }}
 */
export function generateRotatedWaUrl(customMessage, strategy = 'random-no-repeat') {
  const admin = getRotatedAdmin(strategy);
  const defaultMsg = 'Halo Admin @jokitugasaja_id, saya ingin order / tanya info joki tugas. Mohon infonya ya!';
  const message = customMessage || defaultMsg;
  const url = `https://wa.me/${admin.cleanNumber}?text=${encodeURIComponent(message)}`;

  return { url, admin };
}

/**
 * Membuka WhatsApp langsung dengan rotator
 * 
 * @param {string} message
 * @param {'random-no-repeat' | 'round-robin'} strategy
 * @returns {object} Admin yang terpilih
 */
export function openRotatedWhatsApp(message, strategy = 'random-no-repeat') {
  const { url, admin } = generateRotatedWaUrl(message, strategy);
  window.open(url, '_blank', 'noopener,noreferrer');
  return admin;
}
