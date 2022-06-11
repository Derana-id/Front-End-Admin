import React from 'react';

const authLayout = ({ children }) => {
  return (
    <>
      <div className="login-box">
        {/* /.login-logo */}
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="/" className="h1">
              <b>Admin</b>Blanja
            </a>
          </div>
          {children}
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
    </>
  );
};

export default authLayout;
