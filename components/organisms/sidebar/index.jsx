/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function index() {
  const router = useRouter();
  const logout = () => {
    Cookies.remove('token');
    router.push('/auth/login');
  };
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <div
        className="brand-link d-flex justify-content-center"
        style={{ gap: '7px', marginLeft: '-15px' }}
      >
        <Image
          src="/images/Blanja.png"
          alt="Blanja Logo"
          className="brand-image elevation-3"
          width={20}
          height={25}
          style={{ opacity: '.8' }}
        />
        <Link href="/">
          <span className="brand-text font-weight-light">Blanja App</span>
        </Link>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.jpg"
              alt="User Image"
              className="img-circle elevation-2"
            />
          </div>
          <div className="info">
            <Link href="/" className="d-block">
              Alexander Pierce
            </Link>
          </div>
        </div>

        {/* SidebarSearch Form */}
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library */}
            <li className="nav-item">
              <a href="/" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Dashboard</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-cog" />
                <p>
                  Management
                  <i className="fas fa-angle-left right" />
                  <span className="badge badge-info right">6</span>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/brand" className="nav-link">
                    <i className="fas fa-copyright nav-icon" />
                    <p>Brand</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/category" className="nav-link">
                    <i className="fas fa-list nav-icon" />
                    <p>Category</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/product" className="nav-link">
                    <i className="fas fa-tshirt nav-icon" />
                    <p>Product</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/store" className="nav-link">
                    <i className="fas fa-store nav-icon" />
                    <p>Store</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/transaction" className="nav-link">
                    <i className="fas fa-shopping-cart nav-icon" />
                    <p>Transaction</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/user" className="nav-link">
                    <i className="fas fa-user nav-icon" />
                    <p>User</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-header">LOGOUT</li>
            <li className="nav-item">
              <a onClick={logout} className="nav-link">
                <i className="nav-icon fas fa-sign-out-alt" />
                <p>Logout</p>
              </a>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
