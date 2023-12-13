import ErrorResponseHandler from '@/utils/ErrorResponseHandler';
import SuccessResponseHandler from '@/utils/SuccessResponseHandler';
import httpStatus from '@/utils/httpStatus';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export async function DELETE(request, context) {
    const {params} = context
    
    try {

      prisma.$connect();
      await prisma.notes.delete({
        where: {
          id: params.noteId,
        },
      });
  
      return SuccessResponseHandler(
        [],
        "Note created successfully.",
        httpStatus.HTTP_202_ACCEPTED
      );
    } catch (error) {
       
      return ErrorResponseHandler(error);
    }
  }