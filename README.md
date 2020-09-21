<<<<<<< HEAD
# backend-pos-app
Proyek ini adalah REST API yang digunakan untuk pos app

1. Otentikasi & otorisasi

   Otentikasi adalah proses verifikasi identitas benda hidup atau mati dengan data identititas yang sudah ada, biasa digunakan untuk login.
   Otorisasi adalah sebuah fungsi yang di jalankan setelah otentikasi berhasil yang menentukan hak akses benda hidup atau mati. 
2. Json Web Token(JWT)

   JWT adalah sebuah token unik acak berupa string terdiri dari 3 bagian yaitu header.payload.verify-signature, token tersebut digunakan untuk 
   proses otorisasi sebuah aplikasi web yang didapatkan setelah otentikasi berhasil
3. Redis(Remote Dictionary Server)

   Redis adalah database NoSql/penyimpanan data di dalam memory dengan cepat, biasanya digunakan untuk mempercapat proses pertukaran data
4. Multer

   Multer adalah middleware node.js yang digunakan untuk upload file di multipart/form-data

=======
# backend-pos-app
Proyek ini adalah REST API yang dibuat menggunakan exprees.js yang digunakan untuk pos app

didalam proyek ini terdapat:

1. 4 route: users, product, history, category 
2. Terdapat fiture CRUD
3. Terdapat fitur search, sort, pagination
4. Sudah menggunakan JWT dan Redis
>>>>>>> 861ed48f8001cf41bd47e95c883981b9e00c5264
