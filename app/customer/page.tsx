"use client";

import { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import Link from "next/link"; // Diubah agar navigasi lebih cepat
import { CustomerItem } from "@/types/customer-item";

type Customer = {
  id: number;
  code: string;
  name: string;
};

export default function CustomerPage() {
  // =========================
  // Customer State
  // =========================

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  const [search, setSearch] = useState("");

  const [showAdd, setShowAdd] = useState(false);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editCode, setEditCode] = useState("");
  const [editName, setEditName] = useState("");

  const [openMenu, setOpenMenu] = useState<number | null>(null);

  // =========================
  // Item State
  // =========================

  const [items, setItems] = useState<CustomerItem[]>([]);

  const [showAddItem, setShowAddItem] = useState(false);

  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editItemCode, setEditItemCode] = useState("");
  const [editItemName, setEditItemName] = useState("");
  const [editItemDescription, setEditItemDescription] = useState("");

  const [openItemMenu, setOpenItemMenu] = useState<number | null>(null);

  const [searchItem, setSearchItem] = useState("");

  // =========================
  // Customer Storage
  // =========================

  useEffect(() => {
    const saved = localStorage.getItem("customers");
    if (saved) {
      setCustomers(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers, loaded]);

  // =========================
  // Item Storage
  // =========================

  useEffect(() => {
    const saved = localStorage.getItem("customer-items");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("customer-items", JSON.stringify(items));
  }, [items]);

  // =========================
  // Customer Functions
  // =========================

  const addCustomer = () => {
    if (!code || !name) return;

    setCustomers([
      ...customers,
      {
        id: Date.now(),
        code,
        name,
      },
    ]);

    setCode("");
    setName("");
    setShowAdd(false);
  };

  const deleteCustomer = (id: number) => {
    if (!confirm("Delete this customer? All items will remain in storage.")) return;
    setCustomers(customers.filter((c) => c.id !== id));
    if (selectedCustomer === id) setSelectedCustomer(null);
  };

  const saveEditCustomer = () => {
    if (editingId === null) return;

    setCustomers(
      customers.map((customer) =>
        customer.id === editingId
          ? {
              ...customer,
              code: editCode,
              name: editName,
            }
          : customer
      )
    );

    setEditingId(null);
    setEditCode("");
    setEditName("");
  };

  // =========================
  // Item Functions
  // =========================

  const addItem = () => {
    if (selectedCustomer === null || !itemCode || !itemName) return;

    setItems([
      ...items,
      {
        id: Date.now(),
        customerId: selectedCustomer,
        code: itemCode,
        name: itemName,
        description: itemDescription,
      },
    ]);

    setItemCode("");
    setItemName("");
    setItemDescription("");
    setShowAddItem(false);
  };

  const deleteItem = (id: number) => {
    if (!confirm("Delete this item?")) return;

    setItems(items.filter((item) => item.id !== id));
  };

  const saveEditItem = () => {
    if (editingItemId === null) return;

    setItems(
      items.map((item) =>
        item.id === editingItemId
          ? {
              ...item,
              code: editItemCode,
              name: editItemName,
              description: editItemDescription,
            }
          : item
      )
    );

    setEditingItemId(null);
    setEditItemCode("");
    setEditItemName("");
    setEditItemDescription("");
  };

  return (
    <main className="min-h-screen bg-[#111827] text-white p-5">
      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link href="/" className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium hover:bg-gray-700 transition">
          Home
        </Link>
        <Link href="/new-report" className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium hover:bg-gray-700 transition">
          New Report
        </Link>
        <Link href="/color-library" className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium hover:bg-gray-700 transition">
          Color Library
        </Link>
        <Link href="/customer" className="bg-cyan-500 border border-cyan-400 px-4 py-3 rounded-2xl text-sm font-medium transition">
          Customer
        </Link>
        <Link href="/history" className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium hover:bg-gray-700 transition">
          My Report
        </Link>
        <Link href="/settings" className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium hover:bg-gray-700 transition">
          Settings
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-6">Customer Database</h1>

      <button onClick={() => setShowAdd(true)} className="bg-cyan-500 hover:bg-cyan-400 px-4 py-3 rounded-2xl font-bold mb-5 transition">
        + New Customer
      </button>

      {/* Add Customer Form */}
      {showAdd && (
        <div className="bg-[#1F2937] border border-gray-700 rounded-3xl p-5 mb-5 space-y-3">
          <input
            placeholder="Customer Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-3 rounded-2xl bg-[#111827] border border-gray-700 outline-none"
          />
          <input
            placeholder="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-2xl bg-[#111827] border border-gray-700 outline-none"
          />
          <div className="flex gap-3">
            <button onClick={addCustomer} className="flex-1 bg-cyan-500 hover:bg-cyan-400 py-3 rounded-2xl transition">
              Save
            </button>
            <button onClick={() => setShowAdd(false)} className="flex-1 bg-gray-600 hover:bg-gray-500 py-3 rounded-2xl transition">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search Customer */}
      <input
        type="text"
        placeholder="Search Customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-4 rounded-2xl bg-[#1F2937] border border-gray-700 outline-none"
      />

      {/* Customer List */}
      <div className="space-y-3">
        {customers
          .filter(
            (customer) =>
              customer.name.toLowerCase().includes(search.toLowerCase()) ||
              customer.code.toLowerCase().includes(search.toLowerCase())
          )
          .map((customer) => (
            <div
              key={customer.id}
              onClick={() => setSelectedCustomer(customer.id)}
              className={`rounded-3xl p-5 border cursor-pointer transition ${
                selectedCustomer === customer.id ? "border-cyan-500 bg-[#243244]" : "border-gray-700 bg-[#1F2937]"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {/* Inline Edit Customer Form */}
                  {editingId === customer.id ? (
                    <div className="mt-2 space-y-3 bg-[#111827] border border-gray-700 rounded-2xl p-4 mr-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        value={editCode}
                        onChange={(e) => setEditCode(e.target.value)}
                        placeholder="Customer Code"
                        className="w-full p-3 rounded-2xl bg-[#1F2937] border border-gray-700 outline-none"
                      />
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Customer Name"
                        className="w-full p-3 rounded-2xl bg-[#1F2937] border border-gray-700 outline-none"
                      />
                      <div className="flex gap-3">
                        <button onClick={saveEditCustomer} className="flex-1 bg-cyan-500 hover:bg-cyan-400 py-3 rounded-2xl transition">
                          Save
                        </button>
                        <button onClick={() => setEditingId(null)} className="flex-1 bg-gray-600 hover:bg-gray-500 py-3 rounded-2xl transition">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-cyan-400 text-sm font-semibold">{customer.code}</div>
                      <div className="font-bold text-xl">{customer.name}</div>
                    </div>
                  )}
                </div>

                {/* Kebab Menu Customer */}
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setOpenMenu(openMenu === customer.id ? null : customer.id)} className="p-2 hover:bg-gray-700 rounded-xl transition">
                    <MoreVertical size={18} />
                  </button>
                  {openMenu === customer.id && (
                    <div className="absolute right-0 top-10 w-32 bg-[#111827] border border-gray-700 rounded-2xl overflow-hidden z-50 shadow-xl">
                      <button
                        onClick={() => {
                          setEditingId(customer.id);
                          setEditCode(customer.code);
                          setEditName(customer.name);
                          setOpenMenu(null);
                        }}
                        className="w-full p-3 text-left hover:bg-gray-700 transition text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteCustomer(customer.id);
                          setOpenMenu(null);
                        }}
                        className="w-full p-3 text-left text-red-400 hover:bg-gray-700 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* ITEMS SECTION */}
      <div className="mt-8 bg-[#1F2937] border border-gray-700 rounded-3xl p-5">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Items</h2>
            <p className="text-sm text-gray-400 mt-1">
              Customer: {customers.find((c) => c.id === selectedCustomer)?.name || "-"}
            </p>
          </div>
          <button
            disabled={selectedCustomer === null}
            onClick={() => setShowAddItem(!showAddItem)}
            className={`px-4 py-2 rounded-2xl font-bold transition ${
              selectedCustomer === null ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-400 text-white"
            }`}
          >
            + Add Item
          </button>
        </div>

        {/* Add Item Form */}
        {showAddItem && (
          <div className="mt-4 mb-4 space-y-3 bg-[#111827] border border-gray-700 rounded-2xl p-4">
            <input
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
              placeholder="Item Code"
              className="w-full p-3 rounded-2xl bg-[#1F2937] border border-gray-700 outline-none"
            />
            <input
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Item Name"
              className="w-full p-3 rounded-2xl bg-[#1F2937] border border-gray-700 outline-none"
            />
            <input
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-3 rounded-2xl bg-[#1F2937] border border-gray-700 outline-none"
            />
            <button onClick={addItem} className="w-full bg-cyan-500 hover:bg-cyan-400 py-3 rounded-2xl font-bold transition">
              Save Item
            </button>
          </div>
        )}

        {/* Search Item */}
        <input
          placeholder="Search Item..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="w-full p-3 rounded-2xl bg-[#111827] border border-gray-700 mb-4 outline-none"
        />

        {/* Items List */}
        {selectedCustomer === null ? (
          <div className="text-center text-gray-500 py-10">Select a customer first to view or add items.</div>
        ) : items.filter(
            (item) =>
              item.customerId === selectedCustomer &&
              (item.name.toLowerCase().includes(searchItem.toLowerCase()) ||
                item.code.toLowerCase().includes(searchItem.toLowerCase()))
          ).length === 0 ? (
          <div className="text-center text-gray-500 py-10">No items yet.</div>
        ) : (
          items
            .filter(
              (item) =>
                item.customerId === selectedCustomer &&
                (item.name.toLowerCase().includes(searchItem.toLowerCase()) ||
                  item.code.toLowerCase().includes(searchItem.toLowerCase()))
            )
            .map((item) => (
              <div key={item.id} className="bg-[#111827] border border-gray-700 rounded-2xl p-4 mb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {/* Inline Edit Item Form */}
                    {editingItemId === item.id ? (
                      <div className="space-y-3 bg-[#1F2937] border border-gray-700 rounded-2xl p-4 mr-4">
                        <input
                          value={editItemCode}
                          onChange={(e) => setEditItemCode(e.target.value)}
                          placeholder="Item Code"
                          className="w-full p-3 rounded-2xl bg-[#111827] border border-gray-700 outline-none"
                        />
                        <input
                          value={editItemName}
                          onChange={(e) => setEditItemName(e.target.value)}
                          placeholder="Item Name"
                          className="w-full p-3 rounded-2xl bg-[#111827] border border-gray-700 outline-none"
                        />
                        <input
                          value={editItemDescription}
                          onChange={(e) => setEditItemDescription(e.target.value)}
                          placeholder="Description"
                          className="w-full p-3 rounded-2xl bg-[#111827] border border-gray-700 outline-none"
                        />
                        <div className="flex gap-3">
                          <button onClick={saveEditItem} className="flex-1 bg-cyan-500 hover:bg-cyan-400 py-3 rounded-2xl transition text-sm font-bold">
                            Save
                          </button>
                          <button onClick={() => setEditingItemId(null)} className="flex-1 bg-gray-600 hover:bg-gray-500 py-3 rounded-2xl transition text-sm font-bold">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="font-bold text-cyan-400">{item.code}</div>
                        <div className="text-gray-200 text-lg">{item.name}</div>
                        {item.description && <div className="text-gray-400 text-sm mt-1">{item.description}</div>}
                      </div>
                    )}
                  </div>

                  {/* Kebab Menu Item */}
                  <div className="relative">
                    <button onClick={() => setOpenItemMenu(openItemMenu === item.id ? null : item.id)} className="p-2 hover:bg-gray-700 rounded-xl transition">
                      <MoreVertical size={18} />
                    </button>
                    {openItemMenu === item.id && (
                      <div className="absolute right-0 top-10 w-32 bg-[#111827] border border-gray-700 rounded-2xl overflow-hidden z-50 shadow-xl">
                        <button
                          onClick={() => {
                            setEditingItemId(item.id);
                            setEditItemCode(item.code);
                            setEditItemName(item.name);
                            setEditItemDescription(item.description ?? "");
                            setOpenItemMenu(null);
                          }}
                          className="w-full p-3 text-left hover:bg-gray-700 transition text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setOpenItemMenu(null)}
                          className="w-full p-3 text-left hover:bg-gray-700 transition text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            deleteItem(item.id);
                            setOpenItemMenu(null);
                          }}
                          className="w-full p-3 text-left text-red-400 hover:bg-gray-700 transition text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </main>
  );
}