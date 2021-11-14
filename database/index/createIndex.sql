USE QUAN_LI_KHACH_HANG_DO_AN_1
GO

CREATE NONCLUSTERED INDEX KH_Index ON [dbo].[KhachHang] ([Tpho]) INCLUDE ([Ho], [Ten], [NgSinh], [SoNha], [Duong], [Phuong], [Quan], [DienThoai])
GO

CREATE NONCLUSTERED INDEX DoanhThuSP_Index ON [dbo].[CT_HoaDon] ([MaSP]) INCLUDE ([SoLuong], [GiaBan], [GiaGiam])
GO