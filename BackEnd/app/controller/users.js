import {
    getAccessToken,
    getUserById,
    searchUser,
    updateUser
} from "../model/users.js"
import { hashPassword } from "../utils/hash_password.js"
import { InternalError, NotFound, UnprocessableEntity } from "../utils/request_error.js"
import * as path from "path";
import sharp from "sharp";
import {upload} from "../../config/multer.js";
import * as fs from 'fs'

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users/@me:
 *   get:
 *     summary: Get the authenticated user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */

/**
 * @swagger
 * /users/@me:
 *   put:
 *     summary: Update the authenticated user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User data to be updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *             example:
 *               password: newPassword
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Result message
 *             example:
 *               result: User changed successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '422':
 *         description: Unprocessable Entity
 */

/**
 * @swagger
 * /users/@me/friends:
 *   get:
 *     summary: Get the authenticated user's friends
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */

/**
 * @swagger
 * /users/@me/friends:
 *   post:
 *     summary: Add friends to the authenticated user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: List of friends to add
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               friends:
 *                 type: array
 *                 items:
 *                   type: integer
 *             example:
 *               friends: [2, 5, 8]
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Result message
 *             example:
 *               result: User changed successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '422':
 *         description: Unprocessable Entity
 */

/**
 * @swagger
 * /users/@me/friends/{user_id}:
 *   delete:
 *     summary: Remove a friend from the authenticated user's list
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID of the friend to be removed
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Result message
 *             example:
 *               result: User changed successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '422':
 *         description: Unprocessable Entity
 *       '404':
 *         description: Not Found
 */

/**
 * @swagger
 * /users/search/{input}:
 *   get:
 *     summary: Search users by email or username
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: input
 *         required: true
 *         description: Search input (email or username)
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */

/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID of the user to be retrieved
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not Found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: User ID
 *         username:
 *           type: string
 *           description: User username
 *         email:
 *           type: string
 *           description: User email
 *       required:
 *         - id
 *         - username
 *         - email
 */

/**
 * @swagger
 * /users/@me/services/access_token/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get Access Token for a specific service.
 *     description: Retrieve the access token for a specific service associated with the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the service for which the access token is requested.
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response with the access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   description: The retrieved access token.
 *       '401':
 *         description: Unauthorized. Invalid or missing Bearer token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the unauthorized error.
 *       '403':
 *         description: Forbidden. The authenticated user does not have access to the requested service.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the forbidden error.
 *       '500':
 *         description: Internal Server Error. An unexpected error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the internal server error.
 */

/**
 * @typedef {Object} AccessTokenResponse
 * @property {string} access_token - The retrieved access token.
 */

/**
 * @typedef {Object} ErrorResponse
 * @property {string} error - Description of the error.
 */

/**
 * @swagger
 * /users/@me/avatar:
 *   put:
 *     summary: Update user avatar
 *     description: Update the avatar of the currently authenticated user.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful update of user avatar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Result message
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       422:
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message
 */

export default function index(app) {
    app.get('/users/@me/services/access_token/:id', async (request, response) => {
        try {
            let serviceId = parseInt(request.params.id);
            let userId = response.locals.user.id;
            try {
                let accessToken = await getAccessToken(userId, serviceId);
                return response.status(200).json({"access_token": accessToken})
            } catch (e) {
                return response.status(200).json({"error": e})
            }
        } catch (error) {
            console.log(error)
            return InternalError(response)
        }
    })
    app.put('/users/@me/avatar', upload.single('avatar'), async (request, response) => {
        try {
            if (!request.file) return UnprocessableEntity(response)

            const filename = `${response.locals.user.id}.png`;
            const outputPath = path.join(process.cwd(), 'public/avatars', filename);

            if (fs.existsSync(outputPath)) {
                fs.unlinkSync(outputPath);
            }

            await sharp(request.file.buffer)
              .resize(256, 256)
              .toFormat('png')
              .toFile(outputPath);

            response.status(200).send({ result: 'User changed successfully' });
        } catch (error) {
            console.log(error)
            response.status(500).send({ result: error.message });
        }
    })
    app.get('/users/@me', async (request, response) => {
        try {
            return response.status(200).json(response.locals.user)
        } catch (error) {
            return InternalError(response)
        }
    })
    app.put('/users/@me', async (request, response) => {
        try {
            let body = request.body

            if (body === undefined)
                return UnprocessableEntity(response)
            if (body.password)
                body.password = await hashPassword(body.password)
            let error = await updateUser(response.locals.user.id, body)
            if (error)
                return NotFound(response)
            return response.status(200).json({result: "User changed successfully"})
        } catch (error) {
            console.log(error)
            return InternalError(response)
        }
    })
    app.get('/users/@me/friends', async (request, response) => {
        try {
            let friends = response.locals.user.friends
            let results = [];

            for (const friend of friends) {
                let user = await getUserById(friend);

                if (user === null) continue;
                results.push({
                    id: user.id,
                    username: user.username,
                    email: user.email
                })
            }
            return response.status(200).json(results)
        } catch (error) {
            return InternalError(response)
        }
    })
    app.post('/users/@me/friends', async (request, response) => {
        let body = request.body;

        if (body === undefined) return UnprocessableEntity(response);

        let newFriends = body.friends;

        if (newFriends === undefined || !Array.isArray(newFriends)) return UnprocessableEntity;

        let friends = response.locals.user.friends

        friends = [...friends, ...newFriends]

        await updateUser(response.locals.user.id, {friends})

        return response.status(200).json({result: "User changed successfully"})
    })
    app.delete('/users/@me/friends/:user_id', async (request, response) => {
        let userId = parseInt(request.params.user_id);

        if (userId === undefined || isNaN(userId)) return UnprocessableEntity(response);

        let friends = response.locals.user.friends

        if (friends.includes(userId)) {
            friends.splice(friends.indexOf(userId), 1)
            await updateUser(response.locals.user.id, {friends})
        } else {
            return NotFound(response)
        }
        return response.status(200).json({result: "User changed successfully"})
    })
    app.get('/users/search/:input', async (request, response) => {
        try {
            let input = request.params.input;
            let users = await searchUser(input);
            let results = [];

            for (const user of users) {
                let alreadyPush = false;
                for (const result of results) {
                    if (result.id !== user.id) continue;
                    alreadyPush = true
                    break;
                }
                if (alreadyPush) continue;
                results.push({
                    id: user.id,
                    username: user.username,
                    email: user.email
                })
            }
            return response.status(200).json(results)
        } catch (error) {
            return InternalError(response)
        }
    })
    app.get('/users/:user_id', async (request, response) => {
        try {
            let userId = parseInt(request.params.user_id);
            let user = await getUserById(userId);

            if (user === null) return NotFound(response)
            return response.status(200).json({
                id: user.id,
                username: user.username,
                email: user.email
            })
        } catch (error) {
            return InternalError(response)
        }
    })
}