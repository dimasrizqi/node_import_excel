const Book = require('../models').Book;
const XLSX = require('xlsx');

module.exports = {
    async import(req, res) {
        try {
            // Membaca file excel yang di-upload
            let wb = XLSX.read(req.files.path.data, { type: "buffer" });
            const sheets = wb.SheetNames;
            if (sheets.length > 0) {
                // Konversi sheet pertama ke dalam format JSON
                const data = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);
                const books = data.map(row => ({
                    title: row['Title'],
                    total_pages: row['Pages'],
                    isbn: row['ISBN'],
                    author: row['Author'],
                    publisher: row['Publisher'],
                    
                }));

                // Menggunakan bulkCreate untuk memasukkan data ke database
                await Book.bulkCreate(books);
            }

            // Mengirim respons berhasil
            return res.status(200).json({
                success: true,
                message: "Success import!",
            });
        } catch (error) {
            // Menangani error
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Failed to import data!",
                error: error.message
            });
        }
    }
};
