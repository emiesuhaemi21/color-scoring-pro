"use client";

import { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";

type Customer = {
  id: number;
  code: string;
  name: string;
};

export default function CustomerPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] =
  useState<number | null>(null);

const [editCode, setEditCode] =
  useState("");

const [editName, setEditName] =
  useState("");
  const [showAdd, setShowAdd] = useState(false);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const [openMenu, setOpenMenu] =
  useState<number | null>(null);

useEffect(() => {
  const saved =
    localStorage.getItem("customers");

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
      customers.filter(
        (c) => c.id !== id
      )
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

      <button
        onClick={() => setShowAdd(true)}
        className="
        bg-cyan-500
        px-4
        py-3
        rounded-2xl
        font-bold
        mb-5
        "
      >
        + New Customer
      </button>

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
            className="
            bg-[#1F2937]
            border
            border-gray-700
            rounded-3xl
            p-5
            "
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

                  </div>

                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}