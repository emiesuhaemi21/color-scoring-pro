"use client";

import { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
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
  const [selectedCustomer, setSelectedCustomer] =
  useState<number | null>(null);
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

  const [showItemsCustomerId, setShowItemsCustomerId] =
    useState<number | null>(null);

  const [showAddItem, setShowAddItem] = useState(false);

  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const [editingItemId, setEditingItemId] =
    useState<number | null>(null);
  const [editItemCode, setEditItemCode] = useState("");
  const [editItemName, setEditItemName] = useState("");
  const [editItemDescription, setEditItemDescription] = useState("");

  const [openItemMenu, setOpenItemMenu] =
    useState<number | null>(null);

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

    localStorage.setItem(
      "customers",
      JSON.stringify(customers)
    );
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
    localStorage.setItem(
      "customer-items",
      JSON.stringify(items)
    );
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
    setCustomers(
      customers.filter((c) => c.id !== id)
    );
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
  if (
    selectedCustomer === null ||
    !itemCode ||
    !itemName
  )
    return;

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

  setItems(
    items.filter((item) => item.id !== id)
  );
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
      <div className="flex flex-wrap gap-3 mb-8">

  <button
    onClick={() => (window.location.href = "/")}
    className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    Home
  </button>

  <button
    onClick={() => (window.location.href = "/new-report")}
    className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    New Report
  </button>

  <button
    onClick={() => (window.location.href = "/color-library")}
    className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    Color Library
  </button>

  <button
    onClick={() => (window.location.href = "/customer")}
    className="bg-cyan-500 border border-cyan-400 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    Customer
  </button>

  <button
    onClick={() => (window.location.href = "/history")}
    className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    My Report
  </button>

  <button
    onClick={() => (window.location.href = "/settings")}
    className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    Settings
  </button>

</div>
      <h1 className="text-4xl font-bold mb-6">
        Customer Database
      </h1>

      <button onClick={() => setShowAdd(true)}className="bg-cyan-500 px-4 py-3 rounded-2xl font-bold mb-5 " > + New Customer</button>

      {showAdd && (
        <div
          className="
          bg-[#1F2937]
          border
          border-gray-700
          rounded-3xl
          p-5
          mb-5
          space-y-3
          "
        >
          <input
            placeholder="Customer Code"
            value={code}
            onChange={(e) =>
              setCode(e.target.value)
            }
            className="
            w-full
            p-3
            rounded-2xl
            bg-[#111827]
            border
            border-gray-700
            "
          />

          <input
            placeholder="Customer Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="
            w-full
            p-3
            rounded-2xl
            bg-[#111827]
            border
            border-gray-700
            "
          />

          <div className="flex gap-3">

            <button
              onClick={addCustomer}
              className="
              flex-1
              bg-cyan-500
              rounded-2xl
              py-3
              "
            >
              Save
            </button>

            <button
              onClick={() =>
                setShowAdd(false)
              }
              className="
              flex-1
              bg-gray-600
              rounded-2xl
              py-3
              "
            >
              Cancel
            </button>

          </div>
        </div>
      )}
<input
  type="text"
  placeholder="Search Customer..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="
    w-full
    p-3
    mb-4
    rounded-2xl
    bg-[#1F2937]
    border
    border-gray-700
    outline-none
  "
/>
      <div className="space-y-3">

        {customers
  .filter(
    (customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.code
        .toLowerCase()
        .includes(search.toLowerCase())
  )
  .map((customer) => (

          <div
  key={customer.id}
  onClick={() => setSelectedCustomer(customer.id)}
  className={`
    rounded-3xl
    p-5
    border
    cursor-pointer
    ${
      selectedCustomer === customer.id
        ? "border-cyan-500 bg-[#243244]"
        : "border-gray-700 bg-[#1F2937]"
    }
  `}
>

            <div className="flex justify-between">
              {editingId === customer.id && (

  <div
    className="
      mt-4
      space-y-3
      bg-[#111827]
      border
      border-gray-700
      rounded-2xl
      p-4
    "
  >

    <input
      value={editCode}
      onChange={(e) =>
        setEditCode(e.target.value)
      }
      placeholder="Customer Code"
      className="
        w-full
        p-3
        rounded-2xl
        bg-[#1F2937]
        border
        border-gray-700
      "
    />

    <input
      value={editName}
      onChange={(e) =>
        setEditName(e.target.value)
      }
      placeholder="Customer Name"
      className="
        w-full
        p-3
        rounded-2xl
        bg-[#1F2937]
        border
        border-gray-700
      "
    />

    <div className="flex gap-3">

      <button
        onClick={saveEditCustomer}
        className="
          flex-1
          bg-cyan-500
          py-3
          rounded-2xl
        "
      >
        Save
      </button>

      <button
        onClick={() =>
          setEditingId(null)
        }
        className="
          flex-1
          bg-gray-600
          py-3
          rounded-2xl
        "
      >
        Cancel
      </button>

    </div>

  </div>

)}

              <div>

                <div className="text-cyan-400">
                  {customer.code}
                </div>

                <div className="font-bold text-xl">
                  {customer.name}
                </div>

              </div>

              <div className="relative">

                <button
                  onClick={() =>
                    setOpenMenu(
                      openMenu === customer.id
                        ? null
                        : customer.id
                    )
                  }
                >
                  <MoreVertical />
                </button>
                {openMenu === customer.id && (

                  <div
                    className="
                    absolute
                    right-0
                    top-10
                    w-32
                    bg-[#111827]
                    border
                    border-gray-700
                    rounded-2xl
                    overflow-hidden
                    "
                  >
                      <button
                        onClick={() => {
                        setEditingId(customer.id);
                        setEditCode(customer.code);
                        setEditName(customer.name);
                        setOpenMenu(null);
                      }}
                      className="
                        w-full
                        p-3
                        text-left
                        hover:bg-gray-700
                      "
                    >
                      Edit
                    </button>
                    
                    <button
                      onClick={() =>
                        deleteCustomer(
                          customer.id
                        )
                      }
                      className="
                      w-full
                      p-3
                      text-left
                      text-red-400
                      "
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

      <div
        className="
          mt-8
          bg-[#1F2937]
          border
          border-gray-700
          rounded-3xl
          p-5
        "
      >
        <div className="flex justify-between items-center mb-4">

          <div>
            <h2 className="text-xl font-bold">
              Items
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Customer :
              {" "}
              {
                customers.find(
                  (c) => c.id === selectedCustomer
                )?.name || "-"
              }
            </p>
          </div>

          <button
  onClick={() => setShowAddItem(!showAddItem)}
  className="
    bg-cyan-500
    hover:bg-cyan-400
    px-4
    py-2
    rounded-2xl
    font-bold
  "
>
  + Add Item
</button>

</div>

{showAddItem && (
  <div
    className="
      mt-4
      mb-4
      space-y-3
      bg-[#111827]
      border
      border-gray-700
      rounded-2xl
      p-4
    "
  >
    <input
      value={itemCode}
      onChange={(e) => setItemCode(e.target.value)}
      placeholder="Item Code"
      className="
        w-full
        p-3
        rounded-2xl
        bg-[#1F2937]
        border
        border-gray-700
      "
    />

    <input
      value={itemName}
      onChange={(e) => setItemName(e.target.value)}
      placeholder="Item Name"
      className="
        w-full
        p-3
        rounded-2xl
        bg-[#1F2937]
        border
        border-gray-700
      "
    />

    <input
      value={itemDescription}
      onChange={(e) => setItemDescription(e.target.value)}
      placeholder="Description"
      className="
        w-full
        p-3
        rounded-2xl
        bg-[#1F2937]
        border
        border-gray-700
      "
    />

    <button
      onClick={addItem}
      className="
        w-full
        bg-cyan-500
        hover:bg-cyan-400
        py-3
        rounded-2xl
        font-bold
      "
    >
      Save Item
    </button>
  </div>
)}

<input
  placeholder="Search Item..."
  value={searchItem}
  onChange={(e) => setSearchItem(e.target.value)}
  className="
    w-full
    p-3
    rounded-2xl
    bg-[#111827]
    border
    border-gray-700
    mb-4
  "
/>

        {items
  .filter(
    (item) =>
      item.customerId === selectedCustomer &&
      (
        item.name
          .toLowerCase()
          .includes(searchItem.toLowerCase()) ||
        item.code
          .toLowerCase()
          .includes(searchItem.toLowerCase())
      )
  )
  .length === 0 ? (

  <div
    className="
      text-center
      text-gray-500
      py-10
    "
  >
    No items yet.
  </div>

) : (

  items
    .filter(
      (item) =>
        item.customerId === selectedCustomer &&
        (
          item.name
            .toLowerCase()
            .includes(searchItem.toLowerCase()) ||
          item.code
            .toLowerCase()
            .includes(searchItem.toLowerCase())
        )
    )
    .map((item) => (

  <div
    key={item.id}
    className="
      bg-[#111827]
      border
      border-gray-700
      rounded-2xl
      p-4
      mb-3
    "
  >
    

    <div className="flex justify-between items-start">

      <div>

        <div className="font-bold">
          {item.code}
        </div>

        <div className="text-gray-300">
          {item.name}
        </div>

      </div>

      <div className="relative">

        <button
          onClick={(e) => {
            e.stopPropagation();

            setOpenItemMenu(
              openItemMenu === item.id
                ? null
                : item.id
            );
          }}
          className="p-2 hover:bg-gray-700 rounded-xl"
        >
          <MoreVertical size={18} />
        </button>

        {openItemMenu === item.id && (

          <div
            className="
              absolute
              right-0
              top-10
              w-32
              bg-[#111827]
              border
              border-gray-700
              rounded-2xl
              overflow-hidden
              z-50
            "
          >

            <button
                onClick={() => {
                  setEditingItemId(item.id);
                  setEditItemCode(item.code);
                  setEditItemName(item.name);
                  setEditItemDescription(item.description ?? "");
                  setOpenItemMenu(null);
                }}
                className="
                  w-full
                  p-3
                  text-left
                  hover:bg-gray-700
                "
>
                Edit
          </button>

          <button
            className="
              w-full
              p-3
              text-left
              hover:bg-gray-700
            "
          >
            View
          </button>

          <button
            onClick={() => {
              deleteItem(item.id);
              setOpenItemMenu(null);
            }}
            className="
              w-full
              p-3
              text-left
              text-red-400
              hover:bg-gray-700
            "
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