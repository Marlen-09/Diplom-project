"use client"
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock subscription - to be replaced with actual API call
    if (email) {
      setIsSubscribed(true);
    }
  };

  if (isSubscribed) {
    return (
      <div className="p-3 bg-green-100 text-green-700 rounded">
        Thanks for subscribing!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 w-full text-black placeholder-gray-300"
          required
        />
        <button
          type="submit"
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-r"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}