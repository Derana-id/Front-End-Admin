import React, { useEffect } from 'react';
import Head from 'next/head';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import ContentLoader from 'react-content-loader';
import { useRouter } from 'next/router';
import moment from 'moment';
import { getListTransaction } from '../../redux/actions/transaction';
import { ContentHeader } from '../../components';

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const listTransaction = useSelector((state) => state.listTransaction);

  useEffect(() => {
    dispatch(getListTransaction(router));
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
  }, [listTransaction]);

  return (
    <>
      <Head>
        <title>Blanja Admin - Management Transaction</title>
      </Head>
      <ContentHeader title="Transaction" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Management Transaction</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  {listTransaction.isLoading ? (
                    <ContentLoader />
                  ) : listTransaction.isError ? (
                    <div>Error</div>
                  ) : (
                    <table
                      id="example1"
                      className="table table-bordered table-striped table-hover"
                    >
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Invoice</th>
                          <th>Date</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listTransaction.data?.map((item, i) => (
                          <tr>
                            <td>{i + 1}</td>
                            <td>{item.transaction?.invoice}</td>
                            <td>
                              {item?.transaction?.date
                                ? moment(item?.transaction?.date).format(
                                    'dddd, DD-MMMM-YYYY'
                                  )
                                : 'none'}
                            </td>
                            <td>
                              {item.transaction
                                ? new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0,
                                  }).format(item.transaction.total)
                                : null}
                            </td>
                            <td>
                              {item.transaction?.is_active === 1 ? (
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
