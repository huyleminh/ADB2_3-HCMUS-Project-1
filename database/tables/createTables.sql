IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'QUAN_LI_KHACH_HANG_DO_AN_1')
BEGIN
	CREATE DATABASE QUAN_LI_KHACH_HANG_DO_AN_1
END;
GO

USE QUAN_LI_KHACH_HANG_DO_AN_1
GO

-------------------------------------------------------------
-- CREATE TABLES
-------------------------------------------------------------

CREATE TABLE KhachHang (
	MaKH VARCHAR(36) NOT NULL,
	Ho NVARCHAR(50) NOT NULL,
	Ten NVARCHAR(25) NOT NULL,
	NgSinh DATE,
	SoNha VARCHAR(20),
	Duong NVARCHAR(50),
	Phuong NVARCHAR(20),
	Quan NVARCHAR(20),
	Tpho NVARCHAR(20),
	DienThoai VARCHAR(11) NOT NULL,

	CONSTRAINT PK_KHACH_HANG PRIMARY KEY (MaKH),
)
GO

CREATE TABLE HoaDon (
	MaHD VARCHAR(36) NOT NULL,
	MaKH VARCHAR(36) NOT NULL,
	NgayLap DATE NOT NULL,
	TongTien FLOAT DEFAULT 0,

	CONSTRAINT PK_HOA_DON PRIMARY KEY (MaHD)
)
GO

CREATE TABLE CT_HoaDon (
	MaHD VARCHAR(36) NOT NULL,
	MaSP VARCHAR(36) NOT NULL,
	SoLuong INT NOT NULL,
	GiaBan FLOAT NOT NULL,
	GiaGiam FLOAT NOT NULL,
	ThanhTien FLOAT,

	CONSTRAINT PK_CT_HOA_DON PRIMARY KEY (MaHD, MaSP),
)
GO

CREATE TABLE SanPham (
	MaSP VARCHAR(36) NOT NULL,
	TenSP NVARCHAR(50) NOT NULL,
	SoLuongTon INT NOT NULL DEFAULT 0,
	Mota TEXT,
	Gia FLOAT NOT NULL,

	CONSTRAINT PK_SAN_PHAM PRIMARY KEY (MaSP)
)
GO

-------------------------------------------------------------
-- FOREIGN KEYS
-------------------------------------------------------------

ALTER TABLE HoaDon
ADD CONSTRAINT FK_HOA_DON_KHACH_HANG
FOREIGN KEY (MaKH)
REFERENCES KhachHang(MaKH)
GO

ALTER TABLE CT_HoaDon
ADD CONSTRAINT FK_CT_HOA_DON_HOA_DON
FOREIGN KEY (MaHD)
REFERENCES HoaDon(MaHD)
GO

ALTER TABLE CT_HoaDon
ADD CONSTRAINT FK_CT_HOA_DON_SAN_PHAM
FOREIGN KEY (MaSP)
REFERENCES SanPham(MaSP)
GO

-------------------------------------------------------------
-- UNIQUE PROPERTIES
-------------------------------------------------------------

ALTER TABLE KhachHang
ADD CONSTRAINT UC_KhachHang UNIQUE (DienThoai);

-- ALTER TABLE HoaDon
-- ALTER COLUMN NgayLap DATE

-- DROP TABLE KhachHang
-- DROP TABLE HoaDon
-- DROP TABLE CT_HoaDon