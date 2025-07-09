import { defineStore } from "pinia";
import { useModalAlert } from "@/composables/useModal";
const { modalAlert } = useModalAlert();

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      user: null,
      errors: {},
    };
  },
  getters: () => {},
  actions: {
    async getUser() {
      try {
        if (localStorage.getItem("token")) {
          const response = await fetch("/api/user", {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          const data = await response.json(response);
          if (response.ok) {
            this.user = data;
          }
        }
      } catch (error) {
        modalAlert("Error", "An unexpected error occurred", "error");
      }
    },
    async authenticate(apiRoute, formData) {
      this.errors = {};
      try {
        const response = await fetch(`/api/${apiRoute}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok || response.errors) {
          if (response.status === 429) {
            modalAlert(
              "Too many attempts.",
              "Please wait for a minute",
              "error"
            );
            return;
          }

          this.errors = data.errors || {};
          return;
        }

        this.errors = {};

        localStorage.setItem("token", data.token);
        this.user = data.user;
        this.router.push({ name: "home" });
        modalAlert("Success", `Welcome ${data.user.name}`, "success");
      } catch (error) {
        modalAlert("Error", "An unexpected error occurred", "error");
      }
    },

    async logout() {
      try {
        const res = await fetch("/api/logout", {
          method: "post",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          modalAlert("Sucess", "Logged sucessfully.", "success");
          this.user = null;
          this.errors = {};
          localStorage.removeItem("token");
          this.router.push({ name: "login" });
        }
      } catch (error) {
        modalAlert("Error", "An unexpected error occurred", "error");
      }
    },
  },
});
