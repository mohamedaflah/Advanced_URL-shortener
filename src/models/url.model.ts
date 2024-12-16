import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUrl extends Document {
  longUrl: string;
  alias: string;
  topic: string;
  shortUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  totalClick: number;
  uniqueClicks: number;
  os: {
    osName: string;
    osType: string;
    uniqueClicks: number;
    uniqueUsers: number;
  };
  device: {
    deviceName: string;
    deviceType: string;
    uniqueClicks: number;
    uniqueUsers: number;
  };
}

const UrlSchema: Schema<IUrl> = new Schema<IUrl>(
  {
    longUrl: { type: String, required: true },
    alias: { type: String, required: true },
    topic: { type: String },
    shortUrl: { type: String, required: true },
    totalClick: { type: Number, default: 0 },
    uniqueClicks: { type: Number, default: 0 },
    os: {
      osName: { type: String },
      osType: { type: String },
      uniqueClicks: { type: Number, default: 0 },
      uniqueUsers: { type: Number, default: 0 },
    },
    device: {
      deviceName: { type: String },
      deviceType: { type: String },
      uniqueClicks: { type: Number, default: 0 },
      uniqueUsers: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const URlModel: Model<IUrl> = mongoose.model<IUrl>(
  "urlshortner-urls",
  UrlSchema
);

export { URlModel };
