"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface ReviewFormProps {
  productId: string;
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    
    setIsSubmitting(true);
    
    // В будущем здесь будет запрос к API
    // await submitReview({ productId, rating, title, content, name, email });
    
    // Имитируем отправку на сервер
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form
      setRating(0);
      setTitle("");
      setContent("");
      setName("");
      setEmail("");
    }, 1000);
  };
  
  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded">
        <h3 className="font-medium">Thank you for your review!</h3>
        <p>Your review has been submitted and will be published soon.</p>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Rating */}
      <div>
        <label className="block text-sm font-medium mb-2">Your Rating *</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1"
            >
              <Star
                size={24}
                className={`${
                  star <= (hoverRating || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      
      {/* Review Title */}
      <div>
        <label htmlFor="review-title" className="block text-sm font-medium mb-2">
          Review Title *
        </label>
        <input
          id="review-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Give your review a title"
        />
      </div>
      
      {/* Review Content */}
      <div>
        <label htmlFor="review-content" className="block text-sm font-medium mb-2">
          Review Content *
        </label>
        <textarea
          id="review-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Write your review here"
        />
      </div>
      
      {/* Name */}
      <div>
        <label htmlFor="review-name" className="block text-sm font-medium mb-2">
          Your Name *
        </label>
        <input
          id="review-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Enter your name"
        />
      </div>
      
      {/* Email */}
      <div>
        <label htmlFor="review-email" className="block text-sm font-medium mb-2">
          Your Email *
        </label>
        <input
          id="review-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Enter your email"
        />
        <p className="text-xs text-gray-500 mt-1">
          Your email will not be published. Required fields are marked *
        </p>
      </div>
      
      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 text-white font-medium rounded-md 
            ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </form>
  );
}