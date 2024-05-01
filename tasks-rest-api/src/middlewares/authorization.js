import { getUserId, getUserRole } from '../utils/contextUtils';
import { PERMISSION_TYPES } from '../constants/permissionConstants';
import ForbiddenException from '../exceptions/ForbiddenException';

export default function authorization(permittedRoles, getOwner = null, inputFormatter = null, outputFormatter = null) {
  return async (req, res, next) => {
    const userRole = getUserRole();

    if (userRole) {
      if (permittedRoles.includes(PERMISSION_TYPES.ANY) || permittedRoles.includes(userRole)) {
        return next();
      }
      if (permittedRoles.includes(PERMISSION_TYPES.OWNER)) {
        const userId = getUserId();
        let inputParameters = { ...req.body, ...req.params, ...req.query };
        if (inputFormatter) {
          inputParameters = inputFormatter(inputParameters);
        }
        let ownerId = await getOwner(...inputParameters);

        if (outputFormatter) {
          ownerId = outputFormatter(ownerId);
        }
        if (userId === ownerId) {
          return next();
        }
      }
    }
    return next(new ForbiddenException('User is not authorized to perform this action'));
  };
}
