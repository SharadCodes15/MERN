import { useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowLeftLine, RiShoppingBag3Line } from "@remixicon/react";
import { useCustomerCart } from "./CustomerCartStore";

const ORDERS_STORAGE_KEY = "foodify:dummy-orders:v1";
const DELIVERY_FEE = 2.5;
const TAX_RATE = 0.08;
const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  paymentMethod: "cash-on-delivery",
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function saveOrder(order) {
  const storedOrders = window.localStorage.getItem(ORDERS_STORAGE_KEY);
  let orders = [];

  if (storedOrders) {
    const parsed = JSON.parse(storedOrders);
    if (parsed.version !== 1 || !Array.isArray(parsed.orders)) {
      throw new Error("Saved order data is invalid. Please clear the checkout data and try again.");
    }
    orders = parsed.orders;
  }

  window.localStorage.setItem(
    ORDERS_STORAGE_KEY,
    JSON.stringify({ version: 1, orders: [order, ...orders] })
  );
}

function createOrder(form, items, subtotal, tax, total) {
  const createdAt = new Date();
  return {
    id: `FD-${createdAt.getTime().toString(36).toUpperCase()}`,
    createdAt: createdAt.toISOString(),
    customer: {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    },
    deliveryAddress: {
      address: form.address.trim(),
      city: form.city.trim(),
      postalCode: form.postalCode.trim(),
    },
    paymentMethod: form.paymentMethod,
    items: items.map(({ _id, name, price, quantity, image }) => ({
      _id,
      name,
      price,
      quantity,
      image,
    })),
    subtotal,
    deliveryFee: DELIVERY_FEE,
    tax,
    total,
    status: "mock-order",
  };
}

function CheckoutField({ id, label, ...props }) {
  return (
    <label htmlFor={id} className="block text-xs font-bold text-[#463428]">
      {label}
      <input
        id={id}
        name={id}
        {...props}
        className="mt-2 w-full rounded-xl border border-[#e4d9ce] bg-white px-4 py-3 text-sm font-medium text-[#30251d] outline-none transition focus:border-[#e85d26] focus:ring-2 focus:ring-[#e85d26]/15"
      />
    </label>
  );
}

