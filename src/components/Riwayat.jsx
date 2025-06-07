import { useEffect, useState } from "react";
// Menggunakan react-icons/fa untuk Font Awesome
import { FaClock, FaCheckCircle, FaBookOpen, FaUser, FaCalendarAlt, FaHashtag } from "react-icons/fa";

function Riwayat() {
  const [riwayat, setRiwayat] = useState([]);

  useEffect(() => {
    fetchRiwayat();
  }, []);

  // Fungsi fetchRiwayat untuk mengambil data dari API Anda
  const fetchRiwayat = async () => {
    try {
      const res = await fetch(
        "https://be-appbuku-production-6cfd.up.railway.app/peminjaman/riwayat",
        {
          method: "GET",
          credentials: "include", // Pastikan server Anda dikonfigurasi untuk menangani credentials
          headers: {
            "Content-Type": "application/json",
            // Jika Anda memerlukan token otentikasi, tambahkan di sini
            // "Authorization": "Bearer YOUR_TOKEN_HERE",
          },
        }
      );

      const body = await res.json();
      if (res.ok) {
        setRiwayat(body.data || []); // Pastikan body.data ada, jika tidak, gunakan array kosong
      } else {
        console.error("Gagal mengambil data riwayat:", body.message || `Server merespons dengan status ${res.status}`);
        setRiwayat([]); // Atur ke array kosong jika ada error
      }
    } catch (error) {
      console.error("Gagal mengambil data riwayat (kesalahan jaringan atau lainnya):", error);
      setRiwayat([]); // Atur ke array kosong jika ada error
    }
  };

  // Fungsi bantuan untuk memformat tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      console.error("Error memformat tanggal:", e);
      return "Tanggal tidak valid";
    }
  };

  return (
    // Kontainer utama dengan latar belakang gradien dan padding
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-4xl mx-auto">
        {/* Bagian Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-emerald-700 tracking-tight">
            Riwayat Peminjaman Buku
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Jelajahi semua aktivitas peminjaman buku Anda di sini.
          </p>
        </header>

        {riwayat.length === 0 ? (
          // Ditampilkan ketika tidak ada riwayat peminjaman
          <div className="text-center bg-white p-10 rounded-xl shadow-lg border border-gray-200">
            {/* Ikon Buku FontAwesome */}
            <FaBookOpen className="mx-auto text-6xl text-emerald-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Belum Ada Riwayat
            </h2>
            <p className="text-gray-500">
              Saat ini belum ada riwayat peminjaman buku yang tercatat.
            </p>
          </div>
        ) : (
          // Ditampilkan ketika ada riwayat peminjaman
          <div className="space-y-6">
            {riwayat.map((item) => (
              // Kartu item riwayat individual
              <div
                key={item.id_peminjaman || item.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden border border-gray-200"
              >
                <div
                  className={`px-6 py-4 border-l-8 ${
                    item.status_peminjaman === "SELESAI" || item.status === "SELESAI"
                      ? "border-green-500"
                      : "border-yellow-500"
                  }`}
                >
                  {/* Bagian atas kartu: Judul dan Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h2 className="text-xl font-semibold text-emerald-700 mb-2 sm:mb-0 truncate" title={item.eksemplar?.buku?.judul || "Judul Tidak Tersedia"}>
                      {item.eksemplar?.buku?.judul || "Judul Tidak Tersedia"}
                    </h2>
                    <span
                      className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full ${
                        item.status_peminjaman === "SELESAI" || item.status === "SELESAI"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {/* Ikon dan teks status menggunakan FontAwesome */}
                      {item.status_peminjaman === "SELESAI" || item.status === "SELESAI" ? (
                        <FaCheckCircle className="mr-1.5 text-green-500" />
                      ) : (
                        <FaClock className="mr-1.5 text-yellow-500" />
                      )}
                      {(item.status_peminjaman || item.status || "Status Tidak Diketahui").charAt(0).toUpperCase() + (item.status_peminjaman || item.status || "Status Tidak Diketahui").slice(1).toLowerCase()}
                    </span>
                  </div>

                  {/* Tata letak grid untuk detail peminjaman */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-600">
                    <p className="flex items-center">
                      {/* Ikon Pengguna FontAwesome */}
                      <FaUser className="text-emerald-500 mr-2 flex-shrink-0" />
                      <span className="font-medium text-gray-800 mr-1">Peminjam:</span>
                      {item.user?.name || "N/A"}
                    </p>
                    <p className="flex items-center">
                      {/* Ikon Hashtag FontAwesome */}
                      <FaHashtag className="text-emerald-500 mr-2 flex-shrink-0" />
                      <span className="font-medium text-gray-800 mr-1">Kode Eksemplar:</span>
                      {item.eksemplar?.kode_eksemplar || item.eksemplar?.kodeEksemplar || "N/A"}
                    </p>
                    <p className="flex items-center">
                      {/* Ikon Kalender FontAwesome */}
                      <FaCalendarAlt className="text-emerald-500 mr-2 flex-shrink-0" />
                      <span className="font-medium text-gray-800 mr-1">Tgl Pinjam:</span>
                      {formatDate(item.tanggal_pinjam || item.createdAt)}
                    </p>
                    <p className="flex items-center">
                      {/* Ikon Kalender FontAwesome */}
                      <FaCalendarAlt className="text-emerald-500 mr-2 flex-shrink-0" />
                      <span className="font-medium text-gray-800 mr-1">Tgl Kembali Estimasi:</span>
                      {formatDate(item.tanggal_kembali_estimasi || item.tanggalKembali)}
                    </p>
                     { (item.status_peminjaman === "SELESAI" || item.status === "SELESAI") && item.tanggal_pengembalian_aktual &&
                        <p className="flex items-center md:col-span-2">
                          {/* Ikon Kalender FontAwesome untuk tanggal aktual */}
                          <FaCalendarAlt className="text-red-500 mr-2 flex-shrink-0" />
                          <span className="font-medium text-gray-800 mr-1">Tgl Dikembalikan Aktual:</span>
                          {formatDate(item.tanggal_pengembalian_aktual)}
                        </p>
                      }
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Riwayat;
