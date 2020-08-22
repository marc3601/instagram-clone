import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import "./ImageUpload.css";
import { storage, db } from "./firebase";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState("");
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    if (image !== null) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (err) => {
          console.log(err);
          alert(err.message);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("posts").add({
                //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageURL: url,
                userName: username,
              });
              setProgress(0);
              setCaption("");
              setImage(null);
            });
        }
      );
    } else {
      alert("Choose file");
    }
  };
  return (
    <div className="app__upload">
      <LinearProgress className="app__progress" variant="determinate" value={parseFloat(progress)} max="100" />
      <Input
        className="app__text"
        type="text"
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Enter a caption"
      />
      <Input className="app__file" type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;

//test