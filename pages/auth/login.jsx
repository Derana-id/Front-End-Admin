/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import JwtDecode from 'jwt-decode';
import { sweetAlert } from '../../utils/sweetalert';
import { login } from '../../redux/actions/auth';
import { toastify } from '../../utils/toastify';

export async function getStaticProps() {
  return { props: { isAuth: true } };
}

const Login = () => {
  const router = useRouter();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      sweetAlert('All field must be filled!', 'error');
    } else {
      setIsLoading(true);

      login(form)
        .then((res) => {
          Cookies.set('token', res.token);

          const decoded = JwtDecode(res.token);

          if (decoded.level === 0) {
            sweetAlert(res.message);
            router.push('/');
          } else {
            sweetAlert("You don't have permission!", 'error');
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data.code === 422) {
              const { error } = err.response.data;
              error.map((item) => toastify(item, 'error'));
            } else {
              sweetAlert(err.response.data.message, 'error');
            }
          } else {
            sweetAlert(err.message, 'error');
          }
        })
        .finally(() => {
          setForm({
            email: '',
            password: '',
          });
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <Head>
        <title>Blanja Admin - Login Page</title>
      </Head>

      <div className="card-body">
        <p className="login-box-msg">Sign in to start your session</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              id="email"
              value={form.email}
              onChange={handleChange}
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-envelope" />
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type={passwordVisibility ? 'text' : 'password'}
              className="form-control"
              placeholder="Password"
              id="password"
              value={form.password}
              onChange={handleChange}
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <div className="icheck-primary">
                <input
                  type="checkbox"
                  id="remember"
                  onChange={() => {
                    setPasswordVisibility(!passwordVisibility);
                  }}
                />
                <label htmlFor="remember">Show Password</label>
              </div>
            </div>
            {/* /.col */}
            <div className="col-4">
              {isLoading ? (
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                </button>
              ) : (
                <button type="submit" className="btn btn-primary btn-block">
                  Sign In
                </button>
              )}
            </div>
            {/* /.col */}
          </div>
        </form>

        <div className="social-auth-links text-center mt-2 mb-3">
          <a href="#" className="btn btn-block btn-primary">
            <i className="fab fa-facebook mr-2" /> Sign in using Facebook
          </a>
          <a href="#" className="btn btn-block btn-danger">
            <i className="fab fa-google-plus mr-2" /> Sign in using Google+
          </a>
        </div>
        {/* /.social-auth-links */}

        <p className="mb-1">
          <a href="forgot-password.html">I forgot my password</a>
        </p>
        <p className="mb-0">
          <a href="register.html" className="text-center">
            Register a new membership
          </a>
        </p>
      </div>
    </>
  );
};

Login.layout = 'authLayout';

export default Login;
