import models from 'src/models';
import { DatabaseError, ValidationError } from 'src/exceptions';

const findAll = async (modelName: string) => {
  let result;

  try {
    result = await models[modelName].findAll({
      include: { all: true, nested: true }
    });
  } catch (error: any) {
    throw new DatabaseError(error.message, error.sql);
  }

  if (!result || result === null) {
    throw new ValidationError(`Pas de ${modelName}`, {
      length: result.length || 0
    });
  }
  return result;
};

export default findAll;

// type IncludeType = {
//   modelToInclude: string;
//   as: string;
//   foreignKey?: string;
// };

// const findAll = async (modelName: string) => {
//   let result;

//   if (include) {
//     // const { modelToInclude, as } = include;
//     try {
//       result = await models[modelName].findAll({
//         //   include: include.foreignKey
//         //     ? [
//         //       {
//         //         model: models[modelToInclude],
//         //         as,
//         //         include: include.foreignKey
//         //       }
//         //     ]
//         //     : `${as}`
//         include: { all: true, nested: true }
//       });
//     } catch (error: any) {
//       throw new DatabaseError(error.message, error.sql);
//     }
//   } else {
//     try {
//       result = await models[modelName].findAll();
//     } catch (error: any) {
//       throw new DatabaseError(error.message, error.sql);
//     }
//   }

//   if (!result || result === null) {
//     throw new ValidationError(`Pas de ${modelName}`, {
//       length: result.length || 0
//     });
//   }
//   return result;
// };
