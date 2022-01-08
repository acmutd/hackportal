import { useState } from 'react';

export default function FAQComponent(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="facts">
      <h2 className="question text-3xl md:my-0 my-2" onClick={() => setOpen(!open)}>
        {props.faqquestion}
      </h2>
      {open && props.children}
    </div>
  );
}
