import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
    name:{ type: String, require: true, unique: true },

    deliveryCost: { type: Number, required: true },
}, { timestamps: true });

const City = mongoose.model("City", CitySchema);

export default City