export default function Checkout() {
  const { items, clearCart } = useCustomerCart();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + (items.length ? DELIVERY_FEE : 0) + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty. Add an item before checking out.");
      return;
    }

    const order = createOrder(form, items, subtotal, tax, total);

    try {
      saveOrder(order);
      clearCart();
      setPlacedOrder(order);
      setForm(initialForm);
    } catch (storageError) {
      console.error("Failed to save dummy checkout order:", storageError);
      setError(storageError instanceof SyntaxError
        ? "Saved order data could not be read. Your cart is unchanged; please try again after clearing the invalid checkout data."
        : storageError.message || "Unable to save your order in local storage. Your cart is unchanged.");
    }
  };

  return (
    <main
      className="relative isolate min-h-screen overflow-hidden bg-[#f7f3ee] bg-cover bg-center bg-fixed px-4 py-8 text-[#30251d] sm:px-8 lg:px-12"
      style={{ backgroundImage: "url('/Images/foodall.jpg')" }}
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <Link to="/home" className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-[#78685c] shadow-sm transition hover:text-[#df571e]">
          <RiArrowLeftLine size={18} /> Continue shopping
        </Link>

        <header className="relative isolate mt-8 flex min-h-[230px] items-end overflow-hidden rounded-[28px] bg-[#30251d] px-6 py-7 shadow-[0_18px_45px_rgba(81,48,25,0.16)] sm:min-h-[280px] sm:px-10 sm:py-9">
          <img src="/Images/TraditionalTable.jpg" alt="" aria-hidden="true" className="absolute inset-0 z-0 h-full w-full object-cover object-center" />
          <div aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-r from-[#211914]/85 via-[#211914]/50 to-[#211914]/10" />
          <div className="relative z-20">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd29d]">CRAVE checkout</p>
            <h1 className="mt-2 font-serif text-4xl font-black tracking-tight text-white sm:text-5xl">Almost yours.</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/85">This is a demo checkout. Your order is saved only in this browser; no payment is processed.</p>
          </div>
        </header>

        {placedOrder ? (
          <section className="mt-9 max-w-2xl rounded-[26px] border border-[#e4d9ce] bg-white p-7 shadow-[0_12px_35px_rgba(81,48,25,0.06)] sm:p-10" aria-live="polite">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#fff0df] text-[#df571e]"><RiShoppingBag3Line size={26} /></div>
            <h2 className="mt-6 font-serif text-3xl font-black">Demo order placed!</h2>
            <p className="mt-2 text-sm leading-6 text-[#88796d]">Order <span className="font-extrabold text-[#30251d]">{placedOrder.id}</span> has been saved to this browser&apos;s local storage. This is not a real purchase.</p>
            <p className="mt-4 text-sm font-bold">Order total: {currency.format(placedOrder.total)}</p>
            <Link to="/home" className="mt-7 inline-flex rounded-xl bg-[#e85d26] px-5 py-3 text-sm font-black text-white transition hover:bg-[#c94a1d]">Back to food</Link>
          </section>
        ) : items.length === 0 ? (
          <section className="mt-9 max-w-2xl rounded-[26px] border border-[#e4d9ce] bg-white p-8 text-center">
            <RiShoppingBag3Line className="mx-auto text-[#c3b2a4]" size={34} />
            <h2 className="mt-4 font-serif text-2xl font-black">Your cart is empty</h2>
            <p className="mt-2 text-sm text-[#88796d]">Add something delicious before checking out.</p>
            <Link to="/home" className="mt-6 inline-flex rounded-xl bg-[#e85d26] px-5 py-3 text-sm font-black text-white transition hover:bg-[#c94a1d]">Browse food</Link>
          </section>
        ) : (
          <form onSubmit={handleSubmit} className="mt-9 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
            <section className="rounded-[26px] border border-[#e4d9ce] bg-white p-5 shadow-[0_12px_35px_rgba(81,48,25,0.04)] sm:p-8">
              <h2 className="font-serif text-2xl font-black">Delivery details</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <CheckoutField id="fullName" label="Full name" autoComplete="name" value={form.fullName} onChange={handleChange} required />
                <CheckoutField id="email" label="Email address" type="email" autoComplete="email" value={form.email} onChange={handleChange} required />
                <CheckoutField id="phone" label="Phone number" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} required />
                <CheckoutField id="postalCode" label="Postal code" autoComplete="postal-code" value={form.postalCode} onChange={handleChange} required />
                <div className="sm:col-span-2">
                  <CheckoutField id="address" label="Street address" autoComplete="street-address" value={form.address} onChange={handleChange} required />
                </div>
                <CheckoutField id="city" label="City" autoComplete="address-level2" value={form.city} onChange={handleChange} required />
              </div>

              <fieldset className="mt-8">
                <legend className="text-sm font-extrabold">Demo payment method</legend>
                <p className="mt-1 text-xs text-[#948273]">No card details or real payment are collected.</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    ["cash-on-delivery", "Cash on delivery"],
                    ["mock-card", "Mock card (demo only)"],
                  ].map(([value, label]) => (
                    <label key={value} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm font-bold transition ${form.paymentMethod === value ? "border-[#e85d26] bg-[#fff8f1]" : "border-[#e4d9ce] bg-white"}`}>
                      <input type="radio" name="paymentMethod" value={value} checked={form.paymentMethod === value} onChange={handleChange} className="accent-[#e85d26]" />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>
            </section>

            <aside className="rounded-[26px] border border-[#e4d9ce] bg-white p-5 shadow-[0_12px_35px_rgba(81,48,25,0.04)] sm:p-7 lg:sticky lg:top-6">
              <div className="flex items-baseline justify-between">
                <h2 className="font-serif text-2xl font-black">Your order</h2>
                <span className="text-xs font-bold text-[#948273]">{itemCount} {itemCount === 1 ? "item" : "items"}</span>
              </div>
              <div className="mt-6 max-h-72 space-y-4 overflow-y-auto">
                {items.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-[#f4eee8] text-sm font-black text-[#df571e]">
                      {item.image ? <img src={item.image} alt="" className="h-full w-full object-cover" /> : item.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-extrabold">{item.name}</p>
                      <p className="mt-1 text-xs text-[#948273]">Qty {item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold">{currency.format(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3 border-t border-[#eee6de] pt-5 text-sm">
                <div className="flex justify-between text-[#78685c]"><span>Subtotal</span><span>{currency.format(subtotal)}</span></div>
                <div className="flex justify-between text-[#78685c]"><span>Delivery</span><span>{currency.format(DELIVERY_FEE)}</span></div>
                <div className="flex justify-between text-[#78685c]"><span>Estimated tax (8%)</span><span>{currency.format(tax)}</span></div>
                <div className="flex justify-between border-t border-[#eee6de] pt-4 text-base font-black"><span>Total</span><span>{currency.format(total)}</span></div>
              </div>
              {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold leading-5 text-red-700">{error}</p>}
              <button type="submit" className="mt-6 w-full rounded-xl bg-[#e85d26] px-5 py-4 text-sm font-black text-white shadow-[0_10px_22px_rgba(232,93,38,0.2)] transition hover:-translate-y-0.5 hover:bg-[#c94a1d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e85d26]">
                Place demo order · {currency.format(total)}
              </button>
              <p className="mt-3 text-center text-[10px] leading-4 text-[#a39180]">Demo only — no real order or payment will be made.</p>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}
