'use client'

import { FormEvent, useActionState, useEffect, useState, useTransition } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Loader2Icon } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { ActionResponse } from '@/types/ActionResponse';
import { useRouter } from 'next/navigation';
import { ZodIssue } from 'zod';

interface IContactFormProps {
  contact?: {
    name: string;
    email: string;
  };
  submitAction: (formData: FormData) => Promise<ActionResponse>;
}

// Forma 1 de resolver o problema do loading
function SubmitButton({ contact }: { contact: IContactFormProps['contact'] }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2Icon className="size-4 mr-1 animate-spin" />}
      {contact ? 'Salvar' : 'Criar'}
    </Button>
  )
}

export function ContactForm({ contact, submitAction }: IContactFormProps) {
  const router = useRouter()


  // Forma 2 de resolver o problema do loading
  // const [isPending, startTransition] = useTransition();
  // function clientSubmitAction(formData: FormData) {
  //   startTransition(async () => {
  //     await submitAction?.(formData)
  //   })
  // }

  // Forma 3 de resolver o problema do loading
  const [state, clientSubmitAction, isPending] = useActionState(
    async (_previousData: any, formData: FormData) => {
      const response = await submitAction(formData);

      if (response?.status === 'success') {
        router.push(`/contacts/${response.body.contact.id}/edit`)
      }

      return response
    },
    null
  );


  return (
    <form className="space-y-4" action={clientSubmitAction}>
      {state?.body.message && state.body.message.map((issue: ZodIssue) => issue.message).join('/')}

      <div className="space-y-1.5">
        <Label>Nome</Label>
        <Input
          defaultValue={contact?.name}
          name="name"
        />
      </div>

      <div className="space-y-1.5">
        <Label>E-mail</Label>
        <Input
          defaultValue={contact?.email}
          name="email"
        />
      </div>


      <Button type="submit" disabled={isPending}>
        {isPending && <Loader2Icon className="size-4 mr-1 animate-spin" />}
        {contact ? 'Salvar' : 'Criar'}
      </Button>
    </form>
  );
}
