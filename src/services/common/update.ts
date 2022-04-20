import models from 'src/models';
import { DatabaseError, ValidationError } from 'src/exceptions';

const update = async (body: any, modelName: string, idParams: string) => {
  let result;
  if (!+idParams) {
    throw new ValidationError('"id" n\'est pas un nombre !', {
      id: 'Ce champ doit être un nombre valide',
      NaN: Number.isNaN(idParams)
    });
  }

  try {
    result = await models[modelName].update(body, {
      where: { id: idParams }
    });
  } catch (error: any) {
    throw new DatabaseError(error.message, error.sql);
  }

  if (!result) {
    throw new ValidationError(
      'Impossible de modifier cette saisie, une erreur est survenue',
      { body }
    );
  }

  try {
    result = await models[modelName].findByPk(idParams);
  } catch (error: any) {
    throw new DatabaseError(error.message, error.sql);
  }

  if (!result) {
    throw new ValidationError(`Pas de ${modelName} avec cet id`, {
      id: 'Ce champ est obligatoire '
    });
  }
  return result.get({ plain: true });
};

export default update;
