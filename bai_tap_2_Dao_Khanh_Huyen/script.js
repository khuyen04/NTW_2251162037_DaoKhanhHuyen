document.getElementById("btn_add").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("form_them").style.display = "block";
});

document.getElementById("btn_dong").addEventListener("click", function () {
  document.getElementById("form_them").style.display = "none";
});

document.getElementById("btn_cancel").addEventListener("click", function () {
  document.getElementById("form_them").style.display = "none";
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form_sinhvien");
    const customerInput = document.getElementById("customer");
    const staffInput = document.getElementById("staff");
    const moneyInput = document.getElementById("money");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Ngăn gửi form nếu chưa hợp lệ

        let isValid = true;
        let messages = [];

        const customer = customerInput.value.trim();
        const staff = staffInput.value.trim();
        const money = moneyInput.value.trim();

        if (customer === "") {
            isValid = false;
            messages.push("Vui lòng nhập tên khách hàng.");
        } else if (customer.length > 30) {
            isValid = false;
            messages.push("Tên khách hàng không được vượt quá 30 ký tự.");
        }

        if (staff === "") {
            isValid = false;
            messages.push("Vui lòng nhập tên nhân viên.");
        } else if (staff.length > 30) {
            isValid = false;
            messages.push("Tên nhân viên không được vượt quá 30 ký tự.");
        }

        if (money === "") {
            isValid = false;
            messages.push("Vui lòng nhập số tiền.");
        } else if (isNaN(money)) {
            isValid = false;
            messages.push("Số tiền phải là một số.");
        }

        if (!isValid) {
            alert(messages.join("\n"));
            return;
        }

        alert("Dữ liệu hợp lệ. Thêm thành công!");

        // Reset form
        form.reset();
        document.getElementById("form_them").style.display = "none";
    });

});
