import Head from 'next/head';
import React, { useState } from 'react';
import { createWidget } from '@typeform/embed';
import '@typeform/embed/build/css/widget.css';
import { Widget, PopupButton } from '@typeform/embed-react';

/**
 * The registration page.
 *
 * Registration: /
 */

export default function Register() {
  const MyComponent = () => {
    return (
      <Widget
        id="OOaXSlG8"
        hidden={{
          foo: 'Foo Value',
          bar: 'Bar Value',
        }}
        style={{ width: '100%' }}
        className="typeform"
      />
    );
  };

  return MyComponent();
}
