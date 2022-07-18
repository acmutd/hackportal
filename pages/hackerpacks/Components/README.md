# Hackerpack Instructions

The hackerpack is where we place all the resources that could aid a hacker during and before the hackathon. Some commonly placed categories on this page includes:

- General Information
- Food (both provided and nearby restaurants)
- Workshop Info
- FAQ
- ...and anything else that could help!

## Customization Options

We designed the hackerpack to be as easy as possible to customize! In the current directory (`pages/hackerpacks/Components`), you should see a `hackerpack-settings.json` file. This file contains the main toggleable options for editing the hackerpack. The format is as shown (with the example data):

```json
{
  "sidebar": true,
  "mainContent": "markdown",
  "notionPageId": "b76d2dee46474cd0a9bb7f62b384ad25"
}
```

- The `sidebar` attribute (boolean) will show the sidebar + mobile menu navigator when set to `true`. 
- The `mainContent` attribute (string) determines how the page will be displayed, with 3 possible options:
    - `markdown` - generate content from a Markdown file (replace the `markdown/index.md` file with your custom markdown file)
    - `notion` - generate content from a Notion page
    - `html` - manually add React/JSX in the `pages/hackerpacks/index.tsx` file)
- If you pick the Notion page option, please include the `notionPageId` attribute, which is an ID for a **public** Notion page (see [the official Notion docs](https://developers.notion.com/docs/working-with-page-content#creating-a-page-with-content)).

## Sidebar Generation

The sidebar will display `h1` and `h2` headings, with the `h2` tags nested under their respective `h1` tag. This will differ in generation methods based on how you generate your main content:

- `markdown` - the sidebar will be generated based on `# [main headings]` and `## [subheadings]` as the `h1` and `h2` tags
- `notion` - as Notion has built-in headings, so the `h1` and `h2` tags will be used
- `html` - you will need to manually define the sidebar in the `sidebar-content.json` file

**NOTE**: The markdown and Notion pages should contain a main heading (`# heading` or `h1`) first to generate the sidebar correctly as subheadings are nested under the main headings.
