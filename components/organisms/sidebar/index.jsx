/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { getDetailUser } from '../../../redux/actions/user';

export default function index({ token }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const detailUser = useSelector((state) => state.detailUser);
  const [src, setSrc] = React.useState(
    `${process.env.NEXT_PUBLIC_API_URL}uploads/users/${detailUser.data?.user?.photo}`
  );

  let decoded = '';
  if (token) {
    decoded = jwtDecode(token);
  }

  useEffect(() => {
    if (decoded) {
      dispatch(getDetailUser(router, decoded.id));
    }
  }, []);

  const logout = () => {
    Cookies.remove('token');
    router.push('/auth/login');
  };

  console.log(router.pathname);

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
        {detailUser.isLoading ? (
          <></>
        ) : detailUser.isError ? (
          <div>Error</div>
        ) : (
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <Image
                src={src}
                alt={detailUser.data?.profile?.name}
                className="img-circle elevation-2"
                width={30}
                height={30}
                onError={() =>
                  setSrc(
                    `${process.env.NEXT_PUBLIC_API_URL}uploads/users/default.png`
                  )
                }
              />
            </div>
            <div className="info">
              <a href="/" className="d-block">
                {detailUser.data?.profile?.name}
              </a>
            </div>
          </div>
        )}

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
              <a
                href="/"
                className={`${
                  router.pathname === '/' ? 'nav-link active' : 'nav-link'
                }`}
              >
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Dashboard</p>
              </a>
            </li>
            <li
              className={`${
                router.pathname !== '/' ? 'nav-item menu-open' : 'nav-item'
              }`}
            >
              <a
                href="#"
                className={`${
                  router.pathname !== '/' ? 'nav-link active' : 'nav-link'
                }`}
              >
                <i className="nav-icon fas fa-cog" />
                <p>
                  Management
                  <i className="fas fa-angle-left right" />
                  <span className="badge badge-info right">6</span>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a
                    href="/brand"
                    className={`${
                      router.pathname.includes('/brand')
                        ? 'nav-link active'
                        : 'nav-link'
                    }`}
                  >
                    <i className="fas fa-copyright nav-icon" />
                    <p>Brand</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/category"
                    className={`${
                      router.pathname.includes('/category')
                        ? 'nav-link active'
                        : 'nav-link'
                    }`}
                  >
                    <i className="fas fa-list nav-icon" />
                    <p>Category</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/product"
                    className={`${
                      router.pathname.includes('/product')
                        ? 'nav-link active'
                        : 'nav-link'
                    }`}
                  >
                    <i className="fas fa-tshirt nav-icon" />
                    <p>Product</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/store"
                    className={`${
                      router.pathname.includes('/store')
                        ? 'nav-link active'
                        : 'nav-link'
                    }`}
                  >
                    <i className="fas fa-store nav-icon" />
                    <p>Store</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/transaction"
                    className={`${
                      router.pathname.includes('/transaction')
                        ? 'nav-link active'
                        : 'nav-link'
                    }`}
                  >
                    <i className="fas fa-shopping-cart nav-icon" />
                    <p>Transaction</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/user"
                    className={`${
                      router.pathname.includes('/user')
                        ? 'nav-link active'
                        : 'nav-link'
                    }`}
                  >
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
