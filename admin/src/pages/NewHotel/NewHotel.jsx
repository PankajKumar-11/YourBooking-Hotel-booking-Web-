import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewHotel = () => {
  const [files, setFiles] = useState(null);
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const { data, loading, error } = useFetch(`/rooms`); // useFetch now uses BASE_URL
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  console.log(files);
  // console.log(rooms);  

  useEffect(() => {
    console.log(rooms);
  }, [rooms]);

  const BASE_URL = import.meta.env.VITE_API_URL || "";
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dawvddan2/image/upload",
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );

      const newHotel = {
        ...info,
        rooms,
        photos: list,
      };
      await axios.post(`${BASE_URL}/hotels`, newHotel);
      navigate("/hotels");
    } catch {}
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files && files.length > 0
                  ? URL.createObjectURL(files[0])
                  : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAACUCAMAAAAu5KLjAAAAY1BMVEX///9NTU08PDycnJxQUFDX19dCQkIwMDCgoKBFRUVwcHD8/PxKSko/Pz+1tbUpKSnw8PA1NTXj4+OWlpaqqqq8vLxhYWEaGhrIyMjq6uqPj48gICAAAABYWFjPz895eXkPDw/zRe5tAAAD8klEQVR4nO2af5OyIBCAhUhDIcXSrHvL+/6f8l0wJ1PwmgSbZva5++PmSvZx+bUZUYQgCIIgCIIgCIIgCIIgCIIgCIKEpTxsgnMoF2tulZQ0KFKq7XLNmJHAsNiDpoSG4I5DQaF5uVAz67Ipj7tgHGWXzWypJiFq2c3OowjxoQmdnkTLmpkl6Tp9cTZZ6Gz66XRmshmMBDU9gpo+QU2fhNeEl4uyLMwf2btxgmtm0flSE1JfFpWL4bPZCMq5EFRUC2IE17zJmDAB9aL4ub0fI6wmjEUu+7pWsPejhM7m9pexe2XP6PvdHlpzn3SajAgmd2/HCa6pHp+S5MEZx6xUMxJBNSE4aIpekx7dTXxSE14q/sHU6TUbdyO7YjZG4E7Popr2lrzOnHH2p80nNaPofJXdJIpVad0stftNCrX/XKdryvoEnztFTm6OLR08OSdCze2mK+zpWdXWdVqZysMWJ8ta2AIYJ+cPapqmiyKySxr3HawG8CNbt8Vn681Mq2/pfclKds5K78NlsS5G827Fgnn2W7lEPq0JA5N2m75gsBG4plE4Tft8mVx6pIOng7Iu7CV+wGy+VK43SjwsGaGt/W3hNG+vPDfNlBg+wGUkt6/ywTQbGtM/y/UsjYdPhEW38a/S6TC04LfJOYvj2X6Hd23U5GE4l6VFJ4Cm/m2kzkxcn2cbhoHJxEiT0XoVTf2PYyIeM9dJkZOJJQxP1U59PGt27eyNpRlpqb1ts4Omcmp5L59Da+ou36l+SsB/L9YiUy+qG+r4lkaoSf3svdOz7JIMupCpjWOZb/7ZJbUnHRdL/jUv6ikkg3rXdk3J7+PCAovb0Zj2qgl5K1o6iilgxX5uXw+D4nnFHF1CksPznulTU5c7qZpGHT9G0JoHy/uG+RztRl41s6KdRIfJzEfbJlzQJHNfcsJr4vm7P6+dXqSUjMPrPZur4ZSAWb5NLCvmsye/Drcwr5r7kyNH/Hp+jDUYmDWf7XJze/Q6sPKrmbuCwnY0mBKX8TSz5BMa3Dy8VtGE/lX1I0TlSvqzqEgeS9lK2YTpbrYjHWfLxdy4HNxdfOs/A6ymSegmMiWe3spfsgQz3q/y62my09Gkpp3WmM5LaLp2NqGjzWOiKmfixU5nUBHcP7onbK1sQtikim6v59Kgd1qIANn09LX/35qwFjYvD8z7nZFkqwOsNzZ1UMG5mOxT8/D63GVzPc1O9bWB2QE3pdpi5U5/C/ZTrdzp72nqWeQ5mwHOoPWanrKpdIXEA/DjT7M7LlXVaQDqyt9xqfCHz6ifTg99lI8v1Iy+42Bk9D3HTL/j0O6XHIFGEARBEARBEARBEARBEARBEARB5vkPxPBQx68DwdgAAAAASUVORK5CYII="
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : Array.isArray(data) &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
