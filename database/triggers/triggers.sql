USE QUAN_LI_KHACH_HANG_DO_AN_1
GO

--TRIGGER: Thành tiền CTHD = (Số lượng * (Giá bán-Giá giảm)
CREATE TRIGGER tg_ThanhTienCTHD ON CT_HoaDon
FOR INSERT, UPDATE
AS
BEGIN
	SELECT
		MaHD,
		MaSP,
		(SoLuong * (GiaBan - GiaGiam)) AS ThanhTien
	INTO inserted_TinhThanhTien
	FROM inserted

	UPDATE CT_HoaDon
	SET ThanhTien = CT_HoaDon.SoLuong * (CT_HoaDon.GiaBan - CT_HoaDon.GiaGiam)
	FROM inserted_TinhThanhTien
	WHERE CT_HoaDon.MaHD = inserted_TinhThanhTien.MaHD AND CT_HoaDon.MaSP = inserted_TinhThanhTien.MaSP

	DROP TABLE inserted_TinhThanhTien
END
GO
