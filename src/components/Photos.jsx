import { useState } from "react";
import Photo from "./Photo";

const Photos = () => {
  const [form, setFrom] = useState({
    urls: [],
  })

  const fileToDataUrl = file => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.addEventListener('load', evt => {
        resolve(evt.currentTarget.result);
      });

      fileReader.addEventListener('error', evt => {
        reject(new Error(evt.currentTarget.error));
      });

      fileReader.readAsDataURL(file);
    });
  }

  const handleSelect = async (evt) => {
    const files = [...evt.target.files];
    const urlsLink = await Promise.all(files.map(o => fileToDataUrl(o)));
    setFrom(
      prevForm => ({ ...prevForm, urls: [...prevForm.urls, ...urlsLink] })
    )
  }

  const handleRemove = (image) => {
    const filteredUrls = form.urls.filter(o => o !== image)
    setFrom(prevForm => ({ ...prevForm, urls: filteredUrls }));
  }

  return (
    <div>
      <label htmlFor="files">Click to select</label>
      <input type="file" id="files" name="files" multiple accept="image/*" hidden onChange={handleSelect} />
      <ul>
        {form.urls
          .map(image => {
            return (
              <Photo key={image.toString()} image={image} handleRemove={handleRemove} />
            )
          })}
      </ul>
    </div>
  )
}

export default Photos;