import React, { useEffect, useState } from "react";
import Mainbackground from "../components/Mainbackground";
import { useParams } from "react-router-dom";
import axios from "axios";
function BlogDetails() {
  const path = "blogdetails";
  const API_URL = process.env.REACT_APP_API_URL;
  const { lang, id } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlog = async () => {
      try {
        const [blogsRes] = await Promise.all([
          axios.get(`${API_URL}/blogs/${lang}/getbyidfront/${id}`),
        ]);
        setBlogs(blogsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchBlog();
  }, [lang]);
  return (
    <>
      <Mainbackground path={path} />
      <section className="margin_section">
        <div className="container">
          <div className="row">
            {Array.isArray(blogs) ? (
              blogs.map((blogdetails) => (
                <div key={blogdetails.id}>
                  {" "}
                  {/* Add a key */}
                  <div className="d-flex flex-wrap">
                    <div className="col-lg-6 col-md-6 col-sm-12 col_interprition_terms">
                      <img
                        src={`${API_URL}/${blogdetails.main_img}`}
                        alt="terms and conditions"
                        className="terms_img"
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col_interprition_terms">
                      <p className="title_terms">{blogdetails.title}</p>
                      <p
                            dangerouslySetInnerHTML={{
                              __html: blogdetails.main_description,
                            }}
                          ></p>
                    </div>
                  </div>
                  {blogdetails.descriptions.map((desc) => (
                    <div>
                      <div className="d-flex ">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: desc.description,
                            }}
                          ></p>
                        </div>
                      </div>
                      <div className="row d-flex justify-content-center align-items-center">
                        {desc.images &&
                          desc.images.map((img, index) => (
                            <div className="col-lg-4 col-md-6 col-sm-12  mt-3">
                              <img
                                src={`${API_URL}/${img}`}
                                alt="terms and conditions"
                                className="blogdetails_img"
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div>No blogs found</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogDetails;
