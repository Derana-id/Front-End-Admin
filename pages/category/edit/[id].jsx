import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import ContentLoader from 'react-content-loader';
import {
  editCategory,
  getDetailCategory,
} from '../../../redux/actions/category';
import { ContentHeader } from '../../../components';
import { toastify } from '../../../utils/toastify';
import { sweetAlert } from '../../../utils/sweetalert';

const edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const detailCategory = useSelector((state) => state.detailCategory);

  const [name, setName] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setIsLoading(false);
      dispatch(getDetailCategory(router, id));
    }
  }, [id]);

  useEffect(() => {
    if (detailCategory.data) {
      setName(detailCategory.data.category_name);
      setPhoto(detailCategory.data.photo);
    }
  }, [detailCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !photo) {
      sweetAlert('All field must be filled!', 'error');
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append('categoryName', name);
      formData.append('image', photo);

      editCategory(formData, id)
        .then((res) => {
          sweetAlert(res.message);
          router.push('/category');
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
        <title>Blanja Admin - Edit Category</title>
      </Head>
      <ContentHeader title="Edit Category" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">Edit Category</h3>
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
            {detailCategory.isLoading || isLoading ? (
              <ContentLoader />
            ) : detailCategory.isError ? (
              <div>Error</div>
            ) : (
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
                          value={name || ''}
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
                            {photo === detailCategory.data?.photo ? (
                              <label
                                className="custom-file-label"
                                htmlFor="image"
                              >
                                {detailCategory.data?.photo}
                              </label>
                            ) : (
                              <label
                                className="custom-file-label"
                                htmlFor="image"
                              >
                                {photo?.name}
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
                  <a href="/category" className="btn btn-secondary">
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
            )}
          </div>
          {/* /.card */}
        </div>
      </section>
    </>
  );
};

edit.layout = 'mainLayout';

export default edit;
