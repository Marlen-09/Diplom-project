import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center mr-6">
      <span className="text-xl font-bold">ShopNext</span>
    </Link>
  );
}