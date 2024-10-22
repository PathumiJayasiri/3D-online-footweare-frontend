import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";

const navigation = [
  { name: "Home", href: "/", current: false },

  { name: "Customize", href: "/customize", current: false },
  { name: "Produts", href: "/category/men", current: false },
  { name: "Employee", href: "/employee", current: false },
  { name: "DisableForm", href: "/disableform", current: false },

  { name: "Sitemanager", href: "/site-manager", current: false },
  { name: "Customer", href: "/customer", current: false },
  { name: "Admin", href: "/dashboard", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const isAuthenticated = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();
  const isUser = ApiService.isUser();
  const isEmployee = ApiService.isEmployee();
  const isSitemanager = ApiService.isSitemanager();
  const navigate = useNavigate();

  const handleLogout = () => {
    const isLogout = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (isLogout) {
      ApiService.logout();
      navigate("/login");
    }
  };

  const handleCartClick = () => {
    navigate("/cart"); // Redirect to cart page on cart icon click
  };

  return (
    <Disclosure as="nav" className="bg-slate-900 fixed inset-x-0 top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button*/}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <a href="/">
                    <img
                      className="h-8 w-auto"
                      src="logo1.png"
                      alt="Your Company"
                    />
                  </a>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => {
                      if (
                        (item.name === "Employee" && !isEmployee) ||
                        (item.name === "Sitemanager" && !isSitemanager) ||
                        (item.name === "Customer" && !isUser) ||
                        (item.name === "DisableForm" && !isUser) ||
                        (item.name === "Admin" && !isAdmin) ||
                        (!isAuthenticated &&
                          (item.name === "Login" || item.name === "Register"))
                      ) {
                        return null;
                      }

                      return (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          activeClassName="bg-gray-900 text-white"
                          exact={true}
                        >
                          {item.name}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                
                {isAuthenticated && isUser && (
                  // Show Cart Icon if the user is authenticated
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={handleCartClick} // Redirect to cart on click
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View cart</span>
                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                )}
                
                {isAuthenticated ?  (
                  // User is authenticated, show profile dropdown
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="profile.png"
                          alt="Profile"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              onClick={handleLogout}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  // User is not authenticated, show login and register links
                  <div className="flex space-x-4">
                    <NavLink
                      to="/login"
                      className={classNames(
                        "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      activeClassName="bg-gray-900 text-white"
                    >
                      {isAuthenticated ? "Logout" : "Login"}
                    </NavLink>
                    <NavLink
                      to="/register"
                      className={classNames(
                        "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      activeClassName="bg-gray-900 text-white"
                    >
                      Register
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => {
                if (
                  (item.name === "Employee" && !isEmployee) ||
                  (item.name === "Sitemanager" && !isSitemanager) ||
                  (item.name === "Customer" && !isUser) ||
                  (item.name === "Admin" && !isAdmin) ||
                  (!isAuthenticated &&
                    (item.name === "Login" || item.name === "Register"))
                ) {
                  return null;
                }

                return (
                  <Disclosure.Button
                    key={item.name}
                    as={NavLink}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
