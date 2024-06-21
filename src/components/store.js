import Swal from "sweetalert2";
import { create } from "zustand";
import { persist } from 'zustand/middleware';

const useStore = create(
    persist(
        (set) => ({
            cart: [],
            addToCart: (item) => {
                set((state) => {
                    const isItemInCart = !!state.cart.find(cartItem => cartItem.id === item.id);
                    if (isItemInCart) {
                        Swal.fire({
                            icon: "error",
                            title: "ມີສິນຄ້ານີ້ໃນກະຕ່າແລ້ວ!",
                            width: "350px",
                        })
                        return state;
                    }
                    else {
                        Swal.fire({
                            icon: 'success',
                            title: "ເພີ່ມສຳເລັດ!!",
                            width: "350px",
                        })
                        return {
                            cart: [...state.cart, item]
                        };
                    }
                });
            },
            removeItem: (itemId) => set((state) => ({
                cart: state.cart.filter((item) => item.id !== itemId)
            }))
        }),
        {
            name: 'cart-storage',
            getStorage: () => localStorage
        }
    )
);

export default useStore;
