/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
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
  const [src, setSrc] = React.useState(
    `${process.env.NEXT_PUBLIC_API_URL}uploads/products/${listStore.data?.store?.photo}`
  );

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
        <title>Blanja Admin - Management Product</title>
      </Head>
      <ContentHeader title="Management Product" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Management Product</h3>
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
                          <th>Store Name</th>
                          <th>Product Name</th>
                          <th>Brand Name</th>
                          <th>Category Name</th>
                          <th>Product Color</th>
                          <th>Product Size</th>
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
                              <Image
                                src={src}
                                alt={item.store?.photo}
                                width={40}
                                height={40}
                                onError={() =>
                                  setSrc(
                                    `${process.env.NEXT_PUBLIC_API_URL}uploads/products/default.png`
                                  )
                                }
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
