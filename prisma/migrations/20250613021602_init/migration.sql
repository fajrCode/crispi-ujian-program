-- CreateTable
CREATE TABLE `karyawans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `jabatan` VARCHAR(191) NOT NULL,
    `unit_kerja` VARCHAR(191) NOT NULL,
    `tanggal_bergabung` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kompetensi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kompetensi` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penilaians` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `karyawan_id` INTEGER NOT NULL,
    `kompetensi_id` INTEGER NOT NULL,
    `periode` VARCHAR(191) NOT NULL,
    `nilai` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `penilaians` ADD CONSTRAINT `penilaians_karyawan_id_fkey` FOREIGN KEY (`karyawan_id`) REFERENCES `karyawans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penilaians` ADD CONSTRAINT `penilaians_kompetensi_id_fkey` FOREIGN KEY (`kompetensi_id`) REFERENCES `Kompetensi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
