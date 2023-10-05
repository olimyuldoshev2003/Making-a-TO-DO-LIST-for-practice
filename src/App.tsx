import { Box, Modal, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, FormEvent } from "react";

const App = () => {
  interface IData {
    id: number;
    title: string;
    complete: boolean;
  }

  const [data, setData] = useState<IData>([]);
  const [text, setText] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [idx, setIdx] = useState<number>(0);

  const API = "http://localhost:3000/data";

  async function getData() {
    try {
      const { data } = await axios.get(API);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addData(obj: IData) {
    try {
      const { data } = await axios.post(API, obj);
      getData();
    } catch (error) {
      // console.log(error);
    }
  }

  async function deleteData(id: number) {
    try {
      const { data } = await axios.delete(`${API}/${id}`);
      console.log(data);
      getData();
    } catch (error) {
      console.log(error);
    }
  }

  async function editData(obj: IData) {
    try {
      const { data } = await axios.put(`${API}/${obj.id}`, obj);
      getData();
    } catch (error) {}
  }

  useEffect(() => {
    getData();
  }, []);

  //my functions
  function handleClose() {
    setModal(false);
  }

  return (
    <div>
      <header className="header">
        <h1 className="text-center text-[60px] text-[red] font-[700]">
          TO DO LIST
        </h1>
        <form
          className="flex justify-center gap-11"
          action=""
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            if (text.trim().length === 0) {
              event.preventDefault();
              alert("Hey fill it now");
            } else {
              event.preventDefault();
              let newObj = {
                id: Date.now(),
                title: text,
                complete: false,
              };

              addData(newObj);
              setText("");
            }
          }}
        >
          <input
            type="text"
            className="p-[5px_40px] outline-none border-[2px] border-[green] rounded-[15px] text-[#000] placeholder:text-[#000]"
            value={text}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setText(event.target.value)
            }
            name=""
            id=""
            placeholder="Add User"
          />
          <button
            type="submit"
            className="outline-none border-[2px] border-[gray] p-[5px_40px] rounded-[30px] bg-[red] text-white"
          >
            Add
          </button>
        </form>
      </header>
      <section className="section flex flex-col gap-1">
        {data.map((item: IData) => {
          return (
            <div
              key={item.id}
              className="flex flex-col justify-center items-center mt-14 gap-3"
            >
              {item.complete ? (
                <h1 className="text-[25px] text-[red] line-through">
                  {item.title}
                </h1>
              ) : (
                <h1 className="text-[25px] text-[blue]">{item.title}</h1>
              )}
              <div className="for_buttons flex items-center gap-5">
                <button
                  onClick={() => deleteData(item.id)}
                  className="outline-none border-[2px] border-[gray] p-[5px_40px] rounded-[30px] bg-[#9034fa] text-white"
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="w-[38px] h-[38px] outline-none"
                  checked={item.complete}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    let newUser = {
                      id: item.id,
                      title: item.title,
                      complete: event.target.checked,
                    };

                    editData(newUser);
                  }}
                />
                <button
                  onClick={() => {
                    setModal(true);
                    setTitle(item.title);
                    setIdx(item.id);
                  }}
                  className="outline-none border-[2px] border-[gray] p-[5px_40px] rounded-[30px] bg-[#39e8ff] text-black"
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}

        <Modal
          open={modal}
          onClose={() => handleClose()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex justify-center items-center"
        >
          <Box className="w-[280px] py-[20px] px-[30px] bg-[#fff] rounded-[20px] flex flex-col gap-[60px]">
            <h1 className="text-center text-[27px] text-[green]">
              Edit Username
            </h1>
            <form
              action=""
              className="flex flex-col items-start gap-5"
              onSubmit={(event: FormEvent<HTMLFormElement>) => {
                if (title.trim().length === 0) {
                  event.preventDefault();
                  alert("Hey fill your edition");
                } else {
                  event.preventDefault();
                  let newObj = {
                    id: idx,
                    title: title,
                    complete: false,
                  };

                  editData(newObj);
                  setModal(false);
                }
              }}
            >
              <input
                type="text"
                name=""
                id=""
                value={title}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(event.target.value)
                }
                className="p-[5px_20px] outline-none border-[2px] border-[green] rounded-[15px] text-[#000] placeholder:text-[#000]"
                placeholder="Edit User"
              />
              <button className="outline-none border-[2px] border-[gray] p-[5px_40px] rounded-[30px] bg-[red] text-white">
                Edit
              </button>
            </form>
          </Box>
        </Modal>
      </section>
    </div>
  );
};

export default App;
