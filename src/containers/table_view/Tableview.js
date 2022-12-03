import React, { useState, useEffect } from "react";

import { Header, GreyboxDesign, Loading, HeroButton } from "../../components";
import { serverUrl } from "../../config";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Table, Button } from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Pagination from "@mui/material/Pagination";

import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./Tableview.css";

function Tableview() {
  const [data, setData] = useState(null);
  const [page, changePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  let i = 0;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatas = async () => {
      axios
        .get(`${serverUrl}posts/total`)
        .then(async (response) => {
          const resData = await response.data;
          setTotalPage(Math.ceil(resData.total / 5));
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`${serverUrl}posts/page/${page}`)
        .then(async (response) => {
          const resData = await response.data;
          setData(resData);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("Error in Request");
        });
    };

    fetchDatas();

    // return () => {
    //   second
    // }
  }, [page]);

  const handleDelete = async (postId) => {
    await confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const axiosLink = serverUrl + "posts/" + postId;

            const filtered = data.filter((post) => post._id !== postId);

            await axios
              .delete(axiosLink)
              .then((response) => {
                setData(filtered);
                navigate("/blogs/tableview");
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
        {
          label: "No",
          onClick: () => false,
        },
      ],
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="Tableview">
      <Header />
      <div className="Tableview__container">
        <div className="Tableview__container-box">
          <GreyboxDesign />
          <div className="Tableview__container-box_content">
            <h1 className="page__heading">Manage Blogs</h1>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <HeroButton
                redirectTo="/blogs/new?back=table"
                buttonValue="Create new"
                icon={<LibraryAddIcon />}
                bootstrapClass="me-2"
                start={true}
              />

              <HeroButton
                redirectTo="/blogs"
                buttonValue="Back"
                icon={<ArrowBackIcon />}
                start={true}
              />
            </div>

            <Table striped bordered hover className="mt-3" size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data !== null && data.length > 0 ? (
                  data.map((post) => {
                    i++;
                    return (
                      <tr key={uuidv4()}>
                        <td>{i}</td>
                        <td>{post.title}</td>
                        <td>
                          {post.content.length > 50
                            ? post.content.slice(0, 50) + "..."
                            : post.content}
                        </td>
                        <td>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-evenly"
                            spacing={1}
                          >
                            <IconButton
                              aria-label="edit"
                              size="small"
                              onClick={() => {
                                navigate(`/blogs/edit/${post._id}?back=table`);
                              }}
                            >
                              <EditIcon />
                            </IconButton>

                            <IconButton
                              aria-label="delete"
                              size="small"
                              onClick={() => {
                                handleDelete(post._id);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colspan="4" style={{ textAlign: "center" }}>
                      No Records Found!
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {totalPage > 1 && (
              <Stack spacing={2}>
                <Pagination
                  count={totalPage}
                  shape="rounded"
                  style={{ margin: "1rem auto" }}
                  color="standard"
                  onChange={(e, page) => {
                    changePage(page);
                  }}
                />
              </Stack>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tableview;
