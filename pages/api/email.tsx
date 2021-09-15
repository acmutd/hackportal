import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const USERNAME = process.env.username;
const PASSWORD = process.env.password;

export default function emailConfirmation(req: NextApiRequest, res: NextApiResponse) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: USERNAME,
      pass: PASSWORD,
    },
    secure: true,
  });

  let data = req.body;

  const mailData = {
    from: USERNAME,
    to: data.email,
    subject: `Thank you for registering for [HACKATHON]`,
    text: 'Works',
    html: `
      <h1> Hackathon Registration Responses *Enhance later* </h1>
      <p> Name: ${data.fname} ${data.lname} </p>
      <p> Email: ${data.email} </p>
      <p> Age: ${data.age} </p>
      <p> Gender: ${data.gender} </p>
      <p> Race: ${data.race} </p>
      <p> Ethnicity: ${data.ethnicity} </p>
      <p> University: ${data.university} </p>
      <p> Major: ${data.major} </p>
      <p> Year: ${data.year} </p>
      <p> Hackathon Experience: ${data.hackathonExperience} </p>
      <p> Heard From: ${data.heardFrom} </p>
      <p> Shirt Size: ${data.shirtSize} </p>
      <p> Software Experience: ${data.softwareExperience} </p>
      <p> Allergies: ${data.allergies} </p>
      <p> Accommodations: ${data.accommodations} </p>
      <p> Github: ${data.github} </p>
      <p> Linkedin: ${data.linkedin} </p>
      <p> Website: ${data.website} </p>
      <p> Companies: ${data.companies} </p>
      `,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  res.status(201).end(`Email sent`);
}
