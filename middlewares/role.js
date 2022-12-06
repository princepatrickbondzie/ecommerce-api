import { RoleCode } from '../common/enums.js';

export default (roleCode = RoleCode) => (req, res, next) => {
    req.currentRoleCode = roleCode;
    next();
};
