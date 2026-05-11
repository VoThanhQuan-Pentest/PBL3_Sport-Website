package com.flarefitness.backend.dto.admin;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AdminUserRequest(
        @JsonAlias("hoTen")
        @Size(max = 150, message = "Ho ten khong duoc vuot qua 150 ky tu.")
        String hoTen,
        @Size(min = 4, max = 100, message = "Username phai tu 4 den 100 ky tu.")
        String username,
        @Email(message = "Email khong dung dinh dang.")
        @Size(max = 150, message = "Email khong duoc vuot qua 150 ky tu.")
        String email,
        @Pattern(
                regexp = "^(|0|\\+84)(3|5|7|8|9)\\d{8}$",
                message = "So dien thoai phai la so di dong Viet Nam hop le."
        )
        String sdt,
        String role,
        String status,
        @Size(max = 255, message = "Mat khau khong duoc vuot qua 255 ky tu.")
        String password
) {
}
