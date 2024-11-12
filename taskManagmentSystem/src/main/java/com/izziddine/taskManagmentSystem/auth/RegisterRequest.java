package com.izziddine.taskManagmentSystem.auth;

import com.izziddine.taskManagmentSystem.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RegisterRequest {


        @NotBlank(message = "Password Cannot Be Empty")
        @Size(min = 6 , message = "Password must be at least 6 characters long")
        private String password;

        @NotNull(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotNull(message = "name is required")
        private String name;

        private Boolean active;

        private Role role;

    public String getName() {
        return name;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setName(@NotNull(message = "name is required") String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "RegisterRequest{" +
                "password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", active=" + active +
                ", role=" + role +
                '}';
    }
}
