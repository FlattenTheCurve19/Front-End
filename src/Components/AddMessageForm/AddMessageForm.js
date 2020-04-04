import React, { useState, useEffect } from "react";
import { useForm} from "react-hook-form";
import * as firebase from "firebase/app";
import { createPost } from "../../_utils/firedbHelper";

export default () => {
  const [file, setFile] = useState();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
      message: "",
      image: null
    }
  });

  useEffect(() => {
    register({ name: "image" }, { required: false });
  }, [register]);

  const onSubmit = data => {
    console.log(data);
    createPost(data.name, "1354", data.message, 20, 20, null, data.image);
  };

  const handleChange = e => {
    console.log(e);
    e.persist();
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = e => {
      setFile(e.target.result);
      setValue("image", e.target.result);
    };
    //   const fire = new firebase.firestore.Blob.fromUint8Array(e.target.files);
    //   console.log(fire);

    setValue("image", e.target.files);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input ref={register} id="name" name="name" />
        <label htmlFor="message">Message</label>
        <input ref={register} id="message" name="message" />
        <label htmlFor="image">Image</label>
        <input type="file" id="image" name="image" onChange={handleChange} />
        <input type="submit" />
      </form>
      {file ? <img alt="uploaded" src={file} /> : null}
    </>
  );
};
