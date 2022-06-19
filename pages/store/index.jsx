/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import Head from 'next/head';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import ContentLoader from 'react-content-loader';
import { useRouter } from 'next/router';
import { getListStore } from '../../redux/actions/store';
import { ContentHeader } from '../../components';

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const listStore = useSelector((state) => state.listStore);

  useEffect(() => {
    dispatch(getListStore(router));
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
  }, [listStore]);

  return (
    <>
      <Head>
        <title>Blanja Admin - Management Store</title>
      </Head>
      <ContentHeader title="Store" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Management Store</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  {listStore.isLoading ? (
                    <ContentLoader />
                  ) : listStore.isError ? (
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
                          <th>Store Name</th>
                          <th>Store Phone</th>
                          <th>Description</th>
                          <th>Photo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listStore.data?.map((item, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.store?.name}</td>
                            <td>
                              {item.user[0].email ? item.user[0].email : '-'}
                            </td>
                            <td>
                              {item.store?.store_name
                                ? item.store?.store_name
                                : '-'}
                            </td>
                            <td>
                              {item.store?.store_phone
                                ? item.store?.store_phone
                                : '-'}
                            </td>
                            <td>
                              {item.store?.store_description
                                ? item.store?.store_description
                                : '-'}
                            </td>
                            <td>
                              <img
                                src={`${
                                  item.photo
                                    ? `https://drive.google.com/uc?export=view&id=${item.photo}`
                                    : `${process.env.NEXT_PUBLIC_API_URL}uploads/users/default.png`
                                }`}
                                alt={item.store?.photo}
                                width={40}
                                height={40}
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
