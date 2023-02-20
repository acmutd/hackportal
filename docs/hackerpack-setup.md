# Hackerpack Instructions

The hackerpack is where we place all the resources that could aid a hacker during and before the hackathon. Some commonly placed categories on this page include:

- General Information
- Food (both provided and nearby restaurants)
- Workshop Info
- FAQ
- ...and anything else that could help!

## Customization Options

We designed the hackerpack to be as easy as possible to customize! In the hackerpack components directory (`components/hackerpackComponents`), you should see a `hackerpack-settings.json` file. This file contains the main toggleable options for editing the hackerpack. The format is as shown (with the example data):

```json
{
  "sidebar": true,
  "mainContent": "markdown",
  "notionPageId": "b76d2dee46474cd0a9bb7f62b384ad25"
}
```

- The `sidebar` attribute (boolean) will show the sidebar + mobile menu navigator when set to `true`. 
- The `mainContent` attribute (string) determines how the page will be displayed, with 3 possible options:
    - `markdown` - generate content from a Markdown file (replace the `pages/hackerpacks/Components/markdown/index.md` file with your custom markdown file)
    - `notion` - generate content from a Notion page
    - `html` - manually add React/JSX in the `pages/hackerpacks/index.tsx` file)
- If you pick the Notion page option, make sure to include the `notionPageId` attribute, which is an ID for a **public** Notion page (see [the official Notion docs](https://developers.notion.com/docs/working-with-page-content#creating-a-page-with-content)).

## Sidebar Generation

The sidebar will display `h1` and `h2` headings, with the `h2` tags nested under their respective `h1` tag. This will differ in generation methods based on how you generate your main content. The sidebar is automatically generated if content is either rendered from Markdown or from Notion.

* If the `mainContent` attribute is set to `markdown`, the sidebar will be generated based on `# [main headings]` and `## [subheadings]` as the `h1` and `h2` tags.
* If the `mainContent` attribute is set to `notion`, the sidebar will be generated based on Notion's `Heading 1` and `Heading 2` blocks.

**NOTE**: Pages should contain a main heading (`# [heading name]` or Notion's `Heading 1`) first to generate the sidebar correctly, as subheadings are nested under the main headings.

Unfortunately, there is no good way to read hardcoded HTML and generate a sidebar, so if you have a custom HTML page, you will need to modify the `sidebar-content.json` file to generate a working sidebar.
