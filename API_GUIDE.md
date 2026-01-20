# 📘 Ultimate API Hook Guide (`useApi`)

This guide explains how to use the single, universal `useApi` hook for all your data needs.

## 🌟 One Hook to Rule Them All
You no longer need to worry about "Public" vs "Private".
- **If you are logged in**, it sends your token automatically.
- **If you are logged out**, it works normally for public pages (like Login/Register).
- **If your session expires**, it automatically kicks you to the Login page.

---

## 1. Fetching Data (GET)
Used for loading pages like **Profile**, **Dashboard**, **Orders**.

```tsx
import { useApi } from "@/hooks/use-api-data";

export default function UserProfile() {
  // 1. URL to fetch
  // 2. Unique Key (for caching)
  const { data, isLoading, isError } = useApi("/user/profile", ["user-profile"]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load</div>;

  return (
    <div>
      <h1>Hello, {data.name}</h1>
      <p>Email: {data.email}</p>
    </div>
  );
}
```

---

## 2. Submitting Forms (POST)
Used for **Login**, **Register**, **Forgot Password**.
*You don't need a resource path or key for this.*

```tsx
import { useState } from "react";
import { useApi } from "@/hooks/use-api-data";

export default function LoginForm() {
  const { post, isCreating } = useApi(); // No arguments needed!
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    post("/auth/login", { email, password: "..." }, {
      onSuccess: (response) => {
        console.log("Logged in!", response);
        // Redirect or save token here
      },
      onError: (err) => {
        alert("Wrong password!");
      }
    });
  };

  return (
    <button onClick={handleLogin} disabled={isCreating}>
      {isCreating ? "Logging in..." : "Login"}
    </button>
  );
}
```

---

## 3. Full CRUD (Create, Read, Update, Delete)
Best for managing lists like **Products**, **Orders**, **Tasks**.
*This assumes your API follows standard REST patterns.*

```tsx
import { useApi } from "@/hooks/use-api-data";

export default function OrdersPage() {
  // Setup the hook for the "/orders" endpoint
  const { 
    data: orders, 
    isLoading, 
    create, // POST /orders
    update, // PUT /orders/{id}
    remove  // DELETE /orders/{id}
  } = useApi("/orders", ["orders"]);

  return (
    <div>
      {/* 1. Create New Order */}
      <button onClick={() => create({ name: "New Order" })}>
        + Add Order
      </button>

      {/* 2. List Orders */}
      {isLoading ? "Loading..." : orders.map(order => (
        <div key={order.id} className="row">
          <span>{order.name}</span>
          
          {/* 3. Update Order */}
          <button onClick={() => update(order.id, { status: "Done" })}>
            Mark Done
          </button>
          
          {/* 4. Delete Order */}
          <button onClick={() => remove(order.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## 4. Custom Actions (Any Method, Any URL)
Used when you need to call a specific API that doesn't fit standard CRUD.

```tsx
const { post, put, del } = useApi();

// Change Password
post("/auth/change-password", { old: "...", new: "..." });

// Update Avatar
put("/user/avatar", { image: "..." });

// Clear All Notifications
del("/notifications/clear-all");
```

---

## ⚡ Quick Reference

| Function | Method | URL Logic | Example |
| :--- | :--- | :--- | :--- |
| **`create(data)`** | `POST` | `BaseURL` | `create({ name: 'foo' })` |
| **`update(id, data)`** | `PUT` | `BaseURL + /id` | `update(1, { name: 'foo' })` |
| **`remove(id)`** | `DELETE` | `BaseURL + /id` | `remove(1)` |
| **`post(url, data)`** | `POST` | **Custom URL** | `post('/auth/login', body)` |
| **`put(url, data)`** | `PUT` | **Custom URL** | `put('/settings', body)` |
| **`del(url)`** | `DELETE` | **Custom URL** | `del('/logs/clear')` |
