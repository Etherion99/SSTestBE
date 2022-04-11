import { Schema } from "mongoose";

export const TableTypeSchema = new Schema({
    id: Number,
    name: { type: String, required: true },
    columns: [
        {
            id: Number,
            header: String,
            dataType: String,
            format: String,
            required: Boolean,
        }
    ],
    data: [
        {
            content: Schema.Types.Mixed
        }
    ]
})
