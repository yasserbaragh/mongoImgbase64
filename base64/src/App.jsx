import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [label, setLabel] = useState('');
  const [image, setImage] = useState({ myFile: "" });
  const [fetchedImage, setFetchedImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('http://localhost:3000/');
        if (response.ok) {
          const data = await response.json();
          setFetchedImage(data);
        } else {
          console.error('Error fetching image');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchImage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ label, image });

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ label, image: image.myFile })
      });

      if (response.ok) {
        console.log('Image uploaded successfully');
      } else {
        console.error('Error uploading image');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const converImg = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await converImg(file);
    console.log(base64)
    setImage({ ...image, myFile: base64 })
  }

  return (
    <>
      <div className="container">
        <h1>Upload Image</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="label">Label</label>
            <input
              type="text"
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => handleFileUpload(e)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {fetchedImage && (
          <div className="fetched-image">
            <h2>{fetchedImage.label}</h2>
            <img src={fetchedImage.image} alt={fetchedImage.label} />
          </div>
        )}
      </div>
    </>
  )
}

export default App
