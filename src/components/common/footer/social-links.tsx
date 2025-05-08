import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function SocialLinks() {
  return (
    <div className="flex space-x-4">
      <a 
        href="https://facebook.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-600"
      >
        <Facebook size={20} />
      </a>
      <a 
        href="https://twitter.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-400"
      >
        <Twitter size={20} />
      </a>
      <a 
        href="https://instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-pink-600"
      >
        <Instagram size={20} />
      </a>
      <a 
        href="https://youtube.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-red-600"
      >
        <Youtube size={20} />
      </a>
    </div>
  );
}