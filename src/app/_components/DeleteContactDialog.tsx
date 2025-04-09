'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from "@/components/ui/button";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { deleteContactAction } from '../_actions/deleteContactAction';
import { useState } from 'react';


interface IDeleteContactDialogProps {
  contactId: string;
}
export function DeleteContactDialog({ contactId }: IDeleteContactDialogProps) {
  const [isLoading, setIsloading] = useState(false);

  async function handleDeleteContact() {
    setIsloading(true);
    await deleteContactAction(contactId);
    setIsloading(false);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          className="h-8"
          variant="destructive"
          disabled={isLoading}
        >
          {isLoading && <Loader2Icon className='size-4 mr-1 animate-spin' />}
          {!isLoading && <Trash2Icon className="size-4" />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            O contato será deletado permanentemente e não poderá ser recuperado.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteContact}
          >
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
