'use client';

import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {label}
    </button>
  );
};
