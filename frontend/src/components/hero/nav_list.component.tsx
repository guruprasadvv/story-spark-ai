import React, { useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { isLoggedIn, removeUserInfo } from "../../services/auth.service";
import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logoNew.png";
import ThemeToggle from "../theme/theme_toggle.component";
import NotificationComponent from "../notification/notification.component";
import { isLoggedIn, removeUserInfo, getUserInfo } from "../../services/auth.service";
import { USER_ROLE } from "../../constants/role";
import { useNotifications } from "../../hooks/useNotifications";

const HeaderComponent: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(isLoggedIn());
  const notificationMenuRef = useRef<HTMLDivElement>(null);

  const { notifications, unreadCount, isOpen, toggle, close, markAsRead } = useNotifications();
  const user = getUserInfo();
  const isAdmin = user?.role === USER_ROLE.ADMIN || user?.role === USER_ROLE.SUPER_ADMIN;

  useEffect(() => {
    setIsLogin(isLoggedIn());
  }, [pathname]);

  useEffect(() => {
    const handleStorageSync = () => {
      setIsLogin(isLoggedIn());
    };
    window.addEventListener("storage", handleStorageSync);
    return () => window.removeEventListener("storage", handleStorageSync);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        notificationMenuRef.current &&
        !notificationMenuRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, close]);

  const handleLogout = () => {
    removeUserInfo();
    setIsLogin(false);
    setMenuOpen(false);
    navigate("/");
  };

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  const getLinkClass = (isActive: boolean) =>
    `inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold tracking-wider transition-colors duration-200 ${
      isActive
        ? "text-blue-600 dark:text-blue-400"
        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
    }`;

  const getMobileLinkClass = (isActive: boolean) =>
    `flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-blue-50 text-blue-600 dark:bg-white/5 dark:text-blue-400"
        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-[#0B1120]/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-bold text-slate-800 dark:text-white">StorySparkAI</Link>
        <nav className="hidden items-center gap-2 lg:flex">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/explore" className={linkClass}>Explore</NavLink>
          <NavLink to="/story-inspiration" className={linkClass}>Stories</NavLink>
          <NavLink to="/community" className={linkClass}>Community</NavLink>
          {loggedIn && <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {loggedIn ? (
            <button onClick={handleLogout} className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Logout</button>
          ) : (
            <Link to="/login" className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Login</Link>
          )}
          <button 
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="rounded-md px-2 py-1 text-slate-700 lg:hidden dark:text-slate-200" 
            onClick={() => setMenuOpen((v) => !v)}>
            <i className="fa-solid fa-bars" />
          </button>
        </div>
      </div>

      <NotificationComponent
        notifications={notifications}
        showNotification={isOpen}
        setShowNotification={close}
        unreadCount={unreadCount}
        onMarkAsRead={markAsRead}
      />

      {menuOpen && (
        <div className="xl:hidden mt-2 px-4 pb-4 flex flex-col gap-2 border-t border-slate-200/70 dark:border-white/10 pt-3 max-h-[75vh] overflow-y-auto sidebar">
          <NavLink to="/" end className={({ isActive }) => getMobileLinkClass(isActive)} onClick={() => setMenuOpen(false)}>
            <span className="flex items-center gap-2"><i className="fa-solid fa-house" /> HOME</span>
          </NavLink>

          <NavLink to="/explore" className={({ isActive }) => getMobileLinkClass(isActive)} onClick={() => setMenuOpen(false)}>
            <span className="flex items-center gap-2"><i className="fa-solid fa-compass" /> EXPLORE</span>
          </NavLink>

          <NavLink to="/story-inspiration" className={({ isActive }) => getMobileLinkClass(isActive)} onClick={() => setMenuOpen(false)}>
            <span className="flex items-center gap-2"><i className="fa-solid fa-book-open" /> INSPIRING</span>
          </NavLink>

          <NavLink to="/contact-us" className={({ isActive }) => getMobileLinkClass(isActive)} onClick={() => setMenuOpen(false)}>
            <span className="flex items-center gap-2"><i className="fa-solid fa-envelope" /> CONTACT</span>
          </NavLink>

          <NavLink to="/community" className={({ isActive }) => getMobileLinkClass(isActive)} onClick={() => setMenuOpen(false)}>
            <span className="flex items-center gap-2"><i className="fa-solid fa-users" /> COMMUNITY</span>
          </NavLink>

          {isLogin && (
            <>
              <NavLink to="/bookmarks" className={({ isActive }) => getMobileLinkClass(isActive)} onClick={() => setMenuOpen(false)}>
                <span className="flex items-center gap-2"><i className="fa-solid fa-bookmark" /> SAVED</span>
              </NavLink>

              {isAdmin && (
                <NavLink to="/dashboard" className={({ isActive }) => getMobileLinkClass(isActive)} onClick={() => setMenuOpen(false)}>
                  <span className="flex items-center gap-2"><i className="fa-solid fa-table-columns" /> DASHBOARD</span>
                </NavLink>
              )}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 transition-all text-left mt-2 cursor-pointer"
              >
                <i className="fa-solid fa-arrow-right-from-bracket" /> LOGOUT
              </button>
            </>
          )}

          {!isLogin && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="w-full">
                <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer">
                  LOGIN
                </button>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="w-full">
                <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-semibold text-white shadow-md hover:from-blue-500 hover:to-indigo-500 cursor-pointer">
                  SIGN UP
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default NavList;
