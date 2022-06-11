import React from 'react';
import { ContentHeader } from '../../components';

const add = () => {
  return (
    <>
      <ContentHeader title="Add Brand" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* SELECT2 EXAMPLE */}
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">Add Brand</h3>
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
            <form>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter name"
                      />
                    </div>
                    {/* /.form-group */}
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="image">Image</label>
                      <div className="input-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="image"
                            accept=".png, .jpg"
                          />
                          {/* {image ? ( */}
                          {/* <label
                              className="custom-file-label"
                              htmlFor="image"
                            >
                              {image.name}
                            </label>
                          ) : ( */}
                          <label className="custom-file-label" htmlFor="image">
                            Choose File
                          </label>
                          {/* )} */}
                        </div>
                        <div className="input-group-append">
                          <span className="input-group-text">Upload</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /.col */}
                </div>
                {/* /.row */}
              </div>
              {/* /.card-body */}
              <div className="card-footer">
                {/* <div className="card-footer">
                  <Link href="/brand" className="btn btn-secondary" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary ml-2"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </button>
                </div> */}
                <div className="card-footer">
                  <a href="/brand" className="btn btn-secondary">
                    <i className="fa fa-arrow-left" /> Back
                  </a>
                  <button type="submit" className="btn btn-primary ml-2">
                    <i className="fa fa-save" /> Save
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* /.card */}
        </div>
      </section>
    </>
  );
};

add.layout = 'mainLayout';

export default add;
