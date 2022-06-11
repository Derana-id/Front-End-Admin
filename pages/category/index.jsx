import React, { useEffect } from 'react';
import $ from 'jquery';
// import { BulletList } from 'react-content-loader';
import { ContentHeader } from '../../components';

const index = () => {
  useEffect(() => {
    $(document).ready(function () {
      setTimeout(function () {
        $('#example1').DataTable();
      }, 1000);
    });
  }, []);
  return (
    <>
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
                      <tr>
                        <td>1</td>
                        <td>Nike</td>
                        <td>{/* <img style={{ width: '60px' }} /> */}</td>
                        <td>
                          {/* {item.is_active == 1 ? (
                            <span className="badge badge-pill badge-success">
                              Active
                            </span>
                          ) : (
                            <span className="badge badge-pill badge-danger">
                              Non Active
                            </span>
                          )} */}
                        </td>
                        <td className="text-center">
                          {/* <a
                            className="btn btn-primary btn-sm"
                            href={`brand/view/${item.id}`}
                          >
                            <i className="fas fa-eye" />
                            View
                          </a>
                          <a
                            className="btn btn-info btn-sm ml-2"
                            href={`brand/edit/${item.id}`}
                          >
                            <i className="fas fa-pencil-alt" />
                            Edit
                          </a>
                          {item.is_active == 1 ? (
                            <button className="btn btn-info btn-sm ml-2 bg-danger">
                              <i className="fas fa-power-off" />
                              Deactivate
                            </button>
                          ) : (
                            <button className="btn btn-info btn-sm ml-2 bg-success">
                              <i className="fas fa-power-off" />
                              Activate
                            </button>
                          )}

                          <button className="btn btn-danger btn-sm ml-2">
                            <i className="fas fa-trash" />
                            Delete
                          </button> */}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot />
                  </table>
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
