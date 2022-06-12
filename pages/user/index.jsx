/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import Head from 'next/head';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import ContentLoader from 'react-content-loader';
import { useRouter } from 'next/router';
import { getListUser } from '../../redux/actions/user';
import { ContentHeader } from '../../components';

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const listUser = useSelector((state) => state.listUser);

  useEffect(() => {
    dispatch(getListUser(router));
  }, []);

  useEffect(() => {
    $(document).ready(function () {
      setTimeout(function () {
        $('#example1').DataTable({
          retrieve: true,
          paging: true,
          lengthChange: true,
          searching: true,
          ordering: true,
          info: true,
          autoWidth: false,
          responsive: true,
        });
      }, 1000);
    });
  }, [listUser]);

  return (
    <>
      <Head>
        <title>Blanja Admin - Management User</title>
      </Head>
      <ContentHeader title="Management User" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Management User</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  {listUser.isLoading ? (
                    <ContentLoader />
                  ) : listUser.isError ? (
                    <div>Error</div>
                  ) : (
                    <table
                      id="example1"
                      className="table table-bordered table-striped table-hover text-center"
                    >
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Gender</th>
                          <th>Birth</th>
                          <th>Photo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listUser.data?.map((item, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.profile?.name}</td>
                            <td>
                              {item.user[0].email ? item.user[0].email : '-'}
                            </td>
                            <td>
                              {item.profile?.phone ? item.profile?.phone : '-'}
                            </td>
                            <td>
                              {item.profile?.gender
                                ? item.profile?.gender
                                : '-'}
                            </td>
                            <td>
                              {item.profile?.birth ? item.profile?.birth : '-'}
                            </td>
                            <td>
                              <img
                                src={`${
                                  item.photo
                                    ? `${process.env.NEXT_PUBLIC_API_URL}uploads/users/${item.photo}`
                                    : `${process.env.NEXT_PUBLIC_API_URL}uploads/users/default.png`
                                }`}
                                alt={item.photo}
                                style={{ width: '60px' }}
                                onError={(e) => {
                                  e.target.src = `${process.env.NEXT_PUBLIC_API_URL}uploads/users/default.png`;
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </>
  );
};

index.layout = 'mainLayout';

export default index;
