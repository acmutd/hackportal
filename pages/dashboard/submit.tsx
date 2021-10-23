import createSpacing from '@material-ui/core/styles/createSpacing';
import { FormatLineSpacing } from '@material-ui/icons';
import Head from 'next/head';
import React from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import Sidebar from './Components/Sidebar';

/**
 * The dashboard / submit.
 *
 * Landing: /submit
 */
export default function Submit() {
  return (
    <div className="flex flex-wrap flex-grow">
      <Head>
        <title>HackerPacks</title>
        <meta name="description" content="HackPortal's Project Submissions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section id="jumbotron" className="p-2">
        <div className="max-w-4xl py-6 mx-auto">
          <div className="text-4xl  text-left">Ready to Submit?</div>
          <div className="text-1xl my-4 font-bold font-small text-left">
            We’re so glad you were able to work on a project with us this weekend! Please fill out
            the following fields to officially submit your project. Please keep in mind that only
            one teammate needs to submit to the portal.
          </div>
        </div>
      </section>
      <section id="registration" className="m-4">
        <div className="max-w-4xl py-4 mx-auto">
          <form onSubmit={submit} className="max-w-4xl mx-auto">
            <label className="text-1xl my-4 font-bold font-small text-left">
              Title
              <br />
              <input
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
                type="text"
              />
              <br /> <br />
            </label>

            <label className="text-1xl my-4 font-bold font-small text-left">
              Description
              <br />
              <input
                type="text"
                className="border min-w-full h-36 pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
              />
              <br />
              <br />
            </label>
            <label className="text-1xl my-4 font-bold font-small text-left">
              Add Teammates
              <br />
              <input
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
                type="text"
              />
              <br /> <br />
            </label>
            <label className="text-1xl my-4 font-bold font-small text-left">
              Project Link (Github or ReplIT)
              <br />
              <input
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
                type="text"
              />
              <br /> <br />
            </label>
            <label className="text-1xl my-4 font-bold font-small text-left">
              Additonal Media (optional)
              <br />
              <input
                className="border min-w-full pt-3 pb-3 text-grey-darkest px-5 bg-indigo-100 rounded-md"
                type="text"
              />
              <br /> <br />
            </label>
            <label className="text-1xl my-4 font-bold font-small text-left">
              Which challenges are you submitting you project to?
              <br />
              <br />
              <input type="checkbox" id="StateFarm" name="StateFarm" value="Project" />
              <label className="StateFarm"> StateFarm</label>
              <br />
              <br />
              <br />
              <input
                type="checkbox"
                id="Facebook Instagram"
                name="Facebook Instagram"
                value="Project"
              />
              <label className="Facebook Instagram">Facebook Instagram </label>
              <br />
              <br />
              <br />
              <input type="checkbox" id="HackUTD" name="HackUTD" value="Project" />
              <label className="HackUTD"> HackUTD</label>
              <br />
              <br />
              <br />
              <input type="checkbox" id="Capital One" name="Capital One" value="Project" />
              <label className="Capital One"> Capital One</label>
              <br />
              <br />
              <br />
              <input type="checkbox" id="Coca Cola" name="Coca Cola" value="Project" />
              <label className="Coca Cola">Coca Cola</label>
              <br />
              <br />
              <br />
              <input
                type="checkbox"
                id="UTD Student Government"
                name="UTD Student Government"
                value="Project"
              />
              <label className="UTD Student Government">UTD Student Government</label>
              <br />
              <br />
              <br />
              <input
                type="checkbox"
                id="Facebook React API"
                name="Facebook React API"
                value="Project"
              />
              <label className="vehicle2">Facebook React API</label>
              <br />
              <br />
              <br />
              <input type="checkbox" id="Notion API" name="Notion API" value="Project" />
              <label className="Notion API"> Notion API</label>
              <br />
              <br />
            </label>
            <input
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded "
              type="submit"
              value="Submit"
            />
          </form>
        </div>{' '}
      </section>
    </div>
  );
}
