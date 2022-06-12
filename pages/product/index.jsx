import React, { useEffect } from 'react';
import Head from 'next/head';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import ContentLoader from 'react-content-loader';
import { useRouter } from 'next/router';
import { getListProduct } from '../../redux/actions/product';
import { ContentHeader } from '../../components';

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.listProduct);

  useEffect(() => {
    dispatch(getListProduct(router));
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
  }, [listProduct]);

  return (
    <>
      <Head>
        <title>Blanja Admin - Management Product</title>
      </Head>
      <ContentHeader title="Product" />
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
                  {listProduct.isLoading ? (
                    <ContentLoader />
                  ) : listProduct.isError ? (
                    <div>Error</div>
                  ) : (
                    <table
                      id="example1"
                      className="table table-bordered table-striped table-hover"
                    >
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Store</th>
                          <th>Category</th>
                          <th>Name</th>
                          <th>Brand</th>
                          <th>Status</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listProduct.data?.map((item, i) => (
                          <tr>
                            <td>{i + 1}</td>
                            <td>{item.store[0].store_name}</td>
                            <td>{item.category[0].category_name}</td>
                            <td>{item.product?.product_name}</td>
                            <td>{item.brand[0].brand_name}</td>
                            <td>
                              {item.product?.is_active === 1 ? (
                                <span className="badge badge-pill badge-primary">
                                  Active
                                </span>
                              ) : (
                                <span className="badge badge-pill badge-danger">
                                  Non Active
                                </span>
                              )}
                            </td>
                            <td className="text-center">
                              <a
                                className="btn btn-primary btn-sm"
                                href={`transaction/${item.id}`}
                              >
                                <i className="fas fa-eye" />
                                &nbsp; View
                              </a>
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
