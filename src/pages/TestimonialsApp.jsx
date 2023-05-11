import React, { useState, useEffect, useRef } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
export default function TestimonialsApp() {
  // const handleClick = () => {
  //   console.log("My Click");
  // };
  const [testimonials, setTestimonials] = useState("");
  const [items, setItems] = useState();
  const effectRun = useRef(false)

  useEffect(() => {
    // setTestimonials("Users");
    // console.log(testimonials);
    if (effectRun.current === true){
      const fetchItems = async () => {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/${testimonials}`
        );

        console.log(response);
        try {
          const json = await response.json();
          setItems(json);
        } catch (error) {
          setItems(null);
        }
      };
      fetchItems();
    };
    return () => {
      // console.log(items);
      effectRun.current = true;
    }
    }, [testimonials]);
  return (
    <div className="container m-auto">
      <Title text={"Testimonials App"} />
      <Button
        text={"Posts"}
        btnClass="btn-info "
        icon={<BsFillFileEarmarkPostFill className="" />}
        onClick={() => setTestimonials("Posts")}
      />{" "}
      <Button
        text={"Users"}
        btnClass="btn-info "
        icon={<FaUserAlt />}
        onClick={() => setTestimonials("Users")}
      />
      <Button
        text={"Comments"}
        btnClass="btn-info "
        icon={<BiCommentDetail />}
        onClick={() => setTestimonials("Comments")}
      />
      <Title
        classes={"subtitle text-primary"}
        text={!testimonials ? "Select form above!" : testimonials}
      />
      {!items
        ? null
        : items.map((item) => {
            return (
              <div className="card card-primary mb-2" key={item.id}>
                {item.name && <h2 className="card-header">{item.name}</h2>}
                <div className="card-body">
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
                {item.email && (
                  <small className="card-footer">{item.email}</small>
                )}
              </div>
            );
          })}
    </div>
  );
}
