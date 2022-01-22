import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import Image from 'next/image';

export default function Test() {
  var storage = firebase.storage();
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      let result = await storage.refFromURL('gs://hackportal-sponsor-images/').listAll();
      let urlPromises = result.items.map((imageRef) => imageRef.getDownloadURL());

      return Promise.all(urlPromises);
    };

    const loadImages = async () => {
      const urls = await fetchImages();
      setImages(urls);
    };
    loadImages();
    console.log(images);
  }, []);

  return (
    <div className="">
      {images.map((image) => {
        return (
          //change w and h to scale image to desired size
          <div key={image} className="relative w-[30rem] h-[10rem] bg-blue-200">
            <Image
              loader={() => image}
              src={image}
              sizes="100%"
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>
        );
      })}
    </div>
    // <div>Test</div>
  );
}
