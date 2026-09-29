import { useCustomerCart } from "./CustomerCartStore";
import {
  RiAddLine,
  RiArrowRightLine,
  RiCloseLine,
  RiDeleteBinLine,
  RiNotification3Line,
  RiShoppingBag3Line,
  RiSubtractLine,
} from "@remixicon/react";

function CartContents({ items, onChangeQuantity, onClear, onClose }) {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const formattedTotal = `$${subtotal.toFixed(2).replace(".", ",")}`;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-[30px] leading-none text-[#2e241d]">My Cart</h2>
          <p className="mt-2 max-w-[205px] text-[10px] font-medium leading-4 text-[#948273]">Manage your purchases and keep track of what you spend.</p>
        </div>
        <div className="flex items-center gap-2">
          <div aria-label={`${itemCount} cart items`} className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#776658] shadow-sm">
            <RiNotification3Line size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ef704f]" />
          </div>
          <button type="button" onClick={onClose} aria-label="Close cart" className="grid h-9 w-9 place-items-center rounded-full text-[#75675e] hover:bg-white"><RiCloseLine size={21} /></button>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="mt-7 grid flex-1 place-items-center rounded-[20px] border border-[#e4d9ce] bg-white px-5 py-10 text-center">
          <div><RiShoppingBag3Line className="mx-auto text-[#c3b2a4]" size={30} /><p className="mt-4 text-[13px] font-extrabold text-[#463428]">Your cart is empty</p><p className="mt-1 text-[10px] font-medium text-[#a39180]">Add something delicious.</p></div>
        </div>
      ) : (
        <div className="mt-7 flex-1 space-y-3 overflow-y-auto">
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-3 rounded-[19px] border border-[#e4d9ce] bg-white p-3">
              <div className="h-[56px] w-[56px] shrink-0 overflow-hidden rounded-[15px] bg-[#eee5dc]">
                {item.image ? <img src={item.image} alt="" className="h-full w-full object-cover" /> : item.video ? <video src={item.video} muted autoPlay loop playsInline className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-sm font-black text-[#df571e]">{item.name?.charAt(0)?.toUpperCase() || "F"}</div>}
              </div>
              <div className="min-w-0 flex-1"><p className="truncate text-[11px] font-extrabold text-[#463428]">{item.name}</p><p className="mt-1 text-[14px] font-extrabold text-[#292018]">${item.price.toFixed(2).replace(".", ",")}</p></div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => onChangeQuantity(item._id, -1)} aria-label={`Remove one ${item.name}`} className="grid h-9 w-9 place-items-center rounded-xl bg-[#f4eee8] text-[#685749] hover:bg-[#e9ded3]"><RiSubtractLine size={13} /></button>
                <span className="grid h-9 min-w-9 place-items-center rounded-xl bg-[#302432] px-2 text-[10px] font-extrabold text-white">{item.quantity}</span>
                <button type="button" onClick={() => onChangeQuantity(item._id, 1)} aria-label={`Add one ${item.name}`} className="grid h-9 w-9 place-items-center rounded-xl bg-[#f4eee8] text-[#685749] hover:bg-[#e9ded3]"><RiAddLine size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {items.length > 0 && <>
        <div className="mt-7 flex items-center justify-between">
          <button type="button" onClick={onClear} aria-label="Clear cart" className="grid h-14 w-14 place-items-center rounded-2xl bg-[#302432] text-white transition hover:scale-105"><RiDeleteBinLine size={19} /></button>
          <div className="text-right"><p className="text-[10px] font-semibold text-[#918174]">Total</p><p className="text-[25px] font-extrabold text-[#241b15]">{formattedTotal}</p></div>
        </div>
        <button type="button" className="relative mt-4 flex h-[62px] w-full items-center justify-center overflow-hidden rounded-[18px] bg-[#d98226] text-white shadow-[0_12px_25px_rgba(217,130,38,0.22)] transition hover:-translate-y-1">
          <img src="/Images/TraditionalTable.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <span className="relative z-10 text-[13px] font-extrabold">Check Out</span>
          <RiArrowRightLine className="relative z-10 ml-2" size={17} />
        </button>
      </>}
    </div>
  );
}

export function CustomerCart() {
  const { items, isExpanded, setIsExpanded, updateQuantity, clearCart } = useCustomerCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const toggleCart = () => {
    if (itemCount > 0) setIsExpanded((expanded) => !expanded);
  };
  const closeCart = () => setIsExpanded(false);

  return (
    <>
      <button type="button" onClick={toggleCart} disabled={itemCount === 0} aria-label={itemCount ? `Toggle cart, ${itemCount} items` : "Cart is empty"} className={`fixed bottom-5 right-5 z-[70] grid h-14 w-14 place-items-center rounded-full bg-[#302432] text-white shadow-[0_10px_30px_rgba(47,33,26,0.3)] transition-all duration-300 xl:bottom-6 xl:right-6 ${isExpanded ? "pointer-events-none translate-y-3 opacity-0" : "opacity-100"}`}>
        <RiShoppingBag3Line size={22} />
        {itemCount > 0 && <span className="absolute -right-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full bg-[#e85d26] px-1 text-[10px] font-black">{itemCount}</span>}
      </button>

      <div aria-hidden={!isExpanded} className={`fixed inset-0 z-[60] transition-opacity duration-300 xl:hidden ${isExpanded ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <button type="button" tabIndex={isExpanded ? 0 : -1} onClick={closeCart} aria-label="Close cart" className="absolute inset-0 bg-black/35" />
        <aside inert={!isExpanded} className={`absolute inset-x-0 bottom-0 flex h-[min(72dvh,620px)] flex-col bg-[#f7f3ee] px-5 py-7 shadow-2xl transition-transform duration-300 ${isExpanded ? "translate-y-0" : "translate-y-full"}`}>
          <CartContents items={items} onChangeQuantity={updateQuantity} onClear={clearCart} onClose={closeCart} />
        </aside>
      </div>

      <aside aria-hidden={!isExpanded} inert={!isExpanded} className={`fixed inset-y-0 right-0 z-[60] hidden w-[clamp(280px,28vw,380px)] flex-col border-l border-[#e3d9ce] bg-[#f7f3ee] px-5 py-8 transition-transform duration-300 xl:flex xl:px-7 ${isExpanded ? "translate-x-0" : "pointer-events-none translate-x-full"}`}>
        <CartContents items={items} onChangeQuantity={updateQuantity} onClear={clearCart} onClose={closeCart} />
      </aside>
    </>
  );
}