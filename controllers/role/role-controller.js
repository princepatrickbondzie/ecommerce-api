import User from '../../models/User.js';
import { Types } from 'mongoose';
// import UserRepo from '../../repository/UserRepo.js';
// import RoleRepo from '../../repository/RoleRepo.js';
import asyncHandler from '../../middlewares/asyncHandler.js';
import { InternalError } from '../../core/ApiError.js';
// import { SuccessMsgResponse, SuccessResponse } from '../../core/ApiResponse.js';
// import { RoleCode } from '../../common/enums.js';
import Role from '../../models/Role.js';
import RequestRole from '../../models/RequestRole.js';

const createRole = asyncHandler(async (req, res) => {
    // console.log(req.body.code)
    try {
        const checkRole = await Role.findOne({ code: req.body.code });
        if (checkRole)
            throw new Error('Role already exist')

        const role = await Role.create({ code: req.body.code });
        // return new SuccessResponse("Role request created successfully", role).send(res);
        res.status(201).json({ role })
    } catch (err) {
        throw new Error(err)
    }
});


const getAllRoles = asyncHandler(async (req, res) => {
    const roles = await Role.find().lean().populate({
        path: "user"
    }).populate({
        path: "role"
    }).exec();

    res.status(200).json({
        message: "Role requests retrieved successfully",
        roles
    })
    // return new SuccessResponse("Role requests retrieved successfully", roles).send(res);
});

const requestARole = asyncHandler(async (req, res) => {
    let role = {
        user: req.user._id,
        role: req.body.role,
        approved: false,
    };

    const order = await RequestRole.create(role);

    res.status(200).json({
        message: "Role requests created successfully",
        order
    })
    // return new SuccessResponse("Role request created successfully", order).send(res);
});

const getAllRoleRequests = asyncHandler(async (req, res) => {
    const requests = await RequestRole.find().lean().populate({
        path: "user"
    }).populate({
        path: "role"
    }).exec();

    res.status(200).json({ message: "Role requests retrieved successfully", requests })
    // return new SuccessResponse("Role requests retrieved successfully", requests).send(res);
});

const updateRoleRequest = asyncHandler(async (req, res) => {
    let approverId = req.user._id;
    let roleId = new Types.ObjectId(req.params.id);
    let user;

    const role = await Role.findById(roleId);
    role.approvedBy = approverId;
    role.approved = true;

    const fetchedUser = await User.findById(role.user);
    if (fetchedUser === null || fetchedUser._id === undefined)
        throw new InternalError('User not registered')

    user = fetchedUser;
    user.roles.push(role.role);

    await RequestRole.updateOne({ _id: role._id }, { $set: { ...role } }).lean().exec();
    await User.updateOne({ _id: user._id }, { $set: { ...user } }).lean().exec();

    res.status(200).json({ message: "Role requests upadated successfully" })
    // return new SuccessMsgResponse("Role requests upadated successfully").send(res);
});

export { createRole, requestARole, getAllRoles, getAllRoleRequests, updateRoleRequest }