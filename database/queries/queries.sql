USE QUAN_LI_KHACH_HANG_DO_AN_1
GO

--Danh sách các hoá đơn lập trong năm 2020
CREATE PROCEDURE sp_DSHD_2020
AS
BEGIN
    SELECT *
    FROM HoaDon
    WHERE YEAR(NgayLap) = 2020
END
GO

--Danh sách các khách hàng ở TPHCM
CREATE PROCEDURE sp_DSKH_TPHCM
AS
BEGIN
    SELECT *
    FROM KhachHang
    WHERE Tpho = 'TPHCM'
END
GO

--Danh sách các sản phẩm có số lượng tồn < 100
CREATE PROCEDURE sp_DSSP_SoLuongTon_ItHon_100
AS
BEGIN
    SELECT *
    FROM SanPham
    WHERE SoLuongTon < 100
END
GO

-- DROP PROCEDURE IF EXISTS sp_DSHD_2020
-- DROP PROCEDURE IF EXISTS sp_DSKH_TPHCM
-- DROP PROCEDURE IF EXISTS sp_DSSP_SoLuongTon_ItHon_100
-- GO

-- c. Cho danh sách các sản phẩm có giá trong một khoảng từ ... đến ...
CREATE PROC sp_DSSP_GiaTrongKhoang
(@min_price FLOAT, @max_price FLOAT)
AS
BEGIN
	SELECT * FROM SanPham AS sp WHERE sp.Gia >= @min_price AND sp.Gia <= @max_price
END
GO

-- DROP PROC sp_DSSP_GiaTrongKhoang
