import mongoose, { type Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { generateToken } from '../helpers/generateToken';

interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  points?: number;
  validationToken?: string | null;
  isValidated?: boolean;
  registrationDate: Date;
  lastOrderDate?: Date;
  isDeleted: boolean;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    immutable: true
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
  points: {
    type: Number
  },
  validationToken: {
    type: String,
    default: generateToken()
  },
  isValidated: {
    type: Boolean,
    default: false
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  lastOrderDate: {
    type: Date,
    default: null
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});
userSchema.pre('save', async function (next) {
  if (this.role !== 'user') {
    this.isValidated = true;
    this.validationToken = undefined;
    this.points = undefined;
    this.lastOrderDate = undefined;
  }

  next();
});

const User = mongoose.model<IUser>('User', userSchema);

export { User, type IUser };
