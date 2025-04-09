'use server';

import { db } from "@/lib/db";
import { sleep } from "@/lib/utils";
import { ActionResponse } from "@/types/ActionResponse";
import { revalidatePath } from "next/cache";

// Para importar uma função server actions, é necessário que o 'use server' seja usado fora da função
// dessa forma todas as funções dentro do arquivo serão consideradas server actions.
export async function deleteContactAction(contactId: string): Promise<ActionResponse> {

  try {
    await sleep()
    await db.contact.delete({
      where: {
        id: contactId,
      }
    })

    revalidatePath('/')

    return {
      status: 'success',
      body: { contactId }
    }
  } catch (error) {
    return {
      status: 'error',
      body: {
        message: 'Erro ao deletar o contato!'
      }
    }
  }
}
