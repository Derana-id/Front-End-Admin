import React, { useEffect } from 'react';
import Head from 'next/head';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import ContentLoader from 'react-content-loader';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { getListBrand, deleteBrand } from '../../redux/actions/brand';
import { ContentHeader } from '../../components';
import { toastify } from '../../utils/toastify';
import { sweetAlert } from '../../utils/sweetalert';

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const listBrand = useSelector((state) => state.listBrand);
  useEffect(() => {
    dispatch(getListBrand(router));
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
  }, [listBrand]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: 'Changed status airline',
      text: 'Are you sure to change the status to non active ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I Sure!',
    }).then(async (confirm) => {
      if (confirm.isConfirmed) {
        try {
          const res = await deleteBrand(id);
          sweetAlert(res.message);
          window.location.reload();
        } catch (err) {
          if (err.response.data.code === 422) {
            const { error } = err.response.data;
            error.map((item) => toastify(item, 'error'));
          } else {
            sweetAlert(err.response.data.message, 'error');
          }
        }
      }
    });
  };

  return (
    <>
      <Head>
        <title>Blanja Admin - Management Brand</title>
      </Head>
      <ContentHeader title="Brand" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Management Brand</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <a href="/brand/add" className="btn btn-primary mb-3">
                    <i className="fa fa-plus" /> Add Brand
                  </a>
                  {listBrand.isLoading ? (
                    <ContentLoader />
                  ) : listBrand.isError ? (
                    <div>Error</div>
                  ) : (
                    <table
                      id="example1"
                      className="table table-bordered table-striped table-hover"
                    >
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Name</th>
                          <th>Photo</th>
                          <th>Status</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listBrand.data?.map((item, i) => (
                          <tr>
                            <td>{i + 1}</td>
                            <td>{item.brand_name}</td>
                            <td>
                              <img
                                src={`${
                                  item.photo
                                    ? `${process.env.NEXT_PUBLIC_API_URL}uploads/brands/${item.photo}`
                                    : `${process.env.NEXT_PUBLIC_API_URL}uploads/brands/default.png`
                                }`}
                                alt={item.photo}
                                style={{ width: '60px' }}
                                onError={(e) => {
                                  e.target.src = `${process.env.NEXT_PUBLIC_API_URL}uploads/brands/default.png`;
                                }}
                              />
                            </td>
                            <td>
                              {item.is_active === 1 ? (
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
                                href={`brand/${item.id}`}
                              >
                                <i className="fas fa-eye" />
                                &nbsp; View
                              </a>
                              <a
                                className="btn btn-info btn-sm ml-2"
                                href={`brand/edit/${item.id}`}
                              >
                                <i className="fas fa-pencil-alt" />
                                &nbsp; Edit
                              </a>
                              <button
                                className="btn btn-danger btn-sm ml-2"
                                onClick={(e) => {
                                  handleDelete(e, item.id);
                                }}
                              >
                                <i className="fas fa-trash" />
                                &nbsp; Delete
                              </button>
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
