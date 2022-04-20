import models from 'src/models';
import { DatabaseError, ValidationError } from 'src/exceptions';

const findByPk = async (idParams: string, modelName: string) => {
  let result;

  if (!+idParams) {
    throw new ValidationError('"id" n\'est pas un nombre !', {
      id: 'Ce champ doit être un nombre valide',
      NaN: Number.isNaN(idParams)
    });
  }

  try {
    result = await models[modelName].findByPk(idParams, {
      include: { all: true, nested: true }
    });
  } catch (error: any) {
    throw new DatabaseError(error.message, error.sql);
  }

  if (!result || result === null) {
    throw new ValidationError(`Pas de ${modelName} avec cet id`, {
      id: 'Ce champ est obligatoire'
    });
  }
  return result;
};

export default findByPk;

// type SecondModelType = {
//   modelName: string;
//   as: string;
//   foreignKey?: string;
// };

// if (secondModel) {
//   try {
//     result = await models[modelName].findByPk(idParams, {
//       // include: secondModel.foreignKey
//       //   ? [
//       //     {
//       //       model: models[secondModel.modelName],
//       //       as: secondModel.as,
//       //       include: secondModel.foreignKey
//       //     }
//       //   ]
//       //   : secondModel.as
//       include: { all: true, nested: true }
//     });
//   } catch (error: any) {
//     throw new DatabaseError(error.message, error.sql);
//   }
// } else {
//   try {
//     result = await models[modelName].findByPk(idParams);
//   } catch (error: any) {
//     throw new DatabaseError(error.message, error.sql);
//   }
// }

// if (!result || result === null) {
//   throw new ValidationError(`Pas de ${modelName} avec cet id`, {
//     id: 'Ce champ est obligatoire'
//   });
// }
// return result;
// };
