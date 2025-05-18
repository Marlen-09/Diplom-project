"use client";

import { useState, useEffect } from "react";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";

interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  notHelpful: number;
}

interface ReviewListProps {
  productId: string;
}

// Моковые отзывы, в будущем заменить на данные из API
const mockReviews: Review[] = [
  {
    id: "1",
    author: "John D.",
    date: "2023-05-15",
    rating: 5,
    title: "Excellent product, highly recommend!",
    content: "I've been using this for a month now and it exceeds all my expectations. The quality is outstanding and it's worth every penny.",
    helpful: 12,
    notHelpful: 1
  },
  {
    id: "2",
    author: "Sara M.",
    date: "2023-04-22",
    rating: 4,
    title: "Very good, but could be better",
    content: "Overall I'm satisfied with my purchase. The only minor issue is that it could use more detailed instructions in the manual.",
    helpful: 8,
    notHelpful: 2
  }
];

export default function ReviewList({ productId }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Имитируем загрузку с сервера
    const fetchReviews = async () => {
      setIsLoading(true);
      // В будущем здесь будет запрос к API
      // const data = await getProductReviews(productId);
      setTimeout(() => {
        setReviews(mockReviews);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchReviews();
  }, [productId]);
  
  const handleHelpful = (reviewId: string, isHelpful: boolean) => {
    setReviews(prevReviews => 
      prevReviews.map(review => {
        if (review.id === reviewId) {
          return {
            ...review,
            helpful: isHelpful ? review.helpful + 1 : review.helpful,
            notHelpful: !isHelpful ? review.notHelpful + 1 : review.notHelpful
          };
        }
        return review;
      })
    );
  };
  
  if (isLoading) {
    return (
      <div className="h-40 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-gray-200 rounded-full border-t-gray-800"></div>
      </div>
    );
  }
  
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No reviews yet. Be the first to review this product!
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {reviews.map(review => (
        <div key={review.id} className="border-b pb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <h3 className="font-medium">{review.title}</h3>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString()}
            </span>
          </div>
          
          <p className="text-sm mb-4">{review.content}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">By {review.author}</span>
            
            <div className="flex items-center space-x-4 text-sm">
              <button 
                onClick={() => handleHelpful(review.id, true)}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <ThumbsUp size={16} className="mr-1" />
                <span>Helpful ({review.helpful})</span>
              </button>
              
              <button 
                onClick={() => handleHelpful(review.id, false)}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <ThumbsDown size={16} className="mr-1" />
                <span>Not Helpful ({review.notHelpful})</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}