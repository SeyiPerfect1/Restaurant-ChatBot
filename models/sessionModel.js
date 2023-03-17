import mongoose from "mongoose";
import { Schema } from 'mongoose';

const SessionSchema = new Schema(
    {
        sessionID: {
            type: String,
            required: [true, 'Enter a Session ID'],
            trim: true
        },        
        OrderHistory: [
            {
                number: Number,
                food: String,
                price: Number
            }
        ],
    },
    { timestamps: true }
);
export const sessionModel = mongoose.model('Session', SessionSchema);
