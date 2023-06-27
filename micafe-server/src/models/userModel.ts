import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { generateToken } from '../helpers/generateToken';

interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  validationToken: string | null;
  isValidated: boolean;
  isDeleted: boolean;
  
}

const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowecase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    default: 'user'
  },
  validationToken: {
    type: String,
    default: generateToken()
  },
  isValidated: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
  
});
userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  console.log('ekfjkew')
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


const User = mongoose.model<IUser>('User', userSchema);

export {User, IUser};
