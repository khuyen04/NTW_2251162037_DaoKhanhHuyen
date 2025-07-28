let dongSua = null;

// Hiển thị thông báo khi ấn nút Thêm
document.getElementById("btn_them").addEventListener("click", function (event) {
    alert("Nút THÊM đã được ấn!");
});
//Hiển thị popup Thêm sinh viên khi nhấn nút thêm
document.getElementById("btn_them").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("form_them").style.display = "block";
});
// Đóng popup khi nhấn nút đóng
document.getElementById("btn_dong").addEventListener("click", function () {
    document.getElementById("form_them").style.display = "none";
});

// Ngăn reload trang
document.getElementById("form_sinhvien").addEventListener("submit", function (event) {
    event.preventDefault();

    // Lấy dữ liệu từ form
    const maSV = document.getElementById("maSV").value;
    const hoTen = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const ngaySinh = document.getElementById("date").value;
    let gioiTinh = "";

    if (document.getElementById("nam").checked) {
        gioiTinh = "Nam";
    } else if (document.getElementById("nu").checked) {
        gioiTinh = "Nữ";
    }
    //Không nhập thông tin vào các ô input
    if (!maSV || !hoTen || !email || !date) {
        alert("Vui lòng điền đầy đủ thông tin!");
        event.preventDefault();
        return;
    }
    //Ô mã SV nhập khác chữ số
    if (!/^\d{10}$/.test(maSV)) {
        alert("Mã SV phải là 10 chữ số!");
        event.preventDefault();
        return;
    }
    //Check định dạng của email
    if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
        alert("Email không hợp lệ!");
        event.preventDefault();
        return;
    }

    const action = document.getElementById("btn_luu").getAttribute("data-action");

    if (action === "save") {
        // Thêm dòng mới
        const tbody = document.querySelector("table tbody");
        const newRow = tbody.insertRow();
        const stt = tbody.rows.length;

        newRow.innerHTML = `
                <td>${stt}</td>
                <td>${maSV}</td>
                <td>${hoTen}</td>
                <td>${email}</td>
                <td>${gioiTinh}</td>
                <td>${ngaySinh}</td>
                <td><a href="#">Sửa</a> | <a href="#">Xóa</a></td>`;
        alert("Thêm sinh viên thành công!");

        document.getElementById("thongBao").innerText = "Thêm sinh viên thành công!";
        document.getElementById("thongBao").style.display = "block";
    } else if (action === "update" && dongSua) {
        // Cập nhật dòng đang sửa
        const cells = dongSua.getElementsByTagName("td");
        cells[1].innerText = maSV;
        cells[2].innerText = hoTen;
        cells[3].innerText = email;
        cells[4].innerText = gioiTinh;
        cells[5].innerText = ngaySinh;

        alert("Cập nhật sinh viên thành công!");
        dongSua = null;
        document.getElementById("btn_luu").innerText = "Lưu";
        document.getElementById("btn_luu").setAttribute("data-action", "save");
    }
    setTimeout(() => {
        thongBao.innerText = "";
        thongBao.style.display = "none";
    }, 3000);

    // Reset form
    this.reset();

    // Đóng popup
    document.getElementById("form_them").style.display = "none";
});

//Hiển thị thông báo xác nhận khi click vào Xóa
document.addEventListener("click", function (event) {
    if (event.target.textContent.trim() === "Xóa") {
        event.preventDefault();
        const xacNhan = confirm("Bạn có chắc chắn muốn xóa sinh viên này?");
        if (xacNhan) {
            const row = event.target.closest("tr");
            row.remove();
        }
    }
});

// Xử lý khi nhấn nút Sửa
document.addEventListener("click", function (event) {
    if (event.target.textContent.trim() === "Sửa") {
        event.preventDefault();
        dongSua = event.target.closest("tr");

        const cells = dongSua.getElementsByTagName("td");
        document.getElementById("maSV").value = cells[1].innerText;
        document.getElementById("fullName").value = cells[2].innerText;
        document.getElementById("email").value = cells[3].innerText;
        document.getElementById("date").value = cells[5].innerText.split("/").reverse().join("-");

        const gioiTinh = cells[4].innerText;
        if (gioiTinh === "Nam") {
            document.getElementById("nam").checked = true;
        } else {
            document.getElementById("nu").checked = true;
        }

        document.getElementById("form_them").style.display = "block";
        document.getElementById("btn_luu").innerText = "Cập nhật";
        document.getElementById("btn_luu").setAttribute("data-action", "update");
    }
});
