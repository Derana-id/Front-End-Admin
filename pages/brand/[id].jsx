import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import ContentLoader from 'react-content-loader';
import moment from 'moment';
import { getDetailBrand } from '../../redux/actions/brand';
import { ContentHeader } from '../../components';

const view = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const detailBrand = useSelector((state) => state.detailBrand);
  const { id } = router.query;

  useEffect(() => {
    dispatch(getDetailBrand(id));
  }, []);

  return (
    <>
      <Head>
        <title>Blanja Admin - View Brand</title>
      </Head>
      <ContentHeader title="View Brand" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">View Brand</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i className="fas fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="maximize"
                >
                  <i className="fas fa-expand" />
                </button>
              </div>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  {detailBrand.isLoading ? (
                    <ContentLoader />
                  ) : detailBrand.isError ? (
                    <div>Error</div>
                  ) : (
                    <div className="col-md-12 text-center">
                      <img
                        src={`${
                          detailBrand.data.photo
                            ? `${process.env.NEXT_PUBLIC_API_URL}uploads/brands/${detailBrand.data.photo}`
                            : `${process.env.NEXT_PUBLIC_API_URL}uploads/brands/default.png`
                        }`}
                        alt={detailBrand.data.photo}
                        className="card-img-top img-fluid"
                        style={{
                          width: '30%',
                        }}
                        onError={(e) => {
                          e.target.src = `${process.env.NEXT_PUBLIC_API_URL}uploads/brands/default.png`;
                        }}
                      />
                      <span>
                        <h1 className="card-text mt-4">
                          {detailBrand.data?.name}
                        </h1>{' '}
                        {detailBrand.data?.is_active === 1 ? (
                          <span className="badge badge-pill badge-success">
                            Active
                          </span>
                        ) : (
                          <span className="badge badge-pill badge-danger">
                            Non Active
                          </span>
                        )}
                      </span>
                      <table className="col-md-12 mt-md-5 table-bordered">
                        <thead>
                          <tr>
                            <th className="col-md-4">Created At</th>
                            <th className="col-md-4">Updated At</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {moment(detailBrand?.data?.createdAt).format(
                                'dddd, DD-MMMM-YYYY'
                              )}
                            </td>
                            <td>
                              {detailBrand?.data?.updatedAt
                                ? moment(detailBrand?.data?.updatedAt).format(
                                    'dddd, DD-MMMM-YYYY'
                                  )
                                : 'none'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  {/* /.form-group */}
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.card-body */}
            <div className="card-footer">
              <a href="/brand" className="btn btn-secondary">
                <i className="fa fa-arrow-left" /> Back
              </a>
            </div>
          </div>
          {/* /.card */}
        </div>
      </section>
    </>
  );
};

view.layout = 'mainLayout';

export default view;
