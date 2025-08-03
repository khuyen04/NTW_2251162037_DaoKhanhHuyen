$(document).ready(function () {
    //Hiển thị thông báo khi ấn nút thêm
    $('#btn_add').on('click', function () {
        $('#form_them').show();
    });

    //Ấn vào x thì popup biến mất
    $('#btn_dong, #btn_cancel').on('click', function () {
        $('#form_them').hide();
        $("#form_add")[0].reset();
        $("#form_add").validate().resetForm(); 
        $(".error").removeClass("error");
    });

    
});

//Xử lý sự kiện
$(document).ready(function () {
    $('#form_add').validate({
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        rules: {
            "name": {
                required: true,
                maxlength: 15
            },
            "fullName": {
                required: true,
                maxlength: 20
            },
            "address": {
                required: true,
                maxlength: 50
            }
        },
        messages: {
            "name": {
                required: "Vui lòng nhập tên!",
                maxlength: "Nhập tên không được vượt quá 15 ký tự"
            },
            "fullName": {
                required: "Vui lòng nhập họ đệm!",
                maxlength: "Nhập họ đệm không được vượt quá 20 ký tự!"
            },
            "address": {
                required: "Vui lòng nhập địa chỉ!",
                maxlength: "Địa chỉ nhập không được vượt quá 50 ký tự!"
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element); // Hiển thị lỗi dưới input
        },
        onkeyup: function(element) { $(element).valid(); },
        onfocusout: function(element) { $(element).valid(); }
    });
    $('#form_add').submit(function (event) {
        event.preventDefault();
        if (!$(this).valid()) return;

        const name = $('#name').val();
        const fullName = $('#fullName').val();
        const address = $('#address').val();

        const number = $('table.table-container tbody tr').length + 1;
        const icon = (number % 2 === 1)
            ? '<div class="check"><i class="fa-solid fa-check"></i></div>' : '<div class="xmark"><i class="fa-solid fa-xmark"></i></div>';
        const newData = `
            <tr>
                <td><i class="fa-regular fa-square-caret-down"></i></td>
                <td>
                    <button><i class="fa-solid fa-eye"></i></button>
                    <button><i class="fa-solid fa-pen-to-square"></i></button>
                    <button><i class="fa-solid fa-xmark"></i></button>
                </td>
                <td><div class="sort-header"><p>${number}</p></div></td>
                <td><div class="sort-header"><p>${name}</p></div></td>
                <td><div class="sort-header"><p>${fullName}</p></div></td>
                <td><div class="sort-header"><p>${address}</p></div></td>
                <td>${icon}</td>
                <td></td>
            </tr>   
        `;
        $('table.table-container tbody').append(newData);
        alert('Thêm nhân viên thành công!');

        $('#form_add')[0].reset();
        $('#form_them').hide();
    })
})