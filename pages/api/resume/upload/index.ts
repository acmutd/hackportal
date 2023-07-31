import { NextApiRequest, NextApiResponse } from 'next';
import firebase from 'firebase';
import 'firebase/storage';
import nc from 'next-connect';
import multer from 'multer';

interface NCNextApiRequest extends NextApiRequest {
  file: Express.Multer.File;
}

const handler = nc<NCNextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.log(err);
    res.status(500).json({
      msg: 'Server error',
    });
  },
  onNoMatch: (req, res, next) => {
    res.status(404).json({
      msg: 'Route not found',
    });
  },
});

handler.use(multer().single('resume'));
handler.post(async (req, res) => {
  if (!req.file) res.end();
  if (firebase.apps.length <= 0)
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });

  await firebase
    .auth()
    .signInWithEmailAndPassword(
      process.env.NEXT_PUBLIC_RESUME_UPLOAD_SERVICE_ACCOUNT,
      process.env.NEXT_PUBLIC_RESUME_UPLOAD_PASSWORD,
    );

  const storageRef = firebase.storage().ref();
  const studyLevelRef = storageRef.child('resumes/' + req.body.studyLevel);
  const majorRef = studyLevelRef.child(req.body.major);
  const fileRef = majorRef.child(req.body.fileName);

  await fileRef.put(req.file.buffer);
  const fileUrl = await fileRef.getDownloadURL();
  res.status(200).json({
    url: fileUrl,
  });
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default handler;
