import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { addBrand } from '../../redux/actions/brand';
import { ContentHeader } from '../../components';
import { toastify } from '../../utils/toastify';
import { sweetAlert } from '../../utils/sweetalert';

const add = () => {
  const router = useRouter();
  const [name, setName] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !photo) {
      sweetAlert('All field must be filled!', 'error');
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append('brandName', name);
      formData.append('image', photo);

      addBrand(formData)
        .then((res) => {
          sweetAlert(res.message);
          router.push('/brand');
        })
        .catch((err) => {
          if (err.response.data.code === 422) {
            const { error } = err.response.data;
            error.map((item) => toastify(item, 'error'));
          } else {
            sweetAlert(err.response.data.message, 'error');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Head>
        <title>Blanja Admin - Add Brand</title>
      </Head>
      <ContentHeader title="Add Brand" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
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
            <form onSubmit={handleSubmit}>
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
                        onChange={(e) => setName(e.target.value)}
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
                            onChange={(e) => {
                              setPhoto(e.target.files[0]);
                            }}
                          />
                          {photo ? (
                            <label
                              className="custom-file-label"
                              htmlFor="image"
                            >
                              {photo.name}
                            </label>
                          ) : (
                            <label
                              className="custom-file-label"
                              htmlFor="image"
                            >
                              Choose File
                            </label>
                          )}
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
                <a href="/brand" className="btn btn-secondary">
                  <i className="fa fa-arrow-left" /> Back
                </a>
                {loading ? (
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
                ) : (
                  <button type="submit" className="btn btn-primary ml-2">
                    <i className="fa fa-save" /> Save
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

add.layout = 'mainLayout';

export default add;
