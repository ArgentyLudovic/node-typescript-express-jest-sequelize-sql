import models from 'src/models';
import { DatabaseError, ValidationError } from 'src/exceptions';

type SecondModelType = {
  secondModelName: string;
  foreignKey: number;
};

const create = async (
  body: any,
  modelName: string,
  secondModel?: SecondModelType
) => {
  let result;
  if (secondModel) {
    let modelToJoin;
    const { secondModelName, foreignKey } = secondModel;
    try {
      modelToJoin = await models[secondModelName].findByPk(foreignKey);
    } catch (error: any) {
      throw new DatabaseError(error.message, error.sql);
    }
    try {
      result = await models[modelName].create(body);
      switch (secondModel.secondModelName) {
        case 'Project':
          modelToJoin.addProject(result);
          modelToJoin.save();
          break;
        case 'Task':
          modelToJoin.addTimeEntry(result);
          modelToJoin.save();
          break;
        default:
          throw new ValidationError('Un probléme est survenu ...', {
            secondModelName:
              'La jointure entre les deux tables a rencontré un problème'
          });
      }
    } catch (error: any) {
      throw new DatabaseError(error.message, error.sql);
    }
  } else {
    result = await models[modelName].create(body);
  }

  if (!result) {
    throw new ValidationError('Un probléme est survenu ...', {});
  }
  return result.get({ plain: true });
};

export default create;
