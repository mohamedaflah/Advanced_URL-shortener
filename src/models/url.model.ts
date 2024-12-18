import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUrl extends Document {
  longUrl: string;
  alias: string;
  topic: string;
  shortUrl: string;
  shortId: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId: mongoose.Schema.Types.ObjectId;
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
  clicksByDate: [
    {
      date: string | Date;
      count: number;
    }
  ];
  uniqueIp: string[];
}

const UrlSchema: Schema<IUrl> = new Schema<IUrl>(
  {
    longUrl: { type: String, required: true },
    alias: { type: String, required: true },
    topic: { type: String },
    shortUrl: { type: String, required: true },
    shortId: { type: String, unique: true },
    totalClick: { type: Number, default: 0 },
    uniqueClicks: { type: Number, default: 0 },
    userId: { type: mongoose.Types.ObjectId },
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
    clicksByDate: [{ date: String, count: { type: Number, default: 0 } }],
    uniqueIp: [{ type: String }],
  },
  { timestamps: true }
);

const URlModel: Model<IUrl> = mongoose.model<IUrl>(
  "urlshortner-urls",
  UrlSchema
);

export { URlModel };
