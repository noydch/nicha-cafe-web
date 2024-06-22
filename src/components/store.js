import Swal from "sweetalert2";
import { create } from "zustand";
import { persist } from 'zustand/middleware';

const useStore = create(
    persist(
        (set) => ({
            cart: [],
            orderHistory: [],
            addToCart: (item) => {
                set((state) => {
                    const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
                    if (existingItem) {
                        return {
                            cart: state.cart.map(cartItem =>
                                cartItem.id === item.id
                                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                    : cartItem
                            )
                        };
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: "ເພີ່ມສຳເລັດ!!",
                            width: "350px",
                        });
                        return {
                            cart: [...state.cart, { ...item, quantity: 1 }]
                        };
                    }
                });
            },
            removeItem: (itemId) => set((state) => ({
                cart: state.cart.filter((item) => item.id !== itemId)
            })),
            updateQty: (id, quantity) => set((state) => {
                const updatedCart = state.cart.map((item) =>
                    item.id === id ? { ...item, quantity: Math.max(item.quantity + quantity, 0) }
                        : item
                );

                return { cart: updatedCart };
            }),
            clearCart: () => {
                localStorage.removeItem('cart');
                set({ cart: [] })
            },
            addOrderHistory: (orderData) => {
                set((state) => ({
                    orderHistory: [...state.orderHistory, orderData],
                    cart: [],
                }));
            },
            checkout: () => {
                set((state) => {
                    const orderData = {
                        items: state.cart,
                        date: new Date().toISOString(),
                    };
                    return {
                        orderHistory: [...state.orderHistory, orderData],
                        cart: [],
                    };
                });
                localStorage.removeItem('cart');
            },
        }),
        {
            name: 'cart-storage',
            getStorage: () => localStorage
        }
    )
);

export default useStore;
