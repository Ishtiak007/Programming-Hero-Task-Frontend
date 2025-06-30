"use client";
import { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/features/authSlice";
import { toast } from "sonner";
import NavigationLink from "./NavigationLink";
import Container from "./Container";
import {
  Building2,
  HelpCircle,
  Home,
  LogIn,
  Mail,
  Menu as HamburgerMenu,
  Calendar,
  PlusCircle,
  User,
} from "lucide-react";
import { logoutFromCookie } from "../../services/AuthApi";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.auth?.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
        !target.closest("#profile-menu-button") &&
        !target.closest("#profile-menu-dropdown")
      ) {
        setIsProfileMenuOpen(false);
      }
    }
    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileMenuOpen]);

  const handleLogout = async () => {
    dispatch(logout());
    // Assume logoutFromCookie is an async function you import
    await logoutFromCookie();
    toast.success("You have been logged out successfully");
    router.push("/");
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isScrolled
          ? "lg:fixed lg:top-0 lg:left-0 lg:w-full bg-opacity-75 lg:z-50 lg:shadow-md bg-white"
          : "lg:relative shadow-sm p-1"
      }`}
    >
      <Container>
        <nav className="mt-4">
          <div className="mt-4 lg:flex space-y-4 justify-between items-center lg:mb-4">
            <Link href="/">
              <h1 className="lg:text-lg font-semibold cursor-pointer select-none">
                Event<span className="text-indigo-600">Management</span>
              </h1>
            </Link>

            {/* Mobile Hamburger */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-indigo-700"
                aria-label="Toggle mobile menu"
              >
                <HamburgerMenu size={28} />
              </button>
            </div>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex gap-4 text-base font-medium">
              <li>
                <NavigationLink route="Home" path="/" />
              </li>
              <li>
                <NavigationLink route="Events" path="/events" />
              </li>
              <li>
                <NavigationLink route="Add Event" path="/add-event" />
              </li>
              <li>
                <NavigationLink route="My Event" path="/my-event" />
              </li>
            </ul>

            {/* Right side: Sign In or Profile */}
            <div className="lg:flex items-center gap-4 relative">
              {!user ? (
                <Link href="/login">
                  <button className="border border-neutral-300 px-4 py-1.5 rounded-full text-indigo-700 font-medium hover:bg-indigo-700 hover:text-white transition">
                    Sign In
                  </button>
                </Link>
              ) : (
                <>
                  <button
                    id="profile-menu-button"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-haspopup="true"
                    aria-expanded={isProfileMenuOpen}
                  >
                    <Image
                      src={user.name || "/default-profile.png"}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </button>

                  {isProfileMenuOpen && (
                    <div
                      id="profile-menu-dropdown"
                      className="absolute right-0 bottom-0 translate-y-full w-44 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm text-gray-700 truncate">
                          {user.name || user.identifier || "User"}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-indigo-600 hover:text-white"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white shadow-md py-4 px-6">
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="flex gap-2 items-center">
                    <Home className="w-6 h-6" /> Home
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="flex gap-2 items-center">
                    <Calendar className="w-6 h-6" /> Events
                  </Link>
                </li>
                <li>
                  <Link href="/add-event" className="flex gap-2 items-center">
                    <PlusCircle className="w-6 h-6" /> Add Event
                  </Link>
                </li>
                <li>
                  <Link href="/my-event" className="flex gap-2 items-center">
                    <User className="w-6 h-6" /> My Event
                  </Link>
                </li>
                {!user ? (
                  <li>
                    <Link
                      href="/login"
                      className="flex gap-2 items-center text-indigo-700 font-medium"
                    >
                      <LogIn className="w-6 h-6" /> Sign In
                    </Link>
                  </li>
                ) : (
                  <li className="border-t pt-4">
                    <p className="text-gray-700 px-2 truncate">
                      {user.name || user.identifier || "User"}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="mt-2 w-full text-left text-red-600 hover:text-red-800 px-2"
                    >
                      Logout
                    </button>
                  </li>
                )}
                <li>
                  <Link href="/aboutUs" className="flex gap-2 items-center">
                    <Building2 className="w-6 h-6" /> About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contactUs" className="flex gap-2 items-center">
                    <Mail className="w-6 h-6" /> Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="flex gap-2 items-center">
                    <HelpCircle className="w-6 h-6" /> FAQs
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </Container>
    </div>
  );
}
