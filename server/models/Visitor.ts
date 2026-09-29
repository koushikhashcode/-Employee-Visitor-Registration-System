import mongoose, { Document, Schema, Model } from 'mongoose';

export type VisitorPurpose = 'Meeting' | 'Interview' | 'Delivery' | 'Maintenance' | 'Personal' | 'Other';

export interface IVisitor extends Document {
  name: string;
  mobile: string;
  organization: string;
  personToMeet: string;
  purpose: VisitorPurpose;
  visitedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const VISITOR_PURPOSES: VisitorPurpose[] = [
  'Meeting',
  'Interview',
  'Delivery',
  'Maintenance',
  'Personal',
  'Other',
];

const VisitorSchema: Schema<IVisitor> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Visitor name is required'],
      trim: true,
      minlength: [2, 'Visitor name must have at least 2 characters'],
      maxlength: [100, 'Visitor name cannot exceed 100 characters'],
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      validate: {
        validator: function (v: string) {
          // Exactly 10 digits
          return /^\d{10}$/.test(v);
        },
        message: 'Mobile number must be exactly 10 digits',
      },
    },
    organization: {
      type: String,
      required: [true, 'Organization / Company / College name is required'],
      trim: true,
      minlength: [2, 'Organization name must have at least 2 characters'],
      maxlength: [120, 'Organization name cannot exceed 120 characters'],
    },
    personToMeet: {
      type: String,
      required: [true, 'Person to meet is required'],
      trim: true,
      minlength: [2, 'Person to meet must have at least 2 characters'],
      maxlength: [100, 'Person to meet cannot exceed 100 characters'],
    },
    purpose: {
      type: String,
      required: [true, 'Purpose of visit is required'],
      enum: {
        values: VISITOR_PURPOSES,
        message: '{VALUE} is not a supported visit purpose',
      },
    },
    visitedAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret: Record<string, any>) {
        ret.id = ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes for fast lookup by name, mobile, and recency
VisitorSchema.index({ visitedAt: -1 });
VisitorSchema.index({ name: 'text', organization: 'text' });
VisitorSchema.index({ mobile: 1 });

export const Visitor: Model<IVisitor> =
  mongoose.models.Visitor || mongoose.model<IVisitor>('Visitor', VisitorSchema);
