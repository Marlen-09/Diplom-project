
import Logo from "./logo";
import NavMenu from "./nav-menu";
import SearchBar from "./search-bar";
import CartButton from "./cart-button";
import UserMenu from "./user-menu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center">
            <Logo />
            <NavMenu />
          </div>
          
          <div className="hidden md:block flex-grow max-w-md">
            <SearchBar />
          </div>
          
          <div className="flex items-center gap-2">
            <CartButton />
            <UserMenu />
          </div>
        </div>
        
        <div className="mt-4 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}