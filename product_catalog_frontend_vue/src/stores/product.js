import { defineStore } from "pinia";
import { useModalAlert } from "@/composables/useModal";
import { useToastAlert } from "@/composables/useToast";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

import { User } from "lucide-vue-next";
const { modalAlert } = useModalAlert();
const { toastAlert } = useToastAlert();

export const useProductStore = defineStore("productStore", {
  state: () => {
    return {
      data: {},
      selectedItem: null,
      errors: {},
      pagination: null,
      loading: false,
    };
  },
  getters: () => {},
  actions: {
    async getProducts(apiRoute) {
      this.errors = {};
      try {
        const response = await fetch(`/api/${apiRoute}`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          this.data = {};
        }

        const data = await response.json();
        this.data = data.data;
      } catch (error) {
        modalAlert(
          "Error",
          "An unexpected  while getting product data",
          "error"
        );
      }
    },

    async paginateProducts(apiRoute, page = 1, perPage = 10) {
      this.loading = true;
      try {
        const response = await fetch(
          `/api/${apiRoute}?page=${page}&per_page=${perPage}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          this.data = {};
          modalAlert(
            "Error",
            "An unexpected  while getting product data",
            "error"
          );
        }

        const data = await response.json();
        this.data = data.data;
        console.log(this.data);
        this.pagination = {
          current_page: data.current_page,
          last_page: data.last_page,
          per_page: data.per_page,
          total: data.total,
          from: data.from,
          to: data.to,
        };
      } catch (error) {
        modalAlert(
          "Error",
          "An unexpected  while getting product data",
          "error"
        );
      } finally {
        this.loading = false;
      }
    },

    async filterProducts(params = {}) {
      this.loading = true;
      try {
        const queryParams = new URLSearchParams();

        if (params.search) queryParams.append("search", params.search);
        if (params.category_id)
          queryParams.append("category_id", params.category_id);

        const response = await fetch(
          `/api/products?${queryParams.toString()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          modalAlert(
            "Error",
            "An unexpected  while getting product data",
            "error"
          );
        }

        const data = await response.json();
        this.data = data.data;
        this.pagination = data.meta;
      } catch (error) {
        modalAlert(
          "Error",
          "An unexpected  while getting product data",
          "error"
        );
      } finally {
        this.loading = false;
      }
    },

    async getItem(apiRoute) {
      this.errors = {};
      try {
        const response = await fetch(`/api/${apiRoute}`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw {
            response: {
              status: response.status,
              data: errorData,
            },
          };
        }

        const data = await response.json();
        this.selectedItem = data;
      } catch (error) {
        console.log(error)
        this.router.push({
          name: "error",
          query: {
            status: error.response?.status || 500,
            message:
              error.response?.data?.message ||
              "An unexpected error occurred while fetching data",
          },
        });
      }
    },

    async updateProduct(apiRoute, formData) {
      this.errors = {};
      try {
        const response = await fetch(`/api/${apiRoute}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok || response.errors) {
          this.errors = data.errors || {};
          toastAlert("Failed to update product", "error");
         
          return;
        }

        this.errors = {};
        toastAlert(data.message, "success");
        this.router.push({ name: "home" });

        toastAlert(data.message, "success");
        this.router.push({ name: "home" });
      } catch (error) {
        modalAlert("Error", "An unexpected error occurred", "error");
      }
    },

    async addProduct(apiRoute, formData) {
      this.errors = {};
      try {
        const response = await fetch(`/api/${apiRoute}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok || response.errors) {
          this.errors = data.errors || {};
          toastAlert("Failed to add product", "error");
       
          return;
        }

        this.errors = {};
        toastAlert(data.message, "success");
        this.router.push({ name: "home" });
        return;
      } catch (error) {
        modalAlert("Error", "An unexpected error occurred", "error");
      }
    },

    async deleteProduct(apiRoute, itemName) {
      this.errors = {};
      Swal.fire({
        title: `Are you sure you want to delete ${itemName}?`,
        icon: "warning",
        showDenyButton: true,
        showCancelButton: true,
        showDenyButton: false,
        confirmButtonText: "Yes Delete",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(`/api/${apiRoute}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });

            const data = await response.json();
            if (!response.ok || response.errors) {
              this.errors = data.errors || {};
              toastAlert("Failed to delete product", "error");
             
              return;
            }

            this.errors = {};
            toastAlert(data.message, "success");
            this.router.push({ name: "home" });
          } catch (error) {
            modalAlert("Error", "An unexpected error occurred", "error");
          }
        }
      });
    },
  },
});
