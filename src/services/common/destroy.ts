import models from 'src/models';
import { DatabaseError, ValidationError } from 'src/exceptions';

const destroy = async (idParams: string, modelName: string) => {
  let result;
  if (!+idParams) {
    throw new ValidationError('"id" n\'est pas un nombre !', {
      id: 'Ce champ doit être un nombre valide',
      NaN: Number.isNaN(idParams)
    });
  }

  try {
    result = await models[modelName].destroy({
      where: { id: idParams }
    });
  } catch (error: any) {
    throw new DatabaseError(error.message, error.sql);
  }

  if (!result || result === null) {
    throw new ValidationError(`Pas de ${modelName} avec cet id`, {
      id: 'Ce champ est obligatoire'
    });
  }
  return `${modelName} ( ${idParams} ) deleted`;
};

export default destroy;
