import { compare, hash } from 'bcrypt';
import EntityNotFound from "../error/custom/entitynotfound";
import InvalidOperation from "../error/custom/invalidoperation";
import UserRepository from "../repository/userrepository";
import { SignJWT } from 'jose';
import { UserCreateRequestDTO } from '../dto/request/user/usercreaterequestdto';
import { UserCredentialsRequestDTO } from '../dto/request/user/usercredentialsrequestdto';
import { UserNameUpdateRequestDTO } from '../dto/request/user/usernameupdaterequestdto';
import UserCreateResponseDTO from '../dto/response/user/usercreateresponsedto';
import UserResponseDTO from '../dto/response/user/userresponsedto';
import { User } from '../model/User';

export default class UserService {
    repository = new UserRepository();

    async findById(id: number){
        const user = await this.repository.findById(id);

        if(!user){
            throw createError(new EntityNotFound('User'));
        }

        return user;
    }

    async create(dto: UserCreateRequestDTO){
        const createdUser = await this.repository.findByCredentials(dto.login,dto.email);
        if(createdUser){
            throw createError(new InvalidOperation("User with Login/Email already exists"));
        }
        const newPassword = await hash(dto.password, 8);
        dto.password = newPassword;
        const user = await this.repository.create(dto);
        const token = await this.generateToken(user);

        return new UserCreateResponseDTO(user, token);
    }

    async findByCredential(credentials: UserCredentialsRequestDTO){
        const {credential,password} = credentials;
        const user = await this.repository.findByCredential(credential);
        if(!user){
            throw createError(new EntityNotFound('User'));
        }
        const isMatch = await compare(password, user.password);
        if(!isMatch) {
            throw createError(new InvalidOperation('Wrong credentials'));
        }
        return user;
    }

    async generateAuthToken(credentials: UserCredentialsRequestDTO) {
        const user = await this.findByCredential(credentials);
        
        const token = await this.generateToken(user);
                        
        return new UserResponseDTO(user,token);
    }

    async generateToken(user: User){
        const token = await new SignJWT({userId: user.id})
                        .setProtectedHeader({alg: 'HS256'})
                        .setIssuedAt()
                        .setExpirationTime(String(process.env.JWT_EXPIRES))
                        .sign(new TextEncoder().encode(String(process.env.JWT_SECRET)));
        return token;
    }

    async updateName(userId: number, dto: UserNameUpdateRequestDTO){
        const user = await this.repository.update(userId,dto);
        return new UserResponseDTO(user);
    }

    async deleteUser(userId: number){
        await this.repository.deleteUser(userId);
    }
}