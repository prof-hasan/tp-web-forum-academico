import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../page';

describe('Register Page', () => {

  it('should render the form fields', () => {
    render(<Page />);

    expect(screen.getByLabelText(/Nome Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Link Customizável/i)).toBeInTheDocument();
  });

  it('should allow user to type into the fields', () => {
    render(<Page />);

    const fullNameInput = screen.getByLabelText(/Nome Completo/i);
    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    expect(fullNameInput).toHaveValue('John Doe');

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('should submit the form when clicking SAVE', () => {
    render(<Page />);

    const saveButton = screen.getByText(/SAVE/i);
    fireEvent.click(saveButton);

    // Aqui você pode adicionar lógica para verificar o envio do formulário
  });

  it('should clear the fields when clicking CANCEL', () => {
    render(<Page />);

    const fullNameInput = screen.getByLabelText(/Nome Completo/i);
    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });

    const cancelButton = screen.getByText(/CANCEL/i);
    fireEvent.click(cancelButton);

    expect(fullNameInput).toHaveValue('');
  });
});
