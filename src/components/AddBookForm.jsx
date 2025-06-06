import { motion } from "framer-motion";
import { useState } from "react";
import { FaBookOpen, FaSave } from "react-icons/fa";

function AddBookForm({ onSuccess }) {
  const [judul, setJudul] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [jumlahBuku, setJumlahBuku] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bukuBaru = {
      judul,
      pengarang,
      penerbit,
      tahunTerbit: parseInt(tahunTerbit),
      jumlahBuku : parseInt(jumlahBuku)
    };
    try {
      const res = await fetch("https://be-appbuku-production-6cfd.up.railway.app/buku", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bukuBaru),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Buku berhasil ditambahkan!");
        setJudul("");
        setPengarang("");
        setPenerbit("");
        setTahunTerbit();
        setJumlahBuku("");
        onSuccess?.();
      } else {
        alert("Gagal: " + (data.message || JSON.stringify(data)));
      }
    } catch (error) {
      console.error("POST error:", error);
      alert("Terjadi error saat mengirim data");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-8 w-full px-8 py-10 bg-gray-100 min-h-[80vh]"
    >
      {/* Ilustrasi Kiri */}
      <div className="hidden md:flex items-center justify-center w-1/2">
        <img src="/rbooks.svg" alt="Buku" className="w-80 drop-shadow-2xl" />
      </div>

      {/* Form Kanan */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-1/2 bg-white/30 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6 border border-white"
      >
        <h2 className="text-2xl font-bold text-emerald-700 flex items-center gap-2">
          <FaBookOpen className="text-xl" />
          Tambah Buku
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Judul"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="text"
            placeholder="Pengarang"
            value={pengarang}
            onChange={(e) => setPengarang(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="text"
            placeholder="Penerbit"
            value={penerbit}
            onChange={(e) => setPenerbit(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="number"
            placeholder="Tahun Terbit"
            value={tahunTerbit}
            min={1000}
            max={new Date().getFullYear()}
            onChange={(e) => setTahunTerbit(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <input
          typeof="number"
          placeholder="Jumlah Buku"
          value={jumlahBuku}
          min={0}
          onChange={(e) => setJumlahBuku(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700"
        />

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2"
        >
          <FaSave />
          Simpan Buku
        </button>
      </form>
    </motion.div>
  );
}

export default AddBookForm;